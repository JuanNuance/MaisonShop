from sqlalchemy.orm import Session
from projeto.app.models.produto import Produto
from projeto.app.schemas.produto_schema import ProdutoCreate, ProdutoUpdate, ProdutoPatch
from projeto.app.utils.pagination import paginate
from fastapi import HTTPException

def listar_produtos(db: Session, pagina: int = 1, tamanho_pagina: int = 10, categoria: str = None):
    query = db.query(Produto)
    if categoria:
        query = query.filter(Produto.categoria == categoria)
    return paginate(query, pagina, tamanho_pagina)

def buscar_produto_por_id(db: Session, produto_id: int):
    produto = db.query(Produto).filter(Produto.id == produto_id).first()
    if not produto:
        raise HTTPException(status_code=404, detail="Product not found")
    return produto

def criar_produto(db: Session, produto: ProdutoCreate):
    db_produto = Produto(**produto.dict())
    db.add(db_produto)
    db.commit()
    db.refresh(db_produto)
    return db_produto

def atualizar_produto_completo(db: Session, produto_id: int, produto: ProdutoUpdate):
    db_produto = buscar_produto_por_id(db, produto_id)
    for key, value in produto.dict().items():
        setattr(db_produto, key, value)
    db.commit()
    db.refresh(db_produto)
    return db_produto

def atualizar_produto_parcial(db: Session, produto_id: int, produto: ProdutoPatch):
    db_produto = buscar_produto_por_id(db, produto_id)
    for key, value in produto.dict(exclude_unset=True).items():
        setattr(db_produto, key, value)
    db.commit()
    db.refresh(db_produto)
    return db_produto

def deletar_produto(db: Session, produto_id: int):
    db_produto = buscar_produto_por_id(db, produto_id)
    db.delete(db_produto)
    db.commit()
    return True
