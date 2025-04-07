import { FormInput } from '@/components/form-input';
import { FormSelect } from '@/components/form-select';
import { FormTextarea } from '@/components/form-textarea';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { FormEventHandler } from 'react';

type PropertyCreateForm = {
    user_id: number;
    contact_name: string | null;
    contact_phone: string | null;
    district_id?: number;
    type: 'casa' | 'casa (condom.)' | 'sobrado' | 'apartamento' | 'apart. c/ elevad.' | 'terreno' | 'loja' | 'garagem' | 'sala' | 'outros' | null;
    iptu: number;
    description: string | null;
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

interface CreatePropertyProps {
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

export default function CreateProperty({ typeOptions, airConditioningOptions, booleanOptions, districtOptions }: CreatePropertyProps) {
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm<PropertyCreateForm>({
        user_id: 0,
        contact_name: null,
        contact_phone: null,
        district_id: undefined,
        type: null,
        iptu: 0,
        description: null,
        price: 0,
        land_area: 0,
        building_area: 0,
        image: null,
        address: '',
        rooms: 0,
        bathrooms: 0,
        suites: 0,
        garages: 0,
        floor: 0,
        building_floors: 0,
        property_floors: 0,
        delivery_key: '',
        min_act: null,
        installment_payment: false,
        incc_financing: null,
        documents: null,
        finsh_type: null,
        air_conditioning: 'não incluso',
        garden: null,
        pool: null,
        balcony: null,
        acept_pets: null,
        acessibility: null,
        obs: null,
    });

    const handleSetData = (field: keyof PropertyCreateForm, value: string | number | boolean | null) => {
        setData(field, value);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('properties.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout>
            <Head title="Cadastro de Propriedade" />
            <div className="h-full gap-4 space-y-6 rounded-xl p-4">
                <h1 className="mb-6 text-2xl font-bold">Cadastro de Imóvel</h1>

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormInput
                            label="Descrição"
                            placeholder="Ex: Troplical Park (duplex)"
                            value={data.address || ''}
                            onChange={(value) => handleSetData('description', value)}
                            error={errors.address}
                        />
                        <FormInput
                            label="Nome do Contato"
                            placeholder="Ex: João da Silva (Construtora Planeta)"
                            value={data.address || ''}
                            onChange={(value) => handleSetData('contact_name', value)}
                            error={errors.address}
                        />
                        <FormInput
                            label="Telefone do Contato"
                            value={data.address || ''}
                            placeholder="Ex: (99) 99999-9999"
                            onChange={(value) => handleSetData('contact_phone', value)}
                            error={errors.address}
                        />

                        <FormSelect
                            label="Bairro"
                            placeholder="Selecione um bairro"
                            value={(data.district_id || '').toString()}
                            onValueChange={(value) => handleSetData('district_id', parseInt(value))}
                            options={districtOptions}
                            error={errors.district_id}
                            required
                        />

                        <FormSelect
                            label="Tipo de Propriedade"
                            value={data.type || ''}
                            onValueChange={(value) => handleSetData('type', value as PropertyCreateForm['type'])}
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
                            label="Endereço"
                            placeholder="Ex: Rua das Laranjeiras, 087 - Centro"
                            value={data.address || ''}
                            onChange={(value) => handleSetData('address', value)}
                            error={errors.address}
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
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <FormInput
                            label="Área do Terreno (m²)"
                            type="number"
                            min={0}
                            step={0.01}
                            value={data.land_area}
                            onChange={(value) => handleSetData('land_area', value ? value : null)}
                            error={errors.land_area}
                        />

                        <FormInput
                            label="Área Construída (m²)"
                            type="number"
                            min={0}
                            step={0.01}
                            value={data.building_area}
                            onChange={(value) => handleSetData('building_area', value ? value : null)}
                            error={errors.building_area}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
                            label="Andares da Propriedade"
                            type="number"
                            min={0}
                            value={data.property_floors ?? 0}
                            onChange={(value) => handleSetData('property_floors', value)}
                            error={errors.property_floors}
                        />
                    </div>

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
                            value={data.min_act ?? 0}
                            onChange={(value) => handleSetData('min_act', value)}
                            error={errors.min_act}
                        />

                        <FormSelect
                            label="Ar Condicionado"
                            value={data.air_conditioning}
                            onValueChange={(value) => handleSetData('air_conditioning', value as PropertyCreateForm['air_conditioning'])}
                            options={airConditioningOptions}
                            error={errors.air_conditioning}
                        />

                        <FormInput
                            label="Tipo de Acabamento"
                            placeholder='Ex: Cerâmica, Porcelanato, etc.'
                            value={data.finsh_type || ''}
                            onChange={(value) => handleSetData('finsh_type', value)}
                            error={errors.finsh_type}
                        />

                        {/* Boolean Features */}
                        {Object.entries(booleanFeatureLabels).map(([field, label]) => (
                            <FormSelect
                                key={field}
                                label={label}
                                value={data[field as keyof PropertyCreateForm]?.toString() || ''}
                                onValueChange={(value) => handleSetData(field as keyof PropertyCreateForm, value === 'true')}
                                options={booleanOptions}
                                error={(errors as Record<string, string>)[field]}
                            />
                        ))}
                    </div>

                    {/* Description Section */}
                    <div>
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
                            Salvar
                        </Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">Propriedade Cadastrada</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
