# Haribhushan Kumar - MERN Stack Portfolio & Admin Dashboard

**Live Demo:** [https://hk-stack-ai.onrender.com](https://hk-stack-ai.onrender.com)

A complete, production-ready, fully responsive personal portfolio and messages management admin portal engineered using the MERN Stack (**MongoDB, Express.js, React.js, Node.js**).

## Features

- **Modern Glassmorphism Design:** HSL-based dark/light mode toggle with smooth transitions.
- **AI-ML Showcase:** High-end section displaying RAG pipelines, OpenAI, and full-stack projects.
- **Dynamic Scroll Animations:** Implemented via `framer-motion` and custom lightweight Canvas particle network.
- **Functional Contact Form:** Validated inputs that concurrently save contact entries in MongoDB and trigger email alerts via Nodemailer.
- **Admin Dashboard:** Secure JWT dashboard where admins can view paginated submissions, search text fields, delete messages, and export records to CSV.

---

## Folder Structure

```text
portfolio/
├── backend/
│   ├── config/          # DB Configuration files
│   ├── controllers/     # Route controllers logic (Contact, Admin login/messages)
│   ├── middleware/      # JWT Authorization filters
│   ├── models/          # MongoDB Schemas (Contact schema)
│   ├── routes/          # API REST route endpoints
│   ├── .env.example     # Environment variables blueprint
│   ├── index.js         # Backend server entrance
│   └── package.json
└── frontend/
    ├── src/
    │   ├── assets/      # Image assets (avatar, documents)
    │   ├── components/  # Layout elements (Navbar, Footer, SkillCard, Particles Canvas)
    │   ├── context/     # Global state context (Theme, Toasts)
    │   ├── pages/       # Sub-page views (Home, Admin Dashboard)
    │   ├── services/    # Axios client requests API hooks
    │   ├── index.css    # Core design values, animations, scrollbars
    │   ├── main.jsx
    │   └── App.jsx
    ├── package.json
    └── vite.config.js
```

---

## Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.0.0 or higher recommended)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) installed and running locally on port `27017` (or MongoDB Atlas Cloud URI).

### Step 1: Clone or Open the Directory
Navigate to the root folder:
```bash
cd c:\Users\ranja\Desktop\portfolio
```

### Step 2: Backend Configuration
1. Open the backend folder:
   ```bash
   cd backend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Initialize the environment configuration. Copy `.env.example` to a new `.env` file:
   ```bash
   copy .env.example .env
   ```
4. Update the `.env` settings:
   - `PORT`: Set backend server port (default: `5000`).
   - `MONGODB_URI`: Local MongoDB path or Atlas Cloud Connection URI.
   - `JWT_SECRET`: Random secure string used to sign auth tokens.
   - `ADMIN_USERNAME` & `ADMIN_PASSWORD`: Auth details for the dashboard login.
   - **Nodemailer Setup:**
     - `EMAIL_USER`: Your Gmail address (e.g., `your_email@gmail.com`).
     - `EMAIL_PASS`: Your Gmail [App Password](https://support.google.com/accounts/answer/185833). (Do NOT write your raw email password. Generate a 16-character App Password).
     - `RECEIVER_EMAIL`: Address where you want to receive submission notification alerts (e.g., `haribhushan7852@gmail.com`).

### Step 3: Frontend Configuration
1. Open the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```

---

## Running the Application Locally

### Running the Backend
From the `backend/` directory, run:
```bash
node index.js
```
For automatic restart on file edits, you can install and run `nodemon`:
```bash
npm install -g nodemon
nodemon index.js
```

### Running the Frontend
From the `frontend/` directory, run:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Production Deployment Guide (Unified Docker Setup)

This repository is containerized to deploy the entire MERN stack (both React Frontend and Node.js Backend) on a **single Web Service** for a single live deployment URL.

### One-Click Deployment to Render

1. Go to **[dashboard.render.com](https://dashboard.render.com/)** and log in.
2. Click **New** -> **Web Service**.
3. Connect this GitHub repository: `https://github.com/HaribhushanKumar/HK_Stack.AI.git`.
4. In the settings:
   - **Environment/Runtime:** Select **Docker** (Render will automatically use the root [Dockerfile](file:///c:/Users/ranja/Desktop/portfolio/Dockerfile)).
   - **Instance Type:** Select **Free**.
5. Click **Advanced** and add the following **Environment Variables**:
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = `mongodb+srv://Ranjan7852:Ranjan123@cluster0.ukchxhq.mongodb.net/portfolio_db?retryWrites=true&w=majority&appName=Cluster0`
   - `JWT_SECRET` = `supersecretjwtkeyforauthtokens`
   - `ADMIN_USERNAME` = `haribhushan7852@gmail.com`
   - `ADMIN_PASSWORD` = `Ranjan@123`
6. Click **Deploy Web Service**.

Once built, Render serves your entire web application at your live URL: [https://hk-stack-ai.onrender.com](https://hk-stack-ai.onrender.com)
