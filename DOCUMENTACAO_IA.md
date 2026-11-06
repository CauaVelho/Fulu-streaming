# Documentação de Uso da IA

| Problema / Requisito | Prompts Utilizados | Refinamento (Iterações) | Decisão de Engenharia |
|----------------------|--------------------|--------------------------|--------------------------|
| Inicializar ambiente Node, Express e Prisma | "Crie a aplicação CineStream; atue como engenheiro sênior; comece pela Fase 1..." | A instalação inicial selecionou versões recentes do Prisma; o projeto foi ajustado para Prisma 6 por compatibilidade estável com PostgreSQL. | Dependências separadas por produção e desenvolvimento, scripts npm claros e banco PostgreSQL isolado em Docker Compose. |
| Renomear a plataforma para Fulu e aplicar a identidade visual enviada | "O nome do site deve ser Fulu e o ícone do site deve ser a imagem que enviei." | A identidade foi aplicada ao título, favicon, marca lateral e documentação. O seed manteve nomes fictícios neutros. | A imagem fornecida foi usada diretamente como PNG local para evitar dependências externas e preservar consistência offline da marca. |
| Implementar API REST e catálogo seedado | "Continue o processo de criação com o prompt já passado..." | Foi necessária uma validação mais específica de tipos Prisma (Rating e ContentType) durante o seed. | Controllers usam Prisma, whitelists de campos, status HTTP adequados e filtros seguros por busca, tipo e destaque. |
