from fastapi import Request, Response
from projeto.app.database.connection import SessionLocal
from projeto.app.models.idempotencia import Idempotencia
from projeto.app.auth.dependencies import get_current_user
from fastapi.responses import JSONResponse
import json

async def idempotency_middleware(request: Request, call_next):
    if request.method not in ["POST", "PATCH"]:
        return await call_next(request)
    
    idempotency_key = request.headers.get("Idempotency-Key")
    if not idempotency_key:
        return await call_next(request)
    
    # We need a user to tie the idempotency key to
    # This is a bit tricky in a middleware because we don't have easy access to the user yet
    # unless we decode the token here.
    
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
         return await call_next(request)
    
    token = auth_header.split(" ")[1]
    from projeto.app.auth.jwt_handler import decode_access_token
    payload = decode_access_token(token)
    if not payload:
         return await call_next(request)
    
    email = payload.get("sub")
    db = SessionLocal()
    from projeto.app.models.usuario import Usuario
    user = db.query(Usuario).filter(Usuario.email == email).first()
    if not user:
        db.close()
        return await call_next(request)

    # Check for existing key
    existing_record = db.query(Idempotencia).filter(
        Idempotencia.chave == idempotency_key,
        Idempotencia.usuario_id == user.id
    ).first()
    
    if existing_record:
        db.close()
        return Response(
            content=existing_record.corpo_resposta,
            status_code=existing_record.status_code,
            media_type="application/json"
        )
    
    response = await call_next(request)
    
    # If the response is successful, save it
    if response.status_code < 400:
        # We need to read the body to save it, but we also need to return it
        # This is complex in FastAPI/Starlette middlewares.
        # For simplicity in this example, we might only save for specific routes if we had more context.
        pass

    db.close()
    return response
