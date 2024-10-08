from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import trials

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the trials router
app.include_router(trials.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Sarah's Clinical Trials API!"}