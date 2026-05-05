from backend.main_structure import *
from pydantic import BaseModel, Field


from typing import List

class SectionFeedback(BaseModel):
    skills: str = Field(description="Specific suggestions to improve skills section")
    work_experience: str = Field(description="Specific suggestions to improve experience section")
    education_certifications: str = Field(description="Suggestions for education or certifications to add")
    projects: str = Field(description="Suggestions for projects section")
    formatting_ats: str = Field(description="ATS and formatting improvement tips")
    missing_keywords: List[str] = Field(description="List of important keywords missing from the resume")


class FeedbackOutput(BaseModel):
    score_explanation: str = Field(description="Why the candidate received this score")
    section_feedback: SectionFeedback = Field(description="Section wise feedback for the resume")
    priority_actions: List[str] = Field(description="Top 3 most impactful changes the candidate should make")
    encouragement: str = Field(description="Short motivating closing note")

feedback_generator_prompt = """
You are an expert career coach and resume consultant with deep knowledge 
of hiring processes, ATS systems, and recruiter expectations across industries.

You will be provided with:
1. A **Job Description (JD)**
2. A **Candidate's Resume**
3. A **Resume Analysis** (score, advantages, disadvantages)

Your task is to generate detailed, actionable feedback explaining 
why the candidate scored the way they did and exactly how they 
can improve their resume to better match the job description.

---

### INSTRUCTIONS:

1. **Score Explanation**
   - Clearly explain what factors led to the current score
   - Break down which areas pulled the score down the most
   - Be honest but constructive

2. **Section-Wise Improvement Suggestions**
   Analyze and suggest improvements for each of these resume sections 
   (only include sections relevant to the JD):
   - Skills
   - Work Experience
   - Education & Certifications
   - Projects
   - Resume Formatting & ATS Optimization
   - Keywords & Buzzwords missing from the resume

3. **Priority Actions**
   - List the TOP 3 most impactful changes the candidate should 
     make immediately to increase their match score

4. **Encouragement**
   - End with a short motivating note that keeps the tone 
     supportive and forward-looking

---

### INPUT:

**Job Description:**
{job_description}

**Resume:**
{resume}

**Resume Analysis:**
- Match Score: {score}
- Advantages: {advantages}
- Disadvantages: {disadvantages}

---

### OUTPUT FORMAT (Strict JSON only, no extra text):

{{
  "score_explanation": "<Why the candidate received this score>",
  "section_feedback": {{
    "skills": "<Specific suggestions to improve skills section>",
    "work_experience": "<Specific suggestions to improve experience section>",
    "education_certifications": "<Suggestions for education or certifications to add>",
    "projects": "<Suggestions for projects section>",
    "formatting_ats": "<ATS and formatting improvement tips>",
    "missing_keywords": [
      "<keyword 1>",
      "<keyword 2>",
      ...
    ]
  }},
  "priority_actions": [
    "<Most impactful action 1>",
    "<Most impactful action 2>",
    "<Most impactful action 3>"
  ],
  "encouragement": "<Short motivating closing note>"
}}

"""

feedback_model = model_groq.with_structured_output(FeedbackOutput)

def feedback_generator(state: ResumeData):
    result = feedback_model.invoke(feedback_generator_prompt.format(job_description=state["JD"], resume=state["Resume"], score=state["score"], advantages=state["advantages"], disadvantages=state["disadvantages"]))
    return {"feedback": result}

