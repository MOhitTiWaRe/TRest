# ⚡ Postman Clone

A lightweight Postman-like tool built with **React (Vite)** and **Express.js** + **MikroORM** (PostgreSQL) for sending HTTP requests and viewing request history.

> ✅ Live Demo  
> 🔗 Frontend: [link](https://trest-frontend.onrender.com)
> 🔗 Backend: [link](https://trest-w52u.onrender.com)

---

## 🚀 Features

- Send `GET`, `POST`, and `PUT` requests
- View API responses directly in the UI
- History of past requests stored in a PostgreSQL database
- Paginated request history view

---

## 🛠️ Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- Fetch API

### Backend

- Express.js
- MikroORM
- PostgreSQL
- Hosted on Render (backend + DB)
- CORS enabled

---

## 🧑‍💻 Getting Started Locally

1. Clone the repository
2.  Backend Setup
cd server
npm install

Create a .env file in the backend folder:
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=5432

Run the backend server:
node index.js

3. Frontend Setup
cd ../frontend
npm install

Create a .env file in the frontend folder:
VITE_API_URL=https://your-backend-url.onrender.com

Run the frontend app:
npm run dev

## 📦 Deployment Info
Backend: Render Web Service + Render PostgreSQL DB

Frontend:  Render Static Site

Environment variables configured on both platforms

## 🧾 License
This project is licensed under the MIT License.
