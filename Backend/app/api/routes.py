from fastapi import APIRouter
from app.models.schemas import QueryRequest, QueryResponse
from app.services.logic import process_query

router = APIRouter(prefix="/api")

@router.post("/ask", response_model=QueryResponse)
def ask_question(data: QueryRequest):
    answer = process_query(data.question)
    return {"answer": answer}
