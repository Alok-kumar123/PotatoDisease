# Potato Disease Classification

This project involves the development of a Convolutional Neural Network (CNN) model to classify potato leaf images into three categories: Early Blight, Late Blight, and Healthy. The project consists of a frontend built with React and a backend using FastAPI to serve the model for image classification.

## Table of Contents
- [Overview](#overview)
- [Dataset](#dataset)
- [Model Development](#model-development)
- [Frontend](#frontend)
- [Backend](#backend)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview
The goal of this project is to build a web application that can classify images of potato leaves and determine whether they are affected by Early Blight, Late Blight, or if they are Healthy. The application uses a CNN model trained on the PlantVillage dataset.

## Dataset
The dataset used for this project is the [PlantVillage dataset](https://www.kaggle.com/arjuntejaswi/plant-village), which contains images of healthy and diseased plant leaves.

## Model Development
The CNN model was developed using TensorFlow and Keras. The model architecture includes multiple convolutional layers, max-pooling layers, and dense layers. Data augmentation techniques like random rotation and flipping were used to enhance the model's robustness.

## Frontend
The frontend of the application is built with React. It allows users to upload an image of a potato leaf and displays the classification result.

## Backend
The backend is built using FastAPI. It handles the image upload, processes the image, and uses the trained model to predict the class of the leaf.

## Setup
### Prerequisites
- Python 3.8 or higher
- Node.js and npm
- TensorFlow
- FastAPI

### Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/potato-disease-classification.git
    cd potato-disease-classification
    ```

2. Setup the backend:
    ```sh
    cd backend
    pip install -r requirements.txt
    ```

3. Setup the frontend:
    ```sh
    cd frontend
    npm install
    ```

## Usage
### Running the Backend
Navigate to the backend directory and start the FastAPI server:
```sh
cd backend
uvicorn main:app --reload
