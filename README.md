# 🏥 AI-First CRM HCP Module

A pharmaceutical CRM system for Field Sales Representatives to log and manage Healthcare Professional (HCP) interactions using AI.

## 🎯 What This App Does

A salesperson (Field Rep) who visits doctors (HCPs) every day can:
- Fill a structured form to log their doctor visits, OR
- Just chat with an AI ("I met Dr. Ahmed today, we discussed Pregabalin...") and the AI logs everything automatically!

## ✨ Features

- 📝 Log HCP interactions via Structured Form
- 🤖 Log interactions by chatting with AI
- 📋 View full interaction history
- ⚠️ Track follow-up tasks
- 💊 Track medicines/products discussed
- 😊 Track sentiment of each meeting

## 🛠️ Tech Stack

| Part | Technology |
|------|-----------|
| Frontend | React + Redux (Vite) |
| Backend | Python FastAPI |
| AI Agent | LangGraph |
| LLM | Groq (llama-3.3-70b-versatile) |
| Database | PostgreSQL |

## 🤖 LangGraph AI Agent

The LangGraph agent acts as an intelligent assistant that:
- Understands natural language from the sales rep
- Decides which tool to use based on the message
- Executes the tool and responds professionally

### 5 AI Tools

1. **log_interaction** — Saves a new HCP interaction to the database. Extracts doctor name, specialty, medicines discussed, sentiment, and follow-up needs from natural language.

2. **edit_interaction** — Updates an existing interaction record by ID. Allows modification of any field.

3. **search_hcp_interactions** — Searches and retrieves all past interactions with a specific doctor by name.

4. **get_follow_up_tasks** — Lists all interactions that have follow-up required, helping reps stay on top of their tasks.
5. ## 🚀 How to Run

### Prerequisites
- Node.js
- Python 3.11+
- PostgreSQL

### 1. Clone the repository
```bash
git clone https://github.com/Shaik0809/crm-hcp-module.git
cd crm-hcp-module
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install fastapi uvicorn sqlalchemy psycopg2-binary python-dotenv langchain-groq langgraph langchain pydantic
```

Create a `.env` file in the backend folder:
Run the backend:
```bash
uvicorn main:app --reload
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Open the app
http://localhost:5173
## 🎥 How to Use

1. **Form Mode** — Fill in doctor name, specialty, medicines, notes and click Save
2. **AI Chat Mode** — Type naturally like:
   - *"I visited Dr. Ahmed today, discussed Pregabalin for neuropathic pain"*
   - *"What are my pending follow-ups?"*
   - *"Search interactions with Dr. Smith"*

## 👨‍💻 Developer

Built by Shaik Mahin

6. **generate_interaction_summary** — Takes raw unformatted notes and generates a clean professional summary with extracted products, sentiment, and follow-up needs.

## 📁 Project Structure
