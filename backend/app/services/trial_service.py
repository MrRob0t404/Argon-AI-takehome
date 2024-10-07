from utils.data_loader import load_trials_data

# Load the clinical trials dataset into memory
clinical_trials = load_trials_data()

def search_trials(company=None, phase=None, status=None, condition="Non-Small Cell Lung Cancer"):
    results = [
        trial for trial in clinical_trials
        if (not company or company.lower() in trial['company'].lower()) and
           (not phase or phase.lower() == trial['phase'].lower()) and
           (not status or status.lower() == trial['status'].lower()) and
           (condition.lower() in trial['condition'].lower())
    ]
    return {"results": results}
