from fastapi import APIRouter, Query
from services.trial_service import search_trials, get_all_trials

router = APIRouter()

@router.get("/trials")
def get_trials(
    condition: str = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100)
):
    results = search_trials(condition, page, limit)
    print(f'Searching trials for {condition}', len(results['results']))
    if condition:
        return search_trials(condition, page, limit)
    else:
        print('getting all results', len(get_all_trials(page, limit)))
        return get_all_trials(page, limit)