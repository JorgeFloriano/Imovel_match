import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SocialButtonProps {
    href: string;
    icon: ReactNode;
    label: string;
    className?: string;
}

export default function SocialButton({ href, icon, label, className }: SocialButtonProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "z-50 flex items-center justify-center gap-0 md:gap-3 w-14 md:w-auto md:px-6 h-14 bg-pc-blue/80 backdrop-blur-md text-white rounded-full shadow-[0_4px_14px_0_rgba(18,50,81,0.39)] hover:scale-105 transition-all duration-300 hover:shadow-[0_6px_20px_rgba(18,50,81,0.23)] hover:bg-pc-blue/95 group",
                className
            )}
            aria-label={label}
        >
            <div className="group-hover:scale-110 transition-transform flex items-center justify-center">
                {icon}
            </div>
            <span className="hidden md:inline font-bold text-sm tracking-wide">{label}</span>
        </a>
    );
}
