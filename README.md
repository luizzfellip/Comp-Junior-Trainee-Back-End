# 📚 Livraria — Backend

API REST de uma livraria desenvolvida com Node.js, Express, Sequelize e PostgreSQL. Permite gerenciamento de livros, usuários e pedidos, com integração à Google Books API para cadastro automático de livros via ISBN.

---

## 🚀 Tecnologias

- Node.js
- Express
- Sequelize
- PostgreSQL
- Docker
- JSON Schema (validação de requisições)
- Google Books API

---

## ⚙️ Como rodar o projeto

### Pré-requisitos

- [Docker](https://www.docker.com/) instalado e rodando

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Configure as variáveis de ambiente

Copie o arquivo de exemplo e preencha com seus valores:

```bash
cp .env.example .env
```

### 3. Suba a aplicação com Docker

```bash
docker compose up --build
```

### 4. Rode as migrations e seeds

```bash
docker compose exec app npx sequelize-cli db:migrate
docker compose exec app npx sequelize-cli db:seed:all
```

A API estará disponível em `http://localhost:3000`.

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com base no exemplo abaixo:

```env
PORT=3000
DIALECT=postgres
HOST=db
DB_USERNAME=postgres
PASSWORD=sua_senha
DATABASE=Livraria
DB_PORT=5432
HASH_BCRYPT=sua_hash
SECRET_CRYPTO=seu_secret
EXPIRE_IN=7d
SALT=8
GOOGLE_BOOKS_API_KEY=sua_chave_aqui
```

> ⚠️ Nunca suba o `.env` com dados reais para o GitHub.

---

## 📬 Testando com Insomnia

O projeto conta com uma collection do Insomnia pronta para uso, localizada na pasta `/insomnia` na raiz do projeto.

Para importar:

1. Abra o Insomnia
2. Clique em **Import**
3. Selecione o arquivo dentro da pasta `/insomnia`
4. Todas as rotas já estarão configuradas com os headers e bodies de exemplo

---

## 🛣️ Rotas

### Públicas

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/user` | Criar usuário |
| POST | `/auth` | Autenticar e obter token |

### Autenticadas (requer token)

| Método | Rota | Descrição |
|--------|------|-----------|
| PUT | `/user` | Atualizar usuário |
| DELETE | `/user` | Deletar usuário |
| GET | `/book` | Buscar livros |
| GET | `/order` | Listar pedidos do usuário |
| POST | `/order` | Criar pedido |

### Apenas Admin

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/book` | Cadastrar livro via ISBN (Google Books) |
| POST | `/book/manual` | Cadastrar livro manualmente |
| PUT | `/book/:id` | Atualizar livro |

---

## 📖 Cadastro de Livros

O sistema integra com a **Google Books API**. O admin pode cadastrar um livro informando apenas o ISBN, preço e estoque — os demais dados (título, autor, editora, etc.) são buscados automaticamente.

```json
{
  "isbn": "9780132350884",
  "price": 60,
  "stock": 3
}
```

Caso o livro não seja encontrado na API, é possível cadastrá-lo manualmente via `/book/manual`.

---

## 👤 Roles

| Role | Permissões |
|------|-----------|
| `customer` | Buscar livros, criar e visualizar pedidos |
| `admin` | Tudo do customer + gerenciar livros e criar admins |
