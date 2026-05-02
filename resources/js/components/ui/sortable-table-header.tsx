import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface SortableTableHeaderProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
    sortKey: string;
    currentSortConfig: { key: string; direction: 'asc' | 'desc' } | null;
    requestSort: (key: any) => void;
    children: React.ReactNode;
}

export const SortableTableHeader: React.FC<SortableTableHeaderProps> = ({
    sortKey,
    currentSortConfig,
    requestSort,
    children,
    className = '',
    ...props
}) => {
    const isSorted = currentSortConfig?.key === sortKey;
    const isAscending = currentSortConfig?.direction === 'asc';

    return (
        <th
            {...props}
            className={`cursor-pointer select-none hover:bg-black/5 dark:hover:bg-white/5 transition-colors group ${className}`}
            onClick={() => requestSort(sortKey)}
        >
            <div className="flex items-center gap-1 justify-between">
                <span>{children}</span>
                <span className="flex items-center text-gray-500 w-4 h-4 shrink-0">
                    {isSorted ? (
                        isAscending ? (
                            <ArrowUp className="w-4 h-4 text-blue-500" />
                        ) : (
                            <ArrowDown className="w-4 h-4 text-blue-500" />
                        )
                    ) : (
                        <ArrowDown className="w-4 h-4 opacity-0 group-hover:opacity-30 transition-opacity" />
                    )}
                </span>
            </div>
        </th>
    );
};
