from langchain_core.tools import tool
from sqlalchemy.orm import Session
from typing import Optional
import json

_db_session = None

def set_db_session(db: Session):
    global _db_session
    _db_session = db

@tool
def log_interaction(
    hcp_name: str,
    interaction_type: str,
    date: str,
    products_discussed: str,
    notes: str,
    hcp_specialty: Optional[str] = None,
    follow_up_required: Optional[str] = "No",
    follow_up_notes: Optional[str] = None,
    sentiment: Optional[str] = "Neutral",
    summary: Optional[str] = None
) -> str:
    """
    Log a new interaction with a Healthcare Professional (HCP).
    Use this when the user wants to record a new meeting, call, or visit with a doctor.
    """
    from models import Interaction
    
    if _db_session is None:
        return "Error: Database not connected"
    
    try:
        interaction = Interaction(
            hcp_name=hcp_name,
            hcp_specialty=hcp_specialty,
            interaction_type=interaction_type,
            date=date,
            products_discussed=products_discussed,
            notes=notes,
            follow_up_required=follow_up_required,
            follow_up_notes=follow_up_notes,
            sentiment=sentiment,
            summary=summary
        )
        _db_session.add(interaction)
        _db_session.commit()
        _db_session.refresh(interaction)
        
        return json.dumps({
            "success": True,
            "message": f"Interaction with {hcp_name} logged successfully!",
            "interaction_id": interaction.id
        })
    except Exception as e:
        _db_session.rollback()
        return json.dumps({"success": False, "error": str(e)})


@tool
def edit_interaction(
    interaction_id: int,
    hcp_name: Optional[str] = None,
    interaction_type: Optional[str] = None,
    date: Optional[str] = None,
    products_discussed: Optional[str] = None,
    notes: Optional[str] = None,
    follow_up_required: Optional[str] = None,
    follow_up_notes: Optional[str] = None,
    sentiment: Optional[str] = None,
    summary: Optional[str] = None
) -> str:
    """
    Edit/update an existing interaction record.
    Use this when the user wants to modify or correct a previously logged interaction.
    """
    from models import Interaction
    
    if _db_session is None:
        return "Error: Database not connected"
    
    try:
        interaction = _db_session.query(Interaction).filter(
            Interaction.id == interaction_id
        ).first()
        
        if not interaction:
            return json.dumps({
                "success": False, 
                "error": f"No interaction found with ID {interaction_id}"
            })
        
        update_fields = {
            "hcp_name": hcp_name,
            "interaction_type": interaction_type,
            "date": date,
            "products_discussed": products_discussed,
            "notes": notes,
            "follow_up_required": follow_up_required,
            "follow_up_notes": follow_up_notes,
            "sentiment": sentiment,
            "summary": summary
        }
        
        for field, value in update_fields.items():
            if value is not None:
                setattr(interaction, field, value)
        
        _db_session.commit()
        
        return json.dumps({
            "success": True,
            "message": f"Interaction #{interaction_id} updated successfully!"
        })
    except Exception as e:
        _db_session.rollback()
        return json.dumps({"success": False, "error": str(e)})


@tool
def search_hcp_interactions(hcp_name: str) -> str:
    """
    Search and retrieve all past interactions with a specific HCP (doctor).
    Use this when the user asks about history with a particular doctor.
    """
    from models import Interaction
    
    if _db_session is None:
        return "Error: Database not connected"
    
    try:
        interactions = _db_session.query(Interaction).filter(
            Interaction.hcp_name.ilike(f"%{hcp_name}%")
        ).order_by(Interaction.created_at.desc()).limit(10).all()
        
        if not interactions:
            return json.dumps({
                "success": True,
                "message": f"No interactions found for {hcp_name}",
                "interactions": []
            })
        
        result = []
        for i in interactions:
            result.append({
                "id": i.id,
                "hcp_name": i.hcp_name,
                "type": i.interaction_type,
                "date": i.date,
                "products": i.products_discussed,
                "sentiment": i.sentiment,
                "summary": i.summary or i.notes[:100] if i.notes else ""
            })
        
        return json.dumps({
            "success": True,
            "count": len(result),
            "interactions": result
        })
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)})


@tool
def get_follow_up_tasks() -> str:
    """
    Retrieve all interactions that require follow-up action.
    Use this when the user asks what tasks or follow-ups are pending.
    """
    from models import Interaction
    
    if _db_session is None:
        return "Error: Database not connected"
    
    try:
        follow_ups = _db_session.query(Interaction).filter(
            Interaction.follow_up_required == "Yes"
        ).order_by(Interaction.date.desc()).all()
        
        if not follow_ups:
            return json.dumps({
                "success": True,
                "message": "No pending follow-ups!",
                "tasks": []
            })
        
        tasks = []
        for i in follow_ups:
            tasks.append({
                "id": i.id,
                "hcp_name": i.hcp_name,
                "date": i.date,
                "follow_up_notes": i.follow_up_notes,
                "interaction_type": i.interaction_type
            })
        
        return json.dumps({
            "success": True,
            "count": len(tasks),
            "tasks": tasks
        })
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)})


@tool
def generate_interaction_summary(raw_notes: str, hcp_name: str) -> str:
    """
    Generate a professional AI summary from raw interaction notes.
    Use this when the user wants to convert messy notes into a clean summary.
    """
    return json.dumps({
        "success": True,
        "instruction": f"""
        Please analyze these interaction notes with Dr. {hcp_name} and provide:
        1. A clean 2-3 sentence professional summary
        2. Products/medicines mentioned (comma separated)
        3. Overall sentiment (Positive/Negative/Neutral)
        4. Whether follow-up is required (Yes/No) and why
        
        Raw Notes: {raw_notes}
        
        Respond in JSON format with keys: summary, products, sentiment, follow_up_required, follow_up_reason
        """
    })


ALL_TOOLS = [
    log_interaction,
    edit_interaction,
    search_hcp_interactions,
    get_follow_up_tasks,
    generate_interaction_summary
]