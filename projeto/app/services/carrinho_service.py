from sqlalchemy.orm import Session
from projeto.app.models.carrinho import Carrinho
from projeto.app.models.item_carrinho import ItemCarrinho
from projeto.app.models.produto import Produto
from projeto.app.schemas.carrinho_schema import ItemCarrinhoCreate, ItemCarrinhoUpdate
from fastapi import HTTPException

def get_or_create_carrinho(db: Session, usuario_id: int):
    carrinho = db.query(Carrinho).filter(Carrinho.usuario_id == usuario_id).first()
    if not carrinho:
        carrinho = Carrinho(usuario_id=usuario_id)
        db.add(carrinho)
        db.commit()
        db.refresh(carrinho)
    return carrinho

def adicionar_item_carrinho(db: Session, usuario_id: int, item: ItemCarrinhoCreate):
    carrinho = get_or_create_carrinho(db, usuario_id)
    produto = db.query(Produto).filter(Produto.id == item.produto_id).first()
    if not produto:
        raise HTTPException(status_code=404, detail="Product not found")
    
    if produto.estoque < item.quantidade:
        raise HTTPException(status_code=400, detail="Insufficient stock")
    
    item_existente = db.query(ItemCarrinho).filter(
        ItemCarrinho.carrinho_id == carrinho.id,
        ItemCarrinho.produto_id == item.produto_id
    ).first()
    
    if item_existente:
        if produto.estoque < item_existente.quantidade + item.quantidade:
             raise HTTPException(status_code=400, detail="Insufficient stock")
        item_existente.quantidade += item.quantidade
    else:
        item_novo = ItemCarrinho(
            carrinho_id=carrinho.id,
            produto_id=item.produto_id,
            quantidade=item.quantidade
        )
        db.add(item_novo)
    
    db.commit()
    return carrinho

def atualizar_quantidade_item(db: Session, usuario_id: int, item_id: int, item_update: ItemCarrinhoUpdate):
    carrinho = get_or_create_carrinho(db, usuario_id)
    item_carrinho = db.query(ItemCarrinho).filter(
        ItemCarrinho.id == item_id,
        ItemCarrinho.carrinho_id == carrinho.id
    ).first()
    
    if not item_carrinho:
        raise HTTPException(status_code=404, detail="Item not found in cart")
    
    produto = db.query(Produto).filter(Produto.id == item_carrinho.produto_id).first()
    if produto.estoque < item_update.quantidade:
        raise HTTPException(status_code=400, detail="Insufficient stock")
    
    item_carrinho.quantidade = item_update.quantidade
    db.commit()
    db.refresh(item_carrinho)
    return item_carrinho

def remover_item_carrinho(db: Session, usuario_id: int, item_id: int):
    carrinho = get_or_create_carrinho(db, usuario_id)
    item_carrinho = db.query(ItemCarrinho).filter(
        ItemCarrinho.id == item_id,
        ItemCarrinho.carrinho_id == carrinho.id
    ).first()
    
    if not item_carrinho:
        raise HTTPException(status_code=404, detail="Item not found in cart")
    
    db.delete(item_carrinho)
    db.commit()
    return True

def limpar_carrinho(db: Session, usuario_id: int):
    carrinho = get_or_create_carrinho(db, usuario_id)
    db.query(ItemCarrinho).filter(ItemCarrinho.carrinho_id == carrinho.id).delete()
    db.commit()
    return True
