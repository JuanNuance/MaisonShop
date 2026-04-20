from fastapi.testclient import TestClient

def test_get_produtos_empty(client: TestClient):
    response = client.get("/produtos")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 0
    assert data["itens"] == []

def test_get_produto_not_found(client: TestClient):
    response = client.get("/produtos/999")
    assert response.status_code == 404
