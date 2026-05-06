# Wavelength: The Dating App That Leads With Compatibility
 
> *For singles burned out on appearance-first dating apps — the only platform that matches on shared values and uses mutual opt-in to ensure only genuine interest moves connections forward.*
 
---
 
## Overview
 
Most dating apps lead with a photo and a swipe. Wavelength leads with who you actually are.
 
While Tinder, Bumble, and Hinge optimize for match volume, and eHarmony targets compatibility but delivers a slow, outdated experience, Wavelength is a complete redesign of how dating apps work. Our proprietary algorithm matches users based on shared values, interests, and communication style. Every match comes with algorithmically generated conversation starters, and a mutual opt-in model ensures connections only persist when both people choose to engage.
 
This restores confidence for users who feel overlooked by appearance-first platforms, provides real-time momentum for users tired of going nowhere, and delivers a dignified, compatibility-centered experience that mainstream apps have failed to offer.
 
---
 
## Features
 
- **Compatibility-First Matching** — Matched on values, interests, and communication style — not looks
- **Profile Snapshots** — Brief, curated profile views that orient users around what they share
- **AI-Generated Conversation Starters** — Algorithmically tailored to each specific match
- **Mutual Opt-In Continuation** — A connection persists only if both users choose to engage, filtering for genuine interest
- **Secure Account Management** — Email/password auth with encrypted profile and conversation data
 
---

## Local Deployment
In order to get Wavelength to open locally, you will need a terminal for the frontend, backend, and Python API. In the first terminal, navigate to the `webapp` folder and run these commands:
```
npm i
npm run dev
```
In the second terminal, navigate to the `backend` folder and run the same two commands. In the third terminal, run this command:
```
uvicorn model_api:app --host 0.0.0.0 --port 8000 --reload
```
All layers have hot reload enabled, so any code updates saved will seamlessly refresh the application. Ensure that user mocking and matchmaking variables are set as desired using the constants in `server.js`.

---

## About the Dataset
### Source
The file `Speed Dating Data.csv` can be downloaded from [this Kaggle page](https://www.kaggle.com/datasets/annavictoria/speed-dating-experiment?select=Speed+Dating+Data.csv). The model will load this csv from the path `./data/Speed Dating Data.csv`, so once you've downloaded it please create the data folder if it doesn't already exist and drop the dataset there.
### Relevant Features
Each row of the dataset contains an ID of a person (`iid`) and an ID of the person that they matched up with (`pid`). The `match` variable indicates whether these two people "matched" during the speed dating activity, i.e. `dec` and `dec_o` were both 1. Most of the organizational data can otherwise be ignored. The row contains the survey results of the original person as well as some information about their partner. Any other information about the process of cleaning the dataset will be explained in `model.ipynb`.
