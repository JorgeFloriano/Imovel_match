import { FormInput } from '@/components/form-input';
import { FormSelect } from '@/components/form-select';
import { FormTextarea } from '@/components/form-textarea';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { FormEventHandler } from 'react';

type PropertyEditForm = {
    user_id: number;
    district_id: number;
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

interface EditPropertyProps {
    property: PropertyEditForm & { id: number };
    typeOptions: Record<string, string>;
    airConditioningOptions: Record<string, string>;
    booleanOptions: Record<string, string>;
    districtOptions: Record<string, string>;
    userOptions: Record<string, string>;
}

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

export default function EditProperty({ 
    property, 
    typeOptions, 
    airConditioningOptions, 
    booleanOptions, 
    districtOptions, 
    userOptions 
}: EditPropertyProps) {
    const { data, setData, put, processing, errors, recentlySuccessful } = useForm<PropertyEditForm>({
        ...property,
    });

    const handleSetData = (field: keyof PropertyEditForm, value: string | number | boolean | null) => {
        setData(field, value);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('properties.update', property.id));
    };

    return (
        <AppLayout>
            <Head title="Editar Propriedade" />
            <div className="h-full gap-4 space-y-6 rounded-xl p-4">
                <h1 className="mb-6 text-2xl font-bold">Editar Propriedade</h1>

                <form onSubmit={submit} className="space-y-6">
                    {/* Basic Information Section */}
                    <h2 className="text-lg font-semibold">Informações Básicas</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormSelect
                            label="Proprietário"
                            value={data.user_id.toString()}
                            onValueChange={(value) => handleSetData('user_id', parseInt(value))}
                            options={userOptions}
                            error={errors.user_id}
                            required
                        />

                        <FormSelect
                            label="Bairro"
                            value={data.district_id.toString()}
                            onValueChange={(value) => handleSetData('district_id', parseInt(value))}
                            options={districtOptions}
                            error={errors.district_id}
                            required
                        />

                        <FormSelect
                            label="Tipo de Propriedade"
                            value={data.type || ''}
                            onValueChange={(value) => handleSetData('type', value as PropertyEditForm['type'])}
                            options={typeOptions}
                            error={errors.type}
                        />

                        <FormInput
                            label="Preço (R$)"
                            type="number"
                            min={0}
                            step={0.01}
                            value={data.price}
                            onChange={(value) => handleSetData('price', parseFloat(value))}
                            error={errors.price}
                            required
                        />

                        <FormInput
                            label="Endereço"
                            value={data.address || ''}
                            onChange={(value) => handleSetData('address', value)}
                            error={errors.address}
                        />

                        <FormInput
                            label="IPTU"
                            value={data.iptu || ''}
                            onChange={(value) => handleSetData('iptu', value)}
                            error={errors.iptu}
                        />
                    </div>

                    {/* Area Information Section */}
                    <h2 className="text-lg font-semibold">Áreas</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <FormInput
                            label="Área do Terreno (m²)"
                            type="number"
                            min={0}
                            step={0.01}
                            value={data.land_area || ''}
                            onChange={(value) => handleSetData('land_area', value ? parseFloat(value) : null)}
                            error={errors.land_area}
                        />

                        <FormInput
                            label="Área Construída (m²)"
                            type="number"
                            min={0}
                            step={0.01}
                            value={data.building_area || ''}
                            onChange={(value) => handleSetData('building_area', value ? parseFloat(value) : null)}
                            error={errors.building_area}
                        />
                    </div>

                    {/* Rooms and Floors Section */}
                    <h2 className="text-lg font-semibold">Composição</h2>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        <FormInput
                            label="Quartos"
                            type="number"
                            min={0}
                            value={data.rooms || ''}
                            onChange={(value) => handleSetData('rooms', value ? parseInt(value) : null)}
                            error={errors.rooms}
                        />

                        <FormInput
                            label="Banheiros"
                            type="number"
                            min={0}
                            value={data.bathrooms || ''}
                            onChange={(value) => handleSetData('bathrooms', value ? parseInt(value) : null)}
                            error={errors.bathrooms}
                        />

                        <FormInput
                            label="Suítes"
                            type="number"
                            min={0}
                            value={data.suites || ''}
                            onChange={(value) => handleSetData('suites', value ? parseInt(value) : null)}
                            error={errors.suites}
                        />

                        <FormInput
                            label="Vagas de Garagem"
                            type="number"
                            min={0}
                            value={data.garages || ''}
                            onChange={(value) => handleSetData('garages', value ? parseInt(value) : null)}
                            error={errors.garages}
                        />

                        <FormInput
                            label="Andar"
                            type="number"
                            min={0}
                            value={data.floor || ''}
                            onChange={(value) => handleSetData('floor', value ? parseInt(value) : null)}
                            error={errors.floor}
                        />

                        <FormInput
                            label="Andares do Prédio"
                            type="number"
                            min={0}
                            value={data.building_floors || ''}
                            onChange={(value) => handleSetData('building_floors', value ? parseInt(value) : null)}
                            error={errors.building_floors}
                        />

                        <FormInput
                            label="Andares da Propriedade"
                            type="number"
                            min={0}
                            value={data.property_floors || ''}
                            onChange={(value) => handleSetData('property_floors', value ? parseInt(value) : null)}
                            error={errors.property_floors}
                        />
                    </div>

                    {/* Features Section */}
                    <h2 className="text-lg font-semibold">Características</h2>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        <FormInput
                            label="Data de Entrega"
                            type="date"
                            value={data.delivery_key || ''}
                            onChange={(value) => handleSetData('delivery_key', value)}
                            error={errors.delivery_key}
                        />

                        <FormInput
                            label="Ato Mínimo"
                            type="number"
                            min={0}
                            value={data.min_act || ''}
                            onChange={(value) => handleSetData('min_act', value ? parseInt(value) : null)}
                            error={errors.min_act}
                        />

                        <FormSelect
                            label="Ar Condicionado"
                            value={data.air_conditioning}
                            onValueChange={(value) => handleSetData('air_conditioning', value as PropertyEditForm['air_conditioning'])}
                            options={airConditioningOptions}
                            error={errors.air_conditioning}
                        />

                        <FormInput
                            label="Tipo de Acabamento"
                            value={data.finsh_type || ''}
                            onChange={(value) => handleSetData('finsh_type', value)}
                            error={errors.finsh_type}
                        />

                        {/* Boolean Features */}
                        {Object.entries(booleanFeatureLabels).map(([field, label]) => (
                            <FormSelect
                                key={field}
                                label={label}
                                value={data[field as keyof PropertyEditForm]?.toString() || ''}
                                onValueChange={(value) => handleSetData(field as keyof PropertyEditForm, value === 'true')}
                                options={booleanOptions}
                                error={(errors as Record<string, string>)[field]}
                            />
                        ))}
                    </div>

                    {/* Description Section */}
                    <div>
                        <FormTextarea
                            label="Descrição"
                            value={data.description || ''}
                            onChange={(value) => handleSetData('description', value)}
                            error={errors.description}
                        />

                        <FormTextarea
                            label="Observações"
                            value={data.obs || ''}
                            onChange={(value) => handleSetData('obs', value)}
                            error={errors.obs}
                        />
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
                            <p className="text-sm text-neutral-600">Propriedade atualizada</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}