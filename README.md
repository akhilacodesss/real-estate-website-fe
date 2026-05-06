````md
# 🏡 Brickly — Real Estate MERN Application

Brickly is a full-stack Real Estate web application built using the MERN stack.  
Users can browse properties, connect with agents, save listings to wishlist, and explore detailed property information, while agents can manage their own listings through a dedicated dashboard.

The project focuses on responsive UI design, authentication, role-based access control, property management, and messaging between users and agents.

---

# 🚀 Live Demo

### 🌐 Frontend (Netlify)
https://real-estate-website00.netlify.app/

### 🌐 Backend (Render)
https://real-estate-website-be.onrender.com/

---

# 👥 User Roles

## 👤 User

- Browse all properties
- Search by location
- Filter by property type and price
- View detailed property information
- Save properties to wishlist
- Contact agents through messaging

---

## 🧑‍💼 Agent

- Add new properties
- Edit existing properties
- Delete own listings
- Manage properties via dashboard
- View and reply to messages

---

## 🛡️ Admin

- View users
- Monitor listed properties
- Access platform leads/messages
- Manage platform activity through admin dashboard

---

# ✨ Features

## 🏠 Property Listings

- Responsive property grid
- Detailed property pages
- Property information includes:
  - Title
  - Price
  - Location
  - Rooms
  - Property type
  - Description
  - Image

---

## 🔍 Search & Filters

- Search by location
- Filter by property type
- Filter by price range

Supported property types:

- Apartment
- House
- Villa

---

## ❤️ Wishlist System

- Save favorite properties
- Remove properties from wishlist
- Dedicated wishlist page

---

## 📩 Messaging System

- Users can contact agents directly
- Agents can view conversations
- Chat-style conversation interface
- Role-based messaging access

---

## 📊 Dashboard

### Agent Dashboard

- Add / Edit / Delete properties
- View own listings
- Access user messages

### Admin Dashboard

- View users
- View properties
- View leads/messages
- Dashboard statistics cards

---

# 🔐 Authentication

- Login / Signup system
- JWT-based authentication
- Protected routes
- Role-based access control

---

# 📱 Responsive Design

- Built with Tailwind CSS
- Mobile-friendly UI
- Responsive navigation and layouts

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Tailwind CSS
- React Router DOM

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

---

# 📁 Project Structure

```bash
client/ → React frontend
server/ → Node.js backend
````

---

# ⚙️ Setup Instructions

## Frontend

```bash
git clone https://github.com/akhilacodesss/real-estate-website-fe
cd real-estate-website-fe
npm install
npm start
```

---

## Backend

```bash
git clone https://github.com/akhilacodesss/real-estate-website-be
cd real-estate-website-be
npm install
npm start
```

---

# 🔑 Demo Credentials

## 🧑‍💼 Agent Account

Email: [agent@brickly.com](mailto:agent@brickly.com)
Password: Agent@123

---

## 👤 User Account

Email: [user@brickly.com](mailto:user@brickly.com)
Password: User@123

---

## 🛡️ Admin Account

Email: [admin@brickly.com](mailto:admin@brickly.com)
Password: Admin@123

---

# 🌐 API Endpoints

## Authentication

* POST `/api/users/signup`
* POST `/api/users/login`

## Properties

* GET `/api/properties`
* POST `/api/properties`
* PUT `/api/properties/:id`
* DELETE `/api/properties/:id`

## Messages

* GET `/api/messages`
* POST `/api/messages`

## Wishlist

* GET `/api/favorites`
* POST `/api/favorites`

```
```
