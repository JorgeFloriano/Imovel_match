import { type SharedData } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Search, Filter, Menu } from 'lucide-react';
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

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";

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
        status?: string;
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
    const [selectedStatus, setSelectedStatus] = useState<string>(filters?.status || 'all');

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
        selectedStatus
    ].filter(val => val && val !== 'all').length;

    // Sync state with props when filters or data change
    useEffect(() => {
        setSelectedRegion(filters?.region || 'all');
        setSelectedType(filters?.type || 'all');
        setSelectedRooms(filters?.rooms || 'all');
        setSelectedBuildingArea(filters?.building_area || 'all');
        setSelectedBathrooms(filters?.bathrooms || 'all');
        setSelectedGarages(filters?.garages || 'all');
        setSelectedSuites(filters?.suites || 'all');
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
        <div className="min-h-screen bg-[#FDFDFC]">
            <Head title="Marta de Souza Imobiliária" />

            {/* Navbar */}
            <header className="sticky top-0 z-50 w-full border-b bg-[#123251] backdrop-blur-xl transition-all duration-300">
                <div className="w-full mx-auto flex h-18 items-center justify-between px-4 lg:pl-40 lg:pr-6">
                    <div className="flex items-center gap-4 lg:gap-8">
                        {/* Mobile Menu */}
                        <div className="lg:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white h-10 w-10">
                                        <Menu className="h-6 w-6" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="bg-[#123251] text-white flex h-full w-64 flex-col items-stretch border-r border-white/10 p-0">
                                    <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
                                    <SheetHeader className="flex justify-start text-left p-4 border-b border-white/10">
                                        <img src="/logo_m.png" alt="Logo" className="h-8 w-8" />
                                    </SheetHeader>
                                    <div className="flex flex-col p-4 space-y-2">
                                        <SheetClose asChild>
                                            <button className="text-left text-zinc-200 font-bold text-lg hover:text-white transition-colors py-2 px-4 hover:bg-white/5 rounded-lg">Início</button>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <button className="text-left text-zinc-200 font-bold text-lg hover:text-white transition-colors py-2 px-4 hover:bg-white/5 rounded-lg" onClick={handleNavImoveis}>Imóveis</button>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <button className="text-left text-zinc-200 font-bold text-lg hover:text-white transition-colors py-2 px-4 hover:bg-white/5 rounded-lg">Lançamentos</button>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <button className="text-left text-zinc-200 font-bold text-lg hover:text-white transition-colors py-2 px-4 hover:bg-white/5 rounded-lg">Sobre Nós</button>
                                        </SheetClose>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>

                        <div className="hover:scale-105 transition-transform cursor-pointer">
                            <img src="/logo_m.png" alt="Logo" className="h-10 w-auto" />
                        </div>
                    </div>

                    <nav className="hidden lg:flex items-center text-sm font-bold text-zinc-200">
                        <NavButton variant="primary">Início</NavButton>
                        <NavButton variant="primary" onClick={handleNavImoveis}>Imóveis</NavButton>
                        <NavButton variant="primary">Lançamentos</NavButton>
                        <NavButton variant="primary">Sobre Nós</NavButton>
                    </nav>
                    <AuthActions auth={auth} />
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative h-[300px] md:h-[900px] w-full overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('/welcome_bg_mobile.jpg')] md:bg-[url('/welcome_bg.jpg')] bg-cover bg-center scale-105 animate-pulse-slow">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
                </div>

                <div className="relative z-10 container mx-auto px-4 text-center">
                    <div className="flex justify-center mb-12 md:mb-28">
                        <img src="/logo_text.png" alt="Logo" className="h-24 md:h-40 w-auto" />
                    </div>

                    <Badge variant="outline" className="mb-6 text-white border-white/30 px-4 py-1.5 rounded-full backdrop-blur-sm bg-white/10 uppercase tracking-[0.2em] text-[10px] font-bold">
                        Excelência em cada detalhe
                    </Badge>
                    <h1 className="hidden md:block text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-none">
                        Seu novo capítulo <span className="text-pc-gold">começa agora</span>
                    </h1>
                    <p className="hidden md:block text-lg md:text-2xl text-zinc-200 mb-12 mx-auto px-4 font-light leading-relaxed">
                        Curadoria exclusiva de imóveis que combinam com seu estilo de vida. <br className="hidden md:block" /> Descubra o lar dos seus sonhos com a Marta de Souza Imobiliária.
                    </p>

                    <div className="hidden md:flex max-w-2xl mx-auto bg-white/95 backdrop-blur-xl rounded-3xl md:rounded-[2.5rem] shadow-3xl p-3 flex-col md:flex-row gap-2">
                        <div className="flex-1 flex items-center px-4 md:px-6 py-2 md:py-0 border-b md:border-b-0 md:border-r border-zinc-200">
                            <Search className="text-pc-blue mr-3 h-5 w-5 flex-shrink-0" />
                            <Select onValueChange={setSelectedRegion} value={selectedRegion}>
                                <SelectTrigger className="w-full h-14 md:h-16 bg-transparent border-none focus:ring-0 focus:outline-none text-zinc-900 font-semibold cursor-pointer shadow-none ring-0 p-0 text-left">
                                    <SelectValue placeholder="Em qual região você gostaria de morar?" />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-none shadow-2xl p-2 bg-white/95 backdrop-blur-xl">
                                    <SelectItem value="all" className="rounded-xl py-3 px-4 font-semibold !focus:bg-pc-blue !focus:text-white data-[highlighted]:bg-pc-blue data-[highlighted]:text-white transition-colors cursor-pointer">Onde você quer morar ?</SelectItem>
                                    {regions && regions.map((region) => (
                                        <SelectItem key={region.id} value={region.id.toString()} className="rounded-xl py-3 px-4 font-semibold !focus:bg-pc-blue !focus:text-white data-[highlighted]:bg-pc-blue data-[highlighted]:text-white transition-colors cursor-pointer">
                                            {region.prefix ? region.prefix : ""} {region.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            onClick={handleExplore}
                            className="w-full md:w-auto bg-pc-blue hover:bg-pc-blue/90 text-white h-14 md:h-16 px-8 md:px-12 rounded-2xl md:rounded-[1.8rem] font-bold text-lg shadow-xl shadow-pc-blue/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
                        >
                            Explorar
                        </Button>
                    </div>
                </div>
            </section>

            {/* Featured Properties */}
            <section id="featured-properties" className="relative py-5 md:py-32 bg-[#f5f9fc] md:bg-white overflow-hidden">
                {/* Brand Background Image with Center Fade */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div
                        className="hidden md:block absolute inset-0 bg-cover bg-center opacity-[0.2]"
                        style={{ backgroundImage: "url('/bg_image.jpg')" }}
                    />
                    {/* Custom Double Fade Mask - Defined in app.css */}
                    <div className="absolute inset-0 bg-property-mask" />
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

                        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 text-left">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-zinc-700">Região</label>
                                        <Select onValueChange={(value) => setSelectedRegion(value === selectedRegion ? 'all' : value)} value={selectedRegion}>
                                            <SelectTrigger className="w-full min-h-[36px] bg-zinc-100 border-none focus:ring-0 focus:outline-none text-zinc-700 font-medium cursor-pointer shadow-none rounded-xl h-auto py-2 px-4 transition-all hover:bg-zinc-200 data-[state=open]:ring-2 data-[state=open]:ring-pc-blue">
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

            {/* Brands/CTA */}
            {/* <section className="bg-pc-blue py-16 text-white text-center">
                <div className="container mx-auto px-4">
                    <h3 className="text-2xl md:text-3xl font-bold mb-6">Quer vender ou alugar seu imóvel?</h3>
                    <p className="text-zinc-300 mb-10 max-w-xl mx-auto">
                        Anuncie conosco e tenha a melhor visibilidade para o seu patrimônio.
                    </p>
                    <Button className="w-full md:w-auto bg-pc-gold hover:bg-pc-gold/90 text-white font-bold px-12 py-6 md:py-7 rounded-2xl text-base md:text-lg shadow-xl shadow-black/20">
                        Anunciar Agora
                    </Button>
                </div>
            </section> */}

            {/* Footer */}
            <footer className="bg-zinc-950 text-white pt-16 pb-8">
                <div className="container mx-auto px-4">
                    <div /*className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"*/>
                        <div /*className="col-span-1"*/>
                            <img src="/logo_text.png" alt="Logo" className="h-12 w-auto mb-6 brightness-0 invert" />
                            <p className="text-zinc-400 text-sm leading-relaxed mb-10">
                                Transformando o mercado imobiliário com transparência, tecnologia e atendimento humanizado em cada negociação.
                            </p>
                        </div>
                        {/* <div>
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
                        </div> */}
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
