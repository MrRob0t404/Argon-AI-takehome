from fastapi import APIRouter, Query
from services.trial_service import search_trials, get_all_trials

app = APIRouter()

@app.get("/trials")
def get_trials(
    condition: str = Query(None),
    skip: int = Query(0),
    limit: int = Query(10)
):
    print('FROM BACKEND', condition)
    if condition:
        return search_trials(condition, skip, limit)
    else:
        return get_all_trials(skip, limit)