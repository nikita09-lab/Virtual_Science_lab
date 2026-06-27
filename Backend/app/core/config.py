import os
# pyrefly: ignore [missing-import]
from dotenv import load_dotenv

load_dotenv()

APP_NAME = "Virtual Science Lab Backend"
DEBUG = os.getenv("DEBUG", "false").lower() == "true"

# JWT Secret Key for token generation
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-this-in-production")

# Rate limiting (requests per minute). In-memory per-process.
RATE_LIMIT_GENERAL_PER_MINUTE = int(os.getenv("RATE_LIMIT_GENERAL_PER_MINUTE", "100"))
RATE_LIMIT_AI_ASSISTANT_PER_MINUTE = int(os.getenv("RATE_LIMIT_AI_ASSISTANT_PER_MINUTE", "20"))
RATE_LIMIT_COLLAB_PER_MINUTE = int(os.getenv("RATE_LIMIT_COLLAB_PER_MINUTE", "60"))

# MongoDB connection string — set this in Vercel dashboard:
# Settings → Environment Variables → MONGODB_URI
MONGODB_URI = os.getenv("MONGODB_URI", "")

if not MONGODB_URI:
    import sys
    MONGODB_URI = "mongodb://localhost:27017/virtual_science_lab"
    print(
        "WARNING: MONGODB_URI environment variable is not set. "
        "Falling back to local development database: mongodb://localhost:27017/virtual_science_lab",
        file=sys.stderr
    )
