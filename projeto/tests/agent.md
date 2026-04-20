# Tests

Diretório principal para a suíte de testes do projeto, guiando o desenvolvimento via TDD (Test-Driven Development). Utiliza `pytest` como runner e `pytest-mock` / `unittest.mock` para isolamento de dependências.

* **`conftest.py`**: O coração dos testes no `pytest`. Aqui ficam as **Fixtures** (configurações globais de teste). 
    * Instanciação do `TestClient` do FastAPI.
    * Criação de sessões de banco de dados mockadas (`MagicMock`).
    * Configuração do `app.dependency_overrides` para substituir a função `get_db` e `get_current_user` por versões falsas durante os testes de rota.
    * Geração de tokens JWT falsos para testar rotas protegidas.

---

## `tests/unit/`
Testes rápidos e isolados. Nenhuma chamada de rede ou acesso real ao banco de dados acontece aqui. Tudo que for externo à função testada deve ser "mockado".

### `tests/unit/services/`
Testa a regra de negócio isoladamente, passando sessões do SQLAlchemy mockadas para os serviços.
* **`test_produto_service.py`**:
    * Mock do `db.query()`. Testar se `listar_produtos` chama o `.offset()` e `.limit()` corretamente.
    * Testar se `criar_produto` lança exceção ao tentar criar um produto com dados inválidos.
* **`test_carrinho_service.py`**:
    * Mock da verificação de estoque. Testar o cálculo correto do subtotal ao adicionar um item.
    * Testar a regra de negócio que impede adicionar mais itens do que o disponível no estoque.
* **`test_pedido_service.py`**:
    * Testar a transação: garantir que o mock de `db.commit()` seja chamado se tudo der certo, e `db.rollback()` seja chamado se a atualização de estoque falhar no meio do processo.

### `tests/unit/auth/`
* **`test_security.py`**:
    * Testar se a função de hash gera strings diferentes para a mesma senha (devido ao salt).
    * Testar se a verificação de senha retorna `True` para a senha correta e `False` para a incorreta.
* **`test_jwt_handler.py`**:
    * Testar a codificação e decodificação do payload do token.
    * Testar se o sistema rejeita tokens expirados.

### `tests/unit/utils/`
* **`test_pagination.py`**: Testar os cálculos matemáticos da paginação (ex: página 2 com tamanho 10 deve retornar offset 10).

---

## `tests/integration/`
Testes que validam o fluxo HTTP completo, do Request ao Response, usando o `TestClient` do FastAPI. As dependências complexas (banco e serviços externos de pagamento) continuam mockadas via Injeção de Dependência.

### `tests/integration/routes/`
* **`test_produto_routes.py`**:
    * `GET /produtos`: Mockar o serviço para retornar uma lista estática. Validar se o status HTTP é 200 e se o schema de saída corresponde.
    * `POST /produtos`: Mockar `get_current_user` para simular um Admin. Validar se a rota retorna 201 Created.
* **`test_carrinho_routes.py`**:
    * Testar acessos sem token (deve retornar 401 Unauthorized).
    * Mockar `get_current_user` com um usuário comum e testar a adição de itens validando o payload de resposta.
* **`test_pedido_routes.py`**:
    * Validar o fluxo de checkout. Mockar o `pedido_service` para retornar sucesso e verificar se o JSON de resposta bate com o `PedidoResponse` schema.

### `tests/integration/middlewares/`
* **`test_idempotency_middleware.py`**:
    * Fazer duas requisições `POST` consecutivas com o mesmo header `Idempotency-Key` para uma rota de teste.
    * O mock do banco deve registrar a primeira chamada. A segunda chamada deve ser interceptada pelo middleware, retornando a resposta salva no mock sem acionar a rota novamente.