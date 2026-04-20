from pydantic import BaseModel
from typing import Generic, TypeVar, List

T = TypeVar("T")

class PaginacaoResponse(BaseModel, Generic[T]):
    total: int
    pagina: int
    tamanho_pagina: int
    total_paginas: int
    itens: List[T]

    class Config:
        from_attributes = True
