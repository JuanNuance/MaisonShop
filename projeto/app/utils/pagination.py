from sqlalchemy.orm import Query
from typing import TypeVar, Generic, List
from projeto.app.schemas.paginacao_schema import PaginacaoResponse

T = TypeVar("T")

def paginate(query: Query, pagina: int, tamanho_pagina: int) -> dict:
    total = query.count()
    total_paginas = (total + tamanho_pagina - 1) // tamanho_pagina
    offset = (pagina - 1) * tamanho_pagina
    itens = query.offset(offset).limit(tamanho_pagina).all()
    
    return {
        "total": total,
        "pagina": pagina,
        "tamanho_pagina": tamanho_pagina,
        "total_paginas": total_paginas,
        "itens": itens
    }
