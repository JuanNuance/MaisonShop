from pydantic import BaseModel
from typing import List
from projeto.app.schemas.produto_schema import ProdutoResponse

class ItemCarrinhoBase(BaseModel):
    produto_id: int
    quantidade: int = 1

class ItemCarrinhoCreate(ItemCarrinhoBase):
    pass

class ItemCarrinhoUpdate(BaseModel):
    quantidade: int

class ItemCarrinhoResponse(BaseModel):
    id: int
    produto: ProdutoResponse
    quantidade: int

    class Config:
        from_attributes = True

class CarrinhoResponse(BaseModel):
    id: int
    usuario_id: int
    itens: List[ItemCarrinhoResponse]

    class Config:
        from_attributes = True
