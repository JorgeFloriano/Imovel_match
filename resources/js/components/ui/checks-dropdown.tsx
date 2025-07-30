import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-dropdown-menu';
import { useState, useEffect, useRef } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';

interface ChecksDropdownProps {
    label: string;
    placeholder?: string;
    customOptions?: { value: string; label: string }[];
    value?: Record<string, boolean>;
    onChange?: (selectedOptions: Record<string, boolean>) => void;
}

export default function ChecksDropdown({
    label,
    placeholder,
    customOptions = [],
    value = {},
    onChange,
}: ChecksDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [internalSelected, setInternalSelected] = useState<Record<string, boolean>>({});

    // Initialize internal state only once when component mounts
    useEffect(() => {
        if (customOptions.length > 0) {
            const initialState: Record<string, boolean> = {};
            customOptions.forEach(option => {
                initialState[option.value] = value?.[option.value] || false;
            });
            setInternalSelected(initialState);
        }
    }, [customOptions, value]); // Empty dependency array to run only once

    // Handle external value changes
    useEffect(() => {
        if (value && JSON.stringify(value) !== JSON.stringify(internalSelected)) {
            setInternalSelected(value);
        }
    }, [internalSelected, value]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionChange = (optionValue: string) => {
        const newSelected = {
            ...internalSelected,
            [optionValue]: !internalSelected[optionValue]
        };
        
        setInternalSelected(newSelected);
        
        if (onChange) {
            onChange(newSelected);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getDisplayText = () => {
        const selectedLabels = customOptions
            .filter(option => internalSelected[option.value])
            .map(option => option.label);

        if (selectedLabels.length === 0) return placeholder || "Select options";
        if (selectedLabels.length <= 2) return selectedLabels.join(", ");
        return `${selectedLabels.length} selecionadas`;
    };

    return (
        <div className="relative inline-block text-left w-full" ref={dropdownRef}>
            <div>
                <div className="pb-2.5 text-sm">
                    <Label>{label}</Label>
                </div>

                <button
                    type="button"
                    onClick={toggleDropdown}
                    className={cn(
                        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&>span]:line-clamp-1"
                    )}
                    id="options-menu"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                >
                    <span className="truncate">{getDisplayText()}</span>
                    <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-gray-300 ring-opacity-5 focus:outline-none z-10 max-h-60 overflow-y-auto"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                >
                    <div className="py-1" role="none">
                        {customOptions.map((option) => (
                            <label
                                key={option.value}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer gap-3"
                            >
                                <CheckboxPrimitive.Root
                                    className="peer border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
                                    checked={internalSelected[option.value] || false}
                                    onCheckedChange={() => handleOptionChange(option.value)}
                                >
                                    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current transition-none">
                                        <CheckIcon className="size-3.5" />
                                    </CheckboxPrimitive.Indicator>
                                </CheckboxPrimitive.Root>
                                <span>{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}