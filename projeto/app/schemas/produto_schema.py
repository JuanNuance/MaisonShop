from pydantic import BaseModel
from typing import Optional

class ProdutoBase(BaseModel):
    nome: str
    descricao: Optional[str] = None
    preco: float
    estoque: int = 0
    categoria: Optional[str] = None
    imagem_url: Optional[str] = None
    preco_promocional: Optional[float] = None

class ProdutoCreate(ProdutoBase):
    pass

class ProdutoUpdate(ProdutoBase):
    pass

class ProdutoPatch(BaseModel):
    nome: Optional[str] = None
    descricao: Optional[str] = None
    preco: Optional[float] = None
    estoque: Optional[int] = None
    categoria: Optional[str] = None
    imagem_url: Optional[str] = None
    preco_promocional: Optional[float] = None

class ProdutoResponse(ProdutoBase):
    id: int

    class Config:
        from_attributes = True
