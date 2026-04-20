from fastapi import APIRouter, Depends, status, Header
from sqlalchemy.orm import Session
from typing import List, Optional
from projeto.app.database.connection import get_db
from projeto.app.auth.dependencies import get_current_user, get_admin_user
from projeto.app.models.usuario import Usuario
from projeto.app.schemas.pedido_schema import PedidoResponse, PedidoStatusUpdate
from projeto.app.services.pedido_service import (
    listar_pedidos, buscar_pedido_por_id, criar_pedido, atualizar_status_pedido
)

router = APIRouter(prefix="/pedidos", tags=["pedidos"])

@router.get("", response_model=List[PedidoResponse])
def get_pedidos(current_user: Usuario = Depends(get_current_user), db: Session = Depends(get_db)):
    return listar_pedidos(db, current_user.id)

@router.get("/{id}", response_model=PedidoResponse)
def get_pedido(id: int, current_user: Usuario = Depends(get_current_user), db: Session = Depends(get_db)):
    return buscar_pedido_por_id(db, id, current_user.id)

@router.post("", response_model=PedidoResponse, status_code=status.HTTP_201_CREATED)
def create_order(
    current_user: Usuario = Depends(get_current_user), 
    db: Session = Depends(get_db),
    idempotency_key: Optional[str] = Header(None)
):
    return criar_pedido(db, current_user.id)

@router.patch("/{id}/status", response_model=PedidoResponse)
def update_order_status(id: int, status_update: PedidoStatusUpdate, admin: Usuario = Depends(get_admin_user), db: Session = Depends(get_db)):
    return atualizar_status_pedido(db, id, status_update)
