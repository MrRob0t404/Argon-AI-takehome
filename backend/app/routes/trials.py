from fastapi import APIRouter, Query
from services.trial_service import search_trials

router = APIRouter()

@router.get("/trials")
def get_trials(
    company: str = Query(None),
    phase: str = Query(None),
    status: str = Query(None),
    condition: str = Query("Non-Small Cell Lung Cancer")
):
    return search_trials(company, phase, status, condition)
