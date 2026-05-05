import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressiveListProps {
  items: string[];
  variant: "advantage" | "disadvantage";
  loading: boolean;
  emptyMessage?: string;
}

export const ProgressiveList = ({
  items,
  variant,
  loading,
  emptyMessage = "Waiting for insights…",
}: ProgressiveListProps) => {
  const isAdv = variant === "advantage";
  const Icon = isAdv ? Check : X;

  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 rounded-xl border border-border/60 bg-secondary/40 p-3 animate-fade-in-up"
          style={{ animationDelay: `${Math.min(i * 60, 300)}ms` }}
        >
          <div
            className={cn(
              "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md",
              isAdv ? "bg-success/15 text-success" : "bg-danger/15 text-danger",
            )}
          >
            <Icon className="h-3.5 w-3.5" strokeWidth={3} />
          </div>
          <p className="text-sm leading-relaxed text-foreground">{item}</p>
        </li>
      ))}

      {loading && (
        <li className="flex items-start gap-3 rounded-xl border border-border/60 bg-secondary/30 p-3">
          <div className="mt-0.5 h-6 w-6 shrink-0 animate-pulse rounded-md bg-secondary" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-4/5 animate-pulse rounded bg-secondary" />
            <div className="h-3 w-3/5 animate-pulse rounded bg-secondary" />
          </div>
        </li>
      )}

      {!loading && items.length === 0 && (
        <li className="rounded-xl border border-dashed border-border/60 p-4 text-center text-sm text-muted-foreground">
          {emptyMessage}
        </li>
      )}
    </ul>
  );
};
