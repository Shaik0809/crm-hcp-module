from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from database import Base
import enum

class InteractionType(str, enum.Enum):
    visit = "visit"
    call = "call"
    email = "email"
    conference = "conference"

class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)
    hcp_name = Column(String(200), nullable=False)
    hcp_specialty = Column(String(100))
    interaction_type = Column(String(50))
    date = Column(String(50))
    products_discussed = Column(Text)
    notes = Column(Text)
    follow_up_required = Column(String(10), default="No")
    follow_up_notes = Column(Text)
    sentiment = Column(String(50))
    summary = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())