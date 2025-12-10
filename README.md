# usabit-api
# Usabit API – Gestão de Usuários e Tarefas

API RESTful desenvolvida em **Node.js** com **Express** e **PostgreSQL**, com autenticação via **JWT** e operações de CRUD para tarefas.  
Projeto criado com foco em estudos de desenvolvimento **Back-end** e **Full Stack**.


## Tecnologias utilizadas

- Node.js
- Express
- PostgreSQL
- JWT (JSON Web Token)
- bcryptjs
- Docker & Docker Compose
- Jest & Supertest
- Dotenv


## Estrutura do projeto

```bash
usabit-api/
  src/
    app.js
    server.js
    db.js
    middleware/
      authMiddleware.js
    controllers/
      authController.js
      taskController.js
    routes/
      authRoutes.js
      taskRoutes.js
  sql/
    init.sql
  tests/
    health.test.js
  package.json
  docker-compose.yml
  Dockerfile
  .env.example
