### **Project Documentation: Social Media Content Analyzer**

---

## **Project Overview**
The **Social Media Content Analyzer** is a web application that allows users to upload documents (PDFs or images). It extracts content from these documents, analyzes the sentiment, and provides actionable suggestions to improve social media engagement. The application consists of:
- **Frontend**: A React-based user interface.
- **Backend**: A FastAPI server for processing and analyzing content.

---

## **Features**
1. **File Upload**: Supports PDF and image uploads (PNG, JPG, TIFF).
2. **Content Extraction**:
   - Extracts text from PDF files.
   - Uses OCR to extract text from images.
3. **Sentiment Analysis**:
   - Analyzes the sentiment (positive, negative, or neutral) of the extracted text.
4. **Engagement Suggestions**:
   - Provides recommendations to improve social media content.
5. **Full-Stack Integration**:
   - The frontend and backend are integrated into a single deployable application.

---

## **How It Works**

### **Frontend**
1. Users upload a file via the React interface.
2. The file is sent to the backend via a `POST` request.
3. The backend processes the file and returns:
   - Extracted text.
   - Sentiment analysis.
   - Engagement suggestions.
4. The frontend displays the results in an easy-to-read format.

---

### **Backend**
1. **File Handling**:
   - PDF files are processed using `PyPDF2` to extract text.
   - Image files are processed using `pytesseract` (OCR).
2. **Content Analysis**:
   - Extracted text is analyzed for sentiment using `TextBlob`.
   - Suggestions are generated based on the content and sentiment.
3. **Static File Serving**:
   - The React build files are served through FastAPI.

---

## **Setup and Build Process**

### *1. Prerequisites**
- Python 3.10+
- Node.js 16+
- Pip and Virtual Environment (optional)

---




### **. Integration**
Update the FastAPI application to serve the React build files:
```python
from fastapi.staticfiles import StaticFiles

app.mount("/", StaticFiles(directory="build", html=True))
```

---



## **How to Use**
1. Open the deployed application in your browser.
2. Upload a PDF or image file.
3. View:
   - Extracted content.
   - Sentiment analysis results.
   - Engagement suggestions.
4. Use the suggestions to improve your social media posts.

---

## **Project Structure**
```
project/
├── backend/
│   ├── main.py                 # FastAPI backend
│   ├── requirements.txt        # Python dependencies
│   ├── runtime.txt             # Python version for Render
│   └── build/                  # React build files (from frontend)
├── frontend/
│   ├── src/
│   │   ├── App.js              # Main React component
│   │   ├── DocumentProcessor.js # File upload and results display
│   │   └── ...
│   ├── package.json            # React dependencies and scripts
│   └── ...
└── render-build.sh             # Script to install tesseract-ocr
```

---

## **Testing**
1. Test locally with sample PDFs and images.
2. Verify results for:
   - Correct text extraction.
   - Accurate sentiment analysis.
   - Relevant engagement suggestions.
---
## **Run the Peoject**
frontend>npm start
backend>uvicorn main:app –reload
---
This documentation provides a complete overview of your project, from setup to deployment!

