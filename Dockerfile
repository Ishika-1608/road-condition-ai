# Use a lightweight Python image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Install system dependencies required for Pillow/Image processing
RUN apt-get update && apt-get install -y libgl1-mesa-glx libglib2.0-0

# Copy requirements file
COPY backend/requirements.txt .

# Install Python dependencies
# We use tensorflow-cpu to keep the container light
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY backend/ .

# Command to run the app
# Hugging Face uses port 7860
CMD ["gunicorn", "--bind", "0.0.0.0:7860", "--timeout", "120", "app:app"]