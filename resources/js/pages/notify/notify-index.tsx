import { FormInput } from '@/components/form-input';
import { FormSelect } from '@/components/form-select';
import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router } from '@inertiajs/react'; // Import router from Inertia
import { Check, MessageCircle, HeartHandshake, House, User, CheckCircle, Send, Circle, SaveAll } from 'lucide-react';
import React, { useEffect, useState, useMemo } from 'react'; // Add useEffect
import { useSortableTable } from '@/hooks/useSortableTable';
import { SortableTableHeader } from '@/components/ui/sortable-table-header';
import { generateCustomMarketingText, generateCustomMarketingTextMrv } from '@/utils/marketing';

type FilterForm = {
    property_id?: string;
    contact_origin: string;
    initial_date?: string;
    final_date?: string;
    list_index?: string;
};

interface Wishe {
    id: number;
    client_id: number;
    regions_descr: string;
    rooms: number | null;
    bathrooms: number | null;
    suites: number | null;
    garages: number | null;
    delivery_key: string | null;
    building_area: number | null;
    installment_payment: boolean;
    air_conditioning: 'incluso' | 'somente infra' | 'não incluso';
    garden: boolean | null;
    pool: boolean | null;
    balcony: boolean | null;
    acept_pets: boolean | null;
    acessibility: boolean | null;
    obs: string | null;
}

interface Client {
    id: number;
    name: string;
    phone: string;
    email: string;
    address: string;
    marital_status: string;
    need_financing: boolean;
    dependents: number;
    profession: string;
    revenue: number;
    capital: number;
    fgts: number;
    has_property: boolean;
    compromised_income: number;
    wishe: Wishe | null;
    origin: string | null;
    created_at?: string;
    last_contact_at?: string | null;
}

export default function Clients({
    clients,
    propertyOptions,
    filters,
}: {
    clients: Client[];
    propertyOptions: Array<{ value: string; label: string }>;
    filters: {
        initial_date: string;
        final_date: string;
        contact_origin: string;
    };
}) {
    const [clickedClients, setClickedClients] = useState<number[]>([]);
    const [copiedPhoneClients, setCopiedPhoneClients] = useState<number[]>([]);
    const [pendingNotifiedClients, setPendingNotifiedClients] = useState<number[]>([]);
    const [isSavingBatch, setIsSavingBatch] = useState(false);
    const [optimisticContacts, setOptimisticContacts] = useState<Record<number, string>>({});
    const { data, setData, errors } = useForm<FilterForm>({
        property_id: undefined,
        contact_origin: filters?.contact_origin || 'todos',
        initial_date: filters?.initial_date || '',
        final_date: filters?.final_date || '',
        list_index: '0',
    });

    const handleSetData = (field: keyof FilterForm, value: string | number | undefined | boolean) => {
        setData(field, value?.toString());
    };

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('notify'), {
            initial_date: data.initial_date,
            final_date: data.final_date,
            contact_origin: data.contact_origin,
        }, { preserveState: true, preserveScroll: true });
    };

    // Use useEffect to watch for changes in property_id
    useEffect(() => {
        // Only trigger when property_id has a value and it's not the initial undefined
        if (data.property_id && data.property_id !== '0') {
            // Navigate to the notify route with the selected property
            router.get(route('notify.property', { property: data.property_id }));
        }
    }, [data.property_id]); // This effect runs when data.property_id changes

    // Generate marketing text locally and copy to clipboard
    const sendMarketingText = async (client: Client, e: React.MouseEvent) => {
        e.preventDefault();

        let marketingText = '';
        if (data.contact_origin === 'mrv') {
            marketingText = generateCustomMarketingTextMrv(client);
        } else {
            marketingText = generateCustomMarketingText(client);
        }

        try {
            await navigator.clipboard.writeText(marketingText);
            setClickedClients(prev => Array.from(new Set([...prev, client.id])));
            setPendingNotifiedClients(prev => Array.from(new Set([...prev, client.id])));
        } catch (err) {
            console.error('Failed to copy marketing text: ', err);
        }
    };

    const confirmSendText = async (client: Client, e: React.MouseEvent) => {
        e.preventDefault();

        // Optimistic update
        setOptimisticContacts(prev => ({ ...prev, [client.id]: new Date().toISOString() }));

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            await fetch(route('clients.contacted', client.id), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });
        } catch (err) {
            console.error('Failed to register contact: ', err);
        }
    };

    const handleBatchSave = async () => {
        if (pendingNotifiedClients.length === 0) return;
        
        setIsSavingBatch(true);
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const response = await fetch(route('notify.batch-contacted'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify({ ids: pendingNotifiedClients }),
            });

            if (response.ok) {
                const now = new Date().toISOString();
                const newOptimistic = { ...optimisticContacts };
                pendingNotifiedClients.forEach(id => {
                    newOptimistic[id] = now;
                });
                setOptimisticContacts(newOptimistic);
                setPendingNotifiedClients([]);
            }
        } catch (err) {
            console.error('Failed to save batch: ', err);
        } finally {
            setIsSavingBatch(false);
        }
    };

    const uniqueCreatedAts = Array.from(new Set(clients.filter(c => c.created_at).map(c => c.created_at!)))
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    const listaOptions = [
        { value: '0', label: 'Todas' },
        ...uniqueCreatedAts.map((createdAt, index) => {
            const formattedDate = new Date(createdAt).toLocaleDateString('pt-BR');
            return {
                value: (index + 1).toString(),
                label: `${index + 1} - ${formattedDate}`,
            };
        })
    ];

    const filteredClients = clients.filter((client) => {
        if (data.list_index && data.list_index !== '0') {
            const index = parseInt(data.list_index) - 1;
            if (uniqueCreatedAts[index] && client.created_at !== uniqueCreatedAts[index]) {
                return false;
            }
        }
        return true;
    });

    const clientsWithOptimistic = useMemo(() => {
        return filteredClients.map(client => ({
            ...client,
            last_contact_at: optimisticContacts[client.id] || client.last_contact_at
        }));
    }, [filteredClients, optimisticContacts]);

    const { items: sortedClients, requestSort, sortConfig } = useSortableTable(clientsWithOptimistic, { key: 'last_contact_at', direction: 'asc' });

    return (
        <AppLayout>
            <Head title="Clientes" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Notificar clientes sobre as melhores oportunidades</h1>
                </div>

                <form className="space-y-6 pt-4 pb-6" onSubmit={handleFilter}>
                    {/* Ação Principal: Seleção de Imóvel */}
                    <div className="md:w-1/2">
                        <FormSelect
                            label="Gerar texto para imóvel específico:"
                            value={data.property_id || '0'}
                            onValueChange={(value) => handleSetData('property_id', value)}
                            customOptions={propertyOptions}
                            error={errors.property_id}
                        />
                    </div>

                    {/* Filtros da Lista de Clientes */}
                    <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                        <div className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Filtros da Tabela
                        </div>
                        <div className="grid items-end gap-4 sm:grid-cols-2 lg:grid-cols-5">
                            <FormSelect
                                label="Origem do Cliente"
                                value={data.contact_origin}
                                onValueChange={(value) => handleSetData('contact_origin', value)}
                                customOptions={[
                                    { value: 'todos', label: 'Todos' },
                                    { value: 'desconhecido', label: 'Desconhecido' },
                                    { value: 'mrv', label: 'MRV' },
                                ]}
                                error={errors.contact_origin}
                                className="w-full"
                            />
                            <FormSelect
                                label="Lista"
                                value={data.list_index || '0'}
                                onValueChange={(value) => handleSetData('list_index', value)}
                                customOptions={listaOptions}
                                error={errors.list_index}
                                className="w-full"
                            />
                            <FormInput
                                type="date"
                                label="Cadastrado de:"
                                value={data.initial_date || ''}
                                onChange={(value) => handleSetData('initial_date', value as string)}
                                className="w-full"
                            />
                            <FormInput
                                type="date"
                                label="Até:"
                                value={data.final_date || ''}
                                onChange={(value) => handleSetData('final_date', value as string)}
                                className="w-full"
                            />
                            <Button type="submit" className="w-full">
                                Filtrar
                            </Button>
                        </div>
                    </div>
                </form>

                <div className="relative overflow-x-auto overflow-y-hidden shadow-md sm:rounded-lg">
                    <table className="h-full w-full text-left text-[#123251] rtl:text-right dark:text-[#B8B8B8]">
                        <thead className="bg-[#D8D8D8] text-xs text-[#123251] uppercase dark:bg-[#123251] dark:text-[#B8B8B8]">
                            <tr>
                                <SortableTableHeader
                                    sortKey="name"
                                    currentSortConfig={sortConfig}
                                    requestSort={requestSort}
                                    className="px-6 py-3 text-[#BF9447]"
                                >
                                    <div className="inline-flex items-center gap-2">
                                        {User && <Icon iconNode={User} />}
                                        {HeartHandshake && <Icon iconNode={HeartHandshake} />}
                                        {House && <Icon iconNode={House} />}
                                    </div>
                                </SortableTableHeader>
                                <SortableTableHeader
                                    sortKey="profession"
                                    currentSortConfig={sortConfig}
                                    requestSort={requestSort}
                                    className="hidden px-6 py-3 md:table-cell"
                                >
                                    Profissão
                                </SortableTableHeader>
                                <SortableTableHeader
                                    sortKey="revenue"
                                    currentSortConfig={sortConfig}
                                    requestSort={requestSort}
                                    className="hidden px-6 py-3 md:table-cell"
                                >
                                    Renda
                                </SortableTableHeader>
                                <SortableTableHeader
                                    sortKey="capital"
                                    currentSortConfig={sortConfig}
                                    requestSort={requestSort}
                                    className="hidden px-6 py-3 md:table-cell"
                                >
                                    Capital
                                </SortableTableHeader>
                                <SortableTableHeader
                                    sortKey="fgts"
                                    currentSortConfig={sortConfig}
                                    requestSort={requestSort}
                                    className="hidden px-6 py-3 md:table-cell"
                                >
                                    FGTS
                                </SortableTableHeader>
                                <SortableTableHeader
                                    sortKey="last_contact_at"
                                    currentSortConfig={sortConfig}
                                    requestSort={requestSort}
                                    className="px-3 py-3 sm:px-6"
                                >
                                    <span className="hidden sm:inline">Notificado</span>
                                    <div className="sm:hidden text-blue-500" title="Notificado">
                                        <Icon iconNode={Send} />
                                    </div>
                                </SortableTableHeader>
                                <th scope="col" className="px-3 py-3 text-center">
                                    <button
                                        type="button"
                                        onClick={handleBatchSave}
                                        disabled={isSavingBatch || pendingNotifiedClients.length === 0}
                                        className={`flex items-center justify-center gap-1 w-full transition-all ${pendingNotifiedClients.length > 0 ? 'text-green-600 dark:text-green-500 cursor-pointer hover:scale-110' : 'text-gray-400 opacity-50 cursor-default'}`}
                                        title={pendingNotifiedClients.length > 0 ? `Registrar ${pendingNotifiedClients.length} contatos pendentes` : 'Sem notificações para salvar'}
                                    >
                                        {isSavingBatch ? (
                                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                        ) : (
                                            <Icon iconNode={SaveAll} />
                                        )}
                                        {pendingNotifiedClients.length > 0 && !isSavingBatch && (
                                            <span className="text-[10px] font-bold bg-green-100 dark:bg-green-900/30 px-1 rounded-full">{pendingNotifiedClients.length}</span>
                                        )}
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedClients.map((client, index) => (
                                <tr
                                    key={client.id}
                                    data-id={client.id}
                                    className={`border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-950 ${index !== sortedClients.length - 1 ? 'border-b' : ''
                                        }`}
                                >
                                    <th scope="row" className="px-3 py-3 font-medium text-gray-900 dark:text-white">
                                        <button
                                            onClick={() => {
                                                const formattedPhone = client.phone.replace(/\D/g, '');
                                                const phoneToCopy = (formattedPhone.length <= 11) ? `55${formattedPhone}` : formattedPhone;
                                                const urlToCopy = `https://web.whatsapp.com/send?phone=${phoneToCopy}`;
                                                navigator.clipboard.writeText(urlToCopy);
                                                setCopiedPhoneClients(prev => Array.from(new Set([...prev, client.id])));
                                            }}
                                            className={`cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2 ${copiedPhoneClients.includes(client.id) ? 'text-blue-600 dark:text-blue-500' : ''}`}
                                        >
                                            {client.name}
                                        </button>
                                    </th>

                                    <td className="hidden px-6 py-3 md:table-cell">{client.profession}</td>

                                    <td className="hidden px-6 py-3 md:table-cell">
                                        {new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL',
                                        }).format(client.revenue)}
                                    </td>

                                    <td className="hidden px-6 py-3 md:table-cell">
                                        {new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL',
                                        }).format(client.capital)}
                                    </td>

                                    <td className="hidden px-6 py-3 md:table-cell">
                                        {new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL',
                                        }).format(client.fgts)}
                                    </td>

                                    <td className="px-3 py-3 sm:px-6">
                                        <button 
                                            onClick={(e) => confirmSendText(client, e)}
                                            title="Registrar / Atualizar contato"
                                            className="cursor-pointer hover:opacity-80 transition-opacity"
                                        >
                                            <div className="hidden sm:flex items-center gap-2">
                                                {(() => {
                                                    const contactDate = optimisticContacts[client.id] || client.last_contact_at;
                                                    if (!contactDate) return <Icon className="text-gray-400" iconNode={Circle} />;
                                                    return (
                                                        <>
                                                            <Icon className="text-blue-500" iconNode={CheckCircle} />
                                                            <span className="text-blue-500">{new Date(contactDate).toLocaleDateString('pt-BR')}</span>
                                                        </>
                                                    );
                                                })()}
                                            </div>
                                            <div className="sm:hidden flex justify-center">
                                                {(() => {
                                                    const contactDate = optimisticContacts[client.id] || client.last_contact_at;
                                                    if (!contactDate) return <Icon className="text-gray-400" iconNode={Circle} />;
                                                    return <Icon className="text-blue-500" iconNode={CheckCircle} />;
                                                })()}
                                            </div>
                                        </button>
                                    </td>

                                    <td className="px-3 py-3 text-center">
                                        <button
                                            onClick={(e) => sendMarketingText(client, e)}
                                            title="Gerar/Copiar texto de marketing"
                                            className="cursor-pointer hover:opacity-80 transition-opacity"
                                        >
                                            {clickedClients.includes(client.id) ? (
                                                <Icon className="text-green-500" iconNode={Check} />
                                            ) : (
                                                <Icon className="text-green-500" iconNode={MessageCircle} />
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
