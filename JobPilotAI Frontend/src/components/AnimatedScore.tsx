import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedScoreProps {
  value: number | null;
  loading: boolean;
}

export const AnimatedScore = ({ value, loading }: AnimatedScoreProps) => {
  const [display, setDisplay] = useState(0);
  const target = value ?? 0;

  useEffect(() => {
    if (value == null) {
      setDisplay(0);
      return;
    }
    let start: number | null = null;
    const duration = 1200;
    const from = 0;
    const step = (ts: number) => {
      if (start == null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (target - from) * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [value, target]);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const progress = value == null ? 0 : (display / 100) * circumference;

  const tone =
    display >= 80 ? "hsl(var(--success))"
      : display >= 60 ? "hsl(var(--primary-glow))"
      : "hsl(var(--danger))";

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative h-44 w-44">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 160 160">
          <circle
            cx="80" cy="80" r={radius}
            fill="none"
            stroke="hsl(var(--secondary))"
            strokeWidth="10"
          />
          <circle
            cx="80" cy="80" r={radius}
            fill="none"
            stroke={tone}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            style={{ transition: "stroke-dashoffset 100ms linear, stroke 400ms ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {loading && value == null ? (
            <div className="h-10 w-20 animate-pulse rounded-md bg-secondary" />
          ) : value == null ? (
            <span className="text-3xl font-display font-bold text-muted-foreground">—</span>
          ) : (
            <>
              <span
                className={cn(
                  "text-5xl font-display font-bold tracking-tight tabular-nums",
                )}
                style={{ color: tone }}
              >
                {display}
              </span>
              <span className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                / 100
              </span>
            </>
          )}
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        {value == null
          ? "Awaiting analysis"
          : display >= 80
            ? "Excellent match"
            : display >= 60
              ? "Solid match"
              : "Needs improvement"}
      </p>
    </div>
  );
};
