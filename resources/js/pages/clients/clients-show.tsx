import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';

interface ClientShowProps {
    client: {
        id: number;
        name: string;
        phone: string;
        email?: string;
        address?: string;
        marital_status: string;
        need_financing: boolean;
        dependents: number;
        profession: string;
        revenue: number;
        capital: number;
        fgts?: number;
        has_property: boolean;
        compromised_income: number;
        wishe?: {
            region?: {
                name: string;
            };
            type?: string;
            rooms?: number;
            bathrooms?: number;
            suites?: number;
            garages?: number;
            delivery_key?: string;
            min_act?: number;
            installment_payment?: boolean;
            air_conditioning?: string;
            garden?: boolean;
            pool?: boolean;
            balcony?: boolean;
            acept_pets?: boolean;
            acessibility?: boolean;
            obs?: string;
        };
    };
    maritalStatusOptions: Record<string, string>;
    booleanOptions: Record<string, string>;
}

const typeLabels: Record<string, string> = {
    casa: 'Casa',
    'casa (condom.)': 'Casa (Condom.)',
    sobrado: 'Sobrado',
    apartamento: 'Apartamento',
    'apart. c/ elevad.': 'Apart. c/ Elevad.',
    terreno: 'Terreno',
    loja: 'Loja',
    garagem: 'Garagem',
    sala: 'Sala',
    outros: 'Outros',
};

const airConditioningLabels: Record<string, string> = {
    incluso: 'Incluso',
    'somente infra': 'Somente Infra',
    'não incluso': 'Não incluso',
};

const booleanFeatureLabels = {
    garden: 'Jardim',
    pool: 'Piscina',
    balcony: 'Varanda',
    acept_pets: 'Aceita Pets',
    acessibility: 'Acessibilidade',
};

export default function ShowClient({ client, maritalStatusOptions, booleanOptions }: ClientShowProps) {
    const { delete: destroy } = useForm(); // Move useForm inside the component

    const handleDelete = () => {
        if (confirm('Tem certeza que deseja deletar este cliente?')) {
            destroy(route('clients.destroy', client.id));
        }
    };
    
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    const getBooleanLabel = (value?: boolean) => {
        if (value === undefined) return '-';
        return value ? booleanOptions['true'] : booleanOptions['false'];
    };

    return (
        <AppLayout>
            <Head title={`Cliente - ${client.name}`} />
            <div className="h-full gap-4 space-y-6 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Informações do Cliente</h1>
                    <div className="flex gap-2">
                        <Button asChild variant="outline">
                            <Link href={route('clients.index')}>Voltar</Link>
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Deletar
                        </Button>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Personal Information Section */}
                    <div className="rounded-lg border p-6">
                        <h2 className="mb-4 text-lg font-semibold">Informações Pessoais</h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500">Nome Completo</h3>
                                <p className="text-sm">{client.name}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500">Telefone</h3>
                                <p className="text-sm">{client.phone}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500">E-mail</h3>
                                <p className="text-sm">{client.email || '-'}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500">Endereço</h3>
                                <p className="text-sm">{client.address || '-'}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500">Estado Civil</h3>
                                <p className="text-sm">{maritalStatusOptions[client.marital_status]}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500">Profissão</h3>
                                <p className="text-sm">{client.profession}</p>
                            </div>
                        </div>
                    </div>

                    {/* Financial Information Section */}
                    <div className="rounded-lg border p-6">
                        <h2 className="mb-4 text-lg font-semibold">Informações Financeiras</h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500">Renda Mensal</h3>
                                <p className="text-sm">{formatCurrency(client.revenue)}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500">Capital Disponível</h3>
                                <p className="text-sm">{formatCurrency(client.capital)}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500">Saldo de FGTS</h3>
                                <p className="text-sm">{client.fgts ? formatCurrency(client.fgts) : '-'}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500">Nº de Dependentes</h3>
                                <p className="text-sm">{client.dependents}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500">Comprometimento de Renda</h3>
                                <p className="text-sm">{client.compromised_income}%</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500">Já possui propriedade?</h3>
                                <p className="text-sm">{getBooleanLabel(client.has_property)}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500">Precisa de financiamento?</h3>
                                <p className="text-sm">{getBooleanLabel(client.need_financing)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Property Wish Section */}
                    {client.wishe && (
                        <div className="rounded-lg border p-6">
                            <h2 className="mb-4 text-lg font-semibold">Imóvel Desejado</h2>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <div>
                                    <h3 className="text-sm font-medium text-neutral-500">Região</h3>
                                    <p className="text-sm">{client.wishe.region?.name || '-'}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-neutral-500">Tipo de Imóvel</h3>
                                    <p className="text-sm">{client.wishe.type ? typeLabels[client.wishe.type] : '-'}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-neutral-500">Quartos</h3>
                                    <p className="text-sm">{client.wishe.rooms || '-'}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-neutral-500">Banheiros</h3>
                                    <p className="text-sm">{client.wishe.bathrooms || '-'}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-neutral-500">Suítes</h3>
                                    <p className="text-sm">{client.wishe.suites || '-'}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-neutral-500">Vagas na Garagem</h3>
                                    <p className="text-sm">{client.wishe.garages || '-'}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-neutral-500">Área Útil (m²)</h3>
                                    <p className="text-sm">{client.wishe.min_act || '-'}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-neutral-500">Previsão de Entrega</h3>
                                    <p className="text-sm">{formatDate(client.wishe.delivery_key)}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-neutral-500">Ar Condicionado</h3>
                                    <p className="text-sm">
                                        {client.wishe.air_conditioning ? airConditioningLabels[client.wishe.air_conditioning] : '-'}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-neutral-500">Entrada Parcelada</h3>
                                    <p className="text-sm">{getBooleanLabel(client.wishe.installment_payment)}</p>
                                </div>
                                {Object.entries(booleanFeatureLabels).map(([field, label]) => (
                                    <div key={field}>
                                        <h3 className="text-sm font-medium text-neutral-500">{label}</h3>
                                        <p className="text-sm">
                                            {getBooleanLabel(client.wishe?.[field as keyof typeof client.wishe] as boolean | undefined)}
                                        </p>
                                    </div>
                                ))}
                                {client.wishe.obs && (
                                    <div className="col-span-full">
                                        <h3 className="text-sm font-medium text-neutral-500">Observações</h3>
                                        <p className="text-sm whitespace-pre-line">{client.wishe.obs}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
