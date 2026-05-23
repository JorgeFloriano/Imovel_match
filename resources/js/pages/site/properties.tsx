import { type SharedData } from '@/types';
import { Head, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PropertyCard from '@/components/property-card';
import Pagination from '@/components/pagination';
import { Breadcrumbs } from '@/components/breadcrumbs';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";

interface Property {
    id: number;
    type: string;
    description: string;
    building_area: number;
    rooms: number;
    bathrooms: number;
    suites: number;
    garages: number;
    price: number;
    image: string | null;
    district?: { name: string };
    region?: { id: number; name: string; prefix: string };
    address: string;
    obs?: string;
}

interface Region {
    id: number;
    name: string;
    prefix?: string;
}

interface PaginatedProperties {
    data: Property[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface PropertiesProps {
    properties: PaginatedProperties;
    regions: Region[];
    filters: {
        region?: string;
        type?: string;
        rooms?: string;
        building_area?: string;
        bathrooms?: string;
        garages?: string;
        suites?: string;
        status?: string;
        max_price?: string;
        revenue?: string;
        keyword?: string;
    };
}

const FilterRadioGroup = ({ label, value, onChange, options }: { label: string, value: string, onChange: (v: string) => void, options: { label: React.ReactNode, value: string }[] }) => (
    <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-zinc-700">{label}</label>
        <div className="flex flex-wrap gap-2">
            {options.map((opt) => (
                <button
                    key={opt.value}
                    type="button"
                    onClick={() => onChange(value === opt.value ? 'all' : opt.value)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center justify-center min-h-[36px] ${value === opt.value
                        ? 'bg-pc-blue text-white shadow-md'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                        }`}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    </div>
);

export default function Properties({ properties, regions, filters }: PropertiesProps) {
    const { auth } = usePage<SharedData>().props;
    const [selectedRegion, setSelectedRegion] = useState<string>(filters?.region || 'all');
    const [selectedType, setSelectedType] = useState<string>(filters?.type || 'all');

    const [selectedRooms, setSelectedRooms] = useState<string>(filters?.rooms || 'all');
    const [selectedBuildingArea, setSelectedBuildingArea] = useState<string>(filters?.building_area || 'all');
    const [selectedBathrooms, setSelectedBathrooms] = useState<string>(filters?.bathrooms || 'all');
    const [selectedGarages, setSelectedGarages] = useState<string>(filters?.garages || 'all');
    const [selectedSuites, setSelectedSuites] = useState<string>(filters?.suites || 'all');
    const [selectedStatus, setSelectedStatus] = useState<string>(filters?.status || 'all');
    const [revenue, setRevenue] = useState<string>(filters?.revenue || '');
    const [searchKeyword, setSearchKeyword] = useState<string>(filters?.keyword || '');

    const [displayProperties, setDisplayProperties] = useState(properties.data);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const activeFiltersCount = [
        selectedRegion,
        selectedType,
        selectedRooms,
        selectedBuildingArea,
        selectedBathrooms,
        selectedGarages,
        selectedSuites,
        selectedStatus,
        filters?.max_price,
        filters?.revenue,
        searchKeyword
    ].filter(val => val && val !== 'all' && val !== '').length;

    useEffect(() => {
        setSelectedRegion(filters?.region || 'all');
        setSelectedType(filters?.type || 'all');
        setSelectedRooms(filters?.rooms || 'all');
        setSelectedBuildingArea(filters?.building_area || 'all');
        setSelectedBathrooms(filters?.bathrooms || 'all');
        setSelectedGarages(filters?.garages || 'all');
        setSelectedSuites(filters?.suites || 'all');
        setSelectedStatus(filters?.status || 'all');
        setRevenue(filters?.revenue || '');
        setSearchKeyword(filters?.keyword || '');
        setDisplayProperties(properties.data);
    }, [filters, properties.data]);

    const handleExplore = () => {
        const params: any = {};
        if (selectedRegion !== 'all') params.region = selectedRegion;
        if (selectedType !== 'all') params.type = selectedType;
        if (selectedRooms !== 'all') params.rooms = selectedRooms;
        if (selectedBuildingArea !== 'all') params.building_area = selectedBuildingArea;
        if (selectedBathrooms !== 'all') params.bathrooms = selectedBathrooms;
        if (selectedGarages !== 'all') params.garages = selectedGarages;
        if (selectedSuites !== 'all') params.suites = selectedSuites;
        if (selectedStatus !== 'all') params.status = selectedStatus;
        if (filters?.max_price) params.max_price = filters.max_price;
        if (revenue) params.revenue = revenue;
        if (searchKeyword) params.keyword = searchKeyword;

        setIsModalOpen(false);

        router.get(route('public.properties'), params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <div className="min-h-screen bg-[#FDFDFC] flex flex-col">
            <Head title="Imóveis | Marta de Souza Imobiliária" />

            <Navbar />

            <main className="flex-1 w-full mt-0">
                <section className="relative py-5 md:py-16 bg-[#f5f9fc] md:bg-white overflow-hidden min-h-screen">
                    {/* Brand Background Image with Center Fade */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div
                            className="hidden md:block absolute inset-0 bg-cover bg-center opacity-[0.2]"
                            style={{ backgroundImage: "url('/bg_image.jpg')" }}
                        />
                        <div className="absolute inset-0 bg-property-mask" />
                    </div>

                    <div className="container mx-auto px-4 relative z-30 mb-8 mt-[-1rem] md:mt-[-2rem]">
                        <Breadcrumbs breadcrumbs={[
                            { title: 'Início', href: route('home') },
                            { title: 'Imóveis', href: '#' }
                        ]} />
                    </div>

                    <div className="container mx-auto px-4 relative z-30">
                        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 gap-6 text-center md:text-left">
                            <div>
                                <Badge variant="outline" className="mb-4 text-pc-gold  border-pc-gold/30 px-3 py-1 rounded-full uppercase tracking-widest text-[10px] font-bold hidden md:block">
                                    Seleção Exclusiva
                                </Badge>
                                <h2 className="text-4xl md:text-5xl font-black text-zinc-900 my-4 tracking-tighter">
                                    Oportunidades Únicas
                                </h2>
                                <p className="text-zinc-900 text-lg max-w-xl font-medium">
                                    Conheça as propriedades que estão definindo novos padrões de morar bem.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                                <Dialog disableDarkMode open={isModalOpen} onOpenChange={setIsModalOpen}>
                                    <DialogTrigger asChild>
                                        <button className="group w-full md:w-auto justify-center flex items-center bg-white/60 backdrop-blur-md px-6 py-3 md:py-4 rounded-full border border-pc-blue/20 text-pc-blue font-black hover:bg-white/80 hover:shadow-md transition-all text-base md:text-lg cursor-pointer gap-3 shadow-sm">
                                            Busca Personalizada
                                            <div className="relative flex items-center">
                                                <Search className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                                {activeFiltersCount > 0 && (
                                                    <span className="absolute -top-2.5 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-pc-gold text-[11px] font-black text-white shadow-sm ring-2 ring-white animate-in zoom-in">
                                                        {activeFiltersCount}
                                                    </span>
                                                )}
                                            </div>
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-3xl w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto p-4 md:p-6">
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl font-bold text-left">Busca Personalizada</DialogTitle>
                                            <DialogDescription className="text-left">
                                                Refine sua busca para encontrar o imóvel perfeito.
                                            </DialogDescription>
                                        </DialogHeader>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mt-6">
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-semibold text-zinc-700">Palavra-chave</label>
                                                <div className="relative w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Ex: lopes, piscina..."
                                                        value={searchKeyword}
                                                        onChange={(e) => setSearchKeyword(e.target.value)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') handleExplore();
                                                        }}
                                                        className={`w-full min-h-[36px] border-none focus:outline-none font-medium rounded-xl h-auto py-2 px-4 transition-all focus:ring-2 focus:ring-pc-blue placeholder:font-normal ${
                                                            searchKeyword 
                                                                ? 'bg-pc-blue text-white shadow-md placeholder:text-white/60' 
                                                                : 'bg-zinc-100 text-zinc-700 shadow-none hover:bg-zinc-200 placeholder:text-zinc-400'
                                                        }`}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-semibold text-zinc-700">Renda mensal (R$)</label>
                                                <div className="relative w-full">
                                                    <input
                                                        type="number"
                                                        placeholder="Ex: 5000"
                                                        value={revenue}
                                                        onChange={(e) => setRevenue(e.target.value)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') handleExplore();
                                                        }}
                                                        className={`w-full min-h-[36px] border-none focus:outline-none font-medium rounded-xl h-auto py-2 px-4 transition-all focus:ring-2 focus:ring-pc-blue placeholder:font-normal ${
                                                            revenue 
                                                                ? 'bg-pc-blue text-white shadow-md placeholder:text-white/60' 
                                                                : 'bg-zinc-100 text-zinc-700 shadow-none hover:bg-zinc-200 placeholder:text-zinc-400'
                                                        }`}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-semibold text-zinc-700">Região</label>
                                                <Select onValueChange={(value) => setSelectedRegion(value === selectedRegion ? 'all' : value)} value={selectedRegion}>
                                                    <SelectTrigger className={`w-full min-h-[36px] border-none focus:ring-0 focus:outline-none font-medium cursor-pointer rounded-xl h-auto py-2 px-4 transition-all data-[state=open]:ring-2 data-[state=open]:ring-pc-blue [&>svg]:opacity-100 ${
                                                        selectedRegion !== 'all'
                                                            ? 'bg-pc-blue text-white shadow-md'
                                                            : 'bg-zinc-100 text-zinc-700 shadow-none hover:bg-zinc-200'
                                                    }`}>
                                                        <SelectValue placeholder="Selecione a região" />
                                                    </SelectTrigger>
                                                    <SelectContent className="rounded-2xl border-none shadow-2xl p-2 bg-white/95 backdrop-blur-xl">
                                                        <SelectItem value="all" className="rounded-xl py-3 px-4 font-semibold !focus:bg-pc-blue !focus:text-white data-[highlighted]:bg-pc-blue data-[highlighted]:text-white transition-colors cursor-pointer">Exibir Todas as Regiões</SelectItem>
                                                        {regions && regions.map((region) => (
                                                            <SelectItem key={region.id} value={region.id.toString()} className="rounded-xl py-3 px-4 font-semibold !focus:bg-pc-blue !focus:text-white data-[highlighted]:bg-pc-blue data-[highlighted]:text-white transition-colors cursor-pointer">
                                                                {region.prefix ? region.prefix : ""} {region.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <FilterRadioGroup
                                                label="Tipo de Imóvel"
                                                value={selectedType}
                                                onChange={setSelectedType}
                                                options={[
                                                    { label: 'Apartamento', value: '1' },
                                                    { label: 'Casa', value: '2' },
                                                    { label: 'Outros', value: '3' },
                                                ]}
                                            />

                                            <FilterRadioGroup
                                                label="Status do Imóvel"
                                                value={selectedStatus}
                                                onChange={setSelectedStatus}
                                                options={[

                                                    { label: 'Pronto para morar', value: 'pronto' },
                                                    { label: 'Na Planta', value: 'planta' }
                                                ]}
                                            />

                                            <FilterRadioGroup
                                                label="Dormitórios"
                                                value={selectedRooms}
                                                onChange={setSelectedRooms}
                                                options={[

                                                    { label: '1', value: '1' },
                                                    { label: '2', value: '2' },
                                                    { label: '3', value: '3' },
                                                    { label: '4 +', value: '4+' },
                                                ]}
                                            />

                                            <FilterRadioGroup
                                                label="Área Construída Mínima (m²)"
                                                value={selectedBuildingArea}
                                                onChange={setSelectedBuildingArea}
                                                options={[
                                                    { label: '40 +', value: '40' },
                                                    { label: '45 +', value: '45' },
                                                    { label: '50 +', value: '50' },
                                                    { label: '60 +', value: '60' },
                                                ]}
                                            />

                                            <FilterRadioGroup
                                                label="Banheiros"
                                                value={selectedBathrooms}
                                                onChange={setSelectedBathrooms}
                                                options={[
                                                    { label: '1', value: '1' },
                                                    { label: '2', value: '2' },
                                                    { label: '3 +', value: '3+' },
                                                ]}
                                            />

                                            <FilterRadioGroup
                                                label="Vagas de Garagem"
                                                value={selectedGarages}
                                                onChange={setSelectedGarages}
                                                options={[
                                                    { label: '1', value: '1' },
                                                    { label: '2', value: '2' },
                                                    { label: '3 +', value: '3+' },
                                                ]}
                                            />

                                            <FilterRadioGroup
                                                label="Suítes"
                                                value={selectedSuites}
                                                onChange={setSelectedSuites}
                                                options={[
                                                    { label: '1', value: '1' },
                                                    { label: '2', value: '2' },
                                                    { label: '3 +', value: '3+' },
                                                ]}
                                            />

                                        </div>

                                        <DialogFooter className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6 border-t border-zinc-100 pt-6">
                                            <Button variant="outline" className="w-full sm:w-auto" onClick={() => {
                                                setSelectedRegion('all');
                                                setSelectedType('all');
                                                setSelectedRooms('all');
                                                setSelectedBuildingArea('all');
                                                setSelectedBathrooms('all');
                                                setSelectedGarages('all');
                                                setSelectedSuites('all');
                                                setSelectedStatus('all');
                                            }}>Limpar</Button>
                                            <Button className="w-full sm:w-auto bg-pc-blue hover:bg-pc-blue/90 text-white font-bold" onClick={handleExplore}>
                                                Aplicar Filtros
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                            {displayProperties && displayProperties.length > 0 ? (
                                displayProperties.map((property) => (
                                    <PropertyCard key={property.id} property={property} />
                                ))
                            ) : (
                                <div className="col-span-full text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-zinc-200">
                                    <p className="text-zinc-400 font-bold text-xl">Preparando novidades exclusivas para você.</p>
                                </div>
                            )}
                        </div>

                        <Pagination links={properties.links} className="mt-8" />
                    </div>
                </section>
            </main>

            <Footer />

        </div>
    );
}
