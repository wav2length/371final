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
    pred = model.predict(X).tolist()
    return {"prediction": pred}