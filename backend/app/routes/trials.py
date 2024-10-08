from fastapi import APIRouter, Query
from services.trial_service import search_trials, get_all_trials

app = APIRouter()

@app.get("/trials")
def get_trials(
    condition: str = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100)
):
    if condition:
        return search_trials(condition, page, limit)
    else:
        return get_all_trials(page, limit)