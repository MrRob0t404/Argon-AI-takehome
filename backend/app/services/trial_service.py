from utils.data_loader import load_trials_data

clinical_trials = load_trials_data()

def _is_match(value, criteria):
    return not criteria or criteria.lower() in value.lower()

def search_trials(condition=None, skip=0, limit=10):
    results = [
        trial for trial in clinical_trials
        if (not condition or
            (trial['protocolSection'].get('conditionsModule') and
             trial['protocolSection']['conditionsModule'].get('conditions') and
             any(_is_match(cond, condition) for cond in trial['protocolSection']['conditionsModule']['conditions'])))
    ]
    return {"results": results[skip: skip + limit], "total": len(results)}

def get_all_trials(skip=0, limit=10):
    return {"results": clinical_trials[skip: skip + limit], "total": len(clinical_trials)}