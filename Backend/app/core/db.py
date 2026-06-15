from pymongo import MongoClient
from app.core.config import MONGODB_URI

# Centralized MongoDB connection
# Instantiating the client here ensures a single connection pool is shared 
# across all FastAPI worker threads and service modules.
client = MongoClient(MONGODB_URI)
db = client["virtual_science_lab"]

def get_database():
    return db
