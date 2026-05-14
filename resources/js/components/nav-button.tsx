import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavButtonProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    variant?: 'primary' | 'accent';
}

export default function NavButton({ children, className, variant = 'primary', onClick }: NavButtonProps) {
    const themeClasses = {
        primary: 'bg-pc-blue hover:bg-pc-blue/90 shadow-pc-blue/10',
        accent: 'bg-pc-gold hover:bg-pc-gold/90 shadow-pc-gold/10'
    };

    return (
        <Button 
            onClick={onClick}
            className={cn(
                '!px-6 !py-3 h-auto min-w-max font-extrabold text-white transition-all duration-500 cursor-pointer',
                'hover:scale-105 active:scale-95 hover:shadow-md',
                themeClasses[variant],
                className
            )}
        >
            {children}
        </Button>
    );
}
