from sqlalchemy.orm import Session
from projeto.app.models.usuario import Usuario
from projeto.app.schemas.usuario_schema import UsuarioCreate, UsuarioUpdate
from projeto.app.auth.security import get_password_hash
from fastapi import HTTPException, status

def get_usuario_by_email(db: Session, email: str):
    return db.query(Usuario).filter(Usuario.email == email).first()

def get_usuario_by_id(db: Session, usuario_id: int):
    return db.query(Usuario).filter(Usuario.id == usuario_id).first()

def criar_usuario(db: Session, usuario: UsuarioCreate):
    db_user = get_usuario_by_email(db, email=usuario.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(usuario.senha)
    db_user = Usuario(
        nome=usuario.nome,
        email=usuario.email,
        senha_hash=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def atualizar_usuario(db: Session, usuario_id: int, usuario: UsuarioUpdate):
    db_user = get_usuario_by_id(db, usuario_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    update_data = usuario.model_dump(exclude_unset=True)
    if "senha" in update_data:
        update_data["senha_hash"] = get_password_hash(update_data.pop("senha"))
    
    for key, value in update_data.items():
        setattr(db_user, key, value)
    
    db.commit()
    db.refresh(db_user)
    return db_user

def deletar_usuario(db: Session, usuario_id: int):
    db_user = get_usuario_by_id(db, usuario_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()
    return True
