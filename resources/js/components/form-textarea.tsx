// components/form-textarea.tsx
import { Label } from '@/components/ui/label';

interface FormTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
  rows?: number;
}

export function FormTextarea({
  label,
  value,
  onChange,
  error,
  className,
  rows = 3,
}: FormTextareaProps) {
  return (
    <div className={className}>
      <Label>{label}</Label>
      <textarea
        className="w-full rounded-md border p-2"
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}