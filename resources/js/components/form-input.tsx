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
            <div className="flex items-center gap-1 my-2">
                {required && <span className="inline-block h-1 w-1 rounded-full bg-red-600" />}
                <Label>{label}</Label>
            </div>
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
