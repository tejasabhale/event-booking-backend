# Event Booking Website

## Overview

A full-stack Event Booking Website where users can browse events, view event details, register/login with OTP verification, and book events online. The project includes a frontend built with React + Vite and a backend powered by Node.js, Express, MongoDB, and Mongoose.

## Features

* User registration and login
* OTP email verification using Nodemailer + Gmail
* Secure authentication with access and refresh tokens
* Event listing and event details pages
* Booking system for events
* Admin panel support (in progress / planned)
* Responsive frontend UI
* REST API backend

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* JavaScript

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose ODM
* JWT Authentication
* bcrypt for password hashing
* Nodemailer for emails

## Project Structure

```bash
project-root/
├── Frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   └── public/
├── Backend/
│   └── src/    
│       ├── controllers/
│       ├── db/
│       ├── models/
│       ├── routes/
│       ├── utils/
│       ├── middlewares/
│       ├── app.js/
│       ├── constants.js
│       └── index.js
└── README.md
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/tejasabhale/event-booking
```

### 2. Install dependencies

```bash
# Frontend
cd Frontend
npm install

# Backend
cd ../Backend
npm install
```

### 3. Environment Variables

Create a `.env` file inside backend:

```env
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
```

## Run the Project

### Backend

```bash
npm run dev
```

### Frontend

```bash
npm run dev
```

## Authentication Flow

1. User registers with email.
2. OTP is sent to the registered email.
3. User verifies OTP.
4. User logs in securely.
5. JWT tokens are generated.

## API Examples

* `POST /api/users/register`
* `POST /api/users/verify-otp`
* `POST /api/users/login`
* `GET /api/events`
* `POST /api/bookings`

## Future Improvements

* Payment gateway integration
* Admin dashboard analytics
* Event organizer panel
* Booking history
* Search and filters
* Notifications

## Author

Tejas Abhale

[LinkedIn](https://www.linkedin.com/in/tejas-abhale-50743128a/)


## License

This project is open-source and available for learning and personal use.
