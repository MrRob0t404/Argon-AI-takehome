from utils.data_loader import load_trials_data
from datetime import datetime

clinical_trials = load_trials_data()

def _is_match(value, criteria):
    return not criteria or criteria.lower() in value.lower()

def search_trials(company=None, phase=None, status=None, condition="Non-Small Cell Lung Cancer", start_date=None, end_date=None, skip=0, limit=10):
    results = [
        trial for trial in clinical_trials
        if (_is_match(trial['protocolSection']['identificationModule']['organization']['fullName'], company) and
            _is_match(trial['protocolSection']['statusModule']['overallStatus'], phase) and
            _is_match(trial['protocolSection']['statusModule']['overallStatus'], status) and
            (trial['protocolSection'].get('conditionsModule') and trial['protocolSection']['conditionsModule'].get('conditions') and 
             _is_match(trial['protocolSection']['conditionsModule']['conditions'][0], condition)) and
            (not start_date or datetime.strptime(trial['protocolSection']['statusModule']['startDateStruct']['date'], "%Y-%m-%d").date() >= start_date) and
            (not end_date or datetime.strptime(trial['protocolSection']['statusModule']['completionDateStruct']['date'], "%Y-%m-%d").date() <= end_date)
        )
    ]
    return {"results": results[skip: skip + limit]}

def get_all_trials():
    return {"results": clinical_trials}  # Return all clinical trials