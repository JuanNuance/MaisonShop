from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from projeto.app.database.connection import get_db
from projeto.app.auth.dependencies import get_current_user
from projeto.app.models.usuario import Usuario
from projeto.app.schemas.usuario_schema import UsuarioResponse, UsuarioUpdate
from projeto.app.services.usuario_service import atualizar_usuario, deletar_usuario

router = APIRouter(prefix="/usuarios", tags=["usuarios"])

@router.get("/me", response_model=UsuarioResponse)
def get_me(current_user: Usuario = Depends(get_current_user)):
    return current_user

@router.put("/me", response_model=UsuarioResponse)
def update_me(usuario_update: UsuarioUpdate, current_user: Usuario = Depends(get_current_user), db: Session = Depends(get_db)):
    return atualizar_usuario(db, current_user.id, usuario_update)

@router.patch("/me", response_model=UsuarioResponse)
def patch_me(usuario_update: UsuarioUpdate, current_user: Usuario = Depends(get_current_user), db: Session = Depends(get_db)):
    return atualizar_usuario(db, current_user.id, usuario_update)

@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
def delete_me(current_user: Usuario = Depends(get_current_user), db: Session = Depends(get_db)):
    deletar_usuario(db, current_user.id)
    return None
