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

### Notes:

- The dataset is too large to be loaded into memory, so we need to use a database.
- We need to use a search algorithm to search through the dataset.
- We need to use a database to store the dataset.

### Future Improvements / Known issues due to time constraints:

- Conditions may have many different representations in the dataset. For example, NSCLC could be “non small cell lung cancer”, “non small cell lung carcinoma”, “NSCLC”, “carcinoma of the lungs, non small cell”, etc. Capturing all the relevant clinical trials for searches on any disease will need a more thought out searching algorithm. While a simple search algorithm would be to search for the condition in the dataset, this would not be efficient. During my research, I found that many companies use a technique called "fuzzy" searching to search for the condition in the dataset. This is a more advanced search algorithm that I will need more time to implement. Another approach could be to use a pre-trained model to classify the condition into one of the known disease categories (The AI in Argon AI ;) ). A simpler approach could be to use a dictionary to map the condition to one of the known disease categories but this would not be as accurate as a pre-trained model and it would require more time to implement.

#### Some alternatives to loading the dataset into memory:

a. Database Storage: Instead of loading data into memory, we could store the clinical trials data in a database (e.g., PostgreSQL, MongoDB).

      Advantages:

         - Efficient for large datasets
         - Supports advanced querying and indexing
         - Persists data between application restarts

b. Distributed Computing: For very large datasets, you might use a distributed computing framework like Apache Spark. (This might be a good alternative to consider for future scalability)

      Advantages:

      - Scales to very large datasets
      - Supports distributed processing

Reasons to use these alternatives:

- When the dataset is too large to fit in memory
- Handle growing datasets more efficiently (scaling)
- Optimize query speed for large datasets (performance)
- Maintain data between application restarts (persisting data)

#### Evaluating the completeness of search results is crucial for ensuring the quality of the search function. Some ideas on how we can validate the search results:

a. Precision and Recall:
Calculate precision (fraction of relevant instances among retrieved instances) and recall (fraction of relevant instances that were retrieved).

b. Manual Review:
Regularly conduct manual reviews of search results for common queries.

c. A/B Testing:
Compare different search algorithms by randomly serving them to users and comparing engagement metrics.

d. User Feedback:
Implement a feedback mechanism where users can report missing or irrelevant results.

e. Completeness Ratio (read about this topic in a system design book):
Compare the number of results for a given query against the total number of trials in the database.

f. Cross-validation:
Use a subset of your data as a test set to evaluate the search function.
