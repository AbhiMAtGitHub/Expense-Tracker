# Expense Tracker API

The Expense Tracker API is a robust and secure backend application built using **Node.js**, **Express**, and **MongoDB**. It enables users to register, authenticate, and manage income/expense transactions with monthly/yearly summary reporting.

This API is designed with best practices and modular architecture suited for production environments and portfolio showcases.

---

## Features

- JWT-based Authentication
- Custom Request Validation (no third-party libraries)
- Centralized Error Handling Middleware
- Logging Middleware (Request, Response, Error)
- RESTful Transaction CRUD APIs
- Pagination with `limit` and `offset` via response headers
- Monthly and Yearly Financial Summaries
- Swagger API Documentation (`/api-docs`)
- Environment-based Configuration Loader
- Modular Folder Structure
- Test Suite with Jest + Supertest

---

## Tech Stack

| Layer     | Technology                  |
| --------- | --------------------------- |
| Language  | JavaScript (Node.js)        |
| Framework | Express.js                  |
| Database  | MongoDB (Mongoose ODM)      |
| Auth      | JSON Web Tokens (JWT)       |
| Docs      | Swagger (OpenAPI 3)         |
| Testing   | Jest + Supertest            |
| Logging   | Custom Middleware (Console) |
| Config    | dotenv                      |

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/expense-tracker-api.git
cd expense-tracker-api
```

### 2. Install Dependencies

```
npm install
```

### 3. Configure Environment Variables

```
Create a .env file in the root with:

PORT=4000
MONGO_URI=mongodb://localhost:27017/expensetracker
JWT_SECRET=your-secure-secret
NODE_ENV=development
```

### 4. Start the Server

```
Server will start at:
http://localhost:4000
```

### 5. API documentation

```
http://localhost:4000/api-docs
```
