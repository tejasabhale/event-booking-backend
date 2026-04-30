# 🎟️ Event Booking Backend

Backend API for an event booking platform, currently under active development. This project focuses on building a scalable and secure backend with authentication, event management, and booking features.

---

## 🚀 Features
- 🔐 User authentication (JWT-based)
- 📧 Email OTP verification
- 👤 User registration and login
- 🔒 Password hashing using bcrypt
- 🏷️ Event creation and management (in progress)

---

## 🛠️ Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Nodemailer

---

## 📁 Project Structure

src/
├── controllers/ # request handling logic
├── routes/ # API routes
├── models/ # database schemas
├── middlewares/ # auth & error handling
├── utils/ # helper functions (email, OTP, etc.)
├── db/ # DB setup
└── app.js # express app setup

---

## ⚙️ Getting Started

### 1. Clone the repository

git clone https://github.com/your-username/event-booking-backend.git

cd your-repo-name

### 2. Install dependencies

npm install

### 3. Setup environment variables

Create a `.env` file inside the `backend/` folder:

PORT=8000
MONGO_URI=your_mongodb_connection
DB_NAME=your_db_name
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=your_access_token_expiry
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=your_refresh_token_expiry
JWT_SECRET=your_secret
EMAIL_USER=your_email
EMAIL_PASS=your_password

---

### 4. Run the server

Server will start on:

http://localhost:8000

---

## 📌 API Overview
- Authentication (Signup / Login / OTP)
- User management
- Event APIs (in progress)

---

## 📌 Roadmap
- Complete event booking system
- Payment gateway integration
- Admin dashboard
- Frontend integration (React)

---

## 🧠 Learning Goals
- Build scalable backend architecture
- Implement secure authentication
- Follow production-grade practices

---

## ⚠️ Notes
- `.env` file is not included in the repository
- Use `.env.example` as a reference for required variables

---

🚧 Frontend will be added in future updates.

---

## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first.

---

Built while learning and building in public 🚀