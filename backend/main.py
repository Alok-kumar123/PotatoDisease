from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import numpy as np
import io
import keras

 

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://potato-disease-client-6idkob1dl-alok-kumars-projects-8add5b2c.vercel.app/",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins="https://potato-disease-client-6idkob1dl-alok-kumars-projects-8add5b2c.vercel.app/",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Load Model
model=keras.models.load_model('C:\\Users\\alok\\OneDrive\\Desktop\\MLproject\\backend\\model.h5')

#Endpoint for image classification

@app.post("/classify/")
async def classify_image(file: UploadFile=File(...)):
    try:
        contents=await file.read()
        image=Image.open(io.BytesIO(contents))
        img=np.array(image)
        img=np.expand_dims(img,axis=0)
        predictions=model.predict(img)
        pred_class=np.argmax(predictions[0])
        conf=round(np.max(predictions[0])*100,2)
        class_names=["Early Blight","Late Blight","Healthy"]
        return JSONResponse(content={"Pred_class":class_names[int(pred_class)], "Confidence":float(conf)})
    except Exception as e:

        return JSONResponse(content={"error":str(e)},status_code=500)
