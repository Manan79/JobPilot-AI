from main_structure import ResumeData
from cover_letter import *
from resume_analyser import *
from feedback import *
from langgraph.graph import StateGraph, START, END
from IPython.display import display, Markdown , Image


graph = StateGraph(ResumeData)

graph.add_node('Reading PDF', pdf_read)
graph.add_node('Analyzing Resume', analyze_resume)
graph.add_node("Cover Letter Generator", cover_letter_generator)
graph.add_node("Feedback Generator", feedback_generator)


graph.add_edge(START, 'Reading PDF')
graph.add_edge('Reading PDF', 'Analyzing Resume')
graph.add_conditional_edges('Analyzing Resume', routing_condition)
graph.add_edge("Feedback Generator", END)
graph.add_edge("Cover Letter Generator", END)




workflow = graph.compile()


JD = """ Position: Senior Machine Learning Engineer
Company: TechCorp AI Solutions

About the Role:
We are looking for a Senior Machine Learning Engineer to join our 
AI team and lead the development of production-grade ML systems.

Requirements:
- 5+ years of experience in Machine Learning / Deep Learning
- Strong proficiency in Python, TensorFlow, PyTorch
- Experience with MLOps tools (MLflow, Kubeflow, Airflow)
- Hands-on experience with LLMs, Transformer architectures
- Experience deploying ML models on AWS/GCP/Azure
- Strong knowledge of Docker, Kubernetes
- Experience with distributed training (Horovod, Ray)
- Proficiency in SQL and NoSQL databases
- Strong understanding of NLP pipelines
- Experience leading a team of 3+ engineers
- Publications or contributions to ML research is a plus

Responsibilities:
- Design and deploy scalable ML pipelines
- Lead a team of junior ML engineers
- Collaborate with product and data teams
- Optimize model performance in production
- Research and implement state-of-the-art ML techniques """


resume = """ Name: Rohit Sharma
Email: rohit.sharma@email.com
Phone: +91-9876543210
Location: Delhi, India

OBJECTIVE:
Hardworking and enthusiastic fresher looking for opportunities 
to grow in the IT industry.

EDUCATION:
B.Com (Bachelor of Commerce)
Delhi University | 2020 - 2023
CGPA: 6.8 / 10

12th Standard - CBSE Board | 2020 | 65%
10th Standard - CBSE Board | 2018 | 72%

SKILLS:
- MS Excel (Intermediate)
- Tally ERP
- Basic Computer Knowledge
- MS Word, PowerPoint
- Good Communication Skills

WORK EXPERIENCE:
Accounts Intern | ABC Traders, Delhi | June 2023 - Dec 2023
- Maintained daily ledger entries
- Assisted in GST filing and invoice management
- Prepared monthly financial reports in Excel

PROJECTS:
- Created a monthly expense tracker in Excel
- Made a PowerPoint presentation on Digital Marketing 
  trends for college fest

CERTIFICATIONS:
- Tally ERP 9 Certification | 2023
- MS Office Certification | NIIT | 2022

HOBBIES:
Cricket, Listening to Music, Travelling

LANGUAGES:
English, Hindi """





# result = workflow.invoke({'Resume': resume_text, 'JD': job_description})

# result = workflow.steam({'Resume': resume_text, 'JD': job_description})

# for step in workflow.stream({'Resume': resume, 'JD': JD}):
#     for node, output in step.items():
#         print(f"\n🔹 Node: {node}")
#         print(output)