# 🏡 Real Estate MERN Application

A full-stack Real Estate web application built using the MERN stack.
Users can browse, search, and view property listings, while agents can manage their own properties through a dashboard.

---

## 🚀 Live Demo

🌐 Frontend (Netlify):
https://real-estate-website000.netlify.app/

🌐 Backend (Render):
https://real-estate-website-be.onrender.com

---

## 👥 User Roles

### 👤 User

* Browse all properties
* Search by location
* Filter by price
* View detailed property info
* Contact agent

### 🧑‍💼 Agent

* Add new properties
* Edit existing properties
* Delete listings
* Manage properties via dashboard

---

## ✨ Features

### 🏠 Property Listings

* View all properties in a responsive grid
* Property details include:

  * Title
  * Location
  * Price
  * Rooms & type
  * Description
  * Image

### 🔍 Search & Filters

* Search by location
* Filter by price range

### 📍 Map Integration

* Google Maps embedded using property location

### 📩 Contact System

* Users can send inquiries via contact form
* Displays success/error messages (no alerts)

### 🧑‍💼 Agent System

* Displays property owner (agent)
* Role-based actions (edit/delete only for owner)

### 📝 Property Management

* Add Property
* Edit Property
* Delete Property

### 📊 Dashboard

* View only your own properties
* Manage listings easily

### 🔐 Authentication

* Login / Signup system
* JWT-based authentication
* Role-based access control

### 📱 Responsive Design

* Built using Tailwind CSS
* Works across mobile, tablet, desktop

---

## 🛠️ Tech Stack

**Frontend:**

* React
* Tailwind CSS
* React Router

**Backend:**

* Node.js
* Express.js

**Database:**

* MongoDB (Mongoose)

---

## 📁 Project Structure

client/ → React frontend
server/ → Node.js backend

---

## ⚙️ Setup Instructions

### 1. Clone Repository

git clone https://github.com/akhilacodesss/real-estate-website-fe
cd real-estate-website-fe

### 2. Install Dependencies

npm install

### 3. Run Frontend

npm run dev

---

### Backend Setup

git clone https://github.com/akhilacodesss/real-estate-website-be
cd real-estate-website-be

npm install
npm start

---

## 🔑 Demo Credentials

User / Agent Login:

Email: [test@gmail.com]
Password: test

---

## 🌐 API Endpoints

* POST /api/users/register
* POST /api/users/login
* GET /api/properties
* POST /api/properties
* PUT /api/properties/:id
* DELETE /api/properties/:id

