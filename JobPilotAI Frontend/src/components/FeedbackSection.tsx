import {
  BookOpen,
  Briefcase,
  Code,
  FileText,
  FolderKanban,
  Lightbulb,
  Rocket,
  Search,
  Star,
} from "lucide-react";
import { ResultCard } from "@/components/ResultCard";
import type { FeedbackOutput } from "@/hooks/useAnalysisStream";

interface FeedbackSectionProps {
  feedback: FeedbackOutput;
}

const sectionItems = [
  { key: "skills" as const, label: "Skills", icon: Code },
  { key: "work_experience" as const, label: "Work Experience", icon: Briefcase },
  { key: "education_certifications" as const, label: "Education & Certifications", icon: BookOpen },
  { key: "projects" as const, label: "Projects", icon: FolderKanban },
  { key: "formatting_ats" as const, label: "Formatting & ATS", icon: FileText },
];

export const FeedbackSection = ({ feedback }: FeedbackSectionProps) => {
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Score Explanation */}
      <ResultCard
        title="Why this score?"
        accent="danger"
        icon={<Lightbulb className="h-4 w-4" />}
      >
        <p className="text-sm leading-relaxed text-foreground/90">
          {feedback.score_explanation}
        </p>
      </ResultCard>

      {/* Section-wise Feedback */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sectionItems.map(({ key, label, icon: Icon }) => (
          <div
            key={key}
            className="rounded-2xl border border-border/60 bg-gradient-card p-5 shadow-soft animate-fade-in-up"
          >
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary-glow">
                <Icon className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-semibold text-foreground">{label}</h4>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {feedback.section_feedback[key]}
            </p>
          </div>
        ))}
      </div>

      {/* Missing Keywords */}
      <ResultCard
        title="Missing Keywords"
        accent="danger"
        icon={<Search className="h-4 w-4" />}
      >
        <div className="flex flex-wrap gap-2">
          {feedback.section_feedback.missing_keywords.map((kw) => (
            <span
              key={kw}
              className="inline-flex items-center rounded-full border border-danger/30 bg-danger/10 px-3 py-1 text-xs font-medium text-danger"
            >
              {kw}
            </span>
          ))}
        </div>
      </ResultCard>

      {/* Priority Actions */}
      <ResultCard
        title="Priority Actions"
        accent="primary"
        icon={<Rocket className="h-4 w-4" />}
      >
        <ol className="space-y-3">
          {feedback.priority_actions.map((action, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl border border-border/60 bg-secondary/40 p-3"
            >
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                {i + 1}
              </div>
              <p className="text-sm leading-relaxed text-foreground">{action}</p>
            </li>
          ))}
        </ol>
      </ResultCard>

      {/* Encouragement */}
      <ResultCard
        title="Keep Going!"
        accent="success"
        icon={<Star className="h-4 w-4" />}
      >
        <p className="text-sm leading-relaxed text-foreground/90 italic">
          {feedback.encouragement}
        </p>
      </ResultCard>
    </div>
  );
};
