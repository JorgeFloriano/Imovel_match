import { FormInput } from '@/components/form-input';
import { FormSelect } from '@/components/form-select';
import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router, usePage } from '@inertiajs/react'; // Import router from Inertia
import { Check, MessageCircle, CheckCircle, Send, Circle, SaveAll, ThermometerSun, Trash, Flame, ThermometerSnowflake, Snowflake, Thermometer } from 'lucide-react';
import React, { useEffect, useState, useMemo } from 'react'; // Add useEffect
import { useSortableTable } from '@/hooks/useSortableTable';
import { SortableTableHeader } from '@/components/ui/sortable-table-header';
import { generateCustomMarketingText, generateCustomMarketingTextAccess, generateCustomMarketingTextMrv } from '@/utils/marketing';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import IconTooltip from '@/components/ui/icon-tooltip';
import Pagination from '@/components/pagination';

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
    temperature?: 'gelado' | 'frio' | 'morno' | 'quente' | null;
    wishe: Wishe | null;
    origin: string | null;
    created_at?: string;
    last_contact_at?: string | null;
}

interface PaginatedClients {
    data: Client[];
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

export default function Clients({
    clients,
    propertyOptions,
    filters,
}: {
    clients: PaginatedClients;
    propertyOptions: Array<{ value: string; label: string }>;
    filters: {
        initial_date: string;
        final_date: string;
        contact_origin: string;
    };
}) {
    const [clickedClients, setClickedClients] = useState<number[]>([]);
    const { auth } = usePage<any>().props;
    const userName = auth?.user?.name || 'Marta de Souza';
    const [copiedPhoneClients, setCopiedPhoneClients] = useState<number[]>([]);
    const [pendingNotifiedClients, setPendingNotifiedClients] = useState<number[]>([]);
    const [isSavingBatch, setIsSavingBatch] = useState(false);
    const [optimisticContacts, setOptimisticContacts] = useState<Record<number, string>>({});
    const [optimisticTemps, setOptimisticTemps] = useState<Record<number, Client['temperature']>>({});
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

    const updateTemperature = (clientId: number, newTemp: Client['temperature']) => {
        setOptimisticTemps(prev => ({ ...prev, [clientId]: newTemp }));

        router.patch(
            route('clients.temperature', clientId),
            { temperature: newTemp },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    setOptimisticTemps(prev => {
                        const newState = { ...prev };
                        delete newState[clientId];
                        return newState;
                    });
                }
            }
        );
    };

    const temperatureConfig = {
        quente: {
            icon: Flame,
            color: 'text-red-500',
            label: 'Quente'
        },
        morno: {
            icon: ThermometerSun,
            color: 'text-yellow-500',
            label: 'Morno'
        },
        frio: {
            icon: ThermometerSnowflake,
            color: 'text-blue-300',
            label: 'Frio'
        },
        gelado: {
            icon: Snowflake,
            color: 'text-blue-500',
            label: 'Gelado'
        }
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
            marketingText = generateCustomMarketingTextMrv(client, userName);
        } else if (data.contact_origin === 'access') {
            marketingText = generateCustomMarketingTextAccess(client, userName);
        } else {
            marketingText = generateCustomMarketingText(client, userName);
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

    const uniqueCreatedAts = Array.from(new Set(clients.data.filter(c => c.created_at).map(c => c.created_at!)))
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

    const filteredClients = clients.data.filter((client) => {
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
            last_contact_at: optimisticContacts[client.id] || client.last_contact_at,
            temperature: client.id in optimisticTemps ? optimisticTemps[client.id] : client.temperature
        }));
    }, [filteredClients, optimisticContacts, optimisticTemps]);

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
                                    { value: 'access', label: 'ACCESS' }
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
                                    sortKey="id"
                                    currentSortConfig={sortConfig}
                                    requestSort={requestSort}
                                    className="hidden px-6 py-3 md:table-cell"
                                >
                                    ID
                                </SortableTableHeader>
                                <SortableTableHeader
                                    sortKey="name"
                                    currentSortConfig={sortConfig}
                                    requestSort={requestSort}
                                    className="px-3 py-3 sm:px-6"
                                >
                                    Nome
                                </SortableTableHeader>
                                <SortableTableHeader
                                    sortKey="temperature"
                                    currentSortConfig={sortConfig}
                                    requestSort={requestSort}
                                    className="px-6 py-3"
                                >
                                    <IconTooltip iconNode={Thermometer && <Icon className="inline h-4 w-4" iconNode={Thermometer} />} tooltipText="Temperatura (quanto mais quente, mais próximo de fechar negócio)" />
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
                                    sortKey="phone"
                                    currentSortConfig={sortConfig}
                                    requestSort={requestSort}
                                    className="px-3 py-3 sm:px-6"
                                >
                                    Whatsapp
                                </SortableTableHeader>
                                <SortableTableHeader
                                    sortKey="origin"
                                    currentSortConfig={sortConfig}
                                    requestSort={requestSort}
                                    className="hidden px-6 py-3 md:table-cell"
                                >
                                    Fonte
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
                                    <td className="hidden px-6 py-3 md:table-cell">{client.id}</td>

                                    <td className="px-3 py-3 sm:px-6">{client.name}</td>

                                    <td className="px-6 py-3">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="outline-none cursor-pointer">
                                                {client.temperature ? (
                                                    <IconTooltip
                                                        iconNode={
                                                            <Icon
                                                                className={`inline h-5 w-5 ${temperatureConfig[client.temperature as keyof typeof temperatureConfig].color} hover:opacity-80 transition-opacity`}
                                                                iconNode={temperatureConfig[client.temperature as keyof typeof temperatureConfig].icon}
                                                            />
                                                        }
                                                        tooltipText={temperatureConfig[client.temperature as keyof typeof temperatureConfig].label}
                                                    />
                                                ) : (
                                                    <IconTooltip
                                                        iconNode={<Icon className="inline h-5 w-5 text-gray-400 hover:opacity-80 transition-opacity" iconNode={ThermometerSnowflake} />}
                                                        tooltipText="Frio"
                                                    />
                                                )}
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="center">
                                                {(Object.entries(temperatureConfig) as [keyof typeof temperatureConfig, typeof temperatureConfig[keyof typeof temperatureConfig]][]).map(([key, config]) => (
                                                    <DropdownMenuItem
                                                        key={key}
                                                        onClick={() => updateTemperature(client.id, key)}
                                                        className="cursor-pointer gap-2"
                                                    >
                                                        <Icon className={`h-4 w-4 ${config.color}`} iconNode={config.icon} />
                                                        <span>{config.label}</span>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>

                                    <td className="hidden px-6 py-3 md:table-cell">
                                        {new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL',
                                        }).format(client.revenue)}
                                    </td>

                                    <th scope="row" className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
                                            {client.phone}
                                        </button>
                                    </th>

                                    <td className="hidden px-6 py-3 md:table-cell">{client.origin}</td>

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
                <Pagination links={clients.links} className="mt-8" />
            </div>
        </AppLayout>
    );
}
