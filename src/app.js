const express = require("express");
const cors = require("cors");
const healthRoutes = require("./routes/health.routes");
const contentRoutes = require("./routes/content.routes");
const categoryRoutes = require("./routes/category.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json({ limit: "1mb" }));
app.use("/api/health", healthRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({
    error: error.publicMessage || "Erro interno do servidor",
  });
});

module.exports = app;
