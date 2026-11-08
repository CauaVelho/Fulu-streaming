const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const fallbacks = [
  ["1519608487953-e999c86e7455", "1493246507139-91e8fad9978e"],
  ["1500530855697-b586d89ba3ee", "1440404653325-ab127d49abc1"],
  ["1489599849927-2ee91cede3ba", "1533928298208-27ff66555d8d"],
  ["1524668951403-d44b28200ce0", "1500534314209-a25ddb2bd429"],
  ["1478720568477-152d9b164e26", "1485846234645-a62644f84728"],
  ["1516280440614-37939bbacd81", "1496034663057-6245f11be793"],
  ["1470252649378-9c29740c9fa8", "1519681393784-d120267933ba"],
  ["1500534623283-312aade485b7", "1464822759023-fed622ff2c3b"],
  ["1469474968028-56623f02e42e", "1500534314209-a25ddb2bd429"],
];

const fixDuplicates = async () => {
  const contents = await prisma.content.findMany({ orderBy: { createdAt: "asc" } });
  const seenPoster = new Set();
  const seenBackdrop = new Set();
  let changed = 0;

  for (let index = 0; index < contents.length; index += 1) {
    const content = contents[index];
    const fallback = fallbacks[index % fallbacks.length];
    const data = {};

    if (!content.posterUrl?.trim() || seenPoster.has(content.posterUrl)) {
      data.posterUrl = `https://images.unsplash.com/photo-${fallback[0]}?w=500`;
    }
    if (!content.backdropUrl?.trim() || seenBackdrop.has(content.backdropUrl)) {
      data.backdropUrl = `https://images.unsplash.com/photo-${fallback[1]}?w=1400`;
    }

    if (Object.keys(data).length > 0) {
      await prisma.content.update({ where: { id: content.id }, data });
      changed += 1;
    }

    seenPoster.add(data.posterUrl || content.posterUrl);
    seenBackdrop.add(data.backdropUrl || content.backdropUrl);
  }

  console.log(`Imagens corrigidas em ${changed} título(s).`);
};

fixDuplicates()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
