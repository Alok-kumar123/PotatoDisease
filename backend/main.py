from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import numpy as np
import io
import tensorflow as tf
import keras

 

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Load Model
model=keras.models.load_model('/model.h5')

#Endpoint for image classification

@app.post("/classify/")
async def classify_image(file: UploadFile=File(...)):
    try:
        contents=await file.read()
        image=Image.open(io.BytesIO(contents))
        img=tf.expand_dims(image,axis=0)
        predictions=model.predict(img)
        pred_class=tf.argmax(predictions[0])
        conf=round(max(predictions[0])*100,2)
        class_names=["Early Blight","Late Blight","Healthy"]
        return JSONResponse(content={"Pred_class":class_names[int(pred_class)], "Confidence":float(conf)})
    except Exception as e:

        return JSONResponse(content={"error":str(e)},status_code=500)

@app.get("/test/")
async def test():
    return {"message": "Test endpoint is working!"}

    
if __name__=="__main__":
    import uvicorn
    uvicorn.run(app,host="0.0.0.0",port=8000)
