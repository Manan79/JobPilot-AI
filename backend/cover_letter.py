from main_structure import *


class CoverLetterOutput(BaseModel):
    subject: str
    cover_letter: str


model_google_cover_letter = model_google.with_structured_output(CoverLetterOutput)

cover_letter_prompt = """ 
You are a professional cover letter writer with expertise in crafting 
compelling, personalized cover letters that get candidates noticed.

You will be provided with:
1. A **Job Description (JD)**
2. A **Candidate's Resume**
3. A **Resume Analysis** (score, advantages, disadvantages)

Your task is to write a professional and tailored cover letter that:
- Highlights the candidate's strengths that match the JD
- Addresses gaps subtly and positively
- Feels human, confident, and genuine — NOT generic or robotic

---

### INSTRUCTIONS:

1. Open with a strong, attention-grabbing introduction
2. In the body, emphasize the advantages identified in the analysis
   that directly align with the job requirements
3. Subtly handle disadvantages by showing willingness to learn
   or transferable skills where applicable
4. Close with a confident call-to-action
5. Keep the tone professional yet personable
6. Length: 3-4 paragraphs, concise and impactful

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
  "subject": "<Email subject line for the cover letter>",
  "cover_letter": "<Full cover letter text with proper paragraphs>"
}}


 """
def cover_letter_generator(state: ResumeData):
    result = model_google_cover_letter.invoke(cover_letter_prompt.format(job_description=state["JD"], resume=state["Resume"], score=state["score"], advantages=state["advantages"], disadvantages=state["disadvantages"]))
    return {"cover_letter": result.cover_letter, "subject": result.subject}