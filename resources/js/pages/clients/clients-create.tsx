import { FormInput } from '@/components/form-input';
import { FormSelect } from '@/components/form-select';
import { FormTextarea } from '@/components/form-textarea';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { FormEventHandler } from 'react';

type ClientCreateForm = {
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
    region_id?: number;
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

interface CreateClientProps {
    maritalStatusOptions: Record<string, string>;
    booleanOptions: Record<string, string>;
    regionOptions: Record<string, number>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clientes',
        href: '/clients',
    },
];

export default function CreateClient({ maritalStatusOptions, booleanOptions, regionOptions }: CreateClientProps) {
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm<ClientCreateForm>({
        name: '',
        phone: '',
        email: '',
        address: '',
        marital_status: '',
        need_financing: true,
        dependents: 0,
        profession: '',
        revenue: 0,
        capital: 0,
        fgts: 0,
        has_property: false,
        compromised_income: 0,
        region_id: '',
        rooms: 0,
        bathrooms: 0,
        suites: 0,
        garages: 0,
        delivery_key: '',
        min_act: 0,
        installment_payment: false,
        air_conditioning: '',
        garden: false,
        pool: false,
        balcony: false,
        acept_pets: false,
        acessibility: false,
        obs: '',
    });

    const handleSetData = (field: keyof ClientCreateForm, value: any) => {
        setData(field, value);
    };

    const airConditioningOptions = [
        { value: 'incluso', label: 'Incluso' },
        { value: 'somente infra', label: 'Somente Infra' },
        { value: 'não incluso', label: 'Não incluso' },
    ];

    const booleanFeatureLabels = {
        garden: 'Jardim',
        pool: 'Piscina',
        balcony: 'Varanda',
        acept_pets: 'Aceita Pets',
        acessibility: 'Acessibilidade',
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('clients.store'), {
            onSuccess: () =>
                reset(
                   
                ),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cadastro de Cliente" />
            <div className="h-full gap-4 space-y-6 rounded-xl p-4">
                <h1 className="mb-6 text-2xl font-bold">Cadastro de Cliente</h1>

                <form onSubmit={submit} className="space-y-6">
                    {/* Personal Information Section */}
                    <h2 className="text-lg font-semibold">Informações Pessoais</h2>
                    <div className="space-y-4 border-b pb-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormInput
                                label="Nome Completo"
                                value={data.name}
                                onChange={(value) => handleSetData('name', value)}
                                error={errors.name}
                                required
                            />

                            <FormInput
                                label="Telefone"
                                type="tel"
                                value={data.phone}
                                onChange={(value) => handleSetData('phone', value)}
                                error={errors.phone}
                                required
                            />

                            <FormInput
                                label="E-mail"
                                type="email"
                                value={data.email}
                                onChange={(value) => handleSetData('email', value)}
                                error={errors.email}
                            />

                            <FormSelect
                                label="Estado Civil"
                                value={data.marital_status}
                                onValueChange={(value) => handleSetData('marital_status', value)}
                                options={maritalStatusOptions}
                                error={errors.marital_status}
                            />

                            <FormInput
                                label="Endereço"
                                value={data.address}
                                onChange={(value) => handleSetData('address', value)}
                                error={errors.address}
                            />

                            <FormInput
                                label="Número de Dependentes"
                                type="number"
                                min={0}
                                value={data.dependents}
                                onChange={(value) => handleSetData('dependents', value)}
                                error={errors.dependents}
                                required
                            />
                        </div>
                    </div>

                    {/* Financial Information Section */}
                    <div className="space-y-4 border-b pb-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormInput
                                label="Profissão"
                                value={data.profession}
                                onChange={(value) => handleSetData('profession', value)}
                                error={errors.profession}
                                required
                            />

                            <FormInput
                                label="Renda Mensal (R$)"
                                type="number"
                                min={0}
                                step={0.01}
                                value={data.revenue}
                                onChange={(value) => handleSetData('revenue', value)}
                                error={errors.revenue}
                                required
                            />

                            <FormInput
                                label="Capital Disponível (R$)"
                                type="number"
                                min={0}
                                step={0.01}
                                value={data.capital}
                                onChange={(value) => handleSetData('capital', value)}
                                error={errors.capital}
                                required
                            />

                            <FormInput
                                label="Saldo de FGTS (R$)"
                                type="number"
                                min={0}
                                step={0.01}
                                value={data.fgts}
                                onChange={(value) => handleSetData('fgts', value)}
                                error={errors.fgts}
                            />

                            <FormInput
                                label="Renda Comprometida (%)"
                                type="number"
                                min={0}
                                max={100}
                                value={data.compromised_income}
                                onChange={(value) => handleSetData('compromised_income', value)}
                                error={errors.compromised_income}
                                required
                            />
                        </div>
                    </div>

                    {/* Property Information Section */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormSelect
                                label="Precisa de Financiamento?"
                                value={data.need_financing}
                                onValueChange={(value) => handleSetData('need_financing', value === 'true')}
                                options={booleanOptions}
                                error={errors.need_financing}
                            />

                            <FormSelect
                                label="Já possúi propriedade?"
                                value={data.has_property}
                                onValueChange={(value) => handleSetData('has_property', value === 'true')}
                                options={booleanOptions}
                                error={errors.has_property}
                            />
                        </div>
                    </div>

                    {/* Desired Property Section */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">Informações do Imóvel Desejado</h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormSelect
                                label="Selecione a Região"
                                value={data.region_id?.toString()} // Convert number to string for the select
                                onValueChange={(value) => handleSetData('region_id', Number(value))}
                                options={regionOptions}
                                error={errors.region_id}
                                numeric // Add this prop
                            />

                            <FormInput
                                label="Quartos"
                                type="number"
                                min={0}
                                value={data.rooms}
                                onChange={(value) => handleSetData('rooms', value)}
                                error={errors.rooms}
                            />

                            <FormInput
                                label="Banheiros"
                                type="number"
                                min={0}
                                value={data.bathrooms}
                                onChange={(value) => handleSetData('bathrooms', value)}
                                error={errors.bathrooms}
                            />

                            <FormInput
                                label="Suítes"
                                type="number"
                                min={0}
                                value={data.suites}
                                onChange={(value) => handleSetData('suites', value)}
                                error={errors.suites}
                            />

                            <FormInput
                                label="Vagas na Garagem"
                                type="number"
                                min={0}
                                value={data.garages}
                                onChange={(value) => handleSetData('garages', value)}
                                error={errors.garages}
                            />

                            <FormInput
                                label="Previsão Entrega"
                                type="date"
                                value={data.delivery_key}
                                onChange={(value) => handleSetData('delivery_key', value)}
                                error={errors.delivery_key}
                            />

                            <FormInput
                                label="Área Útil Mínima"
                                type="number"
                                min={0}
                                value={data.min_act}
                                onChange={(value) => handleSetData('min_act', value)}
                                error={errors.min_act}
                            />

                            <FormSelect
                                label="Entrada Parcelada?"
                                value={data.installment_payment}
                                onValueChange={(value) => handleSetData('installment_payment', value === 'true')}
                                options={booleanOptions}
                                error={errors.installment_payment}
                            />

                            <FormSelect
                                label="Ar Condicionado"
                                value={data.air_conditioning}
                                onValueChange={(value) => handleSetData('air_conditioning', value)}
                                customOptions={airConditioningOptions}
                                error={errors.air_conditioning}
                            />

                            {/* Boolean Features */}
                            {Object.entries(booleanFeatureLabels).map(([field, label]) => (
                                <FormSelect
                                    key={field}
                                    label={label}
                                    value={data[field]}
                                    onValueChange={(value) => handleSetData(field, value === 'true')}
                                    options={booleanOptions}
                                    error={errors[field]}
                                />
                            ))}

                            <FormTextarea
                                label="Observações"
                                value={data.obs || ''}
                                onChange={(value) => handleSetData('obs', value)}
                                error={errors.obs}
                                className="col-span-full"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing} type="submit">
                            {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Salvar
                        </Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">Cadastro Salvo</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
