# Auth

Segurança, senhas e controle de acesso (RBAC - Role Based Access Control).

* **`security.py`**: Hashing de senhas com bcrypt.
* **`jwt_handler.py`**: Geração e validação de tokens JWT.
* **`dependencies.py`**: 
    * `get_current_user`: Verifica o token e retorna o usuário atual.
    * `get_admin_user`: Verifica se o `current_user` tem a flag `is_admin = True` (necessário para o CRUD completo de produtos).