from fastapi import FastAPI, Query
from routes import trials  # Import trials routes
from services.trial_service import search_trials

app = FastAPI()

# Include the trials router
app.include_router(trials.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Sarah's Clinical Trials API!"}

@app.get("/trials")
def get_trials(
    company: str = Query(None),
    phase: str = Query(None),
    status: str = Query(None),
    condition: str = Query("Non-Small Cell Lung Cancer")
):
    return search_trials(company, phase, status, condition)