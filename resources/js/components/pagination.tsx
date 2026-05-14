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
        <div className={cn("flex flex-wrap items-center justify-center gap-8", className)}>
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
                        className={cn(
                            "flex items-center justify-center w-8 h-8 rounded-full font-bold transition-all duration-300",
                            "border-none text-sm",
                            link.active 
                                ? "bg-pc-blue text-white shadow-md shadow-pc-blue/20" 
                                : "bg-white dark:bg-zinc-900 text-zinc-500 hover:bg-pc-blue/5 hover:text-pc-blue dark:hover:bg-zinc-800",
                            !link.url && "opacity-50 cursor-not-allowed pointer-events-none"
                        )}
                    >
                        {isFirst ? <ChevronLeft className="h-5 w-5" /> : isLast ? <ChevronRight className="h-5 w-5" /> : label}
                    </Link>
                );
            })}
        </div>
    );
}
