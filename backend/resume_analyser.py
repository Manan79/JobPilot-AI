from main_structure import *
from typing_extensions import Literal

class ResumeAnalyzer(BaseModel):
    score: int = Field(..., ge=0, le=100)
    advantages: list[str] = Field(..., min_length=1)
    disadvantages: list[str] = Field(..., min_length=1)


resume_analyzer_model = model_openai.with_structured_output(ResumeAnalyzer)

# analyze_resume() prompt

prompt = """ 
You are an expert resume analyst and hiring specialist with years of experience evaluating candidates across various industries.

You will be provided with:
1. A **Job Description (JD)**
2. A **Candidate's Resume**

Your task is to thoroughly analyze both and return a structured evaluation.

---

### INSTRUCTIONS:

Carefully read the Job Description and Resume, then evaluate the following:

1. **Match Score (0-100)**
   - Calculate a numeric score representing how well the resume matches the job description.
   - Base it on: skills match, experience relevance, education, certifications, and keywords.

2. **Advantages**
   - List the strong points of the candidate that align well with the JD.
   - Be specific and reference actual content from the resume.

3. **Disadvantages**
   - List the gaps, missing skills, or mismatches between the resume and JD.
   - Be specific and constructive.

---

### INPUT:

**Job Description:**
{job_description}

**Resume:**
{resume}

---

### OUTPUT FORMAT (Strict JSON only, no extra text):

{{
  "score": <integer 0-100>,
  "advantages": [
    "<advantage 1>",
    "<advantage 2>",
    ...
  ],
  "disadvantages": [
    "<disadvantage 1>",
    "<disadvantage 2>",
    ...
  ]
}}


 """

def pdf_read(state: ResumeData) -> ResumeData:
    return state

def analyze_resume(state: ResumeData) -> ResumeData:
    # Analyze the rsume using the prompt and return the structured output.
    # For demonstration, I'm returning a dummy response.
    result = resume_analyzer_model.invoke(prompt.format(job_description=state["JD"], resume=state["Resume"]))
    return {'advantages': result.advantages, 'disadvantages': result.disadvantages, 'score': result.score}
    
    

def routing_condition(state: ResumeData) -> Literal["Cover Letter Generator" , "Feedback Generator"]:
    if state["score"] >= 75:
        return "Cover Letter Generator"
    else:
        return "Feedback Generator"
    
    
    