
from app.routes.UserRoute import app
from fastapi import Request

@app.middleware("http")
async def add_process_time_header(request, call_next):
    response = await call_next(request)
    return response