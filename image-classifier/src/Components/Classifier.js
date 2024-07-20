import React, { useState } from 'react';
import axios from 'axios';

const ImageUploadCard = () => {
    const [image, setImage] = useState(null);
    const [stage,setStage]=useState(null);
    const [conf,setConf]=useState(null);
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleOnclassify = async () => {
        const fileInput = document.getElementById('imageUpload');
        const file = fileInput.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            let res = await axios({
                method: "post",
                url: "https://potato-disease-pg4j44wg7-alok-kumars-projects-8add5b2c.vercel.app/classify/",
                data: formData,
              });
            console.log(res.data.Pred_class,res.data.Confidence);
            setStage(res.data.Pred_class)
            setConf(res.data.Confidence)
        } catch (error) {
            console.error("Error while fetching data:", error);
        }
    };

    const clearImage = () => {
        setImage(null);
        setStage(null);
        document.getElementById('imageUpload').value = '';
    };

    return (
        <div className="d-flex justify-content-center align-items-center mt-5">
            
            <div className="text-center">
                <h2 className="mb-4" style={{color:'green'}}>Potato Disease Classification</h2>

                <div className="d-flex justify-content-center">
                    <div className="card" style={{ width: '18rem' }}>
                        {image ? (
                            <>
                                <img
                                    id="uploadedImage"
                                    className="card-img-top"
                                    src={image}
                                    alt="Uploaded"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Uploaded Image</h5>
                                    <p className="card-text">This is the image you uploaded.</p>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-danger" onClick={clearImage}>Clear Image</button>
                                        <button className="btn btn-primary" onClick={handleOnclassify}>Classify Image</button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="card-body text-center">
                                    <h5 className="card-title">No Image Uploaded</h5>
                                    <p className="card-text">Please upload an image.</p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => document.getElementById('imageUpload').click()}
                                    >
                                        Upload Image
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                   
                </div>
                {stage?
                    ( <div className="text-center">
                <h2 className="mb-4" style={{color:'Red'}}>Plant Disease Status : {stage}</h2>
                <h2 className="mb-4" style={{color:'Red'}}>Prediction Confidence : {conf} %</h2>
                </div>):
                ( <></>)
                    }
                <div style={{ display: 'none' }}>
                    <input
                        type="file"
                        className="form-control-file"
                        id="imageUpload"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default ImageUploadCard;
