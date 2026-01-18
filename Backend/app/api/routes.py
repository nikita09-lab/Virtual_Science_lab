from fastapi import APIRouter
from app.models.schemas import QueryRequest, QueryResponse
from app.services.logic import process_query

router = APIRouter(prefix="/api")

@router.post("/ask", response_model=QueryResponse)
def ask_question(data: QueryRequest):
    answer = process_query(data.question)
    return {"answer": answer}
@router.get("/biology/experiments")
def get_biology_experiments():
    return {
        "experiments": [
            {
                "id": 1,
                "title": "Human Heart Anatomy",
                "description": "Study chambers, valves, and blood flow in the human heart"
            },
            {
                "id": 2,
                "title": "Plant Cell Structure",
                "description": "Explore nucleus, chloroplast, and cell wall in 3D"
            },
            {
                "id": 3,
                "title": "Respiratory System",
                "description": "Understand lungs, trachea, and breathing mechanism"
            }
        ]
    }
