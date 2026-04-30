# 🏥 AI-First CRM HCP Module

A pharmaceutical CRM system for Field Sales Representatives to log and manage Healthcare Professional (HCP) interactions using AI.

## ✨ Features
- Log HCP interactions via Structured Form OR AI Chat
- LangGraph agent with 5 specialized tools
- AI-powered interaction summarization
- Full interaction history

## 🛠️ Tech Stack
- **Frontend**: React + Redux (Vite)
- **Backend**: Python FastAPI
- **AI**: LangGraph + Groq (llama-3.3-70b-versatile)
- **Database**: PostgreSQL

## 🚀 How to Run

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Open: http://localhost:5173

## 🤖 LangGraph Tools
1. **log_interaction** - Saves new HCP interactions to DB
2. **edit_interaction** - Updates existing interaction records
3. **search_hcp_interactions** - Finds all visits with a specific doctor
4. **get_follow_up_tasks** - Lists all pending follow-up actions
5. **generate_interaction_summary** - AI-summarizes raw notes