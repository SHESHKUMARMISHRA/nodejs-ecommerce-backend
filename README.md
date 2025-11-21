<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Express.js-Framework-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Sequelize-ORM-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/SQLite-Database-lightgrey?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Docker-Ready-blue?style=for-the-badge" />
</p>

<h1 align="center">🚀 Node.js E-Commerce Backend API</h1>
<p align="center">
  A modern, production-ready E-Commerce API powered by Node.js, Express, Sequelize ORM, SQLite, JWT Authentication, and Docker.
</p>

## 📦 About This Project

This repository contains a **production-grade E-Commerce Backend API**, designed with clean architecture and modern backend engineering practices.  
It demonstrates real-world development skills for scalable API systems:

### 🔥 Key highlights:
- **Node.js + Express** REST API with modular architecture  
- **Sequelize ORM** with migrations + seeders  
- **SQLite** for lightweight local development  
- **JWT Authentication** with hashed passwords (bcryptjs)  
- **Role-based access** (Admin, Vendor)  
- **Vendor module**: vendor → store → products → SKUs  
- **Docker-ready** (containerized environment)  
- **VSCode Debugger auto-attach** support  
- Clean folder structure following industry best practices  

This project is ideal for:
- Recruiters evaluating backend skills  
- Developers reviewing clean Node.js architecture  
- Portfolio showcase for full-stack or backend engineering roles  
- Beginners learning real-world Express + Sequelize development  



# 🛒 E-Commerce Backend (Node.js + Express + Sequelize + SQLite + Docker)

A complete and production-friendly **E-Commerce Backend API** built using:

- Node.js 20  
- Express.js  
- Sequelize ORM  
- SQLite (Dev environment)  
- JWT Authentication  
- Docker & Docker Compose  

This backend includes a modular architecture with Users, Vendors, Stores, Products, SKUs, and Role-Based Access.

---

## 🚀 Features

- 🔐 JWT Authentication (Login + Token storage)
- 🔑 Password hashing using bcryptjs
- 🛍 Vendor Module (Vendors + Stores)
- 📦 Products + SKUs (Simple product structure)
- 👥 User Roles (Admin / Vendor)
- 🗂 Soft deletes + timestamps
- 🐋 Fully Dockerized Environment
- 🧰 VSCode Debugger enabled
- 🗄 SQLite database auto-created in Docker
- 🏗 Ready for front-end integration (React / Next.js)

---

## 📦 Tech Stack

| Component     | Technology       |
|---------------|------------------|
| Backend       | Node.js, Express |
| ORM           | Sequelize        |
| Database      | SQLite           |
| Auth          | JWT, bcryptjs    |
| Tools         | Nodemon, Debugger |
| DevOps        | Docker, Docker Compose |

---

## 📁 Project Structure

src/
controllers/
routes/
models/
database/
scripts/
middlewares/
server.js

Dockerfile
docker-compose.yml


---

## 🐳 Docker Commands

### Build & Run

docker-compose up --build

## Rebuild Without Cache

docker-compose build --no-cache

## Run Migrations & Seeds Manually

docker exec node_app node src/scripts/migrate.js
docker exec node_app node src/scripts/seed.js

## Environment Setup

## Create a .env file:

APP_ENV=local
PORT=3000

DB_DIALECT=sqlite
DB_STORAGE=./src/database/database.sqlite

JWT_SECRET=your_jwt_secret_here
TOKEN_EXPIRES_IN=7d

## 🔑 Authentication API

## Login

## POST /api/login

Body:

{
  "email": "admin@example.com",
  "password": "password"
}

## Response:

User (without password)

Vendor (if applicable)

Access Token (JWT)

## 🧪 Seed Command

Run seeds to generate sample users, vendor, store, products & SKUs:

node src/scripts/seed.js

**Admin Credentials**
admin@example.com
password

**Vendor Credentials**

vendor@example.com
password


## **🌟 Portfolio / Showcase Section**

**This project is designed not only as a backend system but also as a portfolio showcase for backend engineering:**

## ✔ Scalable Architecture

Demonstrates clean folder structure, controllers, models, services, and reusable modules.

## ✔ Authentication & Authorization

JWT authentication, password hashing, and role linking shows real-world backend practices.

## ✔ Relational Data Modeling

Users → Vendors → Stores → Products → SKUs
Strong demonstration of ORM relationships & database design.

## ✔ Docker & DevOps Skills

Full Dockerized backend with debugging support — ideal for real deployment environments.

## ✔ API-Ready for Frontend

Perfect backend foundation for creating a React/Next.js Admin Panel or Shop UI.

## ✔ Recruiter Friendly

Highlights your backend engineering ability with production-grade code and structure.

## 💡 Future Enhancements

RBAC permission system

React / Next.js Admin Panel UI

Order module

Product categories & filters

Image uploads (S3 / Cloudinary)

Refresh token implementation

## **🤝 Connect With Me**

If you're a recruiter, senior developer, mentor, or collaborator —
I'd love to connect!

**Shesh Kumar Mishra**
📧 Email: mishrakshesh14287@gmail.com
💼 LinkedIn: https://www.linkedin.com/in/sheshmishra/
🌐 Portfolio:https://github.com/SHESHKUMARMISHRA