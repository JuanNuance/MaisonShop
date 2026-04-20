from sqlalchemy import Column, Integer, String, Float, Text
from projeto.app.database.base import Base

class Produto(Base):
    __tablename__ = "produtos"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, index=True, nullable=False)
    descricao = Column(Text, nullable=True)
    preco = Column(Float, nullable=False)
    estoque = Column(Integer, default=0)
    categoria = Column(String, index=True, nullable=True)
    imagem_url = Column(String, nullable=True)
    preco_promocional = Column(Float, nullable=True)
