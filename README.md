## 🏡 Real Estate MERN Application

A full-stack Real Estate web application built using the MERN stack.
Users can browse and contact agents, while agents can manage property listings through a dedicated dashboard.

---

## 🚀 Live Demo

🌐 Frontend (Netlify):
https://real-estate-website00.netlify.app/

🌐 Backend (Render):
https://real-estate-website-be.onrender.com/

---

## 👥 User Roles

### 👤 User

* Browse all properties
* Search by location
* Filter by price
* View detailed property info
* Contact agents via messaging system

### 🧑‍💼 Agent

* Add new properties
* Edit existing properties
* Delete listings
* Manage properties via dashboard
* View and reply to user messages

---

## ✨ Features

### 🏠 Property Listings

* Responsive property grid
* Detailed property pages including:

  * Title
  * Location
  * Price (₹ formatted in L/Cr)
  * Rooms & type
  * Description
  * Image

---

### 🔍 Search & Filters

* Search by location
* Filter by price range

---

### 📩 Messaging System (Core Feature 🔥)

* Users can send messages to agents
* Agents receive messages in dashboard
* Real-time style chat interface
* Conversation view between user & agent

---

### 🧑‍💼 Agent System

* Role-based access control
* Only agents can manage properties
* Only property owners can edit/delete

---

### 📊 Dashboard

* View only your own properties
* Manage listings (Add / Edit / Delete)
* Access user messages

---

### 🔐 Authentication

* Login / Signup system
* JWT-based authentication
* Secure protected routes

---

### 📱 Responsive Design

* Built with Tailwind CSS
* Mobile-first design

---

## 🛠️ Tech Stack

**Frontend:**

* React (CRA)
* Tailwind CSS
* React Router

**Backend:**

* Node.js
* Express.js

**Database:**

* MongoDB (Mongoose)

---

## 📁 Project Structure

```
client/ → React frontend  
server/ → Node.js backend  
```

---

## ⚙️ Setup Instructions

### Frontend

```bash
git clone https://github.com/akhilacodesss/real-estate-website-fe
cd real-estate-website-fe
npm install
npm start
```

---

### Backend

```bash
git clone https://github.com/akhilacodesss/real-estate-website-be
cd real-estate-website-be
npm install
npm start
```

---

## 🔑 Demo Credentials

**Agent Login:**

* Email: [agent@gmail.com](mailto:agent@gmail.com)
* Password: test

**User Login:**

* Email: [user@gmail.com](mailto:user@gmail.com)
* Password: test1

---

## 🌐 API Endpoints

* POST /api/users/signup
* POST /api/users/login
* GET /api/properties
* POST /api/properties
* PUT /api/properties/:id
* DELETE /api/properties/:id
* GET /api/messages
* POST /api/messages

