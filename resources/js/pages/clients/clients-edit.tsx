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

type ClientEditForm = {
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
    region_id?: string;
    selected_regions?: string[];
    type?: string;
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

interface EditClientProps {
    client: ClientEditForm & { id: number; wishe: { regions?: { id: number }[] } };
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

export default function EditClient({ client, maritalStatusOptions, booleanOptions, regionOptions }: EditClientProps) {
    const { data, setData, put, processing, errors, transform, recentlySuccessful } = useForm<ClientEditForm>({
        ...client,
        ...(client.wishe ?? {}),
        need_financing: client.need_financing ?? true,
        has_property: client.has_property ?? false,
    });

    // In your EditClient component, modify the selectedRegions initialization:
const [selectedRegions, setSelectedRegions] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    
    // Initialize all regions as false first
    regionOptions.forEach((option) => {
        initialState[option.value] = false;
    });
    
    // Mark the initially selected regions as true
    client.wishe?.regions?.forEach((region: { id: number }) => {
        const regionId = region.id.toString();
        if (regionId in initialState) {
            initialState[regionId] = true;
        }
    });
    
    return initialState;
});

    const handleSetData = (field: keyof ClientEditForm, value: string | number | undefined | boolean) => {
        setData(field, value);
    };

    // Transform the data before submission
    transform((data) => ({
        ...data,
        selected_regions: Object.entries(selectedRegions)
            .filter(([, isSelected]) => isSelected)
            .map(([regionId]) => regionId),
    }));

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('clients.update', client.id));
    };

    // Converting delivery_key to date
    if (data.delivery_key !== null && typeof data.delivery_key === 'string' && data.delivery_key !== '')
        data.delivery_key = new Date(data.delivery_key ?? '').toISOString().split('T')[0];

    return (
        <AppLayout>
            <Head title="Editar Cliente" />
            <div className="h-full gap-4 space-y-6 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Editar do Cliente</h1>
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
                                maxLength={40}
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
                                value={data.email || ''}
                                onChange={(value) => handleSetData('email', value)}
                                error={errors.email}
                            />

                            <FormInput
                                label="Endereço"
                                placeholder="Ex.: Rua João Paulo, 123"
                                maxLength={100}
                                value={data.address || ''}
                                onChange={(value) => handleSetData('address', value)}
                                error={errors.address}
                            />

                            <FormInput
                                label="Profissão"
                                placeholder="Ex.: Desenvolvedor"
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
                                    value={data.fgts || ''}
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
                                    value={data.has_property.toString()}
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
                                placeholder="Selecionar regiões"
                                customOptions={regionOptions}
                                value={selectedRegions}
                                onChange={(newSelections) => setSelectedRegions(newSelections)}
                            />

                            <FormSelect
                                label="Tipo de Imóvel"
                                value={data.type || ''}
                                onValueChange={(value) => handleSetData('type', value)}
                                customOptions={typeOptions}
                                error={errors.type}
                            />

                            <FormInput
                                label="Quartos"
                                type="number"
                                min={0}
                                max={99}
                                value={data.rooms || ''}
                                onChange={(value) => handleSetData('rooms', value ? value : undefined)}
                                error={errors.rooms}
                            />

                            <FormInput
                                label="Banheiros"
                                type="number"
                                min={0}
                                max={99}
                                value={data.bathrooms || ''}
                                onChange={(value) => handleSetData('bathrooms', value ? value : undefined)}
                                error={errors.bathrooms}
                            />

                            <FormInput
                                label="Suítes"
                                type="number"
                                min={0}
                                max={99}
                                value={data.suites || ''}
                                onChange={(value) => handleSetData('suites', value ? value : undefined)}
                                error={errors.suites}
                            />

                            <FormInput
                                label="Vagas na Garagem"
                                type="number"
                                min={0}
                                max={99}
                                value={data.garages || ''}
                                onChange={(value) => handleSetData('garages', value ? value : undefined)}
                                error={errors.garages}
                            />

                            <FormInput
                                label="Previsão Entrega"
                                type="date"
                                value={data.delivery_key || ''}
                                onChange={(value) => handleSetData('delivery_key', value || '')}
                                error={errors.delivery_key}
                            />

                            <FormInput
                                label="Área Útil (m2)"
                                type="number"
                                min={0}
                                max={9999999999}
                                step={0.01}
                                value={data.building_area || ''}
                                onChange={(value) => handleSetData('building_area', value ? value : undefined)}
                                error={errors.building_area}
                            />

                            <FormSelect
                                label="Financiado"
                                value={data.need_financing.toString()}
                                onValueChange={(value) => handleSetData('need_financing', value === 'true')}
                                options={booleanOptions}
                                error={errors.need_financing}
                            />

                            <FormSelect
                                label="Entrada Parcelada"
                                value={data.installment_payment?.toString() || ''}
                                onValueChange={(value) => handleSetData('installment_payment', value === 'true')}
                                options={booleanOptions}
                                error={errors.installment_payment}
                            />

                            <FormSelect
                                label="Ar Condicionado"
                                value={data.air_conditioning || ''}
                                onValueChange={(value) => handleSetData('air_conditioning', value)}
                                customOptions={airConditioningOptions}
                                error={errors.air_conditioning}
                            />

                            {/* Boolean Features */}
                            {Object.entries(booleanFeatureLabels).map(([field, label]) => (
                                <FormSelect
                                    key={field}
                                    label={label}
                                    value={data[field as keyof ClientEditForm]?.toString() || ''}
                                    onValueChange={(value) => handleSetData(field as keyof ClientEditForm, value === 'true')}
                                    options={booleanOptions}
                                    error={(errors as Record<string, string>)[field]}
                                />
                            ))}

                            <FormTextarea
                                label="Observações"
                                rows={1}
                                value={data.obs || ''}
                                maxLength={300}
                                placeholder="Ex.: Cliente quer casa com vista para o por do sol."
                                onChange={(value) => handleSetData('obs', value)}
                                error={errors.obs}
                                className="col-span-full"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing} type="submit">
                            {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Atualizar
                        </Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">Alterações salvas</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
