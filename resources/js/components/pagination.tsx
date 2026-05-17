import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: PaginationLink[];
    className?: string;
}

export default function Pagination({ links, className }: PaginationProps) {
    // Only show pagination if there is more than one page
    if (links.length <= 3) return null;

    return (
        <div className={cn("flex items-center justify-between px-4 md:justify-center md:gap-8 w-full max-w-sm md:max-w-none mx-auto md:flex-wrap", className)}>
            {links.map((link, index) => {
                const isFirst = index === 0;
                const isLast = index === links.length - 1;
                
                // Decode HTML entities in labels like &laquo; and &raquo;
                const label = link.label
                    .replace('&laquo; Anterior', '')
                    .replace('Próximo &raquo;', '')
                    .trim();

                if (!link.url && !isFirst && !isLast) return null;

                return (
                    <Link
                        key={index}
                        href={link.url || '#'}
                        preserveScroll
                        onSuccess={() => {
                            const element = document.getElementById('featured-properties');
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        className={cn(
                            "flex shrink-0 items-center justify-center font-bold transition-all duration-300",
                            "border-none text-sm",
                            isFirst || isLast ? "h-12 w-12 rounded-full md:h-8 md:w-8 shadow-sm md:shadow-none bg-white" : "h-8 w-8 rounded-full",
                            link.active 
                                ? "bg-pc-blue text-white shadow-md shadow-pc-blue/20" 
                                : "bg-white text-zinc-500 hover:bg-pc-blue/5 hover:text-pc-blue",
                            !link.url && "opacity-50 cursor-not-allowed pointer-events-none",
                            (!isFirst && !isLast) && "hidden md:flex"
                        )}
                    >
                        {isFirst ? <ChevronLeft className="h-6 w-6 md:h-5 md:w-5" /> : isLast ? <ChevronRight className="h-6 w-6 md:h-5 md:w-5" /> : label}
                    </Link>
                );
            })}
        </div>
    );
}
