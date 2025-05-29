# Backend API

Este projeto é um backend do teste técnico da Datawer.

## 🧱 Stack utilizada

- **Fastify** - Framework web rápido e leve
- **Prisma ORM** - ORM moderno com suporte a TypeScript
- **SQLite** - Banco de dados local
- **Swagger** - Documentação da API
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Zod** - Validador de esquemas TypeScript-first
- **bcrypt** - Biblioteca para hash de senhas

## 📦 Requisitos

- Node.js v18 ou superior
- npm ou yarn ou pnpm

## 🚀 Como rodar o projeto localmente

### 1. Instale as dependências

```bash
npm install
```

### 2. Gere o banco de dados e aplique as migrações

```bash
npm run prisma-migrate
```

### 3. Rode o servidor em modo desenvolvimento

```bash
npm run dev
```

### 5. O backend está disponível em:

[http://localhost:3333](http://localhost:3333)

### 6. A documentação do projeto está em:

[http://localhost:3333/docs](http://localhost:3333/docs)

---

OBS 1: Na inicialização da API estou populando o banco com um mock para facilitar a utilização.

OBS 2: Deixei o .env preenchido para facilitar, mas essa prática em produção configura má prática de segurança.
