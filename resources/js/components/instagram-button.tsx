import React from 'react';

interface InstagramButtonProps {
    username?: string;
}

export default function InstagramButton({ username = "martadesouzaimobiliaria" }: InstagramButtonProps) {
    const href = `https://instagram.com/${username}`;

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 flex items-center justify-center gap-0 md:gap-3 w-14 md:w-auto md:px-6 h-14 bg-pc-blue/80 backdrop-blur-md text-white rounded-full shadow-[0_4px_14px_0_rgba(18,50,81,0.39)] hover:scale-105 transition-all duration-300 hover:shadow-[0_6px_20px_rgba(18,50,81,0.23)] hover:bg-pc-blue/95 group"
            aria-label="Siga-nos no Instagram"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:scale-110 transition-transform"
            >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
            </svg>
            <span className="hidden md:inline font-bold text-sm tracking-wide">Siga nosso Instagram!</span>
        </a>
    );
}
