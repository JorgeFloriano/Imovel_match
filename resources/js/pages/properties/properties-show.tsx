import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';

interface PropertyShowProps {
    property: {
        id: number;
        user: {
            name: string;
        };
        region: {
            name: string | null;
        };
        type: 'casa' | 'casa (condom.)' | 'sobrado' | 'apartamento' | 'apart. c/ elevad.' | 'terreno' | 'loja' | 'garagem' | 'sala' | 'outros' | null;
        iptu: string | null;
        description: string | null;
        price: number;
        land_area: number | null;
        building_area: number | null;
        image: string | null;
        address: string | null;
        rooms: number | null;
        bathrooms: number | null;
        suites: number | null;
        garages: number | null;
        floor: number | null;
        building_floors: number | null;
        property_floors: number | null;
        delivery_key: string | null;
        min_act: number | null;
        installment_payment: boolean;
        incc_financing: boolean | null;
        documents: boolean | null;
        finsh_type: string | null;
        air_conditioning: 'incluso' | 'somente infra' | 'não incluso';
        garden: boolean | null;
        pool: boolean | null;
        balcony: boolean | null;
        acept_pets: boolean | null;
        acessibility: boolean | null;
        obs: string | null;
    };
    typeOptions: Record<string, string>;
    airConditioningOptions: Record<string, string>;
    booleanOptions: Record<string, string>;
}

const typeLabels: Record<string, string> = {
    casa: 'Casa',
    'casa (condom.)': 'Casa (Condomínio)',
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
    installment_payment: 'Entrada Parcelada',
    incc_financing: 'Financiamento INCC',
    documents: 'Documentação OK',
};

export default function ShowProperty({ property, booleanOptions }: PropertyShowProps) {
    const { delete: destroy, reset, clearErrors } = useForm();

    const handleDelete = () => {
        destroy(route('properties.destroy', property.id));
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    const formatArea = (area: number | null) => {
        return area ? `${area} m²` : '-';
    };

    const getBooleanLabel = (value?: boolean | null) => {
        if (value === undefined || value === null) return '-';
        return value ? booleanOptions['true'] : booleanOptions['false'];
    };

    const closeModal = () => {
        clearErrors();
        reset();
    };

    return (
        <AppLayout>
            <Head title={`Propriedade - ${property.address || 'Sem endereço'}`} />
            <div className="h-full gap-4 space-y-6 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Informações do Imóvel</h1>
                    <div className="flex gap-2">
                        <Button asChild variant="outline">
                            <Link href={route('properties.index')}>Voltar</Link>
                        </Button>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="destructive">Deletar</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogTitle>Tem certeza que deseja deletar o cadastro desse imóvel ?</DialogTitle>
                                <DialogDescription>Uma vez deletado, todas as informações relacionadas ao imóvel serão perdidas.</DialogDescription>

                                <DialogFooter className="gap-2">
                                    <DialogClose asChild>
                                        <Button variant="secondary" onClick={closeModal}>
                                            Cancelar
                                        </Button>
                                    </DialogClose>

                                    <Button variant="destructive" onClick={handleDelete}>
                                        Deletar
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Basic Information Section */}
                    <div className="rounded-lg border p-6">
                        <h2 className="mb-4 text-lg font-semibold">Informações Básicas</h2>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            <div className="space-y-4">
                                {property.description && (
                                    <div>
                                        <h3 className="text-sm font-medium text-neutral-500">Descrição</h3>
                                        <p className="text-sm whitespace-pre-line">{property.description}</p>
                                    </div>
                                )}
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500">Região</h3>
                                <p className="text-sm">{property.region?.name || '-'}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500">Tipo</h3>
                                <p className="text-sm">{property.type ? typeLabels[property.type] : '-'}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500">Preço</h3>
                                <p className="text-sm">{formatCurrency(property.price)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Composition Section */}
                    <div className="rounded-lg border p-6">
                        <h2 className="mb-4 text-lg font-semibold">Composição</h2>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500">Área Construída</h3>
                                <p className="text-sm">{formatArea(property.building_area)}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500">Quartos</h3>
                                <p className="text-sm">{property.rooms || '-'}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500">Banheiros</h3>
                                <p className="text-sm">{property.bathrooms || '-'}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500">Suítes</h3>
                                <p className="text-sm">{property.suites || '-'}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500">Vagas de Garagem</h3>
                                <p className="text-sm">{property.garages || '-'}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500">Andar</h3>
                                <p className="text-sm">{property.floor || '-'}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500">Andares do Prédio</h3>
                                <p className="text-sm">{property.building_floors || '-'}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500">Andares da Propriedade</h3>
                                <p className="text-sm">{property.property_floors || '-'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="rounded-lg border p-6">
                        <h2 className="mb-4 text-lg font-semibold">Características</h2>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500">Data de Entrega</h3>
                                <p className="text-sm">{formatDate(property.delivery_key || '-')}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500">Ato Mínimo</h3>
                                <p className="text-sm">{property.min_act || '-'}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500">Ar Condicionado</h3>
                                <p className="text-sm">{property.air_conditioning ? airConditioningLabels[property.air_conditioning] : '-'}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500">Tipo de Acabamento</h3>
                                <p className="text-sm">{property.finsh_type || '-'}</p>
                            </div>
                            {Object.entries(booleanFeatureLabels).map(([field, label]) => (
                                <div key={field}>
                                    <h3 className="text-sm font-medium text-neutral-500">{label}</h3>
                                    <p className="text-sm">
                                        {getBooleanLabel(property[field as keyof typeof property] as boolean | null | undefined)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
