from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import timedelta
from app.services.auth_service import authenticate_user, create_access_token, register_user

router = APIRouter(prefix="/api/auth", tags=["auth"])

class LoginRequest(BaseModel):
    email: str
    password: str

class SignupRequest(BaseModel):
    name: str
    email: str
    password: str

@router.post("/login")
def login(request: LoginRequest):
    user = authenticate_user(request.email, request.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=timedelta(minutes=30)
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/signup")
def signup(request: SignupRequest):
    user = register_user(request.name, request.email, request.password)
    if not user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    access_token = create_access_token(
        data={"sub": user.get("email")}, expires_delta=timedelta(minutes=30)
    )
    return {"access_token": access_token, "token_type": "bearer", "message": "Account created successfully"}
