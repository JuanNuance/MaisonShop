from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session
from typing import Optional
from projeto.app.database.connection import get_db
from projeto.app.auth.dependencies import get_admin_user
from projeto.app.schemas.produto_schema import ProdutoResponse, ProdutoCreate, ProdutoUpdate, ProdutoPatch
from projeto.app.schemas.paginacao_schema import PaginacaoResponse
from projeto.app.services.produto_service import (
    listar_produtos, buscar_produto_por_id, criar_produto, 
    atualizar_produto_completo, atualizar_produto_parcial, deletar_produto
)

router = APIRouter(prefix="/produtos", tags=["produtos"])

@router.get("", response_model=PaginacaoResponse[ProdutoResponse])
def get_produtos(
    pagina: int = Query(1, ge=1),
    tamanho_pagina: int = Query(10, ge=1, le=100),
    categoria: Optional[str] = None,
    db: Session = Depends(get_db)
):
    return listar_produtos(db, pagina, tamanho_pagina, categoria)

@router.get("/{id}", response_model=ProdutoResponse)
def get_produto(id: int, db: Session = Depends(get_db)):
    return buscar_produto_por_id(db, id)

@router.post("", response_model=ProdutoResponse, status_code=status.HTTP_201_CREATED)
def create_produto(produto: ProdutoCreate, admin: Session = Depends(get_admin_user), db: Session = Depends(get_db)):
    return criar_produto(db, produto)

@router.put("/{id}", response_model=ProdutoResponse)
def update_produto(id: int, produto: ProdutoUpdate, admin: Session = Depends(get_admin_user), db: Session = Depends(get_db)):
    return atualizar_produto_completo(db, id, produto)

@router.patch("/{id}", response_model=ProdutoResponse)
def patch_produto(id: int, produto: ProdutoPatch, admin: Session = Depends(get_admin_user), db: Session = Depends(get_db)):
    return atualizar_produto_parcial(db, id, produto)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_produto(id: int, admin: Session = Depends(get_admin_user), db: Session = Depends(get_db)):
    deletar_produto(db, id)
    return None
