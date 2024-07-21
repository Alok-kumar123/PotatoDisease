from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import numpy as np
import io
from tensorflow import keras
from tensorflow.keras.losses import SparseCategoricalCrossentropy

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://potato-disease-client.vercel.app",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define custom loss
def custom_sparse_categorical_crossentropy(from_logits=False, reduction='auto', name=None):
    return SparseCategoricalCrossentropy(from_logits=from_logits, reduction=reduction, name=name)

# Load Model
model = keras.models.load_model(
    'model.h5',
    custom_objects={"SparseCategoricalCrossentropy": custom_sparse_categorical_crossentropy}
)

# Endpoint for image classification
@app.post("/classify/")
async def classify_image(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        img = np.array(image)
        img = np.expand_dims(img, axis=0)
        predictions = model.predict(img)
        pred_class = np.argmax(predictions[0])
        conf = round(np.max(predictions[0]) * 100, 2)
        class_names = ["Early Blight", "Late Blight", "Healthy"]
        return JSONResponse(content={"Pred_class": class_names[int(pred_class)], "Confidence": float(conf)})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
