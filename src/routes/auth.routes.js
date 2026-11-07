const express = require("express");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const prisma = require("../models/prisma");

const router = express.Router();
const publicUser = (user) => ({ id: user.id, name: user.name, avatarUrl: user.avatarUrl });

async function getSession(req) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, "");
  if (!token) return null;
  return prisma.session.findFirst({
    where: { token, expiresAt: { gt: new Date() } },
    include: { user: true },
  });
}

async function requireSession(req, res, next) {
  const session = await getSession(req);
  if (!session) return res.status(401).json({ error: "Sessão inválida ou expirada" });
  req.session = session;
  next();
}

router.post("/register", async (req, res, next) => {
  try {
    const name = String(req.body.name || "").trim();
    const password = String(req.body.password || "");
    const avatarUrl = String(req.body.avatarUrl || "/fulu-icon.png");
    if (name.length < 2 || name.length > 30) return res.status(400).json({ error: "Nome deve ter entre 2 e 30 caracteres" });
    if (password.length < 4 || password.length > 72) return res.status(400).json({ error: "Senha deve ter entre 4 e 72 caracteres" });

    const existing = await prisma.user.findFirst({ where: { name: { equals: name, mode: "insensitive" } } });
    if (existing) return res.status(409).json({ error: "Este nome de usuário já existe" });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name,
        email: `${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${crypto.randomUUID()}@fulu.local`,
        password: passwordHash,
        avatarUrl,
      },
    });
    const token = crypto.randomBytes(32).toString("hex");
    await prisma.session.create({ data: { token, userId: user.id, expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } });
    res.status(201).json({ user: publicUser(user), token });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const name = String(req.body.name || "").trim();
    const password = String(req.body.password || "");
    const user = await prisma.user.findFirst({ where: { name: { equals: name, mode: "insensitive" } } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Nome ou senha incorretos" });
    }
    const token = crypto.randomBytes(32).toString("hex");
    await prisma.session.create({ data: { token, userId: user.id, expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } });
    res.json({ user: publicUser(user), token });
  } catch (error) {
    next(error);
  }
});

router.get("/me", requireSession, async (req, res) => {
  res.json({ user: publicUser(req.session.user) });
});

router.post("/logout", requireSession, async (req, res, next) => {
  try {
    await prisma.session.delete({ where: { id: req.session.id } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

router.get("/list", requireSession, async (req, res, next) => {
  try {
    const entries = await prisma.myList.findMany({
      where: { userId: req.session.userId },
      include: { content: { include: { categories: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.json(entries.map((entry) => entry.content));
  } catch (error) {
    next(error);
  }
});

router.put("/list/:contentId", requireSession, async (req, res, next) => {
  try {
    const contentId = req.params.contentId;
    const content = await prisma.content.findUnique({ where: { id: contentId } });
    if (!content) return res.status(404).json({ error: "Título não encontrado" });
    await prisma.myList.upsert({
      where: { userId_contentId: { userId: req.session.userId, contentId } },
      create: { userId: req.session.userId, contentId },
      update: {},
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

router.delete("/list/:contentId", requireSession, async (req, res, next) => {
  try {
    await prisma.myList.deleteMany({ where: { userId: req.session.userId, contentId: req.params.contentId } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
