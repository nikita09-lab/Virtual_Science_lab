import os
import time
import logging
from typing import Callable, Dict, Optional, Tuple

from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse, Response

from app.core import config

logger = logging.getLogger(__name__)


class _FixedWindow:
    __slots__ = ("window_start", "count")

    def __init__(self, now: float):
        self.window_start = now
        self.count = 0


class InMemoryRateLimiter:
    """Simple in-memory fixed-window rate limiter.

    Notes:
    - Per-process only (not shared across multiple workers).
    - Good for development / single-instance deployments.
    """

    def __init__(self):
        self._store: Dict[Tuple[str, str], _FixedWindow] = {}
        self.total_requests_served: int = 0
        self.rate_limited_requests: int = 0

    @staticmethod
    def _client_id(request: Request) -> str:
        # Prefer X-Forwarded-For when behind a proxy.
        xff = request.headers.get("x-forwarded-for") or request.headers.get("X-Forwarded-For")
        if xff:
            # Could be a comma-separated list; first is the original client.
            return xff.split(",")[0].strip()
        if request.client:
            return request.client.host
        return "unknown"

    @staticmethod
    def _group_for_path(path: str) -> str:
        # Keep this intentionally simple and robust.
        if path.startswith("/api/assistant/"):
            return "ai_assistant"
        if path.startswith("/api/collaboration/") or path.startswith("/api/collaboration"):
            return "collaboration"
        return "general"

    def check(self, request: Request, limits_per_minute: int, now: Optional[float] = None) -> Tuple[bool, int, int, str]:
        """Return: (allowed, remaining, limit, group)."""
        if limits_per_minute <= 0:
            return True, 0, 0, self._group_for_path(request.url.path)

        window_seconds = 60
        current = now if now is not None else time.time()

        group = self._group_for_path(request.url.path)
        client_id = self._client_id(request)
        key = (client_id, group)

        entry = self._store.get(key)
        if entry is None:
            entry = _FixedWindow(current)
            self._store[key] = entry

        # Reset window
        if current - entry.window_start >= window_seconds:
            entry.window_start = current
            entry.count = 0

        entry.count += 1
        allowed = entry.count <= limits_per_minute

        remaining = max(0, limits_per_minute - entry.count)
        return allowed, remaining, limits_per_minute, group


limiter = InMemoryRateLimiter()


class RateLimitMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: Callable[[Request], Response]):
        # Health endpoint should remain accessible.
        if request.url.path in {"/api/system/status"}:
            return await call_next(request)

        group = limiter._group_for_path(request.url.path)
        if group == "ai_assistant":
            limit = config.RATE_LIMIT_AI_ASSISTANT_PER_MINUTE
        elif group == "collaboration":
            limit = config.RATE_LIMIT_COLLAB_PER_MINUTE
        else:
            limit = config.RATE_LIMIT_GENERAL_PER_MINUTE

        allowed, remaining, _, _ = limiter.check(request, limit)

        client_id = limiter._client_id(request)
        ts = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        endpoint = request.url.path

        # Lightweight in-memory counters
        if allowed:
            limiter.total_requests_served += 1
            logger.info(
                "request ok client=%s endpoint=%s ts=%s remaining=%s group=%s",
                client_id,
                endpoint,
                ts,
                remaining,
                group,
            )
            return await call_next(request)

        limiter.rate_limited_requests += 1
        logger.warning(
            "request rate_limited client=%s endpoint=%s ts=%s limit=%s group=%s",
            client_id,
            endpoint,
            ts,
            limit,
            group,
        )

        return JSONResponse(
            status_code=429,
            content={"success": False, "message": "Too many requests. Please try again later."},
        )

