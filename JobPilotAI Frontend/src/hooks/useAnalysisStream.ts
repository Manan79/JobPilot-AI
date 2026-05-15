import { useCallback, useRef, useState } from "react";

export interface SectionFeedback {
  skills: string;
  work_experience: string;
  education_certifications: string;
  projects: string;
  formatting_ats: string;
  missing_keywords: string[];
}

export interface FeedbackOutput {
  score_explanation: string;
  section_feedback: SectionFeedback;
  priority_actions: string[];
  encouragement: string;
}

export interface AnalysisState {
  score: number | null;
  advantages: string[];
  disadvantages: string[];
  coverLetter: string;
  feedback: FeedbackOutput | null;
  status: "idle" | "streaming" | "done" | "error";
  error: string | null;
}

const initial: AnalysisState = {
  score: null,
  advantages: [],
  disadvantages: [],
  coverLetter: "",
  feedback: null,
  status: "idle",
  error: null,
};

interface ApiResponse {
  score: number;
  advantages: string[];
  disadvantages: string[];
  cover_letter?: string;
  feedback?: FeedbackOutput | null;
}

const parseError = async (response: Response) => {
  try {
    const body = await response.json();
    return body.detail || body.error || response.statusText;
  } catch {
    return response.statusText;
  }
};

export function useAnalysisStream() {
  const [state, setState] = useState<AnalysisState>(initial);
  const abortRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setState(initial);
  }, []);

  const start = useCallback(async (file: File, jobDescription: string) => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setState({ ...initial, status: "streaming" });

    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("job_description", jobDescription);

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/analyze-file`, {
        method: "POST",
        body: formData,
        signal: ctrl.signal,
      });

      if (!response.ok) {
        const errorMessage = await parseError(response);
        throw new Error(errorMessage || "Resume analysis failed");
      }

      const data = (await response.json()) as ApiResponse;
      setState({
        score: data.score,
        advantages: data.advantages ?? [],
        disadvantages: data.disadvantages ?? [],
        coverLetter: data.cover_letter ?? "",
        feedback: data.feedback || null,
        status: "done",
        error: null,
      });
    } catch (err) {
      if ((err as DOMException).name === "AbortError") return;
      setState((p) => ({
        ...p,
        status: "error",
        error: (err as Error).message ?? "Something went wrong",
      }));
    }
  }, []);

  return { ...state, start, reset };
}
