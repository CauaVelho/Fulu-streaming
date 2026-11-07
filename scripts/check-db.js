const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

Promise.all([
  prisma.$queryRawUnsafe("SELECT 1"),
  prisma.content.count(),
])
  .then(([, count]) => console.log(JSON.stringify({ connected: true, count })))
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
