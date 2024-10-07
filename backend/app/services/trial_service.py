from utils.data_loader import load_trials_data
from datetime import datetime

clinical_trials = load_trials_data()

def search_trials(company=None, phase=None, status=None, condition="Non-Small Cell Lung Cancer", start_date=None, end_date=None, skip=0, limit=10):
    results = [
        trial for trial in clinical_trials
        if (not company or company.lower() in trial['company'].lower()) and
           (not phase or phase.lower() == trial['phase'].lower()) and
           (not status or status.lower() == trial['status'].lower()) and
           (condition.lower() in trial['condition'].lower()) and
           (not start_date or datetime.strptime(trial['start_date'], "%Y-%m-%d").date() >= start_date) and
           (not end_date or datetime.strptime(trial['end_date'], "%Y-%m-%d").date() <= end_date)
    ]
    return {"results": results[skip: skip + limit]}