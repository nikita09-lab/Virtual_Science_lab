import time
from fastapi import APIRouter
from app.middleware.rate_limit import limiter
from app.core import config

router = APIRouter(prefix="/api/system", tags=["System"])

app_start_time = time.time()

@router.get("/status")
def system_status():
    uptime_seconds = int(time.time() - app_start_time)
    return {
        "status": "ok",
        "uptime_seconds": uptime_seconds,
        "total_requests_served": limiter.total_requests_served,
        "rate_limited_requests": limiter.rate_limited_requests,
        "rate_limiter": {
            "type": "in_memory_fixed_window_per_process",
            "config": {
                "general_per_minute": config.RATE_LIMIT_GENERAL_PER_MINUTE,
                "ai_assistant_per_minute": config.RATE_LIMIT_AI_ASSISTANT_PER_MINUTE,
                "collaboration_per_minute": config.RATE_LIMIT_COLLAB_PER_MINUTE,
            },
        },
    }
