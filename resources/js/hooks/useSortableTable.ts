import { useState, useMemo } from 'react';

type SortDirection = 'asc' | 'desc';

export interface SortConfig<T> {
    key: string;
    direction: SortDirection;
}

export function useSortableTable<T>(items: T[], config: SortConfig<T> | null = null) {
    const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(config);

    const sortedItems = useMemo(() => {
        const sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                const getNestedValue = (obj: any, path: string) => {
                    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
                };

                const aValue = getNestedValue(a, sortConfig.key);
                const bValue = getNestedValue(b, sortConfig.key);

                if (sortConfig.key === 'temperature') {
                    const tempWeight: Record<string, number> = {
                        quente: 4,
                        morno: 3,
                        frio: 2,
                        gelado: 1,
                    };
                    const getWeight = (val: any) => {
                        if (val === null || val === undefined || val === '' || val === 'null') return 2; // treats null as frio
                        return tempWeight[String(val).toLowerCase()] ?? 0;
                    };
                    const weightA = getWeight(aValue);
                    const weightB = getWeight(bValue);

                    if (weightA !== weightB) {
                        // Normally asc is 1 -> 4 (gelado -> quente)
                        // User wants 'quente', 'morno', 'frio/null', 'gelado' order, 
                        // so desc will be 4 -> 1 (quente -> gelado).
                        return sortConfig.direction === 'asc' ? weightA - weightB : weightB - weightA;
                    }
                } else if (sortConfig.key === 'last_contact_at') {
                    const aEmpty = !aValue || aValue === 'null';
                    const bEmpty = !bValue || bValue === 'null';

                    if (aEmpty && bEmpty) {
                        // Secondary sort by name if both are empty
                        const nameA = (a as any).name || '';
                        const nameB = (b as any).name || '';
                        const cmp = nameA.localeCompare(nameB, undefined, { sensitivity: 'base' });
                        return sortConfig.direction === 'asc' ? cmp : -cmp;
                    }

                    if (sortConfig.direction === 'asc') {
                        // Nulls top, oldest to newest
                        if (aEmpty) return -1;
                        if (bEmpty) return 1;
                        
                        const dateA = new Date(aValue).getTime();
                        const dateB = new Date(bValue).getTime();
                        return dateA - dateB;
                    } else {
                        // Nulls bottom, newest to oldest
                        if (aEmpty) return 1;
                        if (bEmpty) return -1;
                        
                        const dateA = new Date(aValue).getTime();
                        const dateB = new Date(bValue).getTime();
                        return dateB - dateA;
                    }
                } else {
                    const aEmpty = aValue === null || aValue === undefined || aValue === '' || aValue === 'null' || aValue === 'undefined';
                    const bEmpty = bValue === null || bValue === undefined || bValue === '' || bValue === 'null' || bValue === 'undefined';

                    if (aEmpty && bEmpty) return 0;
                    if (aEmpty) return 1; // a is empty, so put it at the end
                    if (bEmpty) return -1; // b is empty, so put it at the end

                    if (aValue === bValue) {
                        return 0;
                    }

                    if (typeof aValue === 'string' && typeof bValue === 'string') {
                        const cmp = aValue.localeCompare(bValue, undefined, { numeric: true, sensitivity: 'base' });
                        return sortConfig.direction === 'asc' ? cmp : -cmp;
                    }

                    if (aValue < bValue) {
                        return sortConfig.direction === 'asc' ? -1 : 1;
                    }
                    
                    if (aValue > bValue) {
                        return sortConfig.direction === 'asc' ? 1 : -1;
                    }
                }
                
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key: string) => {
        let direction: SortDirection = 'asc';
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'asc'
        ) {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
}
