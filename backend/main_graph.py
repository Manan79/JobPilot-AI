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


JD = """
Role Overview

We’re looking for a Frontend Engineer who can turn ideas into fast, clean, and intuitive user interfaces. You’ll work closely with backend and AI teams to build products that feel smooth and responsive, not clunky or over-engineered.

Key Responsibilities
Build responsive and user-friendly web interfaces
Translate UI/UX designs into high-quality code
Integrate APIs and handle real-time data
Optimize performance, loading speed, and responsiveness
Manage state and component architecture effectively
Ensure cross-browser compatibility
Collaborate with backend and AI teams for seamless integration
Required Skills
Strong JavaScript fundamentals
Experience with React (preferred) or similar frameworks
HTML, CSS, and responsive design
API integration (REST / JSON)
State management (Context API / Redux)
Basic understanding of Git and version control
Good to Have
Next.js or similar frameworks
TypeScript
UI libraries (Tailwind CSS, Material UI)
Performance optimization techniques
Basic backend understanding (helps in integration)
What We Care About
You write clean, maintainable UI code
You think about user experience, not just features
You can debug UI issues without getting stuck
You care about performance and real-world usability


"""

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

# result = workflow.stream({'Resume': resume, 'JD': JD})

# for step in workflow.stream({'Resume': resume, 'JD': JD}):
#     for node, output in step.items():
#         print(f"\n🔹 Node: {node}")
#         print(output)