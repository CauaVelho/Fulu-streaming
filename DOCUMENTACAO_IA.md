# Documentação de Uso da IA

| Problema / Requisito | Prompts Utilizados | Refinamento (Iterações) | Decisão de Engenharia |
|----------------------|--------------------|--------------------------|--------------------------|
| Inicializar ambiente Node, Express e Prisma | "Crie a aplicação CineStream; atue como engenheiro sênior; comece pela Fase 1..." | A instalação inicial selecionou versões recentes do Prisma; o projeto foi ajustado para Prisma 6 por compatibilidade estável com PostgreSQL. | Dependências separadas por produção e desenvolvimento, scripts npm claros e banco PostgreSQL isolado em Docker Compose. |
