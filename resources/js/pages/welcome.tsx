import { type SharedData } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Search, FilterX, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PropertyCard from '@/components/property-card';
import AuthActions from '@/components/auth-actions';
import Pagination from '@/components/pagination';
import NavButton from '../components/nav-button';

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
    DialogClose,
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
    image: string | null;
    district?: { name: string };
    region?: { id: number; name: string };
    address: string;
    obs?: string;
}

interface Region {
    id: number;
    name: string;
}

interface PaginatedProperties {
    data: Property[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface WelcomeProps {
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
        balcony?: string;
        status?: string;
    };
}

const FilterRadioGroup = ({ label, value, onChange, options }: { label: string, value: string, onChange: (v: string) => void, options: {label: React.ReactNode, value: string}[] }) => (
    <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{label}</label>
        <div className="flex flex-wrap gap-2">
            {options.map((opt) => (
                <button
                    key={opt.value}
                    type="button"
                    onClick={() => onChange(opt.value)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center justify-center min-h-[36px] ${
                        value === opt.value
                            ? 'bg-pc-blue text-white shadow-md'
                            : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
                    }`}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    </div>
);

export default function Welcome({ properties, regions, filters }: WelcomeProps) {
    const { auth } = usePage<SharedData>().props;
    const [selectedRegion, setSelectedRegion] = useState<string>(filters?.region || 'all');
    const [selectedType, setSelectedType] = useState<string>(filters?.type || 'all');
    
    // Novas opções de filtro
    const [selectedRooms, setSelectedRooms] = useState<string>(filters?.rooms || 'all');
    const [selectedBuildingArea, setSelectedBuildingArea] = useState<string>(filters?.building_area || 'all');
    const [selectedBathrooms, setSelectedBathrooms] = useState<string>(filters?.bathrooms || 'all');
    const [selectedGarages, setSelectedGarages] = useState<string>(filters?.garages || 'all');
    const [selectedSuites, setSelectedSuites] = useState<string>(filters?.suites || 'all');
    const [selectedBalcony, setSelectedBalcony] = useState<string>(filters?.balcony || 'all');
    const [selectedStatus, setSelectedStatus] = useState<string>(filters?.status || 'all');

    const [displayProperties, setDisplayProperties] = useState(properties.data);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Sync state with props when filters or data change
    useEffect(() => {
        setSelectedRegion(filters?.region || 'all');
        setSelectedType(filters?.type || 'all');
        setSelectedRooms(filters?.rooms || 'all');
        setSelectedBuildingArea(filters?.building_area || 'all');
        setSelectedBathrooms(filters?.bathrooms || 'all');
        setSelectedGarages(filters?.garages || 'all');
        setSelectedSuites(filters?.suites || 'all');
        setSelectedBalcony(filters?.balcony || 'all');
        setSelectedStatus(filters?.status || 'all');
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
        if (selectedBalcony !== 'all') params.balcony = selectedBalcony;
        if (selectedStatus !== 'all') params.status = selectedStatus;

        setIsModalOpen(false); // Close modal when exploring

        router.get(route('home'), params, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                const element = document.getElementById('featured-properties');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    };

    const handleNavImoveis = () => {
        router.get(route('home'), {}, {
            onSuccess: () => {
                const element = document.getElementById('featured-properties');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    };

    return (
        <div className="min-h-screen bg-[#FDFDFC] dark:bg-[#0a0a0a]">
            <Head title="Marta de Souza Imobiliária" />

            {/* Navbar */}
            <header className="sticky top-0 z-50 w-full border-b bg-[#123251] backdrop-blur-xl dark:bg-black/90 dark:border-zinc-800 transition-all duration-300">
                <div className="w-full mx-auto flex h-24 items-center justify-between pl-40 pr-6">
                    <div className="flex items-center gap-8 hover:scale-105 transition-transform cursor-pointer">
                        <img src="/logo_build.png" alt="Logo" className="h-18 w-auto " />
                        <img src="/logo_text.png" alt="Logo" className="h-12 md:h-14 w-auto" />
                    </div>

                    <nav className="hidden lg:flex items-center text-sm font-bold text-zinc-200 dark:text-zinc-400">
                        <NavButton variant="primary">Início</NavButton>
                        <NavButton variant="primary" onClick={handleNavImoveis}>Imóveis</NavButton>
                        <NavButton variant="primary">Lançamentos</NavButton>
                        <NavButton variant="primary">Sobre Nós</NavButton>
                    </nav>
                    <AuthActions auth={auth} />
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative h-[550px] md:h-[700px] w-full overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('/cozy-studio-apartment-with-bedroom-living-space.jpg')] bg-cover bg-center scale-105 animate-pulse-slow">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
                </div>

                <div className="relative z-10 container mx-auto px-4 text-center">
                    <Badge variant="outline" className="mb-6 text-white border-white/30 px-4 py-1.5 rounded-full backdrop-blur-sm bg-white/10 uppercase tracking-[0.2em] text-[10px] font-bold">
                        Excelência em cada detalhe
                    </Badge>
                    <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-none">
                        Seu novo capítulo <br /> <span className="text-pc-gold">começa agora</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-zinc-200 mb-12 mx-auto px-4 font-light leading-relaxed">
                        Curadoria exclusiva de imóveis que combinam com seu estilo de vida. <br className="hidden md:block" /> Descubra o lar dos seus sonhos com a Marta de Souza Imobiliária.
                    </p>

                    <div className="max-w-4xl mx-auto bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-[2.5rem] shadow-3xl p-3 flex flex-col md:flex-row gap-2">
                        <div className="flex-1 flex items-center px-6 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800">
                            <Search className="text-pc-blue mr-3 h-5 w-5" />
                            <Select onValueChange={setSelectedRegion} value={selectedRegion}>
                                <SelectTrigger className="w-full h-16 bg-transparent border-none focus:ring-0 focus:outline-none text-zinc-900 dark:text-white font-semibold cursor-pointer shadow-none ring-0">
                                    <SelectValue placeholder="Em qual região você gostaria de morar?" />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-none shadow-2xl p-2 bg-white/95 backdrop-blur-xl">
                                    <SelectItem value="all" className="rounded-xl py-3 px-4 font-semibold !focus:bg-pc-blue !focus:text-white data-[highlighted]:bg-pc-blue data-[highlighted]:text-white transition-colors cursor-pointer">Todas as Regiões</SelectItem>
                                    {regions && regions.map((region) => (
                                        <SelectItem key={region.id} value={region.id.toString()} className="rounded-xl py-3 px-4 font-semibold !focus:bg-pc-blue !focus:text-white data-[highlighted]:bg-pc-blue data-[highlighted]:text-white transition-colors cursor-pointer">
                                            {region.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-full md:w-64 flex items-center px-6 border-b md:border-b-0 md:border-r dark:border-zinc-800">
                            <Select onValueChange={setSelectedType} value={selectedType}>
                                <SelectTrigger className="w-full h-16 bg-transparent border-none focus:ring-0 focus:outline-none text-zinc-900 dark:text-white font-semibold cursor-pointer shadow-none ring-0">
                                    <SelectValue placeholder="Tipo de Imóvel" />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-none shadow-2xl p-2 bg-white/95 backdrop-blur-xl">
                                    <SelectItem value="all" className="rounded-xl py-3 px-4 font-semibold !focus:bg-pc-blue !focus:text-white data-[highlighted]:bg-pc-blue data-[highlighted]:text-white transition-colors cursor-pointer">Todos os Tipos</SelectItem>
                                    <SelectItem value="1" className="rounded-xl py-3 px-4 font-semibold !focus:bg-pc-blue !focus:text-white data-[highlighted]:bg-pc-blue data-[highlighted]:text-white transition-colors cursor-pointer">Apartamento</SelectItem>
                                    <SelectItem value="2" className="rounded-xl py-3 px-4 font-semibold !focus:bg-pc-blue !focus:text-white data-[highlighted]:bg-pc-blue data-[highlighted]:text-white transition-colors cursor-pointer">Casa</SelectItem>
                                    <SelectItem value="3" className="rounded-xl py-3 px-4 font-semibold !focus:bg-pc-blue !focus:text-white data-[highlighted]:bg-pc-blue data-[highlighted]:text-white transition-colors cursor-pointer">Outros</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button 
                            onClick={handleExplore}
                            className="bg-pc-blue hover:bg-pc-blue/90 text-white h-16 px-12 rounded-[1.8rem] font-bold text-lg shadow-xl shadow-pc-blue/20 transition-all hover:scale-105 active:scale-95"
                        >
                            Explorar
                        </Button>
                    </div>
                </div>
            </section>

            {/* Featured Properties */}
            <section id="featured-properties" className="relative py-20 md:py-32 bg-white dark:bg-[#0a0a0a] overflow-hidden">
                {/* Brand Background Image with Center Fade */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div 
                        className="absolute inset-0 bg-cover bg-center opacity-[0.3] dark:opacity-[0.1]" 
                        style={{ backgroundImage: "url('/bg_image.png')" }} 
                    />
                    {/* Custom Double Fade Mask - Defined in app.css */}
                    <div className="absolute inset-0 bg-property-mask" />
                </div>

                <div className="container mx-auto px-4 relative z-30">
                    <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 gap-6 text-center md:text-left">
                        <div>
                            <Badge variant="outline" className="mb-4 text-pc-blue border-pc-blue/20 px-3 py-1 rounded-full uppercase tracking-widest text-[10px] font-bold">
                                Seleção Exclusiva
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-4 tracking-tighter">
                                Oportunidades Únicas
                            </h2>
                            <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-xl font-medium">
                                Conheça as propriedades que estão definindo novos padrões de morar bem.
                            </p>
                        </div>
                        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                            <DialogTrigger asChild>
                                <button className="group flex items-center text-pc-blue font-black hover:text-pc-blue/80 transition-colors text-lg cursor-pointer">
                                    Busca Personalizada <Filter className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold text-left">Busca Personalizada</DialogTitle>
                                    <DialogDescription className="text-left">
                                        Refine sua busca para encontrar o imóvel perfeito.
                                    </DialogDescription>
                                </DialogHeader>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 text-left">
                                    <FilterRadioGroup 
                                        label="Dormitórios" 
                                        value={selectedRooms} 
                                        onChange={setSelectedRooms} 
                                        options={[
                                            { label: <FilterX className="h-4 w-4" />, value: 'all' },
                                            { label: '1', value: '1' },
                                            { label: '2', value: '2' },
                                            { label: '3', value: '3' },
                                            { label: '4', value: '4' },
                                            { label: '5', value: '5' }
                                        ]} 
                                    />

                                    <FilterRadioGroup 
                                        label="Área Construída Mínima (m²)" 
                                        value={selectedBuildingArea} 
                                        onChange={setSelectedBuildingArea} 
                                        options={[
                                            { label: <FilterX className="h-4 w-4" />, value: 'all' },
                                            { label: '50+', value: '50' },
                                            { label: '100+', value: '100' },
                                            { label: '150+', value: '150' },
                                            { label: '200+', value: '200' },
                                            { label: '300+', value: '300' }
                                        ]} 
                                    />

                                    <FilterRadioGroup 
                                        label="Banheiros" 
                                        value={selectedBathrooms} 
                                        onChange={setSelectedBathrooms} 
                                        options={[
                                            { label: <FilterX className="h-4 w-4" />, value: 'all' },
                                            { label: '1', value: '1' },
                                            { label: '2', value: '2' },
                                            { label: '3', value: '3' },
                                            { label: '4', value: '4' }
                                        ]} 
                                    />

                                    <FilterRadioGroup 
                                        label="Vagas de Garagem" 
                                        value={selectedGarages} 
                                        onChange={setSelectedGarages} 
                                        options={[
                                            { label: <FilterX className="h-4 w-4" />, value: 'all' },
                                            { label: '1', value: '1' },
                                            { label: '2', value: '2' },
                                            { label: '3', value: '3' },
                                            { label: '4', value: '4' }
                                        ]} 
                                    />

                                    <FilterRadioGroup 
                                        label="Suítes" 
                                        value={selectedSuites} 
                                        onChange={setSelectedSuites} 
                                        options={[
                                            { label: <FilterX className="h-4 w-4" />, value: 'all' },
                                            { label: '1', value: '1' },
                                            { label: '2', value: '2' },
                                            { label: '3', value: '3' },
                                            { label: '4', value: '4' }
                                        ]} 
                                    />

                                    <FilterRadioGroup 
                                        label="Varanda" 
                                        value={selectedBalcony} 
                                        onChange={setSelectedBalcony} 
                                        options={[
                                            { label: <FilterX className="h-4 w-4" />, value: 'all' },
                                            { label: 'Sim', value: 'yes' },
                                            { label: 'Não', value: 'no' }
                                        ]} 
                                    />

                                    <div className="col-span-1 md:col-span-2">
                                        <FilterRadioGroup 
                                            label="Status do Imóvel" 
                                            value={selectedStatus} 
                                            onChange={setSelectedStatus} 
                                            options={[
                                                { label: <FilterX className="h-4 w-4" />, value: 'all' },
                                                { label: 'Pronto para morar', value: 'pronto' },
                                                { label: 'Na Planta', value: 'planta' }
                                            ]} 
                                        />
                                    </div>
                                </div>

                                <DialogFooter className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 mt-6 border-t border-zinc-100 dark:border-zinc-800 pt-6">
                                    <div className="flex items-center text-zinc-500 text-sm gap-2">
                                        <div className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
                                            <FilterX className="h-4 w-4" />
                                        </div>
                                        <span>Desconsiderar este filtro</span>
                                    </div>
                                    <div className="flex justify-end gap-3 w-full sm:w-auto">
                                        <Button variant="outline" onClick={() => {
                                            setSelectedRooms('all');
                                            setSelectedBuildingArea('all');
                                            setSelectedBathrooms('all');
                                            setSelectedGarages('all');
                                            setSelectedSuites('all');
                                            setSelectedBalcony('all');
                                            setSelectedStatus('all');
                                        }}>Limpar</Button>
                                        <Button className="bg-pc-blue hover:bg-pc-blue/90 text-white font-bold" onClick={handleExplore}>
                                            Aplicar Filtros
                                        </Button>
                                    </div>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {displayProperties && displayProperties.length > 0 ? (
                            displayProperties.map((property) => (
                                <PropertyCard key={property.id} property={property} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-32 bg-white dark:bg-zinc-900/50 rounded-[3rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                                <p className="text-zinc-400 font-bold text-xl">Preparando novidades exclusivas para você.</p>
                            </div>
                        )}
                    </div>

                    <Pagination links={properties.links} className="mt-8" />
                </div>
            </section>

            {/* Brands/CTA */}
            <section className="bg-pc-blue py-16 text-white text-center">
                <div className="container mx-auto px-4">
                    <h3 className="text-2xl md:text-3xl font-bold mb-6">Quer vender ou alugar seu imóvel?</h3>
                    <p className="text-zinc-300 mb-10 max-w-xl mx-auto">
                        Anuncie conosco e tenha a melhor visibilidade para o seu patrimônio.
                    </p>
                    <Button className="bg-pc-gold hover:bg-pc-gold/90 text-white font-bold px-12 py-7 rounded-2xl text-lg shadow-xl shadow-black/20">
                        Anunciar Agora
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-zinc-950 text-white pt-16 pb-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1">
                            <img src="/logo_text.png" alt="Logo" className="h-12 w-auto mb-6 brightness-0 invert" />
                            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
                                Transformando o mercado imobiliário com transparência, tecnologia e atendimento humanizado em cada negociação.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-lg">Links Rápidos</h4>
                            <ul className="space-y-4 text-sm text-zinc-400 font-medium">
                                <li><a href="#" className="hover:text-white transition-colors">Comprar Imóveis</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Alugar Imóveis</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Lançamentos</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Venda seu imóvel</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-lg">Atendimento</h4>
                            <ul className="space-y-4 text-sm text-zinc-400 font-medium">
                                <li>(00) 00000-0000</li>
                                <li>contato@martadesouza.com.br</li>
                                <li>Segunda à Sexta: 09h às 18h</li>
                                <li>Sábado: 09h às 12h</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-lg">Localização</h4>
                            <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                                Av. Exemplo, 1234 - Sala 101<br />
                                Centro, Cidade - UF<br />
                                CEP: 00000-000
                            </p>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-500 text-xs font-medium">
                        <p>&copy; {new Date().getFullYear()} Marta de Souza Imobiliária. Todos os direitos reservados.</p>
                        <a href="https://github.com/JorgeFloriano" target="_blank" className="hover:text-white transition-colors flex items-center gap-2">
                            Desenvolvido por <span className='font-bold text-zinc-400'>JL-Dev</span>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
