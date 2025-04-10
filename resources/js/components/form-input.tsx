// components/form-input.tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormInputProps {
  label: string;
  type?: string;
  value: string | number;
  onChange: (value: string | number) => void;
  error?: string;
  className?: string;
  min?: number;
  max?: number;
  maxLength?: number;
  step?: number;
  required?: boolean;
  placeholder?: string;
}

export function FormInput({
  label,
  type = 'text',
  value,
  onChange,
  error,
  className,
  min,
  max,
  maxLength,
  step,
  required = false,
  placeholder,
}: FormInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'number') {
      const numValue = e.target.valueAsNumber;
      onChange(isNaN(numValue) ? '' : numValue);
    } else {
      onChange(e.target.value);
    }
  };

  return (
    <div className={className}>
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        maxLength={maxLength}
        step={step}
        required={required}
        placeholder={placeholder}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}