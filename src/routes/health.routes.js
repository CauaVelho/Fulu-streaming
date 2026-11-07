const express = require("express");
const prisma = require("../models/prisma");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", database: "connected" });
  } catch (error) {
    error.status = 503;
    error.publicMessage = "Banco de dados indisponível";
    next(error);
  }
});

module.exports = router;
