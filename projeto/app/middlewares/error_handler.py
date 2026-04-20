from fastapi import Request, status
from fastapi.responses import JSONResponse
from sqlalchemy.exc import IntegrityError, NoResultFound
from fastapi.exceptions import HTTPException

async def error_handler_middleware(request: Request, call_next):
    try:
        response = await call_next(request)
        return response
    except NoResultFound:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"detail": "Resource not found"}
        )
    except IntegrityError as e:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"detail": f"Database integrity error: {str(e.orig)}"}
        )
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": f"An unexpected error occurred: {str(e)}"}
        )
