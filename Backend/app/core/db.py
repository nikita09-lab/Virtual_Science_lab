import sys
from pymongo import MongoClient
from app.core.config import MONGODB_URI
_client = None
_db = None
def get_database():
    global _client, _db
    if _db is not None:
        return _db
    try:
        _client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
        _db = _client["virtual_science_lab"]
        return _db
    except Exception as exc:
        print(f"ERROR: Failed to connect to MongoDB: {exc}", file=sys.stderr)
        raise