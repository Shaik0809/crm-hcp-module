from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class InteractionBase(BaseModel):
    hcp_name: str
    hcp_specialty: Optional[str] = None
    interaction_type: Optional[str] = "visit"
    date: Optional[str] = None
    products_discussed: Optional[str] = None
    notes: Optional[str] = None
    follow_up_required: Optional[str] = "No"
    follow_up_notes: Optional[str] = None
    sentiment: Optional[str] = "Neutral"
    summary: Optional[str] = None

class InteractionCreate(InteractionBase):
    pass

class InteractionUpdate(InteractionBase):
    hcp_name: Optional[str] = None

class InteractionResponse(InteractionBase):
    id: int
    created_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class ChatMessage(BaseModel):
    message: str
    conversation_history: Optional[list] = []