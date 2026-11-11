const { PrismaClient, ContentType, Rating } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

const seed = async () => {
  let user = await prisma.user.findUnique({ where: { email: "visitante@fulu.local" } });
  if (!user) {
    user = await prisma.user.create({
      data: { name: "Visitante", email: "visitante@fulu.local", password: await bcrypt.hash("visitante123", 12), avatarUrl: "/fulu-icon.png" },
    });
  }
  const categories = await Promise.all(
    ["Ação", "Drama", "Ficção", "Comédia", "Suspense", "Documentário", "Mistério", "Terror", "Violência", "Romance", "Baseado em Fatos Reais", "Guerra", "Sobrenatural", "Ciência", "Animes", "Filmes", "Séries"].map((name) =>
      prisma.category.upsert({ where: { name }, update: {}, create: { name } }),
    ),
  );

  const data = [
    ["O Protetor", "Robert McCall (Denzel Washington) é um ex-agente de operações especiais que forjou a própria morte para tentar viver uma vida pacata e anônima em Boston. Sua rotina metódica muda quando ele tenta ajudar Teri (Chloë Grace Moretz), uma jovem explorada por uma violenta rede da máfia russa.", 2014, "2h 12min", "PG16", "MOVIE", true, ["Ação", "Mistério"], ["Denzel Washington", "Chloë Grace Moretz"]],
    ["A Morte do Demônio: A Ascensão", "Beth viaja para Los Angeles para visitar sua irmã mais velha, Ellie, e seus filhos. A família mora em um prédio de apartamentos decrépito e quase abandonado. Nas paredes do velho edifício, elas encontram um livro antigo escondido há anos. Ellie logo descobre que se trata do Necronomicon, que invoca demônios sanguinários quando lido em voz alta.", 2023, "1h 37min", "Lee Cronin", "MOVIE", false, ["Terror", "Suspense", "Violência"], ["Alyssa Sutherland", "Lily Sullivan", "Nell Fisher", "Morgan Davies", "Gabrielle Echols"]],
    ["The Walking Dead", "Baseado na história em quadrinhos escrita por Robert Kirkman, este drama potente e visceral retrata a vida nos Estados Unidos pós-apocalíptico. Um grupo de sobreviventes, liderado pelo policial Rick Grimes, segue viajando em busca de uma nova moradia segura e distante dos mortos-vivos.", 2010, "177 episódios, 11 temporadas.", "AMC", "SERIES", true, ["Ficção", "Drama", "Violência"], ["Andrew Lincoln", "Norman Reedus", "Melissa McBride", "Steven Yeun", "Chandler Riggs", "Lauren Cohan"]],
    ["Cães de Caça", "Acompanha os jovens boxeadores Kim Geon-woo e Hong Woo-jin, que se tornam amigos após uma luta no ringue. Quando a mãe de Geon-woo cai em um golpe de agiotas implacáveis, a dupla se une para enfrentar uma organização criminosa perigosa.", 2023, "15 episódios, 2 temporadas.", "Jeong Chan", "SERIES", false, ["Drama", "Ação"], ["Woo Do-hwan", "Lee Sang-yi"]],
    ["Crunchyroll", "A Crunchyroll é a principal plataforma global de streaming dedicada a animes, oferecendo um vasto catálogo de séries, filmes, mangás e loja de colecionáveis.", 2006, "Ao vivo", "TVPG", "TV_CHANNEL", false, ["Animes"], ["Crunchyroll, LLC é uma empresa americana, subsidiária da Sony, responsável por distribuição, licenciamento e publicação de anime detentora de uma comunidade online internacional focada na transmissão de vídeo de mídia asiática oriental, incluindo anime, mangá, dorama, música, entretenimento eletrônico e conteúdo."]],
    ["Cartoon Network", "é um famoso canal de televisão por assinatura americano focado em animações", 1992, "24 horas", "TVPG", "TV_CHANNEL", false, ["Filmes", "Séries"], ["Foi criado para transmitir por 24 horas para as propriedades de animação clássicos das bibliotecas Turner Broadcasting. O canal também transmite uma variedade de programas, que vão de animações com ação à comédia."]],
    ["Diário de uma Paixão", "Na década de 1940, na Carolina do Sul, o operário Noah Calhoun e a rica Allie se apaixonam desesperadamente, mas os pais da jovem não aprovam o namoro. Noah é enviado para lutar na Segunda Guerra Mundial, e parece ser o fim do romance. Enquanto isso, Allie se envolve com outro homem.", 2004, "2h 01min", "PG13", "MOVIE", false, ["Romance", "Drama", "Baseado em Fatos Reais"], ["Ryan Gosling", "Rachel McAdams", "James Marsden", "James Garner", "Gena Rowlands"]],
    ["Você", "Obsessivo e mortalmente charmoso, Joe vai ao extremo para entrar na vida de quem o fascina. Por trás de seus modos gentis, há uma fúria assassina e um passado perturbador.", 2018, "50 episódios, 5 temporadas", "TVMA", "SERIES", false, ["Ficção", "Drama", "Suspense"], ["Penn Badgley", "Elizabeth Lail", "Victoria Pedretti", "Shay Mitchell", "Luca Padovan", "Zach Cherry"]],
    ["O Grande Gatsby", "Na primavera de 1922, Nick Carraway chega a Nova York e vira vizinho do misterioso e festeiro milionário Jay Gatsby quando vai viver do outro lado da baía com sua prima Daisy e seu marido mulherengo Tom Buchanan. Assim, Nick é atraído para o mundo cativante dos ricos, suas ilusões, amores e fraudes.", 2013, "2h 23min", "PG13", "MOVIE", false, ["Drama", "Suspense", "Romance"], ["Leonardo DiCaprio", "Tobey Maguire", "Carey Mulligan", "Joel Edgerton", "Elizabeth Debicki"]],
    ["Psicopata Americano", "Em Nova York, na geração yuppie nos anos 80, um corretor da Wall Street, Patrick Bateman é um assassino frio e, instigado por suas emoções, mata todos os que ficam em seu caminho e ameaçam suas ambições.", 2000, "1h 42min", "R", "MOVIE", false, ["Drama", "Mistério", "Violência"], ["Christian Bale", "Jared Leto", "Willem Dafoe"]],
    ["Bastardos Inglórios", "Durante a Segunda Guerra Mundial, na França, judeus americanos espalham o terror entre o terceiro Reich. Ao mesmo tempo, Shosanna, uma judia que fugiu dos nazistas, planeja vingança quando um evento em seu cinema reunirá os líderes do partido.", 2009, "2h 33min", "R", "MOVIE", false, ["Ação", "Suspense", "Guerra"], ["Christoph Waltz", "Brad Pitt", "Eli Roth", "Mélanie Laurent", "Daniel Brühl", "Michael Fassbender", "Til Schweiger", "Sylvester Groth"]],
    ["Clube da Luta", "Um homem deprimido que sofre de insônia conhece um estranho vendedor chamado Tyler Durden e se vê morando em uma casa suja depois que seu perfeito apartamento é destruído. A dupla forma um clube com regras rígidas onde homens lutam. A parceria perfeita é comprometida quando uma mulher, Marla, atrai a atenção de Tyler.", 1999, "2h 19min", "R", "MOVIE", false, ["Mistério", "Suspense", "Ação"], ["Brad Pitt", "Edward Norton", "Helena Bonham Carter", "Jared Leto"]],
    ["Jujutsu Kaisen", "A trama acompanha Yuji Itadori, um estudante do ensino médio com força física sobre-humana. Sua vida muda quando ele ingere um dedo amaldiçoado pertencente a Ryomen Sukuna, o lendário Rei das Maldições, para salvar seus amigos.", 2020, "53 episódios, 3 temporadas", "TV14", "SERIES", false, ["Ação", "Ficção", "Sobrenatural"], ["Junya Enoki", "Yuichi Nakamura", "Yuma Uchida", "Asami Seto", "Junichi Suwabe"]],
    ["VisionQuest", "Reiniciado e escondido daqueles que desejam transformá-lo em uma arma, Vision consulta inteligências artificiais para encontrar seu propósito. Essa vida tranquila acaba após uma recompensa por sua cabeça colocá-lo em fuga.", 2026, "8 episódios", "TV14", "SERIES", false, ["Ficção", "Drama", "Mistério"], ["Paul Bettany", "James Spader", "James D'Arcy", "Orla Brady", "Emily Hampshire", "Ruaridh Mollica"]],
    ["Breaking Bad", "Walter White é um modesto professor de química do ensino médio. Quando descobre que tem câncer terminal, ele precisa encontrar uma maneira de garantir o bem-estar da família e toma uma decisão drástica: produzir e comercializar metanfetamina.", 2008, "62 episódios, 5 temporadas.", "TVMA", "SERIES", false, ["Ficção", "Ciência"], ["Bryan Cranston", "Aaron Paul", "Anna Gunn", "Dean Norris", "RJ Mitte"]],
    ["O Justiceiro", "A trama acompanha Frank Castle, um ex-fuzileiro naval que busca vingança pelo assassinato brutal de sua família. Ao investigar o caso, ele descobre uma conspiração militar e do submundo do crime muito maior do que imaginava, transformando-se em um anti-herói implacável que faz justiça com as próprias mãos.", 2017, "26 episódios, 2 temporadas", "TVMA", "SERIES", false, ["Ação", "Ficção", "Violência"], ["Jon Bernthal", "Ben Barnes", "Amber Rose Revah", "Ebon Moss-Bachrach"]],
    ["Telecine", "O Telecine oferece um catálogo amplo de filmes de biografia (biopics), tanto produções nacionais quanto internacionais de grande destaque.", 1991, "24 horas", "TVPG", "TV_CHANNEL", false, ["Filmes", "Séries"], ["É uma rede de canais de televisão por assinatura brasileira dedicada à exibição de filmes. Foi fundada em 11 de novembro de 1991 como um dos primeiros canais da então recém-criada Globosat, ao lado de GNT, Multishow e Top Sport"]],
    ["HBO", "Home Box Office é uma rede de televisão por assinatura estadunidense, de propriedade da Skydance Corporation. Com uma renda anual de mais de US$ 2 bilhões de dólares, é um dos maiores canais da TV paga do mundo. Em 2018, a HBO tinha mais de 140 milhões de assinantes pelo mundo.", 1972, "24 horas", "TVPG", "TV_CHANNEL", false, ["Filmes", "Séries"], ["A HBO é uma renomada rede de televisão por assinatura estadunidense e serviço de streaming, de propriedade da Skydance Corporation."]],
  ];

  const images = [
    ["https://beam-images.warnermediacdn.com/BEAM_LWM_DELIVERABLES/e42d41de-1950-4df2-ad9f-c61e0b059918/4eaff606f3a4978090b439c517e5d23732ae744b.jpg?host=wbd-images.prod-vod.h264.io&partner=beamcom", "https://www.sonypictures.com.br/sites/brazil/files/2023-09/sony_protetor1_1400x2100.jpg"],
    ["https://ovicio.com.br/wp-content/uploads/the-punisher-o-justiceiro.png", "https://media.themoviedb.org/t/p/w500/wOTkx79g74xD562uq3MsTcTgetC.jpg"],
    ["https://www.siglaseabreviaturas.com/wp-content/uploads/2015/04/TWD-title.jpg", "https://m.media-amazon.com/images/M/MV5BNjA0ZDZiNmQtM2E2Ni00Y2UzLTgzYjktMzE2YzJhYzZhNzI4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"],
    ["https://i.ytimg.com/vi/S0KUXSI5J1I/maxresdefault.jpg", "https://image.tmdb.org/t/p/original/1JyzC4fYge80mAxgCmpWYpx1vso.jpg"],
    ["https://images.unsplash.com/photo-1524668951403-d44b28200ce0?w=1400", "https://images.unsplash.com/photo-1524668951403-d44b28200ce0?w=500"],
    ["https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1400", "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=500"],
    ["https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1400", "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500"],
    ["https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=1400", "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=500"],
    ["https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1400", "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=500"],
    ["https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1400", "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500"],
    ["https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1400", "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500"],
    ["https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1400", "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500"],
    ["https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi19vjPbHR8V7gPw_hYQE6W6MkjxUm0IO7Mxg6HKc4SgI-nkHAtLTy_q38MjCGGnn3Oc-FEsDvwm9EDBnOCLcmPHnFqjgDQaMHhMdhNYYXTS6y-HmrAPn4EzyJG1ebQ8tPM4LHQ2eoR56U/s1000/clube+da+luta.png", "https://br.web.img3.acsta.net/medias/nmedia/18/90/95/96/20122166.jpg"],
    ["https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1400", "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=500"],
    ["https://www.laughingplace.com/uploads/media/2026/09/VisionQuest-Story-So-Far.png/w768", "https://bancodeseries.com.br/images/posters/31245.jpg"],
    ["https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1400", "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=500"],
    ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400", "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500"],
    ["https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400", "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500"],
  ];

  for (let i = 0; i < data.length; i += 1) {
    const [title, description, year, duration, rating, type, featured, categoryNames, cast] = data[i];
    const contentData = {
      title, description, year, duration, rating: Rating[rating] || Rating.PG13,
      type: ContentType[type], featured, cast,
    };
    const connectedCategories = categories.filter((category) => categoryNames.includes(category.name)).map((category) => ({ id: category.id }));
    const existing = await prisma.content.findFirst({ where: { title } });
    if (existing) {
      await prisma.content.update({ where: { id: existing.id }, data: { ...contentData, categories: { set: connectedCategories } } });
    } else {
      await prisma.content.create({
        data: {
          ...contentData,
          backdropUrl: images[i][0],
          posterUrl: images[i][1],
          categories: { connect: connectedCategories },
        },
      });
    }
  }

  const first = await prisma.content.findFirst({ where: { featured: true } });
  if (first) {
    const alreadySaved = await prisma.myList.findUnique({ where: { userId_contentId: { userId: user.id, contentId: first.id } } }).catch(() => null);
    if (!alreadySaved) await prisma.myList.create({ data: { userId: user.id, contentId: first.id } });
  }
  console.log("Seed Fulu concluído.");
};

seed().finally(() => prisma.$disconnect());
