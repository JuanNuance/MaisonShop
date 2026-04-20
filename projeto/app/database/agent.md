# Database

Configuração da infraestrutura de dados utilizando SQLAlchemy como ORM.

* **`connection.py`**: Configuração do `Engine` do SQLAlchemy (conectando ao SQLite) e criação do `SessionLocal` para as sessões do banco. Inclui a função geradora `get_db()` para Injeção de Dependência nas rotas.
* **`base.py`**: Definição da classe `Base = declarative_base()` que todos os models irão herdar.
* **`init_db.py`**: Script para inicializar o banco usando `Base.metadata.create_all(bind=engine)` para gerar as tabelas automaticamente a partir dos models.