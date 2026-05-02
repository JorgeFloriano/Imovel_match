import { Icon } from '@/components/icon';
import { useState, useMemo } from 'react';
import { WhatsAppService } from '@/lib/whatsapp';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Status } from '@/components/ui/status';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Edit, Expand, HeartHandshake, House, Thermometer, User, ThermometerSun, ThermometerSnowflake, Snowflake, Flame, Menu, EllipsisVertical, Trash, MessageCircle } from 'lucide-react';
import { useSortableTable } from '@/hooks/useSortableTable';
import { SortableTableHeader } from '@/components/ui/sortable-table-header';
import IconTooltip from '@/components/ui/icon-tooltip';

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
    temperature: 'gelado' | 'frio' | 'morno' | 'quente' | null;
    wishe: Wishe | null;
}

export default function Clients({ clients }: { clients: Client[] }) {
    const [optimisticTemps, setOptimisticTemps] = useState<Record<number, Client['temperature']>>({});

    const effectiveClients = useMemo(() => {
        return clients.map(client => ({
            ...client,
            temperature: client.id in optimisticTemps ? optimisticTemps[client.id] : client.temperature
        }));
    }, [clients, optimisticTemps]);

    const { items: sortedClients, requestSort, sortConfig } = useSortableTable(effectiveClients);

    const updateTemperature = (clientId: number, newTemp: Client['temperature']) => {
        // Update local state immediately for instant visual feedback
        setOptimisticTemps(prev => ({ ...prev, [clientId]: newTemp }));

        // Send request asynchronously and preserve the state/scroll position
        router.patch(
            route('clients.temperature', clientId),
            { temperature: newTemp },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    // Once server responds and updates props, clear local override
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
            color: 'text-blue-300', // ou a cor padrão da sua fonte
            label: 'Frio'
        },
        gelado: {
            icon: Snowflake,
            color: 'text-blue-500',
            label: 'Gelado'
        }
    };

    return (
        <AppLayout>
            <Head title="Clientes" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Clientes</h1>

                    {/* Button to call route 'clients.create' */}
                    <Button asChild>
                        <a href={route('clients.create')}>
                            <span className="flex items-center gap-2">
                                <span>Cadastrar</span>
                            </span>
                        </a>
                    </Button>
                </div>

                <p className="py-3 text-sm">
                    Clique no nome do cliente para ver as melhores indicações de imóveis.
                </p>

                <div className="relative overflow-x-auto overflow-y-hidden shadow-md sm:rounded-lg">
                    <table className="h-full w-full text-left text-[#123251] rtl:text-right dark:text-[#B8B8B8]">
                        <thead className="bg-[#D8D8D8] text-xs text-[#123251] uppercase dark:bg-[#123251] dark:text-[#B8B8B8]">
                            <tr>
                                <SortableTableHeader
                                    sortKey="name"
                                    currentSortConfig={sortConfig}
                                    requestSort={requestSort}
                                    className="px-6 py-3 align-middle text-[#BF9447]"
                                >
                                    <div className="inline-flex items-center gap-2">
                                        {User && <Icon iconNode={User} />}
                                        {HeartHandshake && <Icon iconNode={HeartHandshake} />}
                                        {House && <Icon iconNode={House} />}
                                    </div>
                                </SortableTableHeader>
                                <SortableTableHeader
                                    sortKey="temperature"
                                    currentSortConfig={sortConfig}
                                    requestSort={requestSort}
                                    className="px-6"
                                >
                                    <IconTooltip iconNode={Thermometer && <Icon className="inline h-4 w-4" iconNode={Thermometer} />} tooltipText="Temperatura (quanto mais quente, mais próximo de fechar negócio)" />
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
                                <th scope="col" className="px-6 py-3 text-center">
                                    <span>{Menu && <Icon iconNode={Menu} />}</span>
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
                                    <th scope="row" className="px-6 py-3 font-medium whitespace-normal text-gray-900 dark:text-white">
                                        <a href={route('clients.properties', client.id)} className="font-medium hover:underline">
                                            {client.name}
                                        </a>
                                    </th>

                                    <td className="px-6 py-3">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="outline-none cursor-pointer">
                                                {client.temperature ? (
                                                    <IconTooltip
                                                        iconNode={
                                                            <Icon
                                                                className={`inline h-5 w-5 ${temperatureConfig[client.temperature].color} hover:opacity-80 transition-opacity`}
                                                                iconNode={temperatureConfig[client.temperature].icon}
                                                            />
                                                        }
                                                        tooltipText={temperatureConfig[client.temperature].label}
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

                                    <td className="px-6 py-3 text-center align-middle">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="outline-none cursor-pointer">
                                                <Icon
                                                    className={`inline h-5 w-5`}
                                                    iconNode={EllipsisVertical}
                                                />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">

                                                <DropdownMenuItem asChild className="cursor-pointer gap-2">
                                                    <button
                                                        onClick={() => WhatsAppService.openChat(client.phone)}
                                                        title="Chamar no Whatsapp"
                                                        className="w-full flex items-center hover:opacity-80 transition-opacity"
                                                    >
                                                        <Icon className={`h-4 w-4 text-green-600 dark:text-green-500`} iconNode={MessageCircle} />
                                                        <span className="font-medium text-green-600 dark:text-green-500">Whatsapp</span>
                                                    </button>
                                                </DropdownMenuItem>

                                                <DropdownMenuItem asChild className="cursor-pointer gap-2">
                                                    <a href={route('clients.edit', client.id)}>
                                                        <Icon className={`h-4 w-4 text-blue-600 dark:text-blue-500`} iconNode={Edit} />
                                                        <span className="font-medium text-blue-600 dark:text-blue-500">Editar</span>
                                                    </a>
                                                </DropdownMenuItem>

                                                <DropdownMenuItem asChild className="cursor-pointer gap-2">
                                                    <a onClick={() => router.get(route('clients.show', client.id))}>
                                                        <Icon className={`h-4 w-4 text-red-600 dark:text-red-500`} iconNode={Trash} />
                                                        <span className="font-medium text-red-600 dark:text-red-500">Excluir</span>
                                                    </a>
                                                </DropdownMenuItem>

                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer gap-2">
                                                            <Icon className={`h-4 w-4 text-gray-600 dark:text-gray-400`} iconNode={Expand} />
                                                            <span className="font-medium text-gray-600 dark:text-gray-400">Detalhes</span>
                                                        </DropdownMenuItem>
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
