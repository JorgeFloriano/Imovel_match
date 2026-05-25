import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { MapPin, Bed, Bath, Square, Car, ShowerHead, Calendar, Waves, Dog, Accessibility, Maximize, AirVent, CloudSun, Flower, HeartHandshake, FileText, ArrowLeft, House, Building } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

interface Property {
    id: number;
    type: string;
    description: string;
    building_area: number | null;
    land_area: number | null;
    rooms: number | null;
    bathrooms: number | null;
    suites: number | null;
    garages: number | null;
    price: number;
    min_act: number | null;
    image: string | null;
    district?: { name: string };
    region?: { name: string; prefix?: string };
    address?: string | null;
    obs?: string;
    delivery_key?: string | null;
    balcony?: boolean | null;
    air_conditioning?: string | null;
    garden?: boolean | null;
    pool?: boolean | null;
    acept_pets?: boolean | null;
    acessibility?: boolean | null;
    installment_payment?: boolean | null;
    incc_financing?: boolean | null;
    finsh_type?: string | null;
    details?: string | null;
    book?: string | null;
    images?: { id: number; path: string }[];
}

interface PropertyDetailsProps {
    property: Property;
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
    const formatPrice = (price: number | null) => {
        if (!price) return 'Sob Consulta';
        return price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const formatYear = (dateString?: string | null) => {
        if (!dateString) return null;
        // Extrai o ano diretamente da string (YYYY) para evitar problemas no Date parser do Edge/Safari
        if (/^\d{4}/.test(dateString)) {
            return dateString.substring(0, 4);
        }
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? '' : date.getFullYear().toString();
    };

    const renderBoolean = (value?: boolean | null) => {
        if (value === true) return <span className="text-green-600 font-semibold flex items-center gap-1">Sim</span>;
        if (value === false) return <span className="text-red-500 font-semibold flex items-center gap-1">Não</span>;
        return <span className="text-zinc-400">Não inf.</span>;
    };

    const fallbackImages = [
        '1564013799919-ab600027ffc6', '1570129477492-45c003edd2be', '1512917774080-9991f1c4c750',
        '1600596542815-ffad4c1539a9', '1600607687920-4e2a09cf159d'
    ];
    const photoId = fallbackImages[property.id % fallbackImages.length];
    const dynamicFallback = `https://images.unsplash.com/photo-${photoId}?q=80&w=1200`;

    let allImages = (property.images || []).map(img => ({ src: `/storage/${img.path}`, alt: 'Imagem do Imóvel' }));
    if (allImages.length === 0) {
        allImages = [{ src: dynamicFallback, alt: 'Imagem Principal' }];
    }

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    return (
        <div className="min-h-screen bg-[#FDFDFC] flex flex-col">
            <Head title={`${property.description} | Marta de Souza`} />

            {/* Header Simples */}
            <Navbar />

            <main className="flex-1 w-full">
                <div className="container mx-auto px-4 lg:px-40 py-4 flex items-center justify-start gap-4">
                    <button
                        onClick={() => window.history.back()}
                        className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-sm font-semibold flex items-center gap-1.5 transition-colors shrink-0"
                        title="Voltar"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="hidden sm:inline">Voltar</span>
                    </button>
                    <Breadcrumbs breadcrumbs={[
                        { title: 'Início', href: route('home') },
                        { title: 'Imóveis', href: route('public.properties') },
                        { title: property.description || 'Detalhes do Imóvel', href: '#' }
                    ]} />
                </div>
                {/* Imagem em destaque */}
                <div className="container mx-auto lg:px-40">
                    <div className="w-full h-[40vh] md:h-[70vh] relative overflow-hidden">
                        <img src={allImages[currentImageIndex].src} alt={allImages[currentImageIndex].alt} className="w-full h-full object-cover transition-opacity duration-500" />                
                        {allImages.length > 1 && (
                            <>
                                <button onClick={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1))} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full hover:bg-black/80 transition-colors flex items-center justify-center">
                                    &#10094;
                                </button>
                                <button onClick={() => setCurrentImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0))} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full hover:bg-black/80 transition-colors flex items-center justify-center">
                                    &#10095;
                                </button>
                            </>
                        )}
                    </div>
                    <div className="flex justify-between items-start mt-4 gap-4">
                        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar flex-1">
                            {allImages.length > 1 && allImages.map((img, idx) => (
                                <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`shrink-0 w-24 h-16 rounded-md overflow-hidden border-2 transition-colors ${currentImageIndex === idx ? 'border-pc-gold' : 'border-transparent'}`}>
                                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                        {property.book && (
                            <a href={`/storage/${property.book}`} target="_blank" rel="noopener noreferrer" className="shrink-0 flex flex-col items-center justify-center text-pc-blue hover:text-pc-gold transition-colors p-3 bg-[#f5f9fc] border border-pc-blue/10 rounded-xl shadow-sm hover:shadow-md min-w-[90px]">
                                <FileText className="h-8 w-8 mb-1" />
                                <span className="text-xs font-bold uppercase tracking-wider">Book</span>
                            </a>
                        )}
                    </div>
                </div>

                <div className="container mx-auto px-4 lg:px-40 py-12">
                    <div className="flex flex-col 2xl:flex-row justify-between items-start gap-12 border-b border-zinc-200 pb-12 mb-12">
                        <div className="flex-1">
                            <h2 className="text-3xl md:text-4xl font-bold text-pc-blue mb-4">{property.description}</h2>

                            <div className="flex items-center gap-2 mb-6  tracking-tight">
                                <MapPin className="h-5 w-5 text-pc-gold shrink-0" />
                                <span className="line-clamp-1">
                                    {property.address} {property.region?.name ? ` - ${property.region.prefix} ${property.region.name}` : ''}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8 text-zinc-700">

                                {property.type && (
                                    <div className="flex items-center gap-3">
                                        {['apart. c/ elevad.', 'apartamento'].includes(property.type.toLowerCase()) ? (
                                            <Building className="h-5 w-5 text-pc-gold shrink-0" />
                                        ) : (
                                            <House className="h-5 w-5 text-pc-gold shrink-0" />
                                        )}
                                        {property.type.toLowerCase() === 'apart. c/ elevad.' ? (
                                            <>
                                                <span>Elevador:</span> {renderBoolean(true)}
                                            </>
                                        ) : (
                                            <>
                                                <span>{property.type}</span>
                                            </>
                                        )}
                                    </div>
                                )}

                                {property.rooms != null && property.rooms > 0 && (
                                    <div className="flex items-center gap-3">
                                        <Bed className="h-5 w-5 text-pc-gold shrink-0" />
                                        <span><span className="font-semibold">{property.rooms}</span> {property.rooms === 1 ? 'Dormitório' : 'Dormitórios'}</span>
                                    </div>
                                )}

                                {property.suites != null && property.suites > 0 && (
                                    <div className="flex items-center gap-3">
                                        <Bath className="h-5 w-5 text-pc-gold shrink-0" />
                                        <span><span className="font-semibold">{property.suites}</span> {property.suites === 1 ? 'Suíte' : 'Suítes'}</span>
                                    </div>
                                )}

                                {property.bathrooms != null && property.bathrooms > 0 && (
                                    <div className="flex items-center gap-3">
                                        <ShowerHead className="h-5 w-5 text-pc-gold shrink-0" />
                                        <span><span className="font-semibold">{property.bathrooms}</span> {property.bathrooms === 1 ? 'Banheiro' : 'Banheiros'}</span>
                                    </div>
                                )}

                                {property.garages != null && property.garages > 0 && (
                                    <div className="flex items-center gap-3">
                                        <Car className="h-5 w-5 text-pc-gold shrink-0" />
                                        <span><span className="font-semibold">{property.garages}</span> {property.garages === 1 ? 'Vaga' : 'Vagas'}</span>
                                    </div>
                                )}

                                {property.building_area != null && property.building_area > 0 && (
                                    <div className="flex items-center gap-3">
                                        <Square className="h-5 w-5 text-pc-gold shrink-0" />
                                        <span><span className="font-semibold">{property.building_area} m²</span> Área Útil</span>
                                    </div>
                                )}

                                {property.land_area != null && property.land_area > 0 && (
                                    <div className="flex items-center gap-3">
                                        <Maximize className="h-5 w-5 text-pc-gold shrink-0" />
                                        <span><span className="font-semibold">{property.land_area} m²</span> Terreno</span>
                                    </div>
                                )}

                                {property.air_conditioning && (
                                    <div className="flex items-center gap-3">
                                        <AirVent className="h-5 w-5 text-pc-gold shrink-0" />
                                        <span>Ar Cond.:</span> <span className="font-semibold capitalize">{property.air_conditioning}</span>
                                    </div>
                                )}

                                <div className="flex items-center gap-3">
                                    <Flower className="h-5 w-5 text-pc-gold shrink-0" />
                                    <span>Jardim / Quintal:</span> {renderBoolean(property.garden)}
                                </div>

                                <div className="flex items-center gap-3">
                                    <Waves className="h-5 w-5 text-pc-gold shrink-0" />
                                    <span>Piscina:</span> {renderBoolean(property.pool)}
                                </div>

                                <div className="flex items-center gap-3">
                                    <CloudSun className="h-5 w-5 text-pc-gold shrink-0" />
                                    <span>Varanda:</span> {renderBoolean(property.balcony)}
                                </div>

                                <div className="flex items-center gap-3">
                                    <Dog className="h-5 w-5 text-pc-gold shrink-0" />
                                    <span>Aceita Pets:</span> {renderBoolean(property.acept_pets)}
                                </div>

                                <div className="flex items-center gap-3">
                                    <Accessibility className="h-5 w-5 text-pc-gold shrink-0" />
                                    <span>Acessibilidade:</span> {renderBoolean(property.acessibility)}
                                </div>

                            </div>
                        </div>

                        {/* Investimento Panel */}
                        <div className="w-full 2xl:w-[380px] bg-[#f5f9fc] rounded-3xl p-8 border border-pc-blue/10 shrink-0">
                            <h3 className="text-xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
                                <HeartHandshake className="h-6 w-6 text-pc-gold" />
                                Condições
                            </h3>

                            <div className="mb-6">
                                <p className="text-zinc-500 text-sm mb-1 uppercase tracking-wider">A partir de</p>
                                <p className="text-xl font-black text-pc-blue">{formatPrice(property.price)}</p>
                            </div>

                            {property.min_act != null && property.min_act > 0 && (
                                <div className="mb-4 flex justify-between items-center border-b border-zinc-200 pb-4">
                                    <span className="text-zinc-600">Ato Mínimo</span>
                                    <span className="font-bold text-zinc-900">{property.min_act}%</span>
                                </div>
                            )}

                            <div className="flex justify-between items-center pb-4">
                                <span className="text-zinc-600">Parcela a entrada?</span>
                                {renderBoolean(property.installment_payment)}
                            </div>

                            {property.delivery_key && (
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-5 w-5 text-pc-gold shrink-0" />
                                    {new Date(property.delivery_key) <= new Date() ? (
                                        <span className="text-zinc-600 font-semibold">Pronto para morar</span>
                                    ) : (
                                        <>
                                            <span className="text-zinc-600">Previsão de entrega:</span> <span className="font-semibold">{formatYear(property.delivery_key)}</span>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {property.obs && (
                        <div className="max-w-4xl">
                            <h3 className="text-2xl font-bold text-zinc-900 mb-6">Sobre o Imóvel</h3>
                            <p className="text-zinc-600 leading-relaxed text-lg whitespace-pre-wrap">{property.obs}<br />
                                {property.details}<br />
                                {property.finsh_type && (<>Acabamento: {property.finsh_type}</>)}</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <Footer />


        </div>
    );
}
