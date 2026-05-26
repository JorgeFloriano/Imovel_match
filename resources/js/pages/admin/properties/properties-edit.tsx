import { FormInput } from '@/components/form-input';
import { FormSelect } from '@/components/form-select';
import { FormTextarea } from '@/components/form-textarea';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface PropertyImage {
    id: number;
    property_id: number;
    path: string;
}

type PropertyEditForm = {
    _method: string;
    id: number;
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
    image: File | string | null;
    property_images: File[];
    images_to_delete: number[];
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
    details: string | null;
    book: File | string | null;
};

interface EditPropertyProps {
    property: PropertyEditForm & { images?: PropertyImage[] };
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

export default function EditProperty({ property, typeOptions, airConditioningOptions, booleanOptions, regionOptions }: EditPropertyProps) {
    const [existingImages, setExistingImages] = useState<PropertyImage[]>(property.images || []);
    const { data, setData, post, processing, errors, recentlySuccessful, transform } = useForm<PropertyEditForm>({
        _method: 'put',
        id: property.id,
        description: property.description || null,
        contact_name: property.contact_name || null,
        contact_phone: property.contact_phone || null,
        available: property.available !== undefined ? property.available : true,
        contact_link: property.contact_link || null,
        place_link: property.place_link || null,
        region_id: property.region_id || undefined,
        type: property.type || null,
        iptu: property.iptu || 0,
        price: property.price || 0,
        land_area: property.land_area || 0,
        building_area: property.building_area || 0,
        image: property.image || null,
        property_images: [],
        images_to_delete: [],
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
        details: property.details || null,
        book: property.book || null,
    });

    const handleSetData = (field: keyof PropertyEditForm, value: string | number | boolean | File | File[] | null) => {
        setData(field, value as any);
    };

    transform((data) => ({
        ...data,
        image: typeof data.image === 'string' ? null : data.image,
        book: typeof data.book === 'string' ? null : data.book,
    }));

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('properties.update', property.id), {
            forceFormData: true,
        });
    };

    // Converting delivery_key to date
    if (data.delivery_key !== null && typeof data.delivery_key === 'string' && data.delivery_key !== '')
        data.delivery_key = new Date(data.delivery_key ?? '').toISOString().split('T')[0];

    return (
        <AppLayout>
            <Head title="Edição de Propriedade" />
            <div className="h-full gap-4 space-y-6 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Edição de Imóvel</h1>
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
                            placeholder="Ex: Troplical Park (duplex)"
                            maxLength={40}
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
                            onValueChange={(value) => handleSetData('type', value as PropertyEditForm['type'])}
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
                            {errors.image && <p className="text-sm text-red-500 font-medium">{errors.image}</p>}
                            {data.image instanceof File && (
                                <div className="mt-2 h-24 w-32 shrink-0 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
                                    <img src={URL.createObjectURL(data.image)} alt="Preview Nova" className="h-full w-full object-cover" />
                                </div>
                            )}
                            {typeof property.image === 'string' && !(data.image instanceof File) && (
                                <div className="mt-2 h-24 w-32 shrink-0 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm relative group">
                                    <img src={`/storage/${property.image}`} alt="Preview Atual" className="h-full w-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-white text-xs font-bold">Atual</span>
                                    </div>
                                </div>
                            )}
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
                                        if (validFiles.length + existingImages.length >= 6) {
                                            alert("Você pode ter no máximo 6 imagens ao carrossel.");
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
                            {(data.property_images.length > 0 || existingImages.length > 0) && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {existingImages.map((img, index) => (
                                        <div key={`exist-${img.id}`} className="relative h-24 w-32 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm group">
                                            <img src={`/storage/${img.path}`} alt={`Existing ${index}`} className="h-full w-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newExisting = [...existingImages];
                                                    newExisting.splice(index, 1);
                                                    const newDeleted = [...data.images_to_delete, img.id];
                                                    setExistingImages(newExisting);
                                                    setData('images_to_delete', newDeleted);
                                                }}
                                                className="absolute top-1 right-1 bg-red-500/90 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm shadow-sm"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                    {data.property_images.map((file, index) => (
                                        <div key={`new-${index}`} className="relative h-24 w-32 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm group">
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
                            {errors.book && <p className="text-sm text-red-500 font-medium">{errors.book}</p>}
                            {data.book instanceof File && (
                                <div className="mt-2 h-24 w-32 shrink-0 flex items-center justify-center overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm bg-white dark:bg-zinc-800">
                                    <div className="flex flex-col items-center text-red-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M8 13h2a2 2 0 0 0 0-4H8v8" /><path d="M14 17h-2v-8h2a2 2 0 0 1 0 4h-2" /></svg>
                                        <span className="text-xs font-bold mt-1 max-w-[100px] truncate text-center">{data.book.name}</span>
                                    </div>
                                </div>
                            )}
                            {typeof property.book === 'string' && !(data.book instanceof File) && (
                                <div className="mt-2 h-24 w-32 shrink-0 flex items-center justify-center overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm bg-white dark:bg-zinc-800 relative group">
                                    <div className="flex flex-col items-center text-red-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M8 13h2a2 2 0 0 0 0-4H8v8" /><path d="M14 17h-2v-8h2a2 2 0 0 1 0 4h-2" /></svg>
                                        <span className="text-xs font-bold mt-1 max-w-[100px] truncate text-center">Book Salvo</span>
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-white text-xs font-bold">Atual</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <FormTextarea
                            label="Detalhes (Texto Longo)"
                            placeholder="Descreva os detalhes e opcionais do imóvel..."
                            maxLength={600}
                            value={data.details || ''}
                            onChange={(value) => handleSetData('details', value)}
                            error={errors.details}
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
                            <p className="text-sm text-neutral-600">Propriedade Atualizada</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
