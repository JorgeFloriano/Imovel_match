import { FormInput } from '@/components/form-input';
import { FormSelect } from '@/components/form-select';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { FormEventHandler } from 'react';

type PropertyCreateForm = {
    description: string | null;
    contact_name: string | null;
    contact_phone: string | null;
    contact_link: string | null;
    place_link: string | null;
    region_id?: string;
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
    air_conditioning: 'incluso' | 'somente infra' | 'não incluso' | '';
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
    regionOptions: Array<{ value: string; label: string }>;
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

export default function CreateProperty({ typeOptions, airConditioningOptions, booleanOptions, regionOptions }: CreatePropertyProps) {
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm<PropertyCreateForm>({
        description: null,
        contact_name: null,
        contact_phone: null,
        contact_link: null,
        place_link: null,
        region_id: undefined,
        type: null,
        iptu: 0,
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
        installment_payment: null,
        incc_financing: null,
        documents: null,
        finsh_type: null,
        air_conditioning: '',
        garden: null,
        pool: null,
        balcony: null,
        acept_pets: null,
        acessibility: null,
        obs: null,

        // description: 'Troplical Park (duplex) test',
        // contact_name: 'John Doe test',
        // contact_phone: '(11) 99999-9999',
        // contact_link: 'https://www.mylink.com.br',
        // place_link: 'https://www.mylink.com.br',
        // region_id: 1,
        // type: 'casa',
        // iptu: 12000,
        // price: 500000,
        // land_area: 250,
        // building_area: 50,
        // image: null,
        // address: 'Rua Latanjeira, 123',
        // rooms: 4,
        // bathrooms: 2,
        // suites: 1,
        // garages: 2,
        // floor: 2,
        // building_floors: 12,
        // property_floors: 2,
        // delivery_key: '2023-01-01',
        // min_act: 10000,
        // installment_payment: false,
        // incc_financing: true,
        // documents: true,
        // finsh_type: 'Cerâmica',
        // air_conditioning: 'não incluso',
        // garden: true,
        // pool: true,
        // balcony: true,
        // acept_pets: true,
        // acessibility: true,
        // obs: 'Empreendimento alto padrão e bem localizado',
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
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Cadastro de Imóvel</h1>
                    <div className="flex gap-2">
                        <Button asChild variant="outline">
                            <Link href={route('properties.index')}>Voltar</Link>
                        </Button>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div className="mb-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormInput
                            label="Descrição"
                            maxLength={40}
                            placeholder="Ex: Troplical Park (duplex)"
                            value={data.description || ''}
                            onChange={(value) => handleSetData('description', value)}
                            error={errors.description}
                            required
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
                            label="Nome do Contato"
                            placeholder="Ex: João da Silva (Construtora Planeta)"
                            maxLength={100}
                            value={data.contact_name || ''}
                            onChange={(value) => handleSetData('contact_name', value)}
                            error={errors.contact_name}
                        />

                        <div className="mb-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormInput
                                label="Link para informações"
                                placeholder="Ex: https://www.meuempreendimento.com.br"
                                maxLength={500}
                                value={data.contact_link || ''}
                                onChange={(value) => handleSetData('contact_link', value)}
                                error={errors.contact_link}
                            />

                            <FormInput
                                label="Link para localização"
                                placeholder="Ex: https://www.google.com.br/maps/place/"
                                maxLength={500}
                                value={data.place_link || ''}
                                onChange={(value) => handleSetData('place_link', value)}
                                error={errors.place_link}
                            />
                        </div>
                    </div>

                    <div className="mb-3 grid grid-cols-2 gap-4 md:grid-cols-4">
                        <FormInput
                            label="Tel./WhatsApp"
                            value={data.contact_phone || ''}
                            placeholder="Ex: (99) 99999-9999"
                            maxLength={20}
                            onChange={(value) => handleSetData('contact_phone', value)}
                            error={errors.contact_phone}
                        />

                        <FormSelect
                            label="Região"
                            placeholder="Selecionar região"
                            value={data.region_id || ''}
                            onValueChange={(value) => handleSetData('region_id', parseInt(value))}
                            customOptions={regionOptions}
                            error={errors.region_id}
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
                            max={9999999999}
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
                            max={9999999999}
                            value={data.iptu}
                            onChange={(value) => handleSetData('iptu', value)}
                            error={errors.iptu}
                            required
                        />

                        <FormInput
                            label="Área do Terreno (m²)"
                            type="number"
                            min={0}
                            max={9999999999}
                            step={0.01}
                            value={data.land_area}
                            onChange={(value) => handleSetData('land_area', value)}
                            error={errors.land_area}
                        />

                        <FormInput
                            label="Área Construída (m²)"
                            type="number"
                            min={0}
                            max={99999}
                            step={0.01}
                            value={data.building_area}
                            onChange={(value) => handleSetData('building_area', value)}
                            error={errors.building_area}
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
                            label="Vagas de Garagem"
                            type="number"
                            min={0}
                            max={99}
                            value={data.garages ?? 0}
                            onChange={(value) => handleSetData('garages', value)}
                            error={errors.garages}
                        />

                        <FormInput
                            label="Andar"
                            type="number"
                            min={0}
                            max={99}
                            value={data.floor ?? 0}
                            onChange={(value) => handleSetData('floor', value)}
                            error={errors.floor}
                        />

                        <FormInput
                            label="Andares do Prédio"
                            type="number"
                            min={0}
                            max={99}
                            value={data.building_floors ?? 0}
                            onChange={(value) => handleSetData('building_floors', value)}
                            error={errors.building_floors}
                        />

                        <FormInput
                            label="Andares do Imóvel"
                            type="number"
                            min={0}
                            max={99}
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
                            max={9999999999}
                            value={data.min_act ?? 0}
                            onChange={(value) => handleSetData('min_act', value)}
                            error={errors.min_act}
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

                    <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-2 md:col-span-1">
                            <FormSelect
                                label="Ar Condicionado"
                                value={data.air_conditioning}
                                onValueChange={(value) => handleSetData('air_conditioning', value as PropertyCreateForm['air_conditioning'])}
                                options={airConditioningOptions}
                                error={errors.air_conditioning}
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <FormInput
                                label="Tipo de Acabamento"
                                placeholder="Ex: Cerâmica, Porcelanato, etc."
                                maxLength={60}
                                value={data.finsh_type || ''}
                                onChange={(value) => handleSetData('finsh_type', value)}
                                error={errors.finsh_type}
                            />
                        </div>

                        <div className="col-span-4 md:col-span-2">
                            <FormInput
                                label="Observações"
                                placeholder="Ex: Casa com 2 quartos, 1 suite, etc."
                                maxLength={255}
                                value={data.obs || ''}
                                onChange={(value) => handleSetData('obs', value)}
                                error={errors.obs}
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
                            <p className="text-sm text-neutral-600">Propriedade Cadastrada</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
