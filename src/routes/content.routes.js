const express = require("express");
const prisma = require("../models/prisma");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { search, type, featured, limit } = req.query;
    const take = Math.min(Math.max(Number(limit) || 30, 1), 100);
    const contents = await prisma.content.findMany({
      where: {
        ...(search ? { title: { contains: String(search), mode: "insensitive" } } : {}),
        ...(type ? { type: String(type).toUpperCase() } : {}),
        ...(featured !== undefined ? { featured: featured === "true" } : {}),
      },
      include: { categories: true },
      orderBy: { createdAt: "desc" },
      take,
    });
    res.json(contents);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const content = await prisma.content.findUnique({
      where: { id: req.params.id },
      include: { categories: true },
    });
    if (!content) return res.status(404).json({ error: "Título não encontrado" });
    res.json(content);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const allowed = ["title", "description", "year", "duration", "rating", "type", "posterUrl", "backdropUrl", "trailerUrl", "featured", "cast"];
    const data = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
    if (!data.title || !data.description || !data.year || !data.rating || !data.type || !data.posterUrl || !data.backdropUrl) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes" });
    }
    data.year = Number(data.year);
    const content = await prisma.content.create({ data, include: { categories: true } });
    res.status(201).json(content);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const allowed = ["title", "description", "year", "duration", "rating", "type", "posterUrl", "backdropUrl", "trailerUrl", "featured", "cast"];
    const data = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
    if (data.year) data.year = Number(data.year);
    const content = await prisma.content.update({ where: { id: req.params.id }, data, include: { categories: true } });
    res.json(content);
  } catch (error) {
    if (error.code === "P2025") return res.status(404).json({ error: "Título não encontrado" });
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.content.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") return res.status(404).json({ error: "Título não encontrado" });
    next(error);
  }
});

module.exports = router;
