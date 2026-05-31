from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
import tensorflow as tf
from PIL import Image
import numpy as np
import io
import os

# Initialize Flask App
# We tell Flask where to find 'templates' and 'static'
app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app) 

# Configuration
MODEL_PATH = 'road_model.keras'
# Ensure this matches the folder names ALPHABETICALLY
CLASS_NAMES = ['cracks', 'good_road', 'potholes'] 

# Load the trained model
print("Loading Model...")
model = tf.keras.models.load_model(MODEL_PATH)
print("Model Loaded Successfully!")

def prepare_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    img = img.resize((128, 128))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    # Don't divide by 255 here if your model has a Rescaling layer!
    return img_array

# --- Routes ---

# 1. Route for the main page (UI)
@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

# 2. Route for prediction (API)
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    try:
        image_bytes = file.read()
        processed_img = prepare_image(image_bytes)
        predictions = model.predict(processed_img)
        
        predicted_index = np.argmax(predictions[0])
        confidence = float(np.max(predictions[0]))
        predicted_class = CLASS_NAMES[predicted_index]
        
        result = {
            'class': predicted_class,
            'confidence': f"{confidence * 100:.2f}%",
            'all_probabilities': {CLASS_NAMES[i]: float(predictions[0][i]) for i in range(len(CLASS_NAMES))}
        }
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    # Render sets the PORT environment variable
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)