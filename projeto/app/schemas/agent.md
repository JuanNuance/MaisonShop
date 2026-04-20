# Schemas

Modelos do Pydantic para validação de dados de entrada e saída. Essenciais para o CRUD, com a configuração `from_attributes = True` (antigo `orm_mode`) para converter dados do SQLAlchemy.

* **`produto_schema.py`**: 
    * `ProdutoBase`: Atributos comuns.
    * `ProdutoCreate` (POST): Campos obrigatórios.
    * `ProdutoUpdate` (PUT): Substituição completa do recurso (todos os campos).
    * `ProdutoPatch` (PATCH): Campos opcionais para atualização parcial (ex: atualizar só o estoque).
    * `ProdutoResponse` (GET): Inclui o `id`.
* **`usuario_schema.py`**: CRUD schemas para usuários (`UsuarioCreate`, `UsuarioUpdate`, `UsuarioResponse`).
* **`carrinho_schema.py` e `pedido_schema.py`**: Schemas de criação e resposta, incluindo os itens aninhados.
* **`paginacao_schema.py`**: Schema genérico para respostas paginadas.