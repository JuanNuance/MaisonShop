
  Prompt de Implementação: Frontend E-commerce Premium

  🚀 Contexto do Projeto
  Estamos construindo o frontend para uma aplicação de e-commerce robusta cuja API (FastAPI) já está operacional. O objetivo é criar uma interface de usuário que se sinta
  "cara", natural e extremamente fluida, fugindo de clichês de design gerados por IA (tons neon de roxo/azul).

  Stack Tecnológica
   - Framework: Next.js (App Router)
   - Linguagem: TypeScript (Tipagem rigorosa)
   - Estilização: Tailwind CSS (Uso extensivo de variáveis e classes utilitárias)
   - Gerenciamento de Estado: React Context ou Zustand
   - Consumo de API: Fetch API ou Axios com TanStack Query (React Query)

  ---

  🎨 Identidade Visual (Premium & Natural)
   - Paleta de Cores: Foco em tons terrosos, neutros quentes e texturas. 
       - Primária: Stone-900 (Quase preto para texto e contrastes).
       - Secundária: Sage/Olive (Verdes naturais e sóbrios) ou Ocre/Sand.
       - Background: Stone-50 ou um Off-white (evite o branco puro #FFFFFF).
   - Tipografia: Serifada para títulos (ex: Playfair Display ou Lora) e Sans-serif minimalista para corpo (ex: Inter ou Satoshi).
   - Layout: Responsividade baseada puramente em Flexbox. Use espaçamentos generosos (whitespace) para criar uma sensação de luxo e calma.
   - Componentes: Bordas levemente arredondadas (rounded-sm ou rounded-md), sombras suaves (shadow-sm) e micro-interações sutis (hover com transições lentas).

  ---

  🛠 Especificações Técnicas (Integração com API)

  A API roda em http://localhost:8000 (ou variável de ambiente). Abaixo estão os contratos principais:

  1. Catálogo de Produtos (/produtos)
   - GET /produtos: Retorna paginação. Schema: { items: Produto[], total, pagina, tamanho_pagina }.
   - Model: id, nome, descricao, preco, estoque, categoria, imagem_url.
   - Requirement: Implementar Skeleton Loaders elegantes durante a listagem.

  2. Autenticação & Usuário (/auth & /usuarios)
   - Fluxo de Login e Registro utilizando JWT (armazenado em Cookies seguros ou LocalStorage).
   - Middleware de proteção de rotas para áreas do cliente e checkout.

  3. Carrinho de Compras (/carrinho)
   - Sincronização em tempo real com o backend.
   - POST /carrinho/itens: Adicionar produto.
   - GET /carrinho: Recuperar estado atual.
   - UI: Drawer lateral (sheet) para o carrinho, permitindo edição rápida de quantidades.

  4. Pedidos (/pedidos)
   - Fluxo de Checkout em etapas (Informações -> Entrega -> Pagamento -> Confirmação).

  ---

  🏛 Estrutura de Páginas Requerida
   1. Home: Hero section com imagem aspiracional, grid de produtos em destaque e seção sobre a marca.
   2. Shop/Listagem: Filtros laterais (por categoria) e ordenação.
   3. Product Detail: Galeria de imagens (se disponível), seletor de quantidade e descrição detalhada.
   4. Auth (Login/Register): Minimalista, focado em conversão.
   5. User Dashboard: Histórico de pedidos e dados cadastrais.

  ---

  💡 Diretrizes de Implementação para o Agente
   - Priorize Flexbox: Não utilize Grid para layouts principais a menos que seja estritamente necessário para o grid de produtos. Use flex-1, flex-row, flex-col, gap,
     justify-between.
   - Clean Code: Componentes pequenos e reutilizáveis (Button, Input, Card, Badge).
   - Responsividade: Mobile-first real. Menu hambúrguer sofisticado para telas pequenas.
   - Imagens: Use o componente next/image para otimização e placeholders de "blur" enquanto carrega.

  ---

  