import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Search, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PropertyCard from '@/components/property-card';
import AuthActions from '@/components/auth-actions';
import Pagination from '@/components/pagination';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Property {
    id: number;
    type: string;
    description: string;
    building_area: number;
    rooms: number;
    bathrooms: number;
    garages: number;
    image: string | null;
    district?: { name: string };
    region?: { name: string };
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
}

export default function Welcome({ properties, regions }: WelcomeProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="min-h-screen bg-[#FDFDFC] dark:bg-[#0a0a0a]">
            <Head title="Marta de Souza Imobiliária" />

            {/* Navbar */}
            <header className="sticky top-0 z-50 w-full border-b bg-[#123251] backdrop-blur-xl dark:bg-black/90 dark:border-zinc-800 transition-all duration-300">
                <div className="w-full mx-auto flex h-24 items-center justify-between px-4 lg:px-6">
                    <div className="flex items-center gap-8 hover:scale-105 transition-transform cursor-pointer p-6">
                        <img src="/logo_build.png" alt="Logo" className="h-18 w-auto " />
                        <img src="/logo_text.png" alt="Logo" className="h-12 md:h-14 w-auto" />
                    </div>

                    <nav className="hidden lg:flex items-center gap-10 text-sm font-bold text-zinc-200 dark:text-zinc-400">
                        <Link href="/" className="text-pc-blue dark:text-white relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-pc-blue">Início</Link>
                        <a href="#" className="hover:text-pc-blue transition-colors tracking-tight">Imóveis</a>
                        <a href="#" className="hover:text-pc-blue transition-colors tracking-tight">Lançamentos</a>
                        <a href="#" className="hover:text-pc-blue transition-colors tracking-tight">Sobre Nós</a>
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
                    <p className="text-lg md:text-2xl text-zinc-200 mb-12 max-w-3xl mx-auto px-4 font-light leading-relaxed">
                        Curadoria exclusiva de imóveis que combinam com seu estilo de vida. <br className="hidden md:block" /> Descubra o lar dos seus sonhos com a Marta de Souza Imobiliária.
                    </p>

                    <div className="max-w-4xl mx-auto bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-[2.5rem] shadow-3xl p-3 flex flex-col md:flex-row gap-2">
                        <div className="flex-1 flex items-center px-6 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800">
                            <Search className="text-pc-blue mr-3 h-5 w-5" />
                            <Select>
                                <SelectTrigger className="w-full h-16 bg-transparent border-none focus:ring-0 focus:outline-none text-zinc-900 dark:text-white font-semibold cursor-pointer shadow-none ring-0">
                                    <SelectValue placeholder="Em qual região você gostaria de morar?" />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-none shadow-2xl p-2 bg-white/95 backdrop-blur-xl">
                                    {regions && regions.map((region) => (
                                        <SelectItem key={region.id} value={region.id.toString()} className="rounded-xl py-3 px-4 font-semibold !focus:bg-pc-blue !focus:text-white data-[highlighted]:bg-pc-blue data-[highlighted]:text-white transition-colors cursor-pointer">
                                            {region.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-full md:w-64 flex items-center px-6 border-b md:border-b-0 md:border-r dark:border-zinc-800">
                            <Select>
                                <SelectTrigger className="w-full h-16 bg-transparent border-none focus:ring-0 focus:outline-none text-zinc-900 dark:text-white font-semibold cursor-pointer shadow-none ring-0">
                                    <SelectValue placeholder="Tipo de Imóvel" />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-none shadow-2xl p-2 bg-white/95 backdrop-blur-xl">
                                    <SelectItem value="casa" className="rounded-xl py-3 px-4 font-semibold !focus:bg-pc-blue !focus:text-white data-[highlighted]:bg-pc-blue data-[highlighted]:text-white transition-colors cursor-pointer">Casa</SelectItem>
                                    <SelectItem value="apartamento" className="rounded-xl py-3 px-4 font-semibold !focus:bg-pc-blue !focus:text-white data-[highlighted]:bg-pc-blue data-[highlighted]:text-white transition-colors cursor-pointer">Apartamento</SelectItem>
                                    <SelectItem value="terreno" className="rounded-xl py-3 px-4 font-semibold !focus:bg-pc-blue !focus:text-white data-[highlighted]:bg-pc-blue data-[highlighted]:text-white transition-colors cursor-pointer">Terreno</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button className="bg-pc-blue hover:bg-pc-blue/90 text-white h-16 px-12 rounded-[1.8rem] font-bold text-lg shadow-xl shadow-pc-blue/20 transition-all hover:scale-105 active:scale-95">
                            Explorar
                        </Button>
                    </div>
                </div>
            </section>

            {/* Featured Properties */}
            <section className="relative py-20 md:py-32 bg-white dark:bg-[#0a0a0a] overflow-hidden">
                {/* Decorative Gradient Glow - Forced to the top with z-20 */}
                <div className="absolute inset-0 bg-gradient-to-r from-pc-blue/[0.1] via-white to-transparent" />

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
                        <Link href="#" className="group flex items-center text-pc-blue font-black hover:text-pc-blue/80 transition-colors text-lg">
                            Ver catálogo completo <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {properties.data && properties.data.length > 0 ? (
                            properties.data.map((property) => (
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
