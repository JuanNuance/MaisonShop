# Models

Entidades do banco de dados representadas como classes do SQLAlchemy (herdam de `Base`). Elas definem as tabelas, colunas e relacionamentos (`relationship`).

* **`usuario.py`**: Tabela `usuarios`. Colunas: `id`, `nome`, `email`, `senha_hash`, `is_admin` (útil para rotas de deleção/edição de produtos), `criado_em`.
* **`produto.py`**: Tabela `produtos`. Colunas: `id`, `nome`, `descricao`, `preco`, `estoque`, `categoria`, `imagem_url`.
* **`carrinho.py` e `item_carrinho.py`**: Tabelas `carrinhos` e `itens_carrinho`. Relacionamentos One-to-Many entre carrinho e itens, e relacionamentos com `Produto` e `Usuario`.
* **`pedido.py` e `item_pedido.py`**: Tabelas `pedidos` e `itens_pedido`.
* **`idempotencia.py`**: Tabela `chaves_idempotencia` para controle de requisições.