import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={cn(
        "relative inline-flex h-9 w-16 items-center rounded-full border border-border bg-secondary/60 p-1 transition-colors duration-300",
        "hover:border-primary/50",
      )}
    >
      <span
        className={cn(
          "absolute flex h-7 w-7 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow transition-transform duration-300",
          isDark ? "translate-x-0" : "translate-x-7",
        )}
      >
        {isDark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
      </span>
      <span className="ml-1 flex w-full justify-between px-1.5 text-muted-foreground">
        <Moon className={cn("h-3 w-3 transition-opacity", isDark ? "opacity-0" : "opacity-60")} />
        <Sun className={cn("h-3 w-3 transition-opacity", isDark ? "opacity-60" : "opacity-0")} />
      </span>
    </button>
  );
};
