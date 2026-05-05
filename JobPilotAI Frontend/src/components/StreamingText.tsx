import { useEffect, useRef } from "react";
import { Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface StreamingTextProps {
  text: string;
  streaming: boolean;
  hasStarted: boolean;
}

export const StreamingText = ({ text, streaming, hasStarted }: StreamingTextProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && streaming) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [text, streaming]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    toast.success("Cover letter copied");
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cover-letter.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded");
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {streaming && (
            <span className="flex h-2 w-2 rounded-full bg-primary-glow animate-pulse-glow" />
          )}
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {streaming ? "Generating…" : hasStarted ? "Complete" : "Idle"}
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            disabled={!text}
            className="h-8 gap-1.5 text-xs"
          >
            <Copy className="h-3.5 w-3.5" /> Copy
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDownload}
            disabled={!text}
            className="h-8 gap-1.5 text-xs"
          >
            <Download className="h-3.5 w-3.5" /> Download
          </Button>
        </div>
      </div>

      <div
        ref={ref}
        className={cn(
          "scroll-fade-mask flex-1 overflow-y-auto rounded-xl border border-border/60 bg-background/40 p-5",
          "text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap font-mono",
          "min-h-[260px] max-h-[420px]",
        )}
      >
        {text ? (
          <span className={streaming ? "typing-cursor" : ""}>{text}</span>
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground text-center">
            {hasStarted ? (
              <div className="space-y-2 w-full">
                <div className="h-3 w-11/12 animate-pulse rounded bg-secondary" />
                <div className="h-3 w-10/12 animate-pulse rounded bg-secondary" />
                <div className="h-3 w-9/12 animate-pulse rounded bg-secondary" />
              </div>
            ) : (
              <p className="text-sm">Your tailored cover letter will appear here.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
