const express = require("express");
const prisma = require("../models/prisma");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.json(await prisma.category.findMany({ orderBy: { name: "asc" }, include: { contents: true } }));
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const category = await prisma.category.findUnique({ where: { id: req.params.id }, include: { contents: true } });
    if (!category) return res.status(404).json({ error: "Categoria não encontrada" });
    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (!req.body.name?.trim()) return res.status(400).json({ error: "Nome da categoria é obrigatório" });
    res.status(201).json(await prisma.category.create({ data: { name: req.body.name.trim() } }));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
