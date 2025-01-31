"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader2, UploadIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploadProps {
  onChange: (fileOrUrl: File | string) => void;
  value?: string;
  accept?: string;
  maxSize?: number;
  isUploading?: boolean;
  className?: string;
}

export function FileUpload({
  onChange,
  value,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB
  isUploading = false,
  className
}: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null);
      const file = acceptedFiles[0];
      if (file) {
        if (file.size > maxSize) {
          setError(`File size must be less than ${maxSize / 1024 / 1024}MB`);
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        onChange(file);
      }
    },
    [maxSize, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.svg']
    },
    maxFiles: 1,
    multiple: false
  });

  return (
    <div className={cn("space-y-4 w-full", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer",
          isDragActive && "border-primary bg-accent",
          error && "border-destructive"
        )}
      >
        <Input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
          <UploadIcon className="h-8 w-8" />
          <p className="text-xs">PNG, JPG, SVG up to {maxSize / 1024 / 1024}MB</p>
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {isUploading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <p>Uploading...</p>
        </div>
      )}

      {(preview || value) && !error && (
        <div className="space-y-2">
          <Label>Preview</Label>
          <div className="relative aspect-video w-full rounded-lg border overflow-hidden">
            <Image
              src={preview || value || ''}
              alt="Upload preview"
              fill
              className="object-contain"
            />
          </div>
          {value && (
            <Button
              variant="link"
              className="p-0 h-auto"
              onClick={() => window.open(value, '_blank')}
            >
              View full size
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
