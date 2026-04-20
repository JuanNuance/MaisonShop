from fastapi import FastAPI
from projeto.app.routes import auth_routes, usuario_routes, produto_routes, carrinho_routes, pedido_routes
from projeto.app.middlewares.error_handler import error_handler_middleware
from projeto.app.middlewares.idempotency_middleware import idempotency_middleware
from projeto.app.database.init_db import init_db

# Initialize database
init_db()

app = FastAPI(title="API Projeto II")

# Register middlewares
app.middleware("http")(error_handler_middleware)
app.middleware("http")(idempotency_middleware)

# Register routes
app.include_router(auth_routes.router)
app.include_router(usuario_routes.router)
app.include_router(produto_routes.router)
app.include_router(carrinho_routes.router)
app.include_router(pedido_routes.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to API Projeto II"}

# Run the application with: uvicorn projeto.app.main:app --reload
