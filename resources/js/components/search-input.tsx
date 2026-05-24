import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import React from 'react';

interface SearchInputProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    onSearch: () => void;
    placeholder?: string;
    type?: string;
}

export function SearchInput({
    label,
    value,
    onChange,
    onSearch,
    placeholder = 'Buscar...',
    type = 'text',
}: SearchInputProps) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onSearch();
        }
    };

    return (
        <div>
            {label && (
                <div className="flex items-center gap-1 my-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {label}
                    </label>
                </div>
            )}
            <div className="flex">
                <Input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="rounded-r-none focus-visible:z-10 bg-white dark:bg-transparent"
                />
                <Button
                    type="button"
                    onClick={onSearch}
                    className="rounded-l-none flex items-center gap-2"
                >
                    <Search className="h-4 w-4" />
                    Buscar
                </Button>
            </div>
        </div>
    );
}
