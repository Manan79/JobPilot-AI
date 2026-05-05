import { useState } from "react";
import { Sparkles, RotateCcw, Loader2, ThumbsUp, ThumbsDown, Gauge, FileSignature, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { FileUpload } from "@/components/FileUpload";
import { ResumePreview } from "@/components/ResumePreview";
import { AnimatedScore } from "@/components/AnimatedScore";
import { ProgressiveList } from "@/components/ProgressiveList";
import { StreamingText } from "@/components/StreamingText";
import { ResultCard } from "@/components/ResultCard";
import { FeedbackSection } from "@/components/FeedbackSection";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAnalysisStream } from "@/hooks/useAnalysisStream";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jd, setJd] = useState("");
  const {
    score, advantages, disadvantages, coverLetter, feedback,
    status, error, start, reset,
  } = useAnalysisStream();
  const isLowScore = score !== null && score < 70;

  const isStreaming = status === "streaming";
  const hasStarted = status !== "idle";

  const handleAnalyze = () => {
    if (!file) {
      toast.error("Please upload a resume first");
      return;
    }
    if (jd.trim().length < 20) {
      toast.error("Add a job description (at least 20 characters)");
      return;
    }
    start(file, jd);
  };

  const handleReset = () => {
    reset();
    toast("Cleared", { description: "Ready for a new analysis." });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 glass">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-semibold tracking-tight">
              JobPilot-AI
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-3 py-1 text-xs text-muted-foreground sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              Streaming AI · live
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-glow" />
        <div className="mx-auto max-w-7xl px-6 pt-14 pb-8 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary-glow" />
            Real-time resume analysis
          </div>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
            Land the role with a{" "}
            <span className="gradient-text">resume that fits</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
            Upload your resume, paste a job description, and watch your ATS score,
            strengths, gaps and a tailored cover letter stream in — token by token.
          </p>
        </div>
      </section>

      {/* Inputs + Preview */}
      <main className="mx-auto max-w-7xl px-6 pb-24">
        <section className="grid gap-6 lg:grid-cols-2">
          {/* Inputs */}
          <div className="rounded-2xl border border-border bg-gradient-card p-6 shadow-soft">
            <FileUpload file={file} onFileChange={setFile} />

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-muted-foreground">
                  Job description
                </label>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {jd.length} chars
                </span>
              </div>
              <Textarea
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                placeholder="Paste the full job description here — responsibilities, requirements, nice-to-haves…"
                className="min-h-[220px] resize-none rounded-xl border-border bg-background/50 text-sm leading-relaxed focus-visible:ring-primary/60"
              />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={handleAnalyze}
                disabled={isStreaming}
                size="lg"
                className="group h-12 flex-1 gap-2 rounded-xl bg-gradient-primary text-base font-semibold text-primary-foreground shadow-elegant transition-all duration-300 hover:shadow-glow hover:brightness-110 disabled:opacity-70"
              >
                {isStreaming ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing…
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
                    Analyze Resume
                  </>
                )}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
                disabled={isStreaming}
                className="h-12 gap-2 rounded-xl border-border bg-secondary/40 hover:bg-secondary"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>

            {error && (
              <div className="mt-4 rounded-xl border border-danger/40 bg-danger/10 p-3 text-sm text-danger animate-fade-in">
                {error}
              </div>
            )}
          </div>

          {/* Preview */}
          <ResumePreview file={file} />
        </section>

        {/* Results */}
        {hasStarted && (
          <section className="mt-10 animate-fade-in-up">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  Analysis
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Streaming results in real time.
                </p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <ResultCard
                title="ATS Score"
                accent="primary"
                icon={<Gauge className="h-4 w-4" />}
              >
                <AnimatedScore value={score} loading={isStreaming} />
              </ResultCard>

              <ResultCard
                title="Advantages"
                accent="success"
                icon={<ThumbsUp className="h-4 w-4" />}
              >
                <ProgressiveList
                  items={advantages}
                  variant="advantage"
                  loading={isStreaming && advantages.length < 4}
                />
              </ResultCard>

              <ResultCard
                title="Disadvantages"
                accent="danger"
                icon={<ThumbsDown className="h-4 w-4" />}
              >
                <ProgressiveList
                  items={disadvantages}
                  variant="disadvantage"
                  loading={isStreaming && disadvantages.length < 3}
                />
              </ResultCard>
            </div>

            <div className="mt-6">
              {isLowScore ? (
                feedback ? (
                  <FeedbackSection feedback={feedback} />
                ) : (
                  isStreaming && (
                    <ResultCard title="Generating Feedback" accent="danger" icon={<FileSignature className="h-4 w-4" />}>
                      <div className="space-y-3 py-4">
                        <div className="h-3 w-11/12 animate-pulse rounded bg-secondary" />
                        <div className="h-3 w-9/12 animate-pulse rounded bg-secondary" />
                        <div className="h-3 w-10/12 animate-pulse rounded bg-secondary" />
                      </div>
                    </ResultCard>
                  )
                )
              ) : (
                <ResultCard
                  title="Tailored Cover Letter"
                  accent="primary"
                  icon={<FileSignature className="h-4 w-4" />}
                >
                  <StreamingText
                    text={coverLetter}
                    streaming={isStreaming && coverLetter.length > 0}
                    hasStarted={hasStarted}
                  />
                </ResultCard>
              )}
            </div>
          </section>
        )}

        {!hasStarted && (
          <section className="mt-16 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Briefcase, title: "ATS-aligned", body: "Score how well your resume matches the role." },
              { icon: Sparkles, title: "Streaming insights", body: "Strengths and gaps appear as they're found." },
              { icon: FileSignature, title: "Cover letter", body: "Generate a tailored letter, token by token." },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-border/60 bg-gradient-card p-5 shadow-soft">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary-glow">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="font-semibold">{title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </section>
        )}
      </main>

      <footer className="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
        Built with streaming AI · JobPilot-AI
      </footer>
    </div>
  );
};

export default Index;
