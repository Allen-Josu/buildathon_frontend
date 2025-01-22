from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
import PyPDF2
import json
import requests
import logging
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure Groq API with correct endpoint
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions"

# Validate API key is present
if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY environment variable is not set")

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Limit to 16 MB

# Set up logging
logging.basicConfig(level=logging.INFO)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() == 'pdf'

def extract_text_from_pdf(pdf_path):
    try:
        text = ""
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
        if not text.strip():
            raise ValueError("No extractable text found in the PDF file.")
        return text.strip()
    except Exception as e:
        logging.error(f"Error extracting text from PDF '{pdf_path}': {str(e)}")
        raise Exception(f"Failed to extract text from the PDF: {str(e)}")

def generate_questions_with_groq(syllabus_text, pyq_text):
    try:
        # Create a payload for the Groq API
        prompt_content = f"""
            You are an expert question paper setter. Based on the following syllabus and previous question papers, generate a question paper with:
            - 10 questions, each having one or more parts (sub-parts).
            - Students must attempt any 5 questions.
            - Each question carries 10 marks in total.

            Syllabus:
            {syllabus_text[:2000]}

            Previous Questions:
            {pyq_text[:2000]}

            Format the response as a JSON object:
            {{
                "title": "Model Question Paper",
                "duration": "3 Hours",
                "max_marks": 50,
                "sections": [
                    {{
                        "name": "Section A - Answer Any 5 Questions",
                        "questions": [
                            "1. Question text (a) Sub-part 1, (b) Sub-part 2 (10 marks)",
                            "2. Question text (a) Sub-part 1, (b) Sub-part 2 (10 marks)",
                            "3. Question text (a) Sub-part 1, (b) Sub-part 2 (10 marks)",
                            "4. Question text (a) Sub-part 1, (b) Sub-part 2 (10 marks)",
                            "5. Question text (a) Sub-part 1, (b) Sub-part 2 (10 marks)",
                            "6. Question text (a) Sub-part 1, (b) Sub-part 2 (10 marks)",
                            "7. Question text (a) Sub-part 1, (b) Sub-part 2 (10 marks)",
                            "8. Question text (a) Sub-part 1, (b) Sub-part 2 (10 marks)",
                            "9. Question text (a) Sub-part 1, (b) Sub-part 2 (10 marks)",
                            "10. Question text (a) Sub-part 1, (b) Sub-part 2 (10 marks)"
                        ],
                        "marks_per_question": 10
                    }}
                ]
            }}

            Important:
            - Clearly label each question as "1.", "2.", etc.
            - Include sub-parts labeled as (a), (b), etc., ensuring the total marks for each question equal 10.
            - Include instructions at the top of the section: "Answer any 5 questions out of 10."
        """
        payload = {
            "model": "mixtral-8x7b-32768",
            "messages": [
                {
                    "role": "system",
                    "content": "You are an expert question paper setter. Format each question as a string with question number and marks."
                },
                {
                    "role": "user",
                    "content": prompt_content
                }
            ],
            "temperature": 0.7,
            "max_tokens": 1500
        }

        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        }

        response = requests.post(GROQ_API_ENDPOINT, headers=headers, json=payload, timeout=30)
        
        logging.info(f"Groq API Response Status: {response.status_code}")
        logging.info(f"Groq API Response Headers: {response.headers}")
        logging.info(f"Groq API Response Text: {response.text}")

        if response.status_code != 200:
            raise Exception(f"Unexpected Error: {response.status_code} - {response.text}")

        # Process the response
        response_data = response.json()
        if 'choices' in response_data and len(response_data['choices']) > 0:
            generated_text = response_data['choices'][0]['message']['content']
            try:
                json_response = json.loads(generated_text)
                
                # Transform any object questions into strings if needed
                for section in json_response['sections']:
                    questions = section['questions']
                    for i, question in enumerate(questions):
                        if isinstance(question, dict):
                            # Convert object format to string format
                            questions[i] = f"{question['number']}. {question['text']} ({question['marks']} marks)"
                
                return json_response

            except json.JSONDecodeError:
                logging.error("Failed to parse generated text as JSON")
                raise Exception("Generated response was not in valid JSON format")
        else:
            raise Exception("No valid response content received from Groq API")

    except Exception as e:
        logging.error(f"Error in Groq question generation: {str(e)}")
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
        # Check if files are in the request
        if 'syllabus_pdf' not in request.files or 'pyq_pdf' not in request.files:
            return jsonify({'message': 'Both syllabus and PYQ PDF files are required.'}), 400

        syllabus_pdf = request.files['syllabus_pdf']
        pyq_pdf = request.files['pyq_pdf']

        # Check if files are selected
        if syllabus_pdf.filename == '' or pyq_pdf.filename == '':
            return jsonify({'message': 'No files were selected. Please upload both files.'}), 400

        # Validate file types
        if not (allowed_file(syllabus_pdf.filename) and allowed_file(pyq_pdf.filename)):
            return jsonify({'message': 'Invalid file format. Only PDF files are allowed.'}), 400

        # Save files
        syllabus_filename = secure_filename(syllabus_pdf.filename)
        pyq_filename = secure_filename(pyq_pdf.filename)
        syllabus_path = os.path.join(app.config['UPLOAD_FOLDER'], syllabus_filename)
        pyq_path = os.path.join(app.config['UPLOAD_FOLDER'], pyq_filename)
        syllabus_pdf.save(syllabus_path)
        pyq_pdf.save(pyq_path)

        # Extract text
        syllabus_text = extract_text_from_pdf(syllabus_path)
        pyq_text = extract_text_from_pdf(pyq_path)

        # Generate question paper
        question_paper = generate_questions_with_groq(syllabus_text, pyq_text)
        logging.info(f"Generated Question Paper: {question_paper}")

        return jsonify({
            'message': 'Files processed and question paper generated successfully!',
            'extracted_text': {
                'syllabus': syllabus_text,
                'pyq': pyq_text
            },
            'question_paper': question_paper
        }), 200

    except ValueError as ve:
        logging.error(f'Validation Error: {str(ve)}')
        return jsonify({'message': f'Validation Error: {str(ve)}'}), 400

    except Exception as e:
        logging.error(f'Error in upload_files: {str(e)}')
        return jsonify({'message': f'Error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)