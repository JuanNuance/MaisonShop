from projeto.app.auth.jwt_handler import create_access_token, decode_access_token
from datetime import timedelta
import time

def test_jwt_encode_decode():
    data = {"sub": "test@example.com"}
    token = create_access_token(data)
    decoded = decode_access_token(token)
    assert decoded["sub"] == data["sub"]

def test_jwt_expiration():
    data = {"sub": "test@example.com"}
    # Create a token that expires in -1 minute
    token = create_access_token(data, expires_delta=timedelta(minutes=-1))
    decoded = decode_access_token(token)
    assert decoded is None
