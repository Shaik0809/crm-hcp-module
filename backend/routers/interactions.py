from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Interaction
from schemas import InteractionCreate, InteractionUpdate, InteractionResponse
from typing import List

router = APIRouter(prefix="/api/interactions", tags=["interactions"])

@router.post("/", response_model=InteractionResponse)
def create_interaction(data: InteractionCreate, db: Session = Depends(get_db)):
    interaction = Interaction(**data.dict())
    db.add(interaction)
    db.commit()
    db.refresh(interaction)
    return interaction

@router.get("/", response_model=List[InteractionResponse])
def get_all_interactions(db: Session = Depends(get_db)):
    return db.query(Interaction).order_by(Interaction.id.desc()).all()

@router.get("/{interaction_id}", response_model=InteractionResponse)
def get_interaction(interaction_id: int, db: Session = Depends(get_db)):
    interaction = db.query(Interaction).filter(Interaction.id == interaction_id).first()
    if not interaction:
        raise HTTPException(status_code=404, detail="Interaction not found")
    return interaction

@router.put("/{interaction_id}", response_model=InteractionResponse)
def update_interaction(
    interaction_id: int,
    data: InteractionUpdate,
    db: Session = Depends(get_db)
):
    interaction = db.query(Interaction).filter(Interaction.id == interaction_id).first()
    if not interaction:
        raise HTTPException(status_code=404, detail="Not found")
    
    for field, value in data.dict(exclude_unset=True).items():
        setattr(interaction, field, value)
    
    db.commit()
    db.refresh(interaction)
    return interaction

@router.delete("/{interaction_id}")
def delete_interaction(interaction_id: int, db: Session = Depends(get_db)):
    interaction = db.query(Interaction).filter(Interaction.id == interaction_id).first()
    if not interaction:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(interaction)
    db.commit()
    return {"message": "Deleted successfully"}