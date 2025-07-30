// components/form-select.tsx
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    required = false,
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
            {label && (
                <div className="flex items-center gap-1 my-2">
                    {required && <span className="inline-block h-1 w-1 rounded-full bg-red-600" />}
                    <Label>{label}</Label>
                </div>
            )}
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
