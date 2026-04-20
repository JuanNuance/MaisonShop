from sqlalchemy.orm import Session
from projeto.app.models.pedido import Pedido
from projeto.app.models.item_pedido import ItemPedido
from projeto.app.models.carrinho import Carrinho
from projeto.app.models.item_carrinho import ItemCarrinho
from projeto.app.models.produto import Produto
from projeto.app.schemas.pedido_schema import PedidoStatusUpdate
from fastapi import HTTPException
from typing import List

def listar_pedidos(db: Session, usuario_id: int):
    return db.query(Pedido).filter(Pedido.usuario_id == usuario_id).all()

def buscar_pedido_por_id(db: Session, pedido_id: int, usuario_id: int):
    pedido = db.query(Pedido).filter(Pedido.id == pedido_id, Pedido.usuario_id == usuario_id).first()
    if not pedido:
        raise HTTPException(status_code=404, detail="Order not found")
    return pedido

def criar_pedido(db: Session, usuario_id: int):
    carrinho = db.query(Carrinho).filter(Carrinho.usuario_id == usuario_id).first()
    if not carrinho or not carrinho.itens:
        raise HTTPException(status_code=400, detail="Cart is empty")
    
    total = 0
    itens_pedido_data = []
    
    for item in carrinho.itens:
        produto = db.query(Produto).filter(Produto.id == item.produto_id).first()
        if not produto or produto.estoque < item.quantidade:
            raise HTTPException(status_code=400, detail=f"Insufficient stock for product {produto.nome if produto else item.produto_id}")
        
        preco_efetivo = produto.preco_promocional if produto.preco_promocional is not None else produto.preco
        total += preco_efetivo * item.quantidade
        itens_pedido_data.append({
            "produto_id": item.produto_id,
            "quantidade": item.quantidade,
            "preco_unitario": preco_efetivo
        })
        
        # Decrement stock
        produto.estoque -= item.quantidade
    
    db_pedido = Pedido(usuario_id=usuario_id, total=total, status="pendente")
    db.add(db_pedido)
    db.flush() # Get ID before commit
    
    for item_data in itens_pedido_data:
        db_item = ItemPedido(pedido_id=db_pedido.id, **item_data)
        db.add(db_item)
    
    # Clear cart
    db.query(ItemCarrinho).filter(ItemCarrinho.carrinho_id == carrinho.id).delete()
    
    db.commit()
    db.refresh(db_pedido)
    return db_pedido

def atualizar_status_pedido(db: Session, pedido_id: int, status_update: PedidoStatusUpdate):
    pedido = db.query(Pedido).filter(Pedido.id == pedido_id).first()
    if not pedido:
        raise HTTPException(status_code=404, detail="Order not found")
    
    pedido.status = status_update.status
    db.commit()
    db.refresh(pedido)
    return pedido
