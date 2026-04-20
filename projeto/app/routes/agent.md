# Routes

Endpoints da API separados por `APIRouter`. Injetam o banco de dados via `Depends(get_db)`.

* **`produto_routes.py`**:
    * `GET /produtos` e `GET /produtos/{id}` (Público).
    * `POST /produtos`, `PUT /produtos/{id}`, `PATCH /produtos/{id}`, `DELETE /produtos/{id}` (Protegido para administradores).
* **`usuario_routes.py`**:
    * `GET /usuarios/me`, `PUT /usuarios/me`, `PATCH /usuarios/me`, `DELETE /usuarios/me` (Gerenciamento do próprio perfil).
* **`carrinho_routes.py`**:
    * `GET /carrinho`, `POST /carrinho/itens`, `PATCH /carrinho/itens/{id}` (alterar quantidade), `DELETE /carrinho/itens/{id}`.
* **`pedido_routes.py`**:
    * `GET /pedidos`, `GET /pedidos/{id}`, `POST /pedidos` (Usa header de idempotência).
    * `PATCH /pedidos/{id}/status` (Atualizar status de pendente para pago/enviado).