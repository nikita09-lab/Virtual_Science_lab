from app.core.db import get_database
from app.core.security import hash_password
from typing import Optional, Dict, Any

class User:
    """User model wrapper for MongoDB."""
    
    @staticmethod
    def find_one(query: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Find a single user by query."""
        db = get_database()
        return db["users"].find_one(query)
    
    @staticmethod
    def insert_one(user_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Insert a new user."""
        db = get_database()
        result = db["users"].insert_one(user_data)
        if result.inserted_id:
            return db["users"].find_one({"_id": result.inserted_id})
        return None
    
    @staticmethod
    def create_user(name: str, email: str, password: str) -> Optional[Dict[str, Any]]:
        """Create a new user with hashed password."""
        db = get_database()
        
        # Check if user already exists
        if db["users"].find_one({"email": email}):
            return None
        
        user_data = {
            "name": name,
            "email": email,
            "hashed_password": hash_password(password),
            "created_at": db.command("serverStatus")["localTime"] if hasattr(db, "command") else None
        }
        
        result = db["users"].insert_one(user_data)
        if result.inserted_id:
            return db["users"].find_one({"_id": result.inserted_id})
        return None
