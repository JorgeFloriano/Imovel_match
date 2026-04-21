import { FormSelect } from '@/components/form-select';
import { Icon } from '@/components/icon';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Status } from '@/components/ui/status';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router } from '@inertiajs/react'; // Import router from Inertia
import { Check, MessageCircle, Expand, HeartHandshake, House, User } from 'lucide-react';
import React, { useEffect, useState } from 'react'; // Add useEffect

type FilterForm = {
    property_id?: string;
    contact_origin: string;
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
    const { data, setData, errors } = useForm<FilterForm>({
        property_id: undefined,
        contact_origin: 'todos',
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

    const filteredClients = clients.filter((client) => {
        if (data.contact_origin === 'mrv') {
            return client.origin && client.origin.toLowerCase().includes('mrv');
        }
        if (data.contact_origin === 'desconhecido') {
            return !client.origin || client.origin === '' || client.origin === '0';
        }
        return true; // 'todos'
    });

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
                        />
                    </div>
                </form>

                <div className="relative overflow-x-auto overflow-y-hidden shadow-md sm:rounded-lg">
                    <table className="h-full w-full text-left text-[#123251] rtl:text-right dark:text-[#B8B8B8]">
                        <thead className="bg-[#D8D8D8] text-xs text-[#123251] uppercase dark:bg-[#123251] dark:text-[#B8B8B8]">
                            <tr>
                                <th className="px-6 py-3 text-[#BF9447]">
                                    <div className="inline-flex items-center gap-2">
                                        {User && <Icon iconNode={User} />}
                                        {HeartHandshake && <Icon iconNode={HeartHandshake} />}
                                        {House && <Icon iconNode={House} />}
                                    </div>
                                </th>
                                <th scope="col" className="hidden px-6 py-3 md:table-cell">
                                    Profissão
                                </th>
                                <th scope="col" className="hidden px-6 py-3 md:table-cell">
                                    Renda
                                </th>
                                <th scope="col" className="hidden px-6 py-3 md:table-cell">
                                    Capital
                                </th>
                                <th scope="col" className="hidden px-6 py-3 md:table-cell">
                                    FGTS
                                </th>
                                <th scope="col" className="px-3 py-3 text-center text-green-500">
                                    <Icon iconNode={MessageCircle} />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClients.map((client, index) => (
                                <tr
                                    key={client.id}
                                    className={`border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-950 ${index !== filteredClients.length - 1 ? 'border-b' : ''
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

                                    <td className="px-3 py-3 text-green-500">
                                        <button
                                            onClick={(e) => sendMarketingText(client, e)}
                                            title="Gerar texto de marketing e enviar via Whatsapp"
                                            className="cursor-pointer hover:opacity-80 transition-opacity"
                                        >
                                            <Icon iconNode={MessageCircle} />
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
