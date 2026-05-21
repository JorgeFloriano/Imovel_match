import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavButtonProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    variant?: 'primary' | 'accent';
    isActive?: boolean;
}

export default function NavButton({ children, className, variant = 'primary', onClick, isActive }: NavButtonProps) {
    const themeClasses = {
        primary: 'bg-transparent hover:bg-white/5 shadow-none text-zinc-200',
        accent: 'bg-pc-gold hover:bg-pc-gold/90 shadow-pc-gold/10 text-white'
    };

    return (
        <Button
            onClick={onClick}
            className={cn(
                '!px-4 !py-2 h-auto min-w-max font-bold transition-all duration-300 cursor-pointer relative',
                'hover:text-white',
                themeClasses[variant],
                isActive && '!text-pc-gold',
                className
            )}
            variant="ghost"
        >
            {children}
            {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[3px] bg-pc-gold rounded-t-full" />
            )}
        </Button>
    );
}
