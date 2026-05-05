import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  title: string;
  icon?: ReactNode;
  accent?: "primary" | "success" | "danger" | "neutral";
  children: ReactNode;
  className?: string;
}

const accentMap = {
  primary: "before:bg-gradient-primary",
  success: "before:bg-gradient-success",
  danger: "before:bg-gradient-danger",
  neutral: "before:bg-secondary",
};

export const ResultCard = ({
  title,
  icon,
  accent = "neutral",
  children,
  className,
}: ResultCardProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-gradient-card p-6 shadow-soft",
        "before:absolute before:inset-x-0 before:top-0 before:h-px",
        accentMap[accent],
        className,
      )}
    >
      <div className="mb-4 flex items-center gap-2.5">
        {icon && <div className="text-muted-foreground">{icon}</div>}
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
};
