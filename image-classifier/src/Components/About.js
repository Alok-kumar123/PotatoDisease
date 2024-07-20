import React from 'react';
import '../App.css';

const About = () => {
  return (
    <div className="about-container">
      <h2>About</h2>
      <p>This project aims to assist farmers and agricultural professionals in quickly diagnosing potato leaf diseases using machine learning. The application utilizes a Convolutional Neural Network (CNN) to classify leaf images into three categories: Early Blight, Late Blight, and Healthy. By leveraging the power of deep learning, this tool can help in early detection and treatment of potato diseases, potentially saving crops and increasing yield.</p>

      <h3>Features</h3>
      <ul>
        <li><strong>Image Classification:</strong> Upload an image of a potato leaf, and the application will classify it as Early Blight, Late Blight, or Healthy.</li>
        <li><strong>User-Friendly Interface:</strong> Simple and intuitive interface for easy image upload and disease prediction.</li>
        <li><strong>Real-Time Processing:</strong> Quick and accurate predictions using a pre-trained CNN model.</li>
        <li><strong>Open Source:</strong> The project is open source, and contributions are welcome to improve the model and the application.</li>
      </ul>

      <h3>Technology Stack</h3>
      <ul>
        <li><strong>Frontend:</strong> React</li>
        <li><strong>Backend:</strong> FastAPI</li>
        <li><strong>Model:</strong> TensorFlow/Keras</li>
      </ul>

      <h3>Project Goals</h3>
      <ul>
        <li>To provide an easy-to-use tool for potato disease detection.</li>
        <li>To leverage machine learning for agricultural applications.</li>
        <li>To improve the accuracy and efficiency of disease diagnosis in crops.</li>
      </ul>

      <p>Feel free to explore the project and contribute to its development!</p>
    </div>
  );
}

export default About;
