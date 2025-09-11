# 📝 Blogosphere (MERN Stack Blog Application)

A full-stack **Blog Application** built with MERN stack. It allows users to create, edit, and manage blog posts with secure authentication, media uploads, and an admin dashboard.

---

## 🚀 Features

### 👤 User Authentication
- Secure login & registration using **JWT**.
- Google OAuth 2.0 authentication.
- Role-based access (User / Admin).
- Passwords stored securely using bcrypt.

### 📝 Blogging Features
- Create, edit, delete blog posts.
- Rich-text editor support.
- Upload images with posts (Multer + Cloudinary).
- Full-text search with MongoDB indexes.
- Category & tag-based filtering.

### ⭐ User Engagement
- Like & comment on posts.
- View author profiles.
- Follow/unfollow authors.
- Pagination & infinite scrolling.

### 📊 Admin Dashboard
- Manage users & blogs.
- Moderate comments and flagged posts.
- Analytics on popular posts & engagement metrics.

### 💻 Technical Features
- **React + Tailwind CSS** responsive UI.
- **Redux Toolkit** for global state management.
- **Express + MongoDB** backend with REST APIs.
- Secure routes with JWT middleware.

---

## 🛠️ Tech Stack

**Frontend:**
- React.js  
- Tailwind CSS  
- Redux Toolkit  
- React Router DOM  

**Backend:**
- Node.js  
- Express.js  
- MongoDB (Mongoose ODM)  

**Authentication:**
- JWT  
- Google OAuth  

**Other:**
- Multer / Cloudinary for image uploads  
- Bcrypt for password hashing  
- Validator for input sanitization  

---

## 📂 Project Structure

```
Blogosphere/
│── backend/
│   ├── models/         # Mongoose models (User, Post, Comment)
│   ├── routes/         # API routes
│   ├── controllers/    # Business logic
│   ├── middleware/     # Auth middlewares
│   └── server.js       # Entry point
│
│── frontend/
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Blog pages
│   │   ├── redux/      # State management
│   │   └── App.js
│   └── package.json
│
│── README.md
│── package.json
```

---

## ⚙️ Installation & Setup

### Steps

1. **Clone repository**
   ```bash
   git clone https://github.com/nikhilpatel9/Blogosphere.git
   cd Blogosphere
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment variables**  
   Create `.env` in backend:
   ```
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret
   GOOGLE_CLIENT_ID=your_id
   GOOGLE_CLIENT_SECRET=your_secret
   CLOUDINARY_KEY=your_key
   CLOUDINARY_SECRET=your_secret
   ```

5. **Run backend**
   ```bash
   cd backend
   npm run dev
   ```

6. **Run frontend**
   ```bash
   cd frontend
   npm start
   ```

---

## 📊 Example Use Cases

- **User**
  - Register/login via JWT or Google OAuth
  - Create and manage blog posts
  - Upload featured images
  - Like, comment, follow authors
  - Search & filter blogs by tags/categories

- **Admin**
  - Manage users and roles
  - Delete inappropriate posts or comments
  - View analytics on most popular content

---

## 📌 Future Enhancements
- Newsletter system
- Bookmark/favorites
- Trending blogs page
- AI-powered blog recommendations
- Social media sharing integration

---

## 🤝 Contribution
Contributions are welcome! Please fork this repo and create a pull request.

---

## 📧 Contact
Created by **Nikhil Patel**  
- GitHub: [@nikhilpatel9](https://github.com/nikhilpatel9)  
- LinkedIn: [Your LinkedIn]  
