# 🏥 AI-First CRM HCP Module

A pharmaceutical CRM system for Field Sales Representatives to log and manage 
Healthcare Professional (HCP) interactions using AI.

## ✨ Features
- Log HCP interactions via Structured Form OR AI Chat
- LangGraph agent with 5 specialized tools
- AI-powered interaction summarization
- Full interaction history with filtering

## 🛠️ Tech Stack
- **Frontend**: React + Redux (Vite)
- **Backend**: Python FastAPI
- **AI**: LangGraph + Groq (gemma2-9b-it)
- **Database**: PostgreSQL

## 🚀 Setup

### 1. Clone & Database
```bash
git clone https://github.com/YOUR_USERNAME/crm-hcp-module
# Create PostgreSQL database named: crm_hcp
```

### 2. Backend
```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # Add your GROQ_API_KEY and DATABASE_URL
uvicorn main:app --reload
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Open: http://localhost:5173

## 🤖 LangGraph Tools
1. **log_interaction** - Saves new HCP interactions to DB
2. **edit_interaction** - Updates existing interaction records  
3. **search_hcp_interactions** - Finds all visits with a specific doctor
4. **get_follow_up_tasks** - Lists all pending follow-up actions
5. **generate_interaction_summary** - AI-summarizes raw notes

## 📁 Project Structure
- `/frontend` — React UI with Redux state management
- `/backend` — FastAPI server with LangGraph AI agent
- `/backend/agent` — LangGraph graph and tool definitions
