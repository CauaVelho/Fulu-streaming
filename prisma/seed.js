const { PrismaClient, ContentType, Rating } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

const seed = async () => {
  await prisma.myList.deleteMany();
  await prisma.content.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: { name: "Visitante", email: "visitante@fulu.local", password: await bcrypt.hash("visitante123", 12), avatarUrl: "/fulu-icon.png" },
  });
  const categories = await Promise.all(
    ["Ação", "Drama", "Ficção", "Comédia", "Suspense", "Documentário"].map((name) => prisma.category.create({ data: { name } })),
  );

  const data = [
<<<<<<< HEAD
    ["O Protetor", "Robert McCall (Denzel Washington) é um ex-agente de operações especiais que forjou a própria morte para tentar viver uma vida pacata e anônima em Boston. Sua rotina metódica muda quando ele tenta ajudar Teri (Chloë Grace Moretz), uma jovem explorada por uma violenta rede da máfia russa.", 2014, "2h 12min", "PG16", "MOVIE", true, ["Ação", "Mistério"], ["Denzel Washington", "Chloë Grace Moretz"]],
=======
    ["Nebulosa Azul", "Uma missão além da Terra revela um segredo que pode mudar o destino da humanidade.", 2025, "2h 18min", "PG13", "MOVIE", true, ["Ação", "Ficção"], ["Lia Santos", "Mateus Vale"]],
>>>>>>> d92be80424466513e39264c14936a4e3291189bf
    ["Última Cidade", "Sobreviventes atravessam um mundo abandonado em busca de esperança.", 2024, "1h 56min", "R", "MOVIE", false, ["Ação", "Suspense"], ["Ravi Costa", "Nina Sol"]],
    ["Crônicas de Aurora", "Uma família recebe um chamado inesperado para defender sua terra ancestral.", 2026, "8 episódios", "TV14", "SERIES", true, ["Ficção", "Drama"], ["Caio Luz", "Eva Porto"]],
    ["Rota Sem Nome", "Investigadores descobrem uma rede de segredos em uma cidade silenciosa.", 2025, "10 episódios", "TVMA", "SERIES", false, ["Drama", "Suspense"], ["Léo Maia", "Dora Reis"]],
    ["Foco no Agora", "Conversas, cultura e notícias ao vivo de forma dinâmica e divertida.", 2026, "Ao vivo", "TVPG", "TV_CHANNEL", false, ["Documentário"], ["Apresentadores Fulu"]],
    ["Cinema 24h", "Clássicos, estreias e grandes produções durante todo o dia.", 2026, "24 horas", "TVPG", "TV_CHANNEL", false, ["Ação", "Drama"], ["Equipe Fulu"]],
    ["Horizonte Vermelho", "Pilotos disputam uma corrida que atravessa continentes e memórias.", 2024, "2h 05min", "PG13", "MOVIE", false, ["Ação"], ["Theo Hart", "Mila Naves"]],
    ["Entre Dois Mundos", "Uma cientista encontra uma versão de si que conhece o futuro.", 2025, "6 episódios", "TV14", "SERIES", false, ["Ficção", "Drama"], ["Ana Rocha", "Pedro Lima"]],
    ["Código Eclipse", "Um hacker descobre que uma inteligência artificial controla cidades inteiras.", 2025, "1h 48min", "PG13", "MOVIE", false, ["Ficção", "Suspense"], ["Nara King", "Davi Luz"]],
    ["Viver em 24 Frames", "Um fotógrafo e uma atriz tentam salvar uma pequena sala de cinema.", 2024, "1h 42min", "PG", "MOVIE", false, ["Drama", "Comédia"], ["Bia Alves", "Luca Bento"]],
    ["Operação Cobalto", "Uma equipe de resgate entra em uma região isolada por uma tempestade.", 2026, "2h 11min", "R", "MOVIE", false, ["Ação", "Suspense"], ["Sara Melo", "Igor Cruz"]],
    ["O Jardim Noturno", "Vizinhos de um prédio antigo recebem cartas que revelam segredos da comunidade.", 2025, "1h 57min", "PG13", "MOVIE", false, ["Drama", "Suspense"], ["Téo Lima", "Maya Faria"]],
    ["Instituto Zero", "Estudiosos de fenômenos inexplicáveis passam a investigar uma prisão abandonada.", 2026, "12 episódios", "TV14", "SERIES", false, ["Suspense", "Ficção"], ["Renan Luz", "Clara Vale"]],
    ["Rua das Estações", "Quatro amigos seguem caminhos diferentes em uma mesma cidade vibrante.", 2025, "8 episódios", "TVPG", "SERIES", false, ["Comédia", "Drama"], ["Júlia Neri", "Tom Reis"]],
    ["Família Sideral", "Uma família no futuro aprende a viver com suas diferenças durante uma viagem espacial.", 2026, "10 episódios", "TVG", "SERIES", false, ["Ficção", "Comédia"], ["Leo Mora", "Iris Paz"]],
    ["Sombras do Porto", "Detectives precisam proteger uma testemunha enquanto uma cidade espera por respostas.", 2024, "9 episódios", "TVMA", "SERIES", false, ["Drama", "Suspense"], ["Cris Azevedo", "Noah Brito"]],
    ["Fulu Esportes", "Jogos, campeonatos, entrevistas e melhores momentos das modalidades favoritas.", 2026, "Ao vivo", "TVPG", "TV_CHANNEL", false, ["Ação"], ["Equipe de Esportes Fulu"]],
    ["Fulu Documentários", "Histórias reais, natureza, ciência e cultura disponíveis o dia todo.", 2026, "24 horas", "TVG", "TV_CHANNEL", false, ["Documentário", "Drama"], ["Equipe de Documentários Fulu"]],
  ];

  const images = [
<<<<<<< HEAD
    ["https://beam-images.warnermediacdn.com/BEAM_LWM_DELIVERABLES/e42d41de-1950-4df2-ad9f-c61e0b059918/4eaff606f3a4978090b439c517e5d23732ae744b.jpg?host=wbd-images.prod-vod.h264.io&partner=beamcom", "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500"],
=======
    ["https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1400", "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500"],
>>>>>>> d92be80424466513e39264c14936a4e3291189bf
    ["https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1400", "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=500"],
    ["https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400", "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500"],
    ["https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1400", "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500"],
    ["https://images.unsplash.com/photo-1524668951403-d44b28200ce0?w=1400", "https://images.unsplash.com/photo-1524668951403-d44b28200ce0?w=500"],
    ["https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1400", "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=500"],
    ["https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1400", "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500"],
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
