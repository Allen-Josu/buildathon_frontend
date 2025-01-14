
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
import PyPDF2
import json
import requests

app = Flask(__name__)
CORS(app)

# Configure Gemini API
GEMINI_API_KEY = 'AIzaSyBF7l20f16mPZNM-z4bRloYTinDOJCTsms'  # Replace with your actual Gemini API key
GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'  # Replace with the actual endpoint

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() == 'pdf'

def extract_text_from_pdf(pdf_path):
    text = ""
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
        return text
    except Exception as e:
        return f"Error extracting text: {str(e)}"

def generate_questions_with_gemini(syllabus_text, pyq_text):
    try:
        # Create a payload that combines syllabus and PYQ information
        payload = {
            "syllabus": syllabus_text[:2000],  # Truncating to manage token limit
            "previous_questions": pyq_text[:2000]  # Truncating to manage token limit
        }

        headers = {
            "Authorization": f"Bearer {GEMINI_API_KEY}",
            "Content-Type": "application/json"
        }

        response = requests.post(GEMINI_API_ENDPOINT, headers=headers, json=payload)

        if response.status_code != 200:
            print(f"API Error: {response.status_code} - {response.text}")
            raise Exception(f"Error from Gemini API: {response.status_code} {response.text}")

        return response.json()

    except Exception as e:
        print(f"Error in Gemini question generation: {str(e)}")
        return {
            "title": "Model Question Paper",
            "duration": "3 Hours",
            "max_marks": 100,
            "sections": [
                {
                    "name": "Section A - Short Questions",
                    "questions": ["Error generating questions. Please try again."],
                    "marks_per_question": 5
                },
                {
                    "name": "Section B - Long Questions",
                    "questions": ["Error generating questions. Please try again."],
                    "marks_per_question": 10
                }
            ]
        }

@app.route('/upload', methods=['POST'])
def upload_files():
    try:
        if 'syllabus_pdf' not in request.files or 'pyq_pdf' not in request.files:
            return jsonify({'message': 'Error: Both syllabus and PYQ PDF files are required'}), 400

        syllabus_pdf = request.files['syllabus_pdf']
        pyq_pdf = request.files['pyq_pdf']

        if syllabus_pdf.filename == '' or pyq_pdf.filename == '':
            return jsonify({'message': 'Error: No files selected'}), 400

        if not (allowed_file(syllabus_pdf.filename) and allowed_file(pyq_pdf.filename)):
            return jsonify({'message': 'Error: Only PDF files are allowed'}), 400

        syllabus_filename = secure_filename(syllabus_pdf.filename)
        pyq_filename = secure_filename(pyq_pdf.filename)

        syllabus_path = os.path.join(app.config['UPLOAD_FOLDER'], syllabus_filename)
        pyq_path = os.path.join(app.config['UPLOAD_FOLDER'], pyq_filename)

        syllabus_pdf.save(syllabus_path)
        pyq_pdf.save(pyq_path)

        syllabus_text = extract_text_from_pdf(syllabus_path)
        pyq_text = extract_text_from_pdf(pyq_path)

        # Generate question paper using Gemini API
        question_paper = generate_questions_with_gemini(syllabus_text, pyq_text)

        return jsonify({
            'message': 'Files processed and question paper generated successfully!',
            'extracted_text': {
                'syllabus': syllabus_text,
                'pyq': pyq_text
            },
            'question_paper': question_paper
        }), 200

    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)