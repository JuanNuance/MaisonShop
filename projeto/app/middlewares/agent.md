# Middlewares

Interceptadores para rotinas que ocorrem fora do fluxo padrão rota -> serviço.

* **`idempotency_middleware.py`**: Verifica o header `Idempotency-Key` em rotas POST/PATCH críticas, checa no banco e previne duplicidade.
* **`error_handler.py`**: Intercepta erros do SQLAlchemy (como chaves estrangeiras inválidas ou registros não encontrados) e converte em respostas HTTP 400 ou 404 amigáveis.