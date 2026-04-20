from sqlalchemy import Column, String, DateTime, Text, Integer
from sqlalchemy.sql import func
from projeto.app.database.base import Base

class Idempotencia(Base):
    __tablename__ = "chaves_idempotencia"

    chave = Column(String, primary_key=True, index=True)
    usuario_id = Column(Integer, index=True, nullable=False)
    corpo_resposta = Column(Text, nullable=False)
    status_code = Column(Integer, nullable=False)
    criado_em = Column(DateTime(timezone=True), server_default=func.now())
