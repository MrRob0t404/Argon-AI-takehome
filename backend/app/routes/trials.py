from fastapi import APIRouter, Query, HTTPException
from datetime import date
from services.trial_service import search_trials

app = APIRouter()

@app.get("/trials")
def get_trials(
    company: str = Query(None),
    phase: str = Query(None),
    status: str = Query(None),
    condition: str = Query("Non-Small Cell Lung Cancer"),
    start_date: date = Query(None),
    end_date: date = Query(None),
    skip: int = Query(0),  # Skip the first `n` results
    limit: int = Query(10)  # Limit the number of results
):
    if start_date and end_date and start_date > end_date:
        raise HTTPException(status_code=400, detail="start_date cannot be later than end_date")

    return search_trials(company, phase, status, condition, start_date, end_date, skip, limit)
