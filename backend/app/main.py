from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from routes import trials  # Import trials routes
from services.trial_service import search_trials, get_all_trials  # Import the new function

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from frontend app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the trials router
app.include_router(trials.app)

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
    # Check if all search parameters are None or empty
    if not company and not phase and not status and not condition:
        return get_all_trials()  # Return all trials if no search criteria are provided

    return search_trials(company, phase, status, condition)