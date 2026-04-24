# MaisonShop - E-commerce Premium

MaisonShop é uma plataforma de e-commerce completa, desenvolvida com uma arquitetura moderna e focada em oferecer uma experiência de usuário "Premium & Natural". O projeto combina um backend robusto em FastAPI com um frontend fluido e elegante em Next.js 14.

## 🚀 Tecnologias Utilizadas

### Backend
- **FastAPI**: Framework web de alta performance para construção de APIs.
- **SQLAlchemy**: ORM para interação com banco de dados (SQLite por padrão).
- **Pydantic**: Validação de dados e gerenciamento de configurações.
- **JWT (JSON Web Tokens)**: Autenticação segura de usuários.
- **Pytest**: Framework para testes unitários e de integração.
- **Middleware Customizado**: Tratamento de erros global e suporte a idempotência.

### Frontend
- **Next.js 14 (App Router)**: Framework React para produção.
- **TypeScript**: Tipagem estática para maior segurança e produtividade.
- **Tailwind CSS**: Estilização baseada em utilitários com foco em design minimalista e tons terrosos.
- **Zustand**: Gerenciamento de estado leve e eficiente.
- **TanStack Query (React Query)**: Gerenciamento de estado de servidor e cache de dados.
- **Axios**: Cliente HTTP para consumo da API.

---

## 🎨 Identidade Visual
O MaisonShop adota uma estética sofisticada, utilizando:
- **Cores**: Tons de `Stone-900` (preto suave), `Sage/Olive` (verdes naturais) e backgrounds `Off-white`.
- **Tipografia**: Serifada para títulos (luxo) e Sans-serif minimalista para o corpo de texto.
- **Layout**: Design limpo, focado em espaços generosos e micro-interações sutis.

---

## 🛠️ Funcionalidades Principal
- **Autenticação**: Fluxo completo de login e registro com proteção de rotas via JWT.
- **Catálogo de Produtos**: Listagem com paginação, filtros por categoria e busca.
- **Carrinho de Compras**: Sincronização em tempo real com o backend e interface em Drawer lateral.
- **Checkout**: Fluxo guiado para finalização de compra.
- **Dashboard do Usuário**: Histórico de pedidos e gestão de perfil.

---

## 🏃 Como Executar o Projeto

### Pré-requisitos
- Python 3.10+
- Node.js 18+
- npm ou yarn

### 1. Configuração do Backend
Entre na pasta do projeto backend:
```bash
cd projeto
```

Crie um arquivo `.env` baseado no `.env.example` e configure sua `SECRET_KEY`.

Utilize o **Makefile** para facilitar os comandos:
```bash
make build   # Instala as dependências (dentro do .venv)
make run     # Inicia o servidor FastAPI em http://localhost:8000
make test    # Executa os testes automatizados
```

### 2. Configuração do Frontend
Entre na pasta do frontend:
```bash
cd frontend
```

Instale as dependências:
```bash
npm install
```

Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
O frontend estará disponível em `http://localhost:3000`.

---

## 🧪 Testes
O backend possui uma suíte de testes que cobre rotas de produtos, autenticação, serviços e utilitários.
Para rodar:
```bash
cd projeto
make test
```

---

## 📂 Estrutura do Projeto
- `/projeto`: Código fonte do backend (FastAPI).
- `/frontend`: Código fonte do frontend (Next.js).
- `/.venv`: Ambiente virtual Python (localizado na raiz para compartilhar entre subprojetos se necessário).

---

Desenvolvido com foco em qualidade técnica e estética premium. ✨
