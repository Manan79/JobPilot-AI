import { useCallback, useRef, useState } from "react";
import { Upload, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const ACCEPTED = [".pdf", ".docx"];

export const FileUpload = ({ file, onFileChange }: FileUploadProps) => {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validate = useCallback((f: File) => {
    const ext = "." + f.name.split(".").pop()?.toLowerCase();
    return ACCEPTED.includes(ext);
  }, []);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const f = files[0];
    if (validate(f)) onFileChange(f);
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-muted-foreground">Resume</label>

      {!file ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "group relative cursor-pointer rounded-2xl border border-dashed p-8 text-center transition-all duration-300",
            "bg-gradient-card hover:border-primary/60 hover:shadow-glow",
            dragging ? "border-primary bg-primary/5 scale-[1.01]" : "border-border",
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow transition-transform duration-300 group-hover:scale-110">
            <Upload className="h-6 w-6 text-primary-foreground" />
          </div>
          <p className="text-base font-semibold text-foreground">
            Drop your resume here
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            or click to browse · PDF, DOCX · max 10MB
          </p>
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-gradient-card p-4 animate-scale-in">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <FileText className="h-5 w-5 text-primary-glow" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {(file.size / 1024).toFixed(1)} KB · ready to analyze
            </p>
          </div>
          <button
            onClick={() => onFileChange(null)}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Remove file"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};
