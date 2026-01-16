from fastapi import FastAPI
from app.api.routes import router

app = FastAPI(
    title="AI Backend API",
    description="FastAPI backend for AI-powered application",
    version="1.0.0"
)

app.include_router(router)

@app.get("/")
def root():
    return {"status": "Backend is running 🚀"}
