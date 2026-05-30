import { FormInput } from '@/components/form-input';
import { FormSelect } from '@/components/form-select';
import { FormTextarea } from '@/components/form-textarea';
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
    available: boolean | null;
    contact_link: string | null;
    place_link: string | null;
    region_id?: string;
    type: 'casa' | 'casa (condom.)' | 'sobrado' | 'apartamento' | 'apart. c/ elevad.' | 'terreno' | 'loja' | 'garagem' | 'sala' | 'outros' | null;
    iptu: number;
    price: number;
    land_area: number;
    building_area: number;
    image: File | null;
    property_images: File[];
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
    details: string | null;
    book: File | null;
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
        available: true,
        contact_link: null,
        place_link: null,
        region_id: undefined,
        type: null,
        iptu: 0,
        price: 0,
        land_area: 0,
        building_area: 0,
        image: null,
        property_images: [],
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
        details: null,
        book: null,

        // description: 'Troplical Park (duplex) test',
        // contact_name: 'John Doe test',
        // contact_phone: '(11) 99999-9999',
        // contact_link: 'https://www.mylink.com.br',
        // place_link: 'https://www.mylink.com.br',
        // region_id: 1,
        // type: 'casa',
        // iptu: 12000.93,
        // price: 500000.45,
        // land_area: 250.23,
        // building_area: 50.23,
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
        // min_act: 10000.34,
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

    const handleSetData = (field: keyof PropertyCreateForm, value: string | number | boolean | File | File[] | null) => {
        setData(field, value as any);
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

                        <div className="mb-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormInput
                                label="Nome do Contato"
                                placeholder="Ex: João da Silva (Construtora Planeta)"
                                maxLength={100}
                                value={data.contact_name || ''}
                                onChange={(value) => handleSetData('contact_name', value)}
                                error={errors.contact_name}
                            />
                            <FormSelect
                                label="Disponível"
                                value={data.available === false ? 'false' : 'true'}
                                onValueChange={(value) => handleSetData('available', value === 'true')}
                                options={booleanOptions}
                                error={errors.available}
                            />
                        </div>

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
                        />

                        <FormInput
                            label="IPTU (R$)"
                            type="number"
                            min={0}
                            max={9999999999}
                            step={0.01}
                            value={data.iptu}
                            onChange={(value) => handleSetData('iptu', value)}
                            error={errors.iptu}
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
                            label="Ato Mínimo (%)"
                            type="number"
                            min={0}
                            max={9999999999}
                            step={0.01}
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

                    <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col gap-2 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
                            <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Imagem do Card (Máx 500KB)</label>
                            <input
                                type="file"
                                accept="image/jpeg, image/png, image/jpg"
                                onChange={(e) => {
                                    const file = e.target.files ? e.target.files[0] : null;
                                    if (file && file.size > 500 * 1024) {
                                        alert("A imagem do card deve ter no máximo 500KB.");
                                        e.target.value = '';
                                        return;
                                    }
                                    handleSetData('image', file);
                                }}
                                className="block w-full text-sm text-zinc-500 dark:text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-pc-blue/10 file:text-pc-blue dark:file:bg-pc-blue/30 dark:file:text-pc-blue hover:file:bg-pc-blue/20 dark:hover:file:bg-pc-blue/40 focus:outline-none focus:ring-2 focus:ring-pc-blue/20 cursor-pointer transition-colors"
                            />
                            {data.image && (
                                <div className="mt-2 h-24 w-32 shrink-0 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
                                    <img src={URL.createObjectURL(data.image)} alt="Preview" className="h-full w-full object-cover" />
                                </div>
                            )}
                            {errors.image && <p className="text-sm text-red-500 font-medium">{errors.image}</p>}
                        </div>

                        <div className="flex flex-col gap-2 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
                            <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Carrossel (Máx 6 imagens, 1MB cada)</label>
                            <input
                                type="file"
                                multiple
                                accept="image/jpeg, image/png, image/jpg"
                                onChange={(e) => {
                                    const files = Array.from(e.target.files || []);
                                    let validFiles = [...data.property_images];

                                    for (const file of files) {
                                        if (validFiles.length >= 6) {
                                            alert("Você pode adicionar no máximo 6 imagens ao carrossel.");
                                            break;
                                        }
                                        if (file.size > 1024 * 1024) {
                                            alert(`A imagem ${file.name} excede o limite de 1MB e não foi adicionada.`);
                                            continue;
                                        }
                                        validFiles.push(file);
                                    }

                                    handleSetData('property_images', validFiles);
                                    e.target.value = '';
                                }}
                                className="block w-full text-sm text-zinc-500 dark:text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-pc-blue/10 file:text-pc-blue dark:file:bg-pc-blue/30 dark:file:text-pc-blue hover:file:bg-pc-blue/20 dark:hover:file:bg-pc-blue/40 focus:outline-none focus:ring-2 focus:ring-pc-blue/20 cursor-pointer transition-colors"
                            />
                            {data.property_images.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {data.property_images.map((file, index) => (
                                        <div key={index} className="relative h-24 w-32 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm group">
                                            <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} className="h-full w-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newImages = [...data.property_images];
                                                    newImages.splice(index, 1);
                                                    handleSetData('property_images', newImages);
                                                }}
                                                className="absolute top-1 right-1 bg-red-500/90 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm shadow-sm"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {(errors as any).property_images && <p className="text-sm text-red-500 font-medium">{(errors as any).property_images}</p>}
                        </div>

                        <div className="flex flex-col gap-2 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
                            <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Book Digital (PDF, Máx 20MB)</label>
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => {
                                    const file = e.target.files ? e.target.files[0] : null;
                                    if (file && file.size > 20 * 1024 * 1024) {
                                        alert("O book deve ter no máximo 20MB.");
                                        e.target.value = '';
                                        return;
                                    }
                                    handleSetData('book', file);
                                }}
                                className="block w-full text-sm text-zinc-500 dark:text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-pc-blue/10 file:text-pc-blue dark:file:bg-pc-blue/30 dark:file:text-pc-blue hover:file:bg-pc-blue/20 dark:hover:file:bg-pc-blue/40 focus:outline-none focus:ring-2 focus:ring-pc-blue/20 cursor-pointer transition-colors"
                            />
                            {data.book && (
                                <div className="mt-2 h-24 w-32 shrink-0 flex items-center justify-center overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm bg-white dark:bg-zinc-800">
                                    <div className="flex flex-col items-center text-red-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M8 13h2a2 2 0 0 0 0-4H8v8" /><path d="M14 17h-2v-8h2a2 2 0 0 1 0 4h-2" /></svg>
                                        <span className="text-xs font-bold mt-1 max-w-[100px] truncate">{data.book instanceof File ? data.book.name : 'PDF'}</span>
                                    </div>
                                </div>
                            )}
                            {errors.book && <p className="text-sm text-red-500 font-medium">{errors.book}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <FormTextarea
                            label="Detalhes (Texto Longo)"
                            placeholder="Descreva os detalhes e opcionais do imovel..."
                            maxLength={600}
                            value={data.details || ''}
                            onChange={(value) => handleSetData('details', value)}
                            error={errors.details}
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
