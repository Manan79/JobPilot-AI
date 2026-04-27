from main_structure import ResumeData
from cover_letter import *
from resume_analyser import *
from positive_feedback import *
from negative_feedback import *
from langgraph.graph import StateGraph, START, END
from IPython.display import display, Markdown , Image


def pdf_read(state: ResumeData) -> ResumeData:
    pass
graph = StateGraph(ResumeData)

graph.add_node('Reading PDF', pdf_read)
graph.add_node('Analyzing Resume', analyze_resume)
graph.add_node("Cover Letter Generator", cover_letter_generator)
graph.add_node("Resume Improvement", resume_improvement)
graph.add_node("Feedback Generator", feedback_generator)


graph.add_edge(START, 'Reading PDF')
graph.add_edge('Reading PDF', 'Analyzing Resume')
graph.add_conditional_edges('Analyzing Resume', routing_condition)
graph.add_edge("Feedback Generator", END)
graph.add_edge("Cover Letter Generator", END)
graph.add_edge("Resume Improvement", END)



workflow = graph.compile()


# result = workflow.invoke({'Resume': resume_text, 'JD': job_description})

# result = workflow.steam({'Resume': resume_text, 'JD': job_description})

# for step in workflow.stream({'Resume': resume_text, 'JD': job_description}):
#     for node, output in step.items():
#         print(f"\n🔹 Node: {node}")
#         print(output)