import json
import os
import tempfile
import warnings
from typing import List, Optional

# Suppress Pydantic serialization warnings caused by Langchain's StructuredOutputParser
warnings.filterwarnings("ignore", category=UserWarning, module="pydantic")

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from langchain_community.document_loaders import PyMuPDFLoader

from backend.main_graph import workflow

load_dotenv()

app = FastAPI(title="Resume Analyzer Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def _safe_get(result, key, default=None):
    if isinstance(result, dict):
        return result.get(key, default)
    return getattr(result, key, default)

class AnalyzeRequest(BaseModel):
    resume_text: str
    job_description: str

class AnalysisResponse(BaseModel):
    score: int
    advantages: List[str]
    disadvantages: List[str]
    cover_letter: Optional[str] = None
    feedback: Optional[dict] = None
    # verdict: Optional[str] = None

def extract_text_from_pdf(file) -> str:
    temp_path = None
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            tmp.write(file.read())
            temp_path = tmp.name

        loader = PyMuPDFLoader(temp_path)
        docs = loader.load()
        return docs[0].page_content if docs else ""
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"PDF extraction failed: {exc}")
    finally:
        if temp_path and os.path.exists(temp_path):
            try:
                os.unlink(temp_path)
            except Exception:
                pass


@app.get("/")
def read_root():
    return {"message": "Resume Analyzer backend is running."}


@app.get("/health")
def health_check():
    return {"status": "ok"}


# @app.post("/api/v1/analyze", response_model=AnalysisResponse)
# def analyze_resume_text(request: AnalyzeRequest):
#     state = {"Resume": request.resume_text, "JD": request.job_description}
#     try:
#         result = workflow.invoke(state)
#     except Exception as exc:
#         raise HTTPException(status_code=500, detail=f"Workflow execution failed: {exc}")

#     return AnalysisResponse(
#         score=_safe_get(result, "score", 0),
#         advantages=_safe_get(result, "advantages", []),
#         disadvantages=_safe_get(result, "disadvantages", []),
#         cover_letter=_safe_get(result, "cover_letter"),
#         feedback=_safe_get(result, "feedback"),
#         verdict=_safe_get(result, "verdict"),
#     )


@app.post("/api/v1/analyze-file", response_model=AnalysisResponse)
def analyze_resume_file(resume: UploadFile = File(...), job_description: str = Form(...)):
    if not resume.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")

    resume_text = extract_text_from_pdf(resume.file)
    state = {"Resume": resume_text, "JD": job_description}
    
    try:
        result = workflow.invoke(state)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Workflow execution failed: {exc}")

    feedback_data = _safe_get(result, "feedback")
    feedback_dict = None
    if feedback_data:
        # Convert Pydantic model to dictionary
        if hasattr(feedback_data, "model_dump"):
            feedback_dict = feedback_data.model_dump()
        elif hasattr(feedback_data, "dict"):
            feedback_dict = feedback_data.dict()
        elif isinstance(feedback_data, dict):
            feedback_dict = feedback_data

    return AnalysisResponse(
        score=_safe_get(result, "score", 0),
        advantages=_safe_get(result, "advantages", []),
        disadvantages=_safe_get(result, "disadvantages", []),
        cover_letter=_safe_get(result, "cover_letter"),
        feedback=feedback_dict,
    )





if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
