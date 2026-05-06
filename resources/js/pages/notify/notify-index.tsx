import { FormInput } from '@/components/form-input';
import { FormSelect } from '@/components/form-select';
import { Icon } from '@/components/icon';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Status } from '@/components/ui/status';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router } from '@inertiajs/react'; // Import router from Inertia
import { Check, MessageCircle, HeartHandshake, House, User, CheckCircle, Send } from 'lucide-react';
import React, { useEffect, useState, useMemo } from 'react'; // Add useEffect
import { useSortableTable } from '@/hooks/useSortableTable';
import { SortableTableHeader } from '@/components/ui/sortable-table-header';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

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
}: {
    clients: Client[];
    propertyOptions: Array<{ value: string; label: string }>;
}) {
    const [copiedId, setCopiedId] = useState<number | null>(null);
    const [copiedTextType, setCopiedTextType] = useState<'name' | 'marketing' | null>(null);
    const [isLoading, setIsLoading] = useState<number | null>(null); // Track loading state per client
    const [clickedClients, setClickedClients] = useState<number[]>([]);
    const [optimisticContacts, setOptimisticContacts] = useState<Record<number, string>>({});
    const { data, setData, errors } = useForm<FilterForm>({
        property_id: undefined,
        contact_origin: 'todos',
        initial_date: '',
        final_date: '',
        list_index: '0',
    });

    const handleSetData = (field: keyof FilterForm, value: string | number | undefined | boolean) => {
        setData(field, value?.toString());
    };

    // Use useEffect to watch for changes in property_id
    useEffect(() => {
        // Only trigger when property_id has a value and it's not the initial undefined
        if (data.property_id && data.property_id !== '0') {
            // Navigate to the notify route with the selected property
            router.get(route('notify.property', { property: data.property_id }));
        }
    }, [data.property_id]); // This effect runs when data.property_id changes

    // Copy marketing text to send with whatsapp via API
    const sendMarketingText = async (client: Client, e: React.MouseEvent) => {
        e.preventDefault();
        setIsLoading(client.id);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const response = await fetch(`${route('notify.generate-marketing-text', client.id)}?type=${data.contact_origin}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken!, // Now properly typed as string
                    'X-Requested-With': 'XMLHttpRequest', // Add this for Laravel to recognize as AJAX
                },
            });

            if (!response.ok) {
                throw new Error('Falha ao gerar o texto de marketing.');
            }

            const responseData = await response.json();
            // const marketingText = responseData.marketingText;
            const whatsappLink = responseData.whatsappLink;

            // await navigator.clipboard.writeText(marketingText);

            if (whatsappLink) {
                window.open(whatsappLink, '_blank');
                setClickedClients(prev => Array.from(new Set([...prev, client.id])));
            }

            // setCopiedId(client.id);
            // setCopiedTextType('marketing');
            // setTimeout(() => {
            //     setCopiedId(null);
            //     setCopiedTextType(null);
            // }, 1500);
        } catch (err) {
            console.error('Failed to generate/copy marketing text: ', err);
        } finally {
            setIsLoading(null);
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

    const baseFilteredClients = clients.filter((client) => {
        if (data.contact_origin === 'mrv') {
            if (!(client.origin && client.origin.toLowerCase().includes('mrv'))) return false;
        }
        if (data.contact_origin === 'desconhecido') {
            if (!(!client.origin || client.origin === '' || client.origin === '0')) return false;
        }

        if (data.initial_date && client.created_at) {
            const initialDate = new Date(data.initial_date + 'T00:00:00').getTime();
            const cDate = new Date(client.created_at).getTime();
            if (cDate < initialDate) return false;
        }

        if (data.final_date && client.created_at) {
            const finalDate = new Date(data.final_date + 'T23:59:59').getTime();
            const cDate = new Date(client.created_at).getTime();
            if (cDate > finalDate) return false;
        }

        return true;
    });

    const uniqueCreatedAts = Array.from(new Set(baseFilteredClients.filter(c => c.created_at).map(c => c.created_at!)))
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    const listaOptions = [
        { value: '0', label: 'Todas' },
        ...uniqueCreatedAts.map((_, index) => ({
            value: (index + 1).toString(),
            label: (index + 1).toString(),
        }))
    ];

    const filteredClients = baseFilteredClients.filter((client) => {
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

                <form className="space-y-6 pt-4 pb-6">
                    <div className="grid items-end gap-4 md:grid-cols-2">
                        <FormSelect
                            label="Tipo de texto de marketing (customizado para cada cliente ou específico de um imóvel)"
                            value={data.property_id || '0'}
                            onValueChange={(value) => handleSetData('property_id', value)}
                            customOptions={propertyOptions}
                            error={errors.property_id}
                        />
                        <div className="flex gap-4">
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
                        </div>
                    </div>
                    <div className="grid items-end gap-4 md:grid-cols-2">
                        <div className="flex gap-4">
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
                                <th scope="col" className="px-3 py-3 text-center text-green-500">
                                    <Icon iconNode={MessageCircle} />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedClients.map((client, index) => (
                                <tr
                                    key={client.id}
                                    className={`border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-950 ${index !== sortedClients.length - 1 ? 'border-b' : ''
                                        }`}
                                >
                                    <th scope="row" className="px-3 py-3 font-medium text-gray-900 dark:text-white">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button className="cursor-pointer hover:opacity-80 transition-opacity">{client.name}</button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogTitle>{client.name}</DialogTitle>
                                                <p>
                                                    <strong>Telefone: </strong> {client.phone}
                                                    <br />
                                                    <strong>Email: </strong> {client.email}
                                                    <br />
                                                    <strong>Endereço: </strong> {client.address}
                                                    <br />
                                                    <strong>Estado Civil: </strong> {client.marital_status}
                                                    <br />
                                                    <strong>Precisa de Financiamento: </strong>
                                                    <Status value={client.need_financing} />
                                                    <br />
                                                    <strong>Número de Dependentes: </strong> {client.dependents}
                                                    <br />
                                                    <strong>Profissão: </strong> {client.profession}
                                                    <br />
                                                    <strong>Renda (R$): </strong> {client.revenue}
                                                    <br />
                                                    <strong>Capital Disponível(R$): </strong> {client.capital}
                                                    <br />
                                                    <strong>FGTS (R$): </strong> {client.fgts}
                                                    <br />
                                                    <strong>Possúi Propriedade: </strong>
                                                    <Status value={client.has_property} />
                                                    <br />
                                                    <strong>Renda Comprometida (%): </strong> {client.compromised_income}
                                                    <br />
                                                </p>

                                                {client.wishe && (
                                                    <div className="mt-4">
                                                        <h2 className="pb-3 text-lg font-semibold">Caracteristicas do imóvel desejado:</h2>
                                                        <p>
                                                            <strong>Regiões preferidas:</strong>{' '}
                                                            {client.wishe?.regions_descr || 'Não especificadas'}
                                                            <br />
                                                            <strong>Número de Quartos: </strong> {client.wishe.rooms || 'Não especificado'}
                                                            <br />
                                                            <strong>Banheiros: </strong> {client.wishe.bathrooms || 'Não especificado'}
                                                            <br />
                                                            <strong>Suítes: </strong> {client.wishe.suites || 'Não especificado'}
                                                            <br />
                                                            <strong>Vagas de Garagem: </strong> {client.wishe.garages || 'Não especificado'}
                                                            <br />
                                                            <strong>Data prevista de Entrega: </strong>
                                                            {client.wishe?.delivery_key
                                                                ? new Date(client.wishe.delivery_key).toLocaleDateString('pt-BR')
                                                                : 'Não especificada'}
                                                            <br />
                                                            <strong>Área construída: </strong> {client.wishe.building_area || 'Não especificado'}
                                                            <br />
                                                            <strong>Entrada Parcelada: </strong>{' '}
                                                            <Status value={client.wishe.installment_payment} />
                                                            <br />
                                                            <strong>Ar Condicionado: </strong> {client.wishe.air_conditioning}
                                                            <br />
                                                            <strong>Jardim: </strong>
                                                            <Status value={client.wishe.garden} />
                                                            <br />
                                                            <strong>Piscina: </strong>
                                                            <Status value={client.wishe.pool} />
                                                            <br />
                                                            <strong>Varanda: </strong>
                                                            <Status value={client.wishe.balcony} />
                                                            <br />
                                                            <strong>Aceita Pets: </strong>
                                                            <Status value={client.wishe.acept_pets} />
                                                            <br />
                                                            <strong>Acessibilidade: </strong>
                                                            <Status value={client.wishe.acessibility} />
                                                            <br />
                                                            <strong>Observações: </strong> {client.wishe.obs || 'Nenhuma'}
                                                            <br />
                                                        </p>
                                                    </div>
                                                )}
                                            </DialogContent>
                                        </Dialog>
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
                                        <div className="hidden sm:block">
                                            {(() => {
                                                const contactDate = optimisticContacts[client.id] || client.last_contact_at;
                                                if (!contactDate) return <span className="text-gray-400">-</span>;
                                                return new Date(contactDate).toLocaleDateString('pt-BR');
                                            })()}
                                        </div>
                                        <div className="sm:hidden flex justify-center">
                                            {(() => {
                                                const contactDate = optimisticContacts[client.id] || client.last_contact_at;
                                                if (!contactDate) return null;
                                                return <Icon className="text-blue-500" iconNode={CheckCircle} />;
                                            })()}
                                        </div>
                                    </td>

                                    <td className={`px-3 py-3 ${clickedClients.includes(client.id) ? 'text-gray-400' : 'text-green-500'}`}>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="outline-none cursor-pointer">
                                                <button
                                                    title="Gerar texto de marketing e enviar via Whatsapp"
                                                    className="cursor-pointer hover:opacity-80 transition-opacity"
                                                    disabled={isLoading === client.id}
                                                >
                                                    {clickedClients.includes(client.id) ? (
                                                        <Icon iconNode={Check} />
                                                    ) : isLoading === client.id ? (
                                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                                    ) : (
                                                        <Icon iconNode={MessageCircle} />
                                                    )}
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" onCloseAutoFocus={(e) => e.preventDefault()}>
                                                <DropdownMenuItem asChild className="cursor-pointer gap-2">
                                                    <button
                                                        onClick={(e) => sendMarketingText(client, e)}
                                                        title="Chamar no Whatsapp"
                                                        className="w-full flex items-center hover:opacity-80 transition-opacity"
                                                    >
                                                        <Icon className={`h-4 w-4 text-green-600 dark:text-green-500`} iconNode={MessageCircle} />
                                                        <span className="font-medium text-green-600 dark:text-green-500">Enviar</span>
                                                    </button>
                                                </DropdownMenuItem>

                                                <DropdownMenuItem asChild className="cursor-pointer gap-2">
                                                    <button
                                                        onClick={(e) => confirmSendText(client, e)}
                                                        title="Confirmar envio do texto de marketing"
                                                        className="w-full flex items-center hover:opacity-80 transition-opacity"
                                                    >
                                                        <Icon className={`h-4 w-4 text-blue-600 dark:text-blue-500`} iconNode={CheckCircle} />
                                                        <span className="font-medium text-blue-600 dark:text-blue-500">Registrar</span>
                                                    </button>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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
