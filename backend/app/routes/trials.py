from fastapi import APIRouter, Query
from datetime import date
from app.services.trial_service import search_trials

router = APIRouter()

@router.get("/trials")
def get_trials(
    company: str = Query(None),
    phase: str = Query(None),
    status: str = Query(None),
    condition: str = Query("Non-Small Cell Lung Cancer"),
    start_date: date = Query(None),  # New filter for start date
    end_date: date = Query(None)     # New filter for end date
):
    return search_trials(company, phase, status, condition, start_date, end_date)
