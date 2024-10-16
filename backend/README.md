# Clinical Trials Search App

This is a web application designed for Sarah, an executive at Pharma Co., to search and filter clinical trial data related to Non-Small Cell Lung Cancer (NSCLC) and other Clinincal tirals. The project is built using **FastAPI** for the backend and **React/NextJS** for the frontend.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Features

- Search and filter clinical trials related to NSCLC.
- Backend powered by FastAPI for fast and modern Python web APIs.
- Frontend integrated with React/NextJS (not included in this directory, setup separately).

### Basic Folder Breakdown

- **app/**: Contains all the FastAPI-related code and logic.
  - **main.py**: The main entry point for the FastAPI application.
  - **models.py**: Defines data models for clinical trials (if needed).
  - **routes/**: Contains API route definitions, including trial search functionality.
  - **services/**: Contains business logic such as searching and filtering through trials.
  - **utils/**: Utility functions like data loading and preprocessing.
- **clinical_trials.json**: Sample dataset of clinical trials for NSCLC, used to mock the data.
- **requirements.txt**: Contains a list of Python dependencies.

## Setup Instructions

Install the required dependencies:

```
pip install -r requirements.txt
```

Run the FastAPI server:

```
uvicorn app.main:app --reload
```

> The application will be running at http://127.0.0.1:8000.

