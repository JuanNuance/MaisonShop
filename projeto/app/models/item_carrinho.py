from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from projeto.app.database.base import Base

class ItemCarrinho(Base):
    __tablename__ = "itens_carrinho"

    id = Column(Integer, primary_key=True, index=True)
    carrinho_id = Column(Integer, ForeignKey("carrinhos.id"), nullable=False)
    produto_id = Column(Integer, ForeignKey("produtos.id"), nullable=False)
    quantidade = Column(Integer, default=1)

    carrinho = relationship("Carrinho", back_populates="itens")
    produto = relationship("Produto")
