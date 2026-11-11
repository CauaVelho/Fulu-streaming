const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const target = path.join(root, ".env");
const example = path.join(root, ".env.example");

if (!fs.existsSync(target)) {
  fs.copyFileSync(example, target);
  console.log("Arquivo .env criado a partir de .env.example.");
} else {
  console.log("Arquivo .env já existe.");
}
