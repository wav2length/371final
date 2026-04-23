import pickle
from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np

with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

app = FastAPI()

class InputData(BaseModel):
    features: list[float]

@app.post("/predict")
def predict(data: InputData):
    X = np.array(data.features).reshape(1, -1)
    pred = model.predict_proba(X)[0][1]
    return {"prediction": pred}

# COMMAND TO RUN: `uvicorn model_api:app --host 0.0.0.0 --port 8000 --reload`