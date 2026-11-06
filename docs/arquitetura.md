# Arquitetura do CineStream

A aplicação Fulu será dividida em API Express e interface React/Vite:

- **Backend:** Node.js 24, Express, Prisma Client, PostgreSQL 16.
- **Frontend:** React e Vite. Vite foi escolhido por iniciar rapidamente, reduzir configuração e oferecer HMR moderno em comparação ao Create React App.
- **Dados:** Docker Compose mantém PostgreSQL local em volume persistente.
- **Organização:** controllers, routes e model/config isolam transporte HTTP, regras de acesso ao Prisma e inicialização da aplicação.
