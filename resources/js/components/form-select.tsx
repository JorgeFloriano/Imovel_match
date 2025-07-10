/// components/form-select.tsx
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';
  import { Label } from '@/components/ui/label';
  
  interface FormSelectProps {
    label?: string;
    value: string | boolean;
    onValueChange: (value: string) => void;
    options?: Record<string, string>;
    customOptions?: { value: string; label: string }[];
    placeholder?: string;
    error?: string;
    className?: string;
    numeric?: boolean;
    required?: boolean;
  }
  
  export function FormSelect({
    label,
    value,
    onValueChange,
    options,
    customOptions,
    placeholder = 'Opções',
    error,
    className,
    numeric = false,
  }: FormSelectProps) {
    // Handle boolean values by converting to string
    const stringValue = typeof value === 'boolean' ? value.toString() : value;

    const handleValueChange = (value: string) => {
      if (numeric) {
        onValueChange(value === '' ? '' : String(Number(value)));
      } else {
        onValueChange(value);
      }
    };
  
    return (
      <div className={className}>
        <Label>{label}</Label>
        <Select value={stringValue} onValueChange={handleValueChange}>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options &&
              Object.entries(options).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            {customOptions &&
              customOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }