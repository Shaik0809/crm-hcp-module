from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import interactions, agent
import models

Base.metadata.create_all(bind=engine)

app = FastAPI(title="CRM HCP Module API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(interactions.router)
app.include_router(agent.router)

@app.get("/")
def root():
    return {"message": "CRM HCP Module API is running!"}