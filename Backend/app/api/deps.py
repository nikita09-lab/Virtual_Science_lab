"""
Shared FastAPI dependency functions.
"""

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

_bearer = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(_bearer),
) -> str:
    """
    Require a valid Bearer token in the Authorization header.

    Returns the token string so downstream handlers can use it to
    identify the caller (e.g. decode a JWT or look up a session).
    Raises 401 if the header is absent or malformed.
    """
    token = credentials.credentials
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return token
