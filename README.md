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

## Key Functional Modules

### 1. **Authentication**

- **Register** a user with name, email, and password
- **Login** to receive a signed JWT token
- All protected routes require the token via `Authorization: Bearer <token>`

### 2. **Transaction Management**

- **Create** one or multiple income/expense records
- **Retrieve** transactions with `limit` and `offset` pagination
- Categories include: Food, Transport, Utilities, etc.

### 3. **Reporting**

- **Monthly Summary** (for a given year): Total income & expenses grouped by month
- **Yearly Summary**: Cumulative total income & expenses for all years

### 4. **Middlewares**

- **Auth Middleware**: Verifies JWT and attaches user to request
- **Validation Middleware**: Custom validation of all incoming data
- **Logging Middleware**: Logs requests, responses, and errors
- **Error Middleware**: Centralized error catching with uniform responses

### 5. **Utilities**

- **Pagination Utility**: Built using limit/offset pattern
- **Environment Loader**: Auto-loads config based on `.env`

### 6. **Testing**

- Full suite using **Jest** + **Supertest**
- Covers config, error handling, report logic, and request lifecycle

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

### 5. API Swagger documentation

```
http://localhost:4000/api-docs
```

---

## API Reference

### 🔐 Authentication

#### `POST /api/auth/register`

- **Auth Required**: No
- **Description**: Register a new user
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```
- **Status Codes**: 201 Created, 400 Bad Request

#### `POST /api/auth/login`

- **Auth Required**: No
- **Description**: Authenticate an user
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "token": "<jwt-token>"
  }
  ```
- **Status Codes**: 200 OK, 400 Bad Request, 401 Unauthorized

---

### Transactions

**All Transaction routes require**:

- Authorization: Bearer <your-jwt-token>

#### `POST /api/transactions`

- **Description**: Create transaction(s)
- **Request Body(Single)**:
  ```json
  {
    "title": "Groceries",
    "amount": 250,
    "type": "expense",
    "category": "Food",
    "date": "2025-07-01"
  }
  ```
- **Request Body(Multiple)**:
  ```json
  [
    {
      "title": "Salary",
      "amount": 5000,
      "type": "income",
      "category": "Salary",
      "date": "2025-07-01"
    }
  ]
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "data": ["...createdTransactions"]
  }
  ```
- **Status Codes**: 201 Created, 400 Bad Request, 401 Unauthorized

#### `GET /api/transactions`

- **Description**: Get paginated transactions
- **Query Params**: ?limit=10&offset=0
- **Response Headers**:
  - X-Total-Count: <total-records>
  - X-Limit: <limit-used>
  - X-Offset: <offset-used>
- **Success Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "65f3b8b8c1b3a1c1b3a1c1b3",
        "title": "Salary",
        "amount": 5000,
        "type": "income",
        "category": "Salary",
        "date": "2025-07-01"
      }
    ]
  }
  ```
- **Status Codes**: 200 OK, 401 Unauthorized

---

### Reports

**All report routes require authentication**

#### `GET /api/reports/monthly?year=2025`

- **Description**: Monthly income/expense breakdown
- **Query Params**: ?year=2025
- **Success Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "65f3b8b8c1b3a1c1b3a1c1b3",
        "title": "Salary",
        "amount": 5000,
        "type": "income",
        "category": "Salary",
        "date": "2025-07-01"
      }
    ]
  }
  ```
- **Status Codes**: 200 OK, 401 Unauthorized

#### `GET /api/reports/monthly?year=2025`

- **Description**: Monthly income/expense breakdown
- **Query Params**: ?year=2025
- **Success Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "65f3b8b8c1b3a1c1b3a1c1b3",
        "title": "Salary",
        "amount": 5000,
        "type": "income",
        "category": "Salary",
        "date": "2025-07-01"
      }
    ]
  }
  ```
- **Status Codes**: 200 OK, 401 Unauthorized

#### `GET /api/reports/yearly`

- **Description**: Yearly income/expense breakdown
- **Success Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "year": 2024,
        "income": 100000,
        "expense": 60000
      }
    ]
  }
  ```
- **Status Codes**: 200 OK, 401 Unauthorized

---

## 🙋‍♂️ About the Author

I'm **Abhishek**, a passionate **Backend Developer** with 2 years of experience building scalable APIs and modern data platforms.  
This project demonstrates my hands-on knowledge of:

- Authentication and authorization (JWT)
- Middleware architecture
- API design and documentation
- Pagination, logging, validation, and testing
- CI/CD and modern deployment practices

- 🔗 [LinkedIn](https://www.linkedin.com/in/abhishek-m-061269225/)
- 📧 Email: abhishekm10476@gmail.com
- 🧑‍💻 GitHub: You are already here! 😊

---

> 📌 **Note**: If this project helped you learn or inspired you, feel free to fork it, contribute, or connect with me on LinkedIn.

---
