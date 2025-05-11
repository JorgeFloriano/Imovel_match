import { FormInput } from '@/components/form-input';
import { FormSelect } from '@/components/form-select';
import { FormTextarea } from '@/components/form-textarea';
import { Button } from '@/components/ui/button';
import ChecksDropdown from '@/components/ui/checks-dropdown';
import AppLayout from '@/layouts/app-layout';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

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
    region_id?: string;
    selected_regions?: string[];
    type: string;
    rooms?: number;
    bathrooms?: number;
    suites?: number;
    garages?: number;
    delivery_key?: string;
    building_area?: number;
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
    regionOptions: Array<{ value: string; label: string }>;
}

const typeOptions = [
    { value: 'casa', label: 'Casa' },
    { value: 'casa (condom.)', label: 'Casa (Condom.)' },
    { value: 'sobrado', label: 'Sobrado' },
    { value: 'apartamento', label: 'Apartamento' },
    { value: 'apart. c/ elevad.', label: 'Apart. c/ Elevad.' },
    { value: 'terreno', label: 'Terreno' },
    { value: 'loja', label: 'Loja' },
    { value: 'garagem', label: 'Garagem' },
    { value: 'sala', label: 'Sala' },
    { value: 'outros', label: 'Outros' },
];

export default function CreateClient({ maritalStatusOptions, booleanOptions, regionOptions }: CreateClientProps) {
    // Initialize state for selected regions
    const [selectedRegions, setSelectedRegions] = useState<Record<string, boolean>>(() => {
        const initialState: Record<string, boolean> = {};
        regionOptions.forEach((option) => {
            initialState[option.value] = false; // Default all to unchecked
        });
        return initialState;
    });
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm<ClientCreateForm>({
        // name: '',
        // phone: '',
        // email: '',
        // address: '',
        // marital_status: '',
        // need_financing: true,
        // dependents: 0,
        // profession: '',
        // revenue: 0,
        // capital: 0,
        // fgts: 0,
        // has_property: false,
        // compromised_income: 0,
        // region_id: undefined,
        // selected_regions: [],
        // type: 'apartamento',
        // rooms: 2,
        // bathrooms: 1,
        // suites: 0,
        // garages: 1,
        // delivery_key: '',
        // building_area: 0,
        // installment_payment: undefined,
        // air_conditioning: '',
        // garden: undefined,
        // pool: undefined,
        // balcony: undefined,
        // acept_pets: undefined,
        // acessibility: undefined,
        // obs: '',

        name: 'Client teste',
        phone: '(23) 32323-2323',
        email: 'test@example.com',
        address: 'Rua Teste, 123',
        marital_status: 'solteiro',
        need_financing: true,
        dependents: 2,
        profession: 'Técnico',
        revenue: 15000,
        capital: 23000,
        fgts: 20987,
        has_property: false,
        compromised_income: 23,
        region_id: undefined,
        type: 'apartamento',
        rooms: 2,
        bathrooms: 1,
        suites: 0,
        garages: 1,
        delivery_key: '2026-01-01',
        building_area: 2345,
        installment_payment: true,
        air_conditioning: '',
        garden: undefined,
        pool: false,
        balcony: undefined,
        acept_pets: undefined,
        acessibility: undefined,
        obs: 'Observação teste',
    });

    const handleSetData = (field: keyof ClientCreateForm, value: string | number | undefined | boolean) => {
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

        // Convert selectedRegions to an array of selected region IDs
        const selectedRegionIds = Object.entries(selectedRegions)
            .filter(([_, isSelected]) => isSelected)
            .map(([regionId]) => regionId);

        post(route('clients.store'), {
            // Spread all existing form data
            ...data,
            // Add the selected regions
            selected_regions: selectedRegionIds,
            onSuccess: () => {
                reset(
                    'name',
                    'phone',
                    'email',
                    'address',
                    'marital_status',
                    'need_financing',
                    'dependents',
                    'profession',
                    'revenue',
                    'capital',
                    'fgts',
                    'has_property',
                    'compromised_income',
                    'region_id',
                    'type',
                    'rooms',
                    'bathrooms',
                    'suites',
                    'garages',
                    'delivery_key',
                    'building_area',
                    'installment_payment',
                    'air_conditioning',
                    'garden',
                    'pool',
                    'balcony',
                    'acept_pets',
                    'acessibility',
                    'obs',
                );
                // Also reset the regions selection
                const resetRegions: Record<string, boolean> = {};
                regionOptions.forEach((option) => {
                    resetRegions[option.value] = false;
                });
                setSelectedRegions(resetRegions);
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Cadastro de Cliente" />
            <div className="h-full gap-4 space-y-6 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Cadastro do Cliente</h1>
                    <div className="flex gap-2">
                        <Button asChild variant="outline">
                            <Link href={route('clients.index')}>Voltar</Link>
                        </Button>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {/* Personal Information Section */}
                    <h2 className="text-lg font-semibold">Informações Pessoais</h2>
                    <div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormInput
                                label="Nome Completo"
                                placeholder="Ex.: João Paulo Pereira Mendonsa"
                                maxLength={60}
                                value={data.name}
                                onChange={(value) => handleSetData('name', value)}
                                error={errors.name}
                                required
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <FormInput
                                    label="Telefone"
                                    placeholder="(99) 99999-9999"
                                    maxLength={20}
                                    type="tel"
                                    value={data.phone}
                                    onChange={(value) => handleSetData('phone', value)}
                                    error={errors.phone}
                                    required
                                />

                                <FormSelect
                                    label="Estado Civil"
                                    value={data.marital_status}
                                    onValueChange={(value) => handleSetData('marital_status', value)}
                                    options={maritalStatusOptions}
                                    error={errors.marital_status}
                                />
                            </div>

                            <FormInput
                                label="E-mail"
                                type="email"
                                placeholder="Ex.: joaomendonsa@gmail.com"
                                maxLength={60}
                                value={data.email}
                                onChange={(value) => handleSetData('email', value)}
                                error={errors.email}
                            />

                            <FormInput
                                label="Endereço"
                                placeholder="Ex.: Rua dos Aquidaban, 430"
                                maxLength={100}
                                value={data.address}
                                onChange={(value) => handleSetData('address', value)}
                                error={errors.address}
                            />

                            <FormInput
                                label="Profissão"
                                placeholder="Ex.: Advogado"
                                maxLength={60}
                                value={data.profession}
                                onChange={(value) => handleSetData('profession', value)}
                                error={errors.profession}
                                required
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <FormInput
                                    label="Renda Mensal (R$)"
                                    type="number"
                                    min={0}
                                    step={0.01}
                                    max={9999999999}
                                    value={data.revenue}
                                    onChange={(value) => handleSetData('revenue', value)}
                                    error={errors.revenue}
                                    required
                                />

                                <FormInput
                                    label="Saldo de FGTS (R$)"
                                    type="number"
                                    min={0}
                                    step={0.01}
                                    max={9999999999}
                                    value={data.fgts}
                                    onChange={(value) => handleSetData('fgts', value)}
                                    error={errors.fgts}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Financial Information Section */}
                    <div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="grid grid-cols-2 gap-4">
                                <FormInput
                                    label="Nº de Dependentes"
                                    type="number"
                                    min={0}
                                    max={99}
                                    value={data.dependents}
                                    onChange={(value) => handleSetData('dependents', value)}
                                    error={errors.dependents}
                                    required
                                />

                                <FormInput
                                    label="Compr. de Renda (%)"
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={data.compromised_income}
                                    onChange={(value) => handleSetData('compromised_income', value)}
                                    error={errors.compromised_income}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <FormInput
                                    label="Capital Disponível (R$)"
                                    type="number"
                                    min={0}
                                    step={0.01}
                                    max={9999999999}
                                    value={data.capital}
                                    onChange={(value) => handleSetData('capital', value)}
                                    error={errors.capital}
                                    required
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
                    </div>

                    {/* Desired Property Section */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">Informações do Imóvel Desejado</h2>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            <ChecksDropdown
                                label="Possíveis regiões"
                                placeholder="Selecione as regiões"
                                customOptions={regionOptions}
                                value={selectedRegions} // Controlled from parent
                                onChange={(newSelections) => setSelectedRegions(newSelections)} // Update parent state
                            />

                            <FormSelect
                                label="Tipo de Imóvel"
                                value={data.type ?? ''} // Provide an empty string as a fallback value
                                onValueChange={(value) => handleSetData('type', value)}
                                customOptions={typeOptions}
                                error={errors.type}
                            />

                            <FormInput
                                label="Quartos"
                                type="number"
                                min={0}
                                max={99}
                                value={data.rooms ?? 0}
                                onChange={(value) => handleSetData('rooms', value)}
                                error={errors.rooms}
                            />

                            <FormInput
                                label="Banheiros"
                                type="number"
                                min={0}
                                max={99}
                                value={data.bathrooms ?? 0}
                                onChange={(value) => handleSetData('bathrooms', value)}
                                error={errors.bathrooms}
                            />

                            <FormInput
                                label="Suítes"
                                type="number"
                                min={0}
                                max={99}
                                value={data.suites ?? 0}
                                onChange={(value) => handleSetData('suites', value)}
                                error={errors.suites}
                            />

                            <FormInput
                                label="Vagas na Garagem"
                                type="number"
                                min={0}
                                max={99}
                                value={data.garages ?? 0}
                                onChange={(value) => handleSetData('garages', value)}
                                error={errors.garages}
                            />

                            <FormInput
                                label="Previsão Entrega"
                                type="date"
                                value={data.delivery_key ?? ''}
                                onChange={(value) => handleSetData('delivery_key', value)}
                                error={errors.delivery_key}
                            />

                            <FormInput
                                label="Área Útil (m2)"
                                type="number"
                                min={0}
                                max={9999999999}
                                value={data.building_area ?? 0}
                                onChange={(value) => handleSetData('building_area', value)}
                                error={errors.building_area}
                            />

                            <FormSelect
                                label="Financiado"
                                value={data.need_financing}
                                onValueChange={(value) => handleSetData('need_financing', value === 'true')}
                                options={booleanOptions}
                                error={errors.need_financing}
                            />

                            <FormSelect
                                label="Entrada Parcelada"
                                value={data.installment_payment ?? false}
                                onValueChange={(value) => handleSetData('installment_payment', value === 'true')}
                                options={booleanOptions}
                                error={errors.installment_payment}
                            />

                            <FormSelect
                                label="Ar Condicionado"
                                value={data.air_conditioning ?? false}
                                onValueChange={(value) => handleSetData('air_conditioning', value)}
                                customOptions={airConditioningOptions}
                                error={errors.air_conditioning}
                            />

                            {/* Boolean Features */}
                            {Object.entries(booleanFeatureLabels).map(([field, label]) => (
                                <FormSelect
                                    key={field}
                                    label={label}
                                    value={data[field as keyof ClientCreateForm]?.toString() || ''}
                                    onValueChange={(value) => handleSetData(field as keyof ClientCreateForm, value === 'true')}
                                    options={booleanOptions}
                                    error={(errors as Record<string, string>)[field]}
                                />
                            ))}

                            <FormTextarea
                                label="Observações"
                                rows={1}
                                maxLength={300}
                                placeholder="Ex.: Cliente quer uma casa com vista para o mar..."
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
