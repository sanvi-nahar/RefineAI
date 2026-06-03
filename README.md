# Refine AI – Project Requirement Refinement Platform

Refine AI is an AI-powered multi-agent system designed to collaboratively refine project requirements. It uses specialized AI agents (Project Manager, Developer, Designer, Market Analyst, and Judge) to iteratively improve project specifications, identify risks, and produce a refined product description.

## 🚀 Features

- 🤖 **Multi-Agent Collaboration** – Agents like Project Manager, Developer, Designer, Market Analyst, and Judge collaborate to refine requirements.
- 📝 **Requirement Refinement Rounds** – Iterative refinement rounds with detailed feedback and change logs.
- 📊 **Judge Oversight** – A judge agent ensures balanced decisions and resolves conflicts among other agents.
- 🎨 **Interactive UI** – Built with React + TailwindCSS for a modern, responsive design.
- 📂 **Database Support** – Requirements, feedback, and refined results are stored in MongoDB.
- 📹 **Demo Video Support** – Ability to embed or upload demo videos directly.

## 🛠️ Tech Stack

- **Frontend:** React, TailwindCSS, Lucide Icons  
- **Backend:** Node.js, Express  
- **Database:** MongoDB (Mongoose ODM)  
- **Authentication:** Google OAuth (Passport.js)  
- **Other Tools:** Vite, REST API

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/refine-ai.git
cd refine-ai

# Install dependencies (frontend)
npm install

# Install dependencies (backend)
cd backend
npm install

# Configure Environment Variables
# Create a `.env` file in the `backend` directory and add the following:
# PORT=3000
# MONGO_DB_URL=mongodb://localhost:27017/hackwave
# GROQ_API_KEY=your_groq_api_key_here
# GROQ_MODEL=llama-3.3-70b-versatile
# GOOGLE_CLIENT_ID=your_google_client_id_here
# GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Open two terminals and run the following commands:
# Frontend
npm run dev

# Backend
cd backend && npm start

