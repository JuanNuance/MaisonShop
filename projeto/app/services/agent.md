# Services

A camada de Regra de Negócio. As funções aqui recebem a sessão do banco (`db: Session`) e os schemas validados para executar o CRUD.

* **`produto_service.py`**:
    * `listar_produtos` (GET com paginação e filtros).
    * `buscar_produto_por_id` (GET /{id}).
    * `criar_produto` (POST).
    * `atualizar_produto_completo` (PUT).
    * `atualizar_produto_parcial` (PATCH - altera apenas campos fornecidos).
    * `deletar_produto` (DELETE - pode ser soft delete mudando um status, ou hard delete).
* **`usuario_service.py`**: CRUD completo de usuários.
* **`carrinho_service.py` e `pedido_service.py`**: Lógica de adicionar itens, limpar carrinho, processar checkout e alterar status de pedidos.