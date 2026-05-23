import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Link } from '@inertiajs/react';
import { Fragment } from 'react';

export function Breadcrumbs({ breadcrumbs, className, variant = 'default' }: { breadcrumbs: BreadcrumbItemType[], className?: string, variant?: 'default' | 'dark' }) {
    const isDark = variant === 'dark';
    
    return (
        <div className={className}>
            {breadcrumbs.length > 0 && (
                <Breadcrumb>
                    <BreadcrumbList className={isDark ? "text-pc-white/70" : ""}>
                        {breadcrumbs.map((item, index) => {
                            const isLast = index === breadcrumbs.length - 1;
                            return (
                                <Fragment key={index}>
                                    <BreadcrumbItem>
                                        {isLast ? (
                                            <BreadcrumbPage className={isDark ? "text-pc-gold font-bold" : ""}>{item.title}</BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink asChild className={isDark ? "hover:text-white text-pc-white/90 transition-colors" : ""}>
                                                <Link href={item.href}>{item.title}</Link>
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                    {!isLast && <BreadcrumbSeparator className={isDark ? "text-pc-white/50" : ""} />}
                                </Fragment>
                            );
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            )}
        </div>
    );
}
