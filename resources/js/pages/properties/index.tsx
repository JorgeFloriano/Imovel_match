import { usePage } from '@inertiajs/react'; // Importe o hook usePage
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

// Defina o tipo das propriedades com um index signature
interface PageProps {
    district: {
        name: string;
        region: string;
    } | null; // O objeto district pode ser null
    [key: string]: unknown; // Index signature para permitir outras propriedades
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Imóveis',
        href: '/properties',
    },
];

export default function Properties() {
    // Use a interface PageProps com usePage
    const { district } = usePage<PageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Imóveis" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border p-3">
                        Descrição: Parque dos Inglêzes<br/>
                        Endereço: Rua 456 - {district?.name}, {district?.region}<br/>
                        Contato: Maria Silva<br/>
                        Fone: (11) 8765-4321<br/>
                        E-mail: 6lKo3@example.com<br/>
                        Provável data de Entrega: 02/02/1999<br/>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border p-3">
                        Descrição: Parque dos Inglêzes<br/>
                        Endereço: Rua 456<br/>
                        Contato: Maria Silva<br/>
                        Fone: (11) 8765-4321<br/>
                        E-mail: 6lKo3@example.com<br/>
                        Provável data de Entrega: 02/02/1999<br/>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border p-3">
                        Descrição: Centro Comercial<br/>
                        Endereço: Rua 789<br/>
                        Contato: Pedro Santos<br/>
                        Fone: (11) 5432-1098<br/>
                        E-mail: 6lKo3@example.com<br/>
                        Provável data de Entrega: 03/03/1998<br/>
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-red-900 dark:stroke-red-200" />
                </div>
            </div>
        </AppLayout>
    );
}
