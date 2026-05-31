# 🛣️ Road Condition Detection AI

A full-stack Deep Learning web application that analyzes images of roads to detect surface conditions. The system classifies images into three categories:

- ✅ Good Road
- 🕳️ Potholes
- ⚠️ Cracks

This project demonstrates an end-to-end machine learning pipeline, from data aggregation and model fine-tuning to backend API deployment and a modern, responsive frontend interface.

---

## 📸 Project Demo

> You can add a GIF or screenshot of your application here.
>
> To do this:
> 1. Take a screenshot of your application.
> 2. Save it as `demo.png` in the root folder.
> 3. Add the image using:

```markdown
![Project Demo](demo.png)
```

---

## ✨ Key Features

- 🧠 **Deep Learning Powered**  
  Utilizes **MobileNetV2** with Transfer Learning and Fine-Tuning for high accuracy on limited data.

- 🔍 **Multi-Class Classification**  
  Distinguishes between Good Roads, Potholes, and Cracks.

- 🖱️ **Modern UI**  
  A clean, responsive drag-and-drop interface built with pure HTML, CSS, and JavaScript (no templates).

- ⚡ **Real-Time Prediction**  
  Fast inference served via a Python Flask REST API.

- 📊 **Confidence Visualization**  
  Interactive progress bar showing the model's confidence level for each prediction.

---

## 🛠️ Tech Stack

| Area | Technologies Used |
|--------|------------------|
| Machine Learning | TensorFlow, Keras, MobileNetV2, NumPy |
| Backend | Python, Flask, Flask-CORS |
| Frontend | HTML5, CSS3, Vanilla JavaScript (ES6) |
| Image Processing | Pillow (PIL), OpenCV (optional) |

---

## 📂 Project Structure

The project follows a modular architecture separating the AI engine from the web interface.

```text
RoadConditionAI/
│
├── backend/
│   ├── app.py              # Flask server to handle API requests
│   ├── model.py            # Script to train and save the model
│   └── road_model.keras    # Trained deep learning model
│
├── frontend/
│   ├── index.html          # Main HTML structure
│   ├── style.css           # Custom styling and animations
│   └── script.js           # Drag-and-drop and API logic
│
├── data/
│   └── train/
│       ├── good_road/
│       ├── potholes/
│       └── cracks/
│
└── requirements.txt        # Python dependencies
```

---

# 🚀 Getting Started

Follow these instructions to get the project running locally.

## Prerequisites

- Python 3.8 or higher
- A web browser

---

## Installation Steps

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/RoadConditionAI.git
cd RoadConditionAI
```

### 2️⃣ Set Up the Python Environment

```bash
# Create a virtual environment
python -m venv venv

# Activate it (Windows)
venv\Scripts\activate

# Activate it (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3️⃣ Run the Backend Server

Open a terminal inside the `backend` folder and start the Flask API:

```bash
cd backend
python app.py
```

The server will start at:

```text
http://127.0.0.1:5000
```

### 4️⃣ Run the Frontend

Navigate to the `frontend` folder and open:

```text
index.html
```

in your web browser.

You can:

- Double-click the file
- Right-click → Open With → Browser

### 5️⃣ Test It

1. Drag and drop a road image into the upload area.
2. Click **Analyze Road**.
3. View the predicted road condition and confidence score.

---

# 🧠 Model Training

The model was built using **Transfer Learning** to achieve high accuracy with a relatively small dataset.

### Model Architecture

- **Base Model:** MobileNetV2 (pre-trained on ImageNet)
- **Custom Head:** GlobalAveragePooling2D → Dropout → Dense (Softmax)
- **Fine-Tuning:** Last 30 layers of MobileNetV2 were unfrozen to learn road-specific features
- **Data Augmentation:** Random flip, rotation, and zoom to reduce overfitting

### Retraining the Model

To train the model with your own dataset:

1. Replace or update images inside:

```text
data/train/
```

2. Run:

```bash
python backend/model.py
```

---

# 🔮 Future Improvements

### 🎯 Object Detection

Move from image classification to object detection using **YOLO** to identify the exact location of potholes and cracks.

### 📱 Mobile Application

Convert the model to **TensorFlow Lite (.tflite)** and deploy it on Android and iOS devices.

### 🗺️ Maps Integration

Automatically plot detected potholes on Google Maps for municipal authorities and road maintenance departments.

---

# 📄 License

This project is open source and available under the **MIT License**.