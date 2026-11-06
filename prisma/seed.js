const { PrismaClient, ContentType, Rating } = require("@prisma/client");
const prisma = new PrismaClient();

const seed = async () => {
  await prisma.myList.deleteMany();
  await prisma.content.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: { name: "Visitante", email: "visitante@fulu.local", password: "seed-only-not-for-production" },
  });
  const categories = await Promise.all(
    ["Ação", "Drama", "Ficção", "Comédia", "Suspense", "Documentário"].map((name) => prisma.category.create({ data: { name } })),
  );

  const data = [
    ["Nebulosa Azul", "Uma missão além da Terra revela um segredo que pode mudar o destino da humanidade.", 2025, "2h 18min", "PG13", "MOVIE", true, ["Ação", "Ficção"], ["Lia Santos", "Mateus Vale"]],
    ["Última Cidade", "Sobreviventes atravessam um mundo abandonado em busca de esperança.", 2024, "1h 56min", "R", "MOVIE", false, ["Ação", "Suspense"], ["Ravi Costa", "Nina Sol"]],
    ["Crônicas de Aurora", "Uma família recebe um chamado inesperado para defender sua terra ancestral.", 2026, "8 episódios", "TV14", "SERIES", true, ["Ficção", "Drama"], ["Caio Luz", "Eva Porto"]],
    ["Rota Sem Nome", "Investigadores descobrem uma rede de segredos em uma cidade silenciosa.", 2025, "10 episódios", "TVMA", "SERIES", false, ["Drama", "Suspense"], ["Léo Maia", "Dora Reis"]],
    ["Foco no Agora", "Conversas, cultura e notícias ao vivo de forma dinâmica e divertida.", 2026, "Ao vivo", "TVPG", "TV_CHANNEL", false, ["Documentário"], ["Apresentadores Fulu"]],
    ["Cinema 24h", "Clássicos, estreias e grandes produções durante todo o dia.", 2026, "24 horas", "TVPG", "TV_CHANNEL", false, ["Ação", "Drama"], ["Equipe Fulu"]],
    ["Horizonte Vermelho", "Pilotos disputam uma corrida que atravessa continentes e memórias.", 2024, "2h 05min", "PG13", "MOVIE", false, ["Ação"], ["Theo Hart", "Mila Naves"]],
    ["Entre Dois Mundos", "Uma cientista encontra uma versão de si que conhece o futuro.", 2025, "6 episódios", "TV14", "SERIES", false, ["Ficção", "Drama"], ["Ana Rocha", "Pedro Lima"]],
  ];

  const images = [
    ["https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1400", "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500"],
    ["https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1400", "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=500"],
    ["https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400", "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500"],
    ["https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1400", "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500"],
    ["https://images.unsplash.com/photo-1524668951403-d44b28200ce0?w=1400", "https://images.unsplash.com/photo-1524668951403-d44b28200ce0?w=500"],
  ];

  for (let i = 0; i < data.length; i += 1) {
    const [title, description, year, duration, rating, type, featured, categoryNames, cast] = data[i];
    await prisma.content.create({
      data: {
        title, description, year, duration, rating: Rating[rating] || Rating.PG13,
        type: ContentType[type], featured,
        backdropUrl: images[i % images.length][0],
        posterUrl: images[i % images.length][1],
        cast,
        categories: { connect: categories.filter((category) => categoryNames.includes(category.name)).map((category) => ({ id: category.id })) },
      },
    });
  }

  const first = await prisma.content.findFirst({ where: { featured: true } });
  await prisma.myList.create({ data: { userId: user.id, contentId: first.id } });
  console.log("Seed Fulu concluído.");
};

seed().finally(() => prisma.$disconnect());
