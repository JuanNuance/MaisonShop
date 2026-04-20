from sqlalchemy import Column, Integer, Float, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from projeto.app.database.base import Base

class Pedido(Base):
    __tablename__ = "pedidos"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    status = Column(String, default="pendente") # pendente, pago, enviado, cancelado
    total = Column(Float, default=0.0)
    criado_em = Column(DateTime(timezone=True), server_default=func.now())

    usuario = relationship("Usuario")
    itens = relationship("ItemPedido", back_populates="pedido", cascade="all, delete-orphan")
