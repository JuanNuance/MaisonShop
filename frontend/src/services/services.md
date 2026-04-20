# API Services (src/services/services.md)

## Responsabilidades:
- Configuração do Axios/Fetch baseada em variáveis de ambiente (BASE_URL).
- Definição das chamadas para os endpoints da API:
    - `/produtos` (GET)
    - `/auth` (POST)
    - `/usuarios` (POST/GET)
    - `/carrinho` (GET/POST/DELETE)
    - `/pedidos` (GET/POST)
- Interceptadores para inclusão automática de tokens JWT no cabeçalho.
