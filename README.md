# JobPilot-AI 

An intelligent, multi-LLM powered Resume Analyzer with FastAPI backend and React frontend. It evaluates resumes against job descriptions, providing match scores, and conditionally generating tailored cover letters or actionable feedback based on the candidate's suitability.

## Features

- **Multi-LLM Integration**: Leverages OpenAI (`gpt-4o-mini`), Groq (`llama-3.3-70b-versatile`), and Google Generative AI (`gemini-2.5-flash`) for optimal specialized tasks.
- **Agentic Workflow (LangGraph)**: 
  - Analyzes the resume and calculates a match score.
  - **Score >= 75**: Automatically generates a professional, tailored Cover Letter.
  - **Score < 75**: Provides detailed section-by-section feedback and priority actions to improve the resume.
- **FastAPI Backend**: Exposes RESTful endpoints for easy integration.
- **React Frontend**: Modern, responsive UI built with Vite, TypeScript, and Shadcn/UI.
- **PDF Support**: Extract text directly from uploaded PDF resumes using PyMuPDF.

## Tech Stack

- **Backend**: FastAPI, LangGraph, Langchain
- **Frontend**: React, TypeScript, Vite, Shadcn/UI, Tailwind CSS
- **Language Models**: OpenAI (Analysis), Groq (Feedback), Google GenAI (Cover Letter)
- **PDF Parsing**: PyMuPDF (`pymupdf`)
- **Package Management**: `uv` / `pip` (Python), `npm` (Node.js)

## Project Structure

```text
resume-analyser/
├── backend/
│   ├── main.py                # FastAPI application and routes
│   ├── main_graph.py          # LangGraph workflow definition
│   ├── main_structure.py      # LLM initializations and types
│   ├── resume_analyser.py     # Resume analysis logic (OpenAI)
│   ├── cover_letter.py        # Cover letter generation (Google GenAI)
│   └── feedback.py            # Feedback generation (Groq)
├── JobPilotAI Frontend/
│   ├── src/                   # React application source
│   ├── .env                   # Environment variables (API URL)
│   ├── vite.config.ts         # Vite configuration
│   └── package.json           # Node.js dependencies
├── pyproject.toml             # Python project metadata
└── requirements.txt           # Python dependencies
```

## Setup & Installation

1. **Clone the repository and navigate to the directory:**
   ```bash
   git clone <repo-url>
   cd resume-analyser
   ```

2. **Set up a virtual environment and install dependencies:**
   Using `uv` (recommended):
   ```bash
   uv venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   uv pip install -r requirements.txt
   ```
   *Alternatively, using standard pip:*
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your API keys:
   ```ini
   OPENAI_API_KEY=your_openai_api_key
   GROQ_API_KEY=your_groq_api_key
   GOOGLE_API_KEY=your_google_api_key
   ```

## Running the Application

### Backend (Development)

Start the FastAPI development server:

```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at `http://localhost:8000`.
You can access the interactive Swagger documentation at `http://localhost:8000/docs`.

### Frontend (Development)

```bash
cd "JobPilotAI Frontend"
npm install
npm run dev
```

The frontend will be available at `http://localhost:8080`.

### Production Deployment

#### Backend Deployment
The backend is already deployed at: https://jobpilot-ai-c7ml.onrender.com/docs

#### Frontend Deployment
1. **Build the frontend:**
   ```bash
   cd "JobPilotAI Frontend"
   npm run build
   ```

2. **Deploy the `dist` folder** to any static hosting service (Vercel, Netlify, GitHub Pages, etc.)

3. **Environment Configuration:**
   The frontend is configured to use the live backend API via the `.env` file:
   ```
   VITE_API_BASE_URL=https://jobpilot-ai-c7ml.onrender.com
   ```

## API Endpoints

### 1. Health Check
- **GET** `/health`
- **Response**: `{"status": "ok"}`

### 2. Analyze Text Resume
- **POST** `/api/v1/analyze`
- **Body**: JSON
  ```json
  {
    "resume_text": "Candidate's resume text here...",
    "job_description": "Job description here..."
  }
  ```

### 3. Analyze PDF Resume
- **POST** `/api/v1/analyze-file`
- **Body**: `multipart/form-data`
  - `resume`: PDF File
  - `job_description`: Form Data String

### Response Format

Both analysis endpoints return a structured JSON response:

```json
{
  "score": 85,
  "advantages": ["Strong ML experience", "Python proficient"],
  "disadvantages": ["Missing Kubernetes"],
  "cover_letter": "Dear Hiring Manager...", // Present if score >= 75
  "feedback": null,                         // Present if score < 75
  "verdict": null
}
```
