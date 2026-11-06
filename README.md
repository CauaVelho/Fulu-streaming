# Fulu

Catálogo audiovisual full-stack inspirado em serviços de streaming.

## Stack

- Node.js 24 + Express
- React + Vite
- PostgreSQL 16
- Prisma 6
- Docker Compose

## Executar

```powershell
cd meu-projeto
npm install
docker compose up -d postgres
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Em outro terminal:

```powershell
cd src/web
npm install
npm run dev
```

API: `http://localhost:3001`

Frontend: `http://localhost:5173`

PostgreSQL: porta externa `5433`
