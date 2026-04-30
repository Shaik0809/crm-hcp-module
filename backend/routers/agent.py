from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from schemas import ChatMessage
from agent.graph import create_agent
from langchain_core.messages import HumanMessage

router = APIRouter(prefix="/api/agent", tags=["agent"])

@router.post("/chat")
async def chat_with_agent(data: ChatMessage, db: Session = Depends(get_db)):
    try:
        agent = create_agent(db_session=db)
        
        messages = []
        for msg in data.conversation_history:
            messages.append(HumanMessage(content=msg["content"]))
        
        messages.append(HumanMessage(content=data.message))
        
        result = agent.invoke({"messages": messages})
        
        last_message = result["messages"][-1]
        response_text = last_message.content if hasattr(last_message, 'content') else str(last_message)
        
        return {
            "response": response_text,
            "success": True
        }
    except Exception as e:
        return {"response": f"Error: {str(e)}", "success": False}