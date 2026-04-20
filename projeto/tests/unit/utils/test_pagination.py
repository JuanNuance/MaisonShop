from projeto.app.utils.pagination import paginate
from unittest.mock import MagicMock

def test_pagination_logic():
    query = MagicMock()
    query.count.return_value = 25
    
    # Mocking the chain .offset().limit().all()
    mock_all = MagicMock()
    mock_all.all.return_value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    mock_limit = MagicMock()
    mock_limit.limit.return_value = mock_all
    query.offset.return_value = mock_limit
    
    result = paginate(query, pagina=2, tamanho_pagina=10)
    
    assert result["total"] == 25
    assert result["pagina"] == 2
    assert result["tamanho_pagina"] == 10
    assert result["total_paginas"] == 3
    
    query.offset.assert_called_with(10)
    mock_limit.limit.assert_called_with(10)
