from projeto.app.services.produto_service import criar_produto, listar_produtos
from projeto.app.schemas.produto_schema import ProdutoCreate
from unittest.mock import MagicMock

def test_criar_produto_service():
    db = MagicMock()
    produto_data = ProdutoCreate(nome="Test", preco=10.0, estoque=5)
    
    result = criar_produto(db, produto_data)
    
    assert db.add.called
    assert db.commit.called
    assert db.refresh.called

def test_listar_produtos_service():
    db = MagicMock()
    # Mocking pagination
    mock_query = MagicMock()
    db.query.return_value = mock_query
    
    from projeto.app.utils.pagination import paginate
    # We might need to mock paginate or let it run with mock_query
    
    # Simple check if query was called
    listar_produtos(db)
    assert db.query.called
