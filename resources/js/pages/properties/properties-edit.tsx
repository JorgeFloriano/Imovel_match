import { FormInput } from '@/components/form-input';
import { FormSelect } from '@/components/form-select';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { FormEventHandler } from 'react';

type PropertyEditForm = {
    id: number;
    description: string | null;
    contact_name: string | null;
    contact_phone: string | null;
    contact_link: string | null;
    district_id?: string;
    type: 'casa' | 'casa (condom.)' | 'sobrado' | 'apartamento' | 'apart. c/ elevad.' | 'terreno' | 'loja' | 'garagem' | 'sala' | 'outros' | null;
    iptu: number;
    price: number;
    land_area: number;
    building_area: number;
    image: string | null;
    address: string | null;
    rooms?: number;
    bathrooms: number | null;
    suites: number | null;
    garages: number | null;
    floor: number | null;
    building_floors: number | null;
    property_floors: number | null;
    delivery_key: string | null;
    min_act: number | null;
    installment_payment: boolean | null;
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
    property: PropertyEditForm;
    typeOptions: Record<string, string>;
    airConditioningOptions: Record<string, string>;
    booleanOptions: Record<string, string>;
    districtOptions: Array<{ value: string; label: string }>;
}

const booleanFeatureLabels = {
    garden: 'Jardim',
    pool: 'Piscina',
    balcony: 'Varanda',
    acept_pets: 'Aceita Pets',
    acessibility: 'Acessibilidade',
    installment_payment: 'Entrada Parcelada',
    incc_financing: 'INCC/Financ.',
    documents: 'Documentação Inclusa',
};

export default function EditProperty({ property, typeOptions, airConditioningOptions, booleanOptions, districtOptions }: EditPropertyProps) {
    const { data, setData, put, processing, errors, recentlySuccessful } = useForm<PropertyEditForm>({
        id: property.id,
        description: property.description || null,
        contact_name: property.contact_name || null,
        contact_phone: property.contact_phone || null,
        contact_link: property.contact_link || null,
        district_id: property.district_id || undefined,
        type: property.type || null,
        iptu: property.iptu || 0,
        price: property.price || 0,
        land_area: property.land_area || 0,
        building_area: property.building_area || 0,
        image: property.image || null,
        address: property.address || '',
        rooms: property.rooms || 0,
        bathrooms: property.bathrooms || 0,
        suites: property.suites || 0,
        garages: property.garages || 0,
        floor: property.floor || 0,
        building_floors: property.building_floors || 0,
        property_floors: property.property_floors || 0,
        delivery_key: property.delivery_key || null,
        min_act: property.min_act || 0,
        installment_payment: property.installment_payment || null,
        incc_financing: property.incc_financing || null,
        documents: property.documents || null,
        finsh_type: property.finsh_type || '',
        air_conditioning: property.air_conditioning || undefined,
        garden: property.garden || null,
        pool: property.pool || null,
        balcony: property.balcony || null,
        acept_pets: property.acept_pets || null,
        acessibility: property.acessibility || null,
        obs: property.obs || '',
    });

    const handleSetData = (field: keyof PropertyEditForm, value: string | number | boolean | null) => {
        setData(field, value);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('properties.update', property.id));
    };

    // Converting delivery_key to date
    if (data.delivery_key !== null && typeof data.delivery_key === 'string' && data.delivery_key !== '')
        data.delivery_key = new Date(data.delivery_key ?? '').toISOString().split('T')[0];

    return (
        <AppLayout>
            <Head title="Edição de Propriedade" />
            <div className="h-full gap-4 space-y-6 rounded-xl p-4">
                <h1 className="mb-6 text-2xl font-bold">Edição de Imóvel</h1>

                <form onSubmit={submit} className="space-y-6">
                    <div className="mb-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormInput
                            label="Descrição"
                            placeholder="Ex: Troplical Park (duplex)"
                            value={data.description || ''}
                            onChange={(value) => handleSetData('description', value)}
                            error={errors.description}
                        />

                        <FormInput
                            label="Endereço"
                            placeholder="Ex: Rua das Laranjeiras, 087 - Centro"
                            maxLength={100}
                            value={data.address || ''}
                            onChange={(value) => handleSetData('address', value)}
                            error={errors.address}
                        />

                        <FormInput
                            label="Site/Link para informações"
                            placeholder="Ex: https://www.meuempreendimento.com.br"
                            value={data.contact_link || ''}
                            onChange={(value) => handleSetData('contact_link', value)}
                            error={errors.contact_link}
                        />

                        <FormInput
                            label="Nome do Contato"
                            placeholder="Ex: João da Silva (Construtora Planeta)"
                            value={data.contact_name || ''}
                            onChange={(value) => handleSetData('contact_name', value)}
                            error={errors.contact_name}
                        />
                    </div>

                    <div className="mb-3 grid grid-cols-2 gap-4 md:grid-cols-4">
                        <FormInput
                            label="Tel./WhatsApp"
                            value={data.contact_phone || ''}
                            placeholder="Ex: (99) 99999-9999"
                            onChange={(value) => handleSetData('contact_phone', value)}
                            error={errors.contact_phone}
                        />

                        <FormSelect
                            label="Bairro"
                            placeholder="Selecione um bairro"
                            value={data.district_id || ''}
                            onValueChange={(value) => handleSetData('district_id', parseInt(value))}
                            customOptions={districtOptions}
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
                            onChange={(value) => handleSetData('price', value)}
                            error={errors.price}
                            required
                        />

                        <FormInput
                            label="IPTU (R$)"
                            type="number"
                            min={0}
                            value={data.iptu}
                            onChange={(value) => handleSetData('iptu', value)}
                            error={errors.iptu}
                            required
                        />

                        <FormInput
                            label="Área do Terreno (m²)"
                            type="number"
                            min={0}
                            step={0.01}
                            value={data.land_area}
                            onChange={(value) => handleSetData('land_area', value)}
                            error={errors.land_area}
                        />

                        <FormInput
                            label="Área Construída (m²)"
                            type="number"
                            min={0}
                            step={0.01}
                            value={data.building_area}
                            onChange={(value) => handleSetData('building_area', value)}
                            error={errors.building_area}
                        />

                        <FormInput
                            label="Quartos"
                            type="number"
                            min={0}
                            value={data.rooms ?? 0}
                            onChange={(value) => handleSetData('rooms', value)}
                            error={errors.rooms}
                        />

                        <FormInput
                            label="Banheiros"
                            type="number"
                            min={0}
                            value={data.bathrooms ?? 0}
                            onChange={(value) => handleSetData('bathrooms', value)}
                            error={errors.bathrooms}
                        />

                        <FormInput
                            label="Suítes"
                            type="number"
                            min={0}
                            value={data.suites ?? 0}
                            onChange={(value) => handleSetData('suites', value)}
                            error={errors.suites}
                        />

                        <FormInput
                            label="Vagas de Garagem"
                            type="number"
                            min={0}
                            value={data.garages ?? 0}
                            onChange={(value) => handleSetData('garages', value)}
                            error={errors.garages}
                        />

                        <FormInput
                            label="Andar"
                            type="number"
                            min={0}
                            value={data.floor ?? 0}
                            onChange={(value) => handleSetData('floor', value)}
                            error={errors.floor}
                        />

                        <FormInput
                            label="Andares do Prédio"
                            type="number"
                            min={0}
                            value={data.building_floors ?? 0}
                            onChange={(value) => handleSetData('building_floors', value)}
                            error={errors.building_floors}
                        />

                        <FormInput
                            label="Andares do Imóvel"
                            type="number"
                            min={0}
                            value={data.property_floors ?? 0}
                            onChange={(value) => handleSetData('property_floors', value)}
                            error={errors.property_floors}
                        />

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
                            value={data.min_act ?? 0}
                            onChange={(value) => handleSetData('min_act', value)}
                            error={errors.min_act}
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

                    <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-2 md:col-span-1">
                            <FormSelect
                                label="Ar Condicionado"
                                value={data.air_conditioning}
                                onValueChange={(value) => handleSetData('air_conditioning', value as PropertyEditForm['air_conditioning'])}
                                options={airConditioningOptions}
                                error={errors.air_conditioning}
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <FormInput
                                label="Tipo de Acabamento"
                                placeholder="Ex: Cerâmica, Porcelanato, etc."
                                value={data.finsh_type || ''}
                                onChange={(value) => handleSetData('finsh_type', value)}
                                error={errors.finsh_type}
                            />
                        </div>

                        <div className="col-span-4 md:col-span-2">
                            <FormInput
                                label="Observações"
                                value={data.obs || ''}
                                onChange={(value) => handleSetData('obs', value)}
                                error={errors.obs}
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
                            <p className="text-sm text-neutral-600">Propriedade Atualizada</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}