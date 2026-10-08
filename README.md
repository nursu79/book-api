# 📚 Book API

A production-grade RESTful API for managing a bookstore catalog built with **Express.js**, **TypeScript**, **Zod**, and **MongoDB**.

---

## 🚀 Features

- **CRUD Operations**: Full support for creating, reading, updating, and deleting books.
- **Filtering & Pagination**: Query books by author or category with customizable pagination (`page`, `limit`).
- **Runtime Validation**: Strict request body and query validation using Zod.
- **Interactive Documentation**: Embedded Swagger UI built for both serverless (Vercel) and standard Node environments.
- **Automated Testing**: Integration tests using Jest and Supertest.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Runtime** | Node.js |
| **Language** | TypeScript |
| **Framework** | Express.js |
| **Database** | MongoDB + Mongoose ORM |
| **Validation** | Zod |
| **Documentation** | Swagger UI + OpenAPI 3.0 |
| **Testing** | Jest + Supertest |
| **Deployment** | Vercel (Serverless) / Docker |

---

## 🏗️ Architecture

The project follows a **Layered Controller-Service-Model** architecture:

```text
src/
├── config/         # Environment variables & Database connection setup
├── controllers/    # Route request handlers (HTTP request/response handling)
├── services/       # Business logic layer
├── models/         # Mongoose schema definitions
├── schemas/        # Zod validation schemas
├── routes/         # Express route definitions
├── middlewares/    # Error handling & schema validation middlewares
└── utils/          # Async helpers & custom AppError class
api/                # Vercel serverless function entry point
tests/              # Integration test suites
```

---

## 📌 API Endpoints & Documentation

Interactive API documentation is available at:
- **Swagger UI**: `/docs` or `/api/docs`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/books` | Fetch all books (supports `author`, `category`, `page`, `limit`) |
| `POST` | `/api/books` | Create a new book |
| `GET` | `/api/books/:id` | Get book details by ID |
| `PATCH` | `/api/books/:id` | Update book details by ID |
| `DELETE` | `/api/books/:id` | Delete book by ID |

---

## ⚙️ Quick Start

### 1. Installation
```bash
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/book-api?retryWrites=true&w=majority
```

### 3. Running Locally
```bash
# Start development server with live reload
npm run dev

# Run tests
npm test
```
