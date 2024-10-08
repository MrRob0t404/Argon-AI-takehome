import json

def load_trials_data():
    with open('top_100_clinical_trials.json') as f:
        return json.load(f)
