# Argon-AI-takehome

## Problem Overview

Sarah, an executive at Pharma Co., is in charge of a drug called Luminarex, an immunotherapy
which has not yet been approved by the FDA. Sarah’s drug is currently in phase 3 of Clinical
Trials, specifically targeting a disease called Non Small Cell Lung Cancer (NSCLC), and Sarah
hopes that her drug will be approved soon.
Sarah wants to develop a better understanding of her competitive landscape. Specifically, she
wants to know about other pharma companies with clinical trials in the NSCLC space.
She currently uses ClinicalTrials.gov to do her research, but is frustrated by how difficult it is to
find the clinical trials she is looking for.

## Key Features:

1. Search & Filter: Sarah can search clinical trials by company, drug name, or specific phases.
2. Detailed View: Clicking on a search result shows trial details like phase, status, and participants.
3. Data Loading: Load the clinical trials dataset into memory from ClinicalTrials.gov as Sarah searches.

## High Level Approach:

1. Dataset Handling:

   - Use Python to pull and parse clinical trial data (either via scraping ClinicalTrials.gov or loading pre-existing datasets).

2. API:

   - Set up an API in Python (FastAPI) to handle search/filter requests and return the necessary trial information.

3. Frontend:

   - React components for search input, results list, and trial details.
   - Use Next.js to render the search interface, fetching data from the Python API.

4. Data Flow:

   - Frontend sends search/filter queries to the Python API.
   - API responds with relevant clinical trials data for display.

## Stack:

- Frontend: React + Next.js for fast, server-side rendered pages.
- Backend: Python (using FastAPI) for serving clinical trial data.
- Data Handling: Parse the dataset (either as CSV/JSON) into memory for faster searches.
