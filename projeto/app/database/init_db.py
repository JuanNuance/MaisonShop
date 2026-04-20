from projeto.app.database.connection import engine
from projeto.app.database.base import Base
from projeto.app.models.usuario import Usuario
from projeto.app.models.produto import Produto
from projeto.app.models.carrinho import Carrinho
from projeto.app.models.item_carrinho import ItemCarrinho
from projeto.app.models.pedido import Pedido
from projeto.app.models.item_pedido import ItemPedido
from projeto.app.models.idempotencia import Idempotencia

def init_db():
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init_db()
