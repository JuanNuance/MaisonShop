from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from projeto.app.database.base import Base

class Carrinho(Base):
    __tablename__ = "carrinhos"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), unique=True, nullable=False)

    usuario = relationship("Usuario")
    itens = relationship("ItemCarrinho", back_populates="carrinho", cascade="all, delete-orphan")
