import json

def load_trials_data():
    with open('clinical_trials.json') as f:
        return json.load(f)
