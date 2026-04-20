from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from projeto.app.database.connection import get_db
from projeto.app.auth.dependencies import get_current_user
from projeto.app.models.usuario import Usuario
from projeto.app.schemas.carrinho_schema import CarrinhoResponse, ItemCarrinhoCreate, ItemCarrinhoUpdate, ItemCarrinhoResponse
from projeto.app.services.carrinho_service import (
    get_or_create_carrinho, adicionar_item_carrinho, 
    atualizar_quantidade_item, remover_item_carrinho
)

router = APIRouter(prefix="/carrinho", tags=["carrinho"])

@router.get("", response_model=CarrinhoResponse)
def get_carrinho(current_user: Usuario = Depends(get_current_user), db: Session = Depends(get_db)):
    return get_or_create_carrinho(db, current_user.id)

@router.post("/itens", response_model=CarrinhoResponse)
def add_item(item: ItemCarrinhoCreate, current_user: Usuario = Depends(get_current_user), db: Session = Depends(get_db)):
    return adicionar_item_carrinho(db, current_user.id, item)

@router.patch("/itens/{id}", response_model=ItemCarrinhoResponse)
def update_item_qty(id: int, item_update: ItemCarrinhoUpdate, current_user: Usuario = Depends(get_current_user), db: Session = Depends(get_db)):
    return atualizar_quantidade_item(db, current_user.id, id, item_update)

@router.delete("/itens/{id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_item(id: int, current_user: Usuario = Depends(get_current_user), db: Session = Depends(get_db)):
    remover_item_carrinho(db, current_user.id, id)
    return None
