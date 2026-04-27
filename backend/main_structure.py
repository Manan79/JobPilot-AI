from typing_extensions import TypedDict
from langchain_openai import ChatOpenAI
from langchain_groq import ChatGroq
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv

load_dotenv()
import os

class ResumeData(TypedDict):
    JD: str
    Resume: str
    score: int
    advantages: list[str]
    disadvantages: list[str]
    cover_letter: str
    feedback: list[str]
    verdict: str


# print(os.getenv("GROQ_API_KEY"))
# print(os.getenv("OPENAI_API_KEY"))
# print(os.getenv("GOOGLE_API_KEY"))

model_openai = ChatOpenAI(model="gpt-4o-mini" , streaming=True, temperature=0.0, api_key=os.getenv("OPENAI_API_KEY"))
model_groq = ChatGroq(model="llama-3.3-70b-versatile", temperature=0.0 , streaming=True)
model_google = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.0 , streaming=True, api_key=os.getenv("GOOGLE_API_KEY"))


