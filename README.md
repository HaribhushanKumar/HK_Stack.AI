# Haribhushan Kumar - MERN Stack Portfolio & Admin Dashboard

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

## Production Deployment Guide

### Deployment for Backend (e.g., Render, Heroku)
1. **Host Server Repository:** Upload the `backend/` folder codebase to your Git repository (GitHub/GitLab).
2. **Launch Web Service:** Connect your repository to Render or similar cloud host. Set Environment to `Node`.
3. **Environment Settings:** Configure environment keys matching backend `.env` variables under the Web Service settings.
4. **Deploy Command:**
   - Build Command: `npm install`
   - Start Command: `node index.js`

### Deployment for Frontend (e.g., Vercel, Netlify, Render)
1. **Production Build:** Build the static asset bundle inside `frontend/` folder:
   ```bash
   npm run build
   ```
   This creates a static folder `dist/` containing HTML, CSS, and JS static components.
2. **Update Service Base URL:** Before building, make sure that `frontend/src/services/api.js` points to your production backend URL (e.g., `https://your-backend-service.onrender.com/api`).
3. **Host Static Assets:** Link your frontend codebase to Vercel/Netlify. Set framework preset to `Vite`, Build Command to `npm run build`, and Output Directory to `dist`.
