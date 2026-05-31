const fileInput = document.getElementById('fileInput');
const uploadZone = document.getElementById('uploadZone');
const previewSection = document.getElementById('previewSection');
const previewImage = document.getElementById('previewImage');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultBox = document.getElementById('resultBox');
const resultClass = document.getElementById('resultClass');
const resultConfidence = document.getElementById('resultConfidence');
const confidenceBar = document.getElementById('confidenceBar');
const resetBtn = document.getElementById('resetBtn');

// Backend API URL
const API_URL = '/predict';

let selectedFile = null;

// --- Event Listeners ---

// 1. Click to upload
uploadZone.addEventListener('click', () => fileInput.click());

// 2. File Selection
fileInput.addEventListener('change', (e) => {
    handleFile(e.target.files[0]);
});

// 3. Drag & Drop Logic
uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('dragover');
});

uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('dragover');
});

uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    handleFile(file);
});

// 4. Analyze Button
analyzeBtn.addEventListener('click', () => {
    if (!selectedFile) return;
    uploadImage(selectedFile);
});

// 5. Reset Button
resetBtn.addEventListener('click', () => {
    // Hide results and preview
    previewSection.style.display = 'none';
    resultBox.style.display = 'none';
    
    // Show upload zone again
    uploadZone.style.display = 'block';
    
    // Clear file input
    fileInput.value = '';
    selectedFile = null;
    
    // Reset confidence bar width
    confidenceBar.style.width = '0%';
});

// --- Functions ---

function handleFile(file) {
    if (file) {
        selectedFile = file;
        
        // Show preview
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.src = e.target.result;
            uploadZone.style.display = 'none';
            previewSection.style.display = 'block';
            resultBox.style.display = 'none'; // Hide previous results
        };
        reader.readAsDataURL(file);
    }
}

async function uploadImage(file) {
    // UI Loading State
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.error) {
            alert('Error: ' + data.error);
        } else {
            displayResults(data);
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Failed to connect to the server. Make sure app.py is running.');
    } finally {
        // Reset Button
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = '<i class="fas fa-brain"></i> Analyze Road';
    }
}

function displayResults(data) {
    resultBox.style.display = 'block';
    
    // Set Class Name (capitalize first letter)
    const className = data.class.replace(/_/g, ' ');
    resultClass.innerText = className;
    
    // Set Confidence
    const confidenceValue = parseFloat(data.confidence);
    resultConfidence.innerText = data.confidence;
    
    // Animate Bar
    setTimeout(() => {
        confidenceBar.style.width = confidenceValue + '%';
    }, 100);
}