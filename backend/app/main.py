from fastapi import FastAPI
from routes import trials  # Import trials routes

app = FastAPI()

# Include the trials router
app.include_router(trials.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Sarah's Clinical Trials API!"}
