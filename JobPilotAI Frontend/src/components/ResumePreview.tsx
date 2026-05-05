import { useEffect, useMemo, useState } from "react";
import { FileText } from "lucide-react";

interface ResumePreviewProps {
  file: File | null;
}

export const ResumePreview = ({ file }: ResumePreviewProps) => {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setUrl(null);
      return;
    }
    const u = URL.createObjectURL(file);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);

  const isPdf = useMemo(
    () => file?.name.toLowerCase().endsWith(".pdf"),
    [file],
  );

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-gradient-card shadow-soft overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-success" />
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Preview
          </span>
        </div>
        {file && (
          <span className="truncate text-xs text-muted-foreground max-w-[200px]">
            {file.name}
          </span>
        )}
      </div>

      <div className="relative flex-1 min-h-[420px]">
        {!file && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary animate-float">
              <FileText className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">No resume yet</p>
            <p className="mt-1 text-xs text-muted-foreground max-w-xs">
              Upload a PDF or DOCX file to see a live preview here.
            </p>
          </div>
        )}

        {file && isPdf && url && (
          <iframe
            src={`${url}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
            title="Resume preview"
            className="absolute inset-0 h-full w-full bg-white"
          />
        )}

        {file && !isPdf && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <FileText className="h-7 w-7 text-primary-glow" />
            </div>
            <p className="text-sm font-medium text-foreground">{file.name}</p>
            <p className="mt-1 text-xs text-muted-foreground max-w-xs">
              DOCX preview isn&apos;t supported in-browser, but the file is ready to analyze.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
