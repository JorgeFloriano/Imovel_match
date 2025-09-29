import { FormInput } from '@/components/form-input';
import { FormSelect } from '@/components/form-select';
import { FormTextarea } from '@/components/form-textarea';
import { Button } from '@/components/ui/button';
import ChecksDropdown from '@/components/ui/checks-dropdown';
import { Head, useForm } from '@inertiajs/react';
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
    encryptedId: string;
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

// const airConditioningOptions = [
//     { value: 'incluso', label: 'Incluso' },
//     { value: 'somente infra', label: 'Somente Infra' },
//     { value: 'não incluso', label: 'Não incluso' },
// ];

// const booleanFeatureLabels = {
//     garden: 'Jardim',
//     pool: 'Piscina',
//     balcony: 'Varanda',
//     acept_pets: 'Aceita Pets',
//     acessibility: 'Acessibilidade',
// };

// ClientPublicUpdate.tsx - Simplified version for clients
export default function ClientPublicUpdate({ client, encryptedId, maritalStatusOptions, booleanOptions, regionOptions }: EditClientProps) {
    const { data, setData, post, transform, processing, errors, recentlySuccessful } = useForm<ClientEditForm>({
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
        post(route('clients.public-update-process', encryptedId));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <Head title="Atualizar Meus Dados" />

            <div className="mx-auto max-w-2xl px-4">
                {/* Client-focused header */}
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Atualize Seus Dados</h1>
                    <p className="mt-2 text-gray-600">Mantenha suas informações atualizadas para receber as melhores oportunidades de imóveis</p>
                </div>

                <form onSubmit={submit} className="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
                    {/* Simplified Personal Information */}
                    <div>
                        <h2 className="mb-4 text-lg font-semibold">Seus Dados Pessoais</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <FormInput
                                label="Nome Completo"
                                placeholder="Ex.: João Paulo Pereira Mendonsa"
                                maxLength={40}
                                value={data.name}
                                onChange={(value) => handleSetData('name', value)}
                                error={errors.name}
                                required
                            />

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <FormInput
                                    label="Telefone"
                                    placeholder="(99) 99999-9999"
                                    maxLength={20}
                                    type="tel"
                                    value={data.phone}
                                    onChange={(value) => handleSetData('phone', value)}
                                    error={errors.phone}
                                />

                                <FormInput
                                    label="E-mail"
                                    type="email"
                                    placeholder="Ex.: joaomendonsa@gmail.com"
                                    maxLength={60}
                                    value={data.email || ''}
                                    onChange={(value) => handleSetData('email', value)}
                                    error={errors.email}
                                />
                            </div>

                            <FormInput
                                label="Profissão"
                                placeholder="Ex.: Desenvolvedor"
                                maxLength={60}
                                value={data.profession}
                                onChange={(value) => handleSetData('profession', value)}
                                error={errors.profession}
                            />

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <FormInput
                                    label="Renda Mensal (R$)"
                                    type="number"
                                    min={0}
                                    step={0.01}
                                    max={9999999999}
                                    value={data.revenue}
                                    onChange={(value) => handleSetData('revenue', value)}
                                    error={errors.revenue}
                                    //helperText="Nos ajuda a encontrar imóveis dentro do seu orçamento"
                                />

                                <FormSelect
                                    label="Estado Civil"
                                    value={data.marital_status}
                                    onValueChange={(value) => setData('marital_status', value)}
                                    options={maritalStatusOptions}
                                    error={errors.marital_status}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Financial Section with Help Text */}
                    <div>
                        <h2 className="mb-4 text-lg font-semibold">Situação Financeira</h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormInput
                                label="Capital Disponível para Entrada (R$)"
                                type="number"
                                value={data.capital}
                                onChange={(value) => handleSetData('capital', value)}
                                error={errors.capital}
                                //helperText="Valor disponível para entrada"
                            />

                            <FormInput
                                label="Saldo do FGTS (R$)"
                                type="number"
                                value={data.fgts || ''}
                                onChange={(value) => handleSetData('fgts', value)}
                                error={errors.fgts}
                            />

                            <FormSelect
                                label="Precisa de Financiamento?"
                                value={data.need_financing.toString()}
                                onValueChange={(value) => handleSetData('need_financing', value === 'true')}
                                options={booleanOptions}
                                error={errors.need_financing}
                            />

                            <FormInput
                                label="Comprometimento da Renda (%)"
                                type="number"
                                value={data.compromised_income}
                                onChange={(value) => handleSetData('compromised_income', value)}
                                error={errors.compromised_income}
                                //helperText="Percentual da renda já comprometido com outras despesas"
                            />
                        </div>
                    </div>

                    {/* Improved Property Desires Section */}
                    <div>
                        <h2 className="mb-4 text-lg font-semibold">O Que Você Está Procurando</h2>

                        <div className="mb-4">
                            <ChecksDropdown
                                label="Regiões de Interesse"
                                placeholder="Selecione as regiões que te interessam"
                                customOptions={regionOptions}
                                value={selectedRegions}
                                onChange={(newSelections) => setSelectedRegions(newSelections)}
                            />
                            <p className="mt-1 text-sm text-gray-500">Selecione uma ou mais regiões onde gostaria de morar</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                            <FormSelect
                                label="Tipo do Imóvel"
                                value={data.type || ''}
                                onValueChange={(value) => setData('type', value)}
                                customOptions={typeOptions}
                                error={errors.type}
                            />

                            <FormInput
                                label="Quartos"
                                type="number"
                                value={data.rooms || ''}
                                onChange={(value) => handleSetData('rooms', value)}
                                error={errors.rooms}
                            />

                            <FormInput
                                label="Banheiros"
                                type="number"
                                value={data.bathrooms || ''}
                                onChange={(value) => handleSetData('bathrooms', value)}
                                error={errors.bathrooms}
                            />
                        </div>

                        {/* Features with better labels for clients */}
                        <div className="mt-4">
                            <label className="mb-2 block text-sm font-medium text-gray-700">Características Desejadas</label>
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                <FormSelect
                                    label="Piscina"
                                    value={data.pool?.toString() || ''}
                                    onValueChange={(value) => setData('pool', value === 'true')}
                                    options={booleanOptions}
                                />

                                <FormSelect
                                    label="Aceita Pets"
                                    value={data.acept_pets?.toString() || ''}
                                    onValueChange={(value) => setData('acept_pets', value === 'true')}
                                    options={booleanOptions}
                                />

                                <FormSelect
                                    label="Jardim"
                                    value={data.garden?.toString() || ''}
                                    onValueChange={(value) => setData('garden', value === 'true')}
                                    options={booleanOptions}
                                />

                                <FormSelect
                                    label="Acessibilidade"
                                    value={data.acessibility?.toString() || ''}
                                    onValueChange={(value) => setData('acessibility', value === 'true')}
                                    options={booleanOptions}
                                />
                            </div>
                        </div>

                        <FormTextarea
                            label="Observações ou Requisitos Especiais"
                            value={data.obs || ''}
                            onChange={(value) => setData('obs', value)}
                            error={errors.obs}
                            placeholder="Ex.: Preciso de garagem para 2 carros, preferência por andar alto..."
                            //helperText="Conte mais sobre o que é importante para você no seu novo imóvel"
                        />
                    </div>

                    {/* Submission */}
                    <div className="border-t pt-6">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                Ao atualizar seus dados, você ajuda nosso corretor a encontrar as melhores opções para você
                            </p>
                            <Button disabled={processing} type="submit" size="lg">
                                {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Atualizar Meus Dados
                            </Button>
                        </div>

                        {recentlySuccessful && (
                            <div className="mt-4 rounded-md border border-green-200 bg-green-50 p-3">
                                <p className="text-sm text-green-800">
                                    ✅ Dados atualizados com sucesso! Obrigado por manter suas informações em dia.
                                </p>
                            </div>
                        )}
                    </div>
                </form>

                {/* Security notice */}
                <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500">🔒 Este link é pessoal e válido por tempo limitado para sua segurança</p>
                </div>
            </div>
        </div>
    );
}
