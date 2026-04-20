from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from projeto.app.schemas.produto_schema import ProdutoResponse

class ItemPedidoResponse(BaseModel):
    id: int
    produto_id: int
    quantidade: int
    preco_unitario: float
    produto: Optional[ProdutoResponse] = None

    class Config:
        from_attributes = True

class PedidoResponse(BaseModel):
    id: int
    usuario_id: int
    status: str
    total: float
    criado_em: datetime
    itens: List[ItemPedidoResponse]

    class Config:
        from_attributes = True

class PedidoCreate(BaseModel):
    pass # Geralmente o pedido é criado a partir do carrinho, então não precisa de dados extras aqui por enquanto.

class PedidoStatusUpdate(BaseModel):
    status: str
