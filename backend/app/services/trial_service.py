from utils.data_loader import load_trials_data

clinical_trials = load_trials_data()

def _is_match(value, criteria):
    return not criteria or criteria.lower() in value.lower()

def search_trials(condition=None, page=1, limit=10):
    results = [
        trial for trial in clinical_trials
        if not condition or any(
            _is_match(cond, condition)
            for cond in trial['protocolSection'].get('conditionsModule', {}).get('conditions', [])
        )
    ]
    return _paginate_results(results, page, limit)

def get_all_trials(page=1, limit=10):
    return _paginate_results(clinical_trials, page, limit)

def _paginate_results(results, page, limit):
    start = (page - 1) * limit
    end = start + limit
    return {
        "results": results[start:end],
        "total": len(results),
        "page": page,
        "limit": limit,
        "total_pages": (len(results) + limit - 1) // limit
    }