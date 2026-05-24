import { Link, router, usePage } from '@inertiajs/react';
import { Menu, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import NavButton from '@/components/nav-button';
import AuthActions from '@/components/auth-actions';
import { type SharedData } from '@/types';
import FloatingSocials from '@/components/floating-socials';

export default function Navbar() {
    const { auth } = usePage<SharedData>().props;

    const { url } = usePage();

    const navigateTo = (routeName: string, params = {}) => {
        router.get(route(routeName), params);
    };

    const NavbarLink = ({ isActive, onClick, children }: { isActive: boolean, onClick: () => void, children: React.ReactNode }) => (
        <button 
            onClick={onClick}
            className={`relative flex h-full items-center justify-center px-6 text-base font-extrabold rounded-none transition-colors ${isActive ? 'text-pc-gold' : 'text-zinc-200 hover:text-white hover:bg-white/5'}`}
        >
            {children}
            {isActive && (
                <span className="absolute bottom-1 left-0 w-full h-[3px] bg-pc-gold" />
            )}
        </button>
    );

    const isHome = url === '/';
    const isImoveis = url.startsWith('/imoveis') && !url.includes('status=planta') && !url.includes('status=pronto') && !url.includes('alto_padrao=true');
    const isLancamentos = url.includes('status=planta');
    const isProntoParaMorar = url.includes('status=pronto');
    const isAltoPadrao = url.includes('alto_padrao=true');
    const isSobreNos = url.startsWith('/sobre-nos');

    const handleBack = () => {
        if (window.history.length > 2) {
            window.history.back();
        } else {
            router.get(route('home'));
        }
    };

    return (
        <>
        <header className="sticky top-0 z-50 w-full border-b bg-[#123251] backdrop-blur-xl transition-all duration-300">
            <div className="w-full mx-auto flex h-18 items-center justify-between px-4 lg:px-10">
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
                                        <button className={`text-left font-bold text-lg hover:text-white transition-colors py-2 px-4 hover:bg-white/5 rounded-lg border-l-4 ${isHome ? 'border-pc-gold text-pc-gold bg-white/5' : 'border-transparent text-zinc-200'}`} onClick={() => navigateTo('home')}>Início</button>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <button className={`text-left font-bold text-lg hover:text-white transition-colors py-2 px-4 hover:bg-white/5 rounded-lg border-l-4 ${isImoveis ? 'border-pc-gold text-pc-gold bg-white/5' : 'border-transparent text-zinc-200'}`} onClick={() => navigateTo('public.properties')}>Imóveis</button>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <button className={`text-left font-bold text-lg hover:text-white transition-colors py-2 px-4 hover:bg-white/5 rounded-lg border-l-4 ${isLancamentos ? 'border-pc-gold text-pc-gold bg-white/5' : 'border-transparent text-zinc-200'}`} onClick={() => navigateTo('public.properties', { status: 'planta' })}>Lançamentos</button>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <button className={`text-left font-bold text-lg hover:text-white transition-colors py-2 px-4 hover:bg-white/5 rounded-lg border-l-4 ${isProntoParaMorar ? 'border-pc-gold text-pc-gold bg-white/5' : 'border-transparent text-zinc-200'}`} onClick={() => navigateTo('public.properties', { status: 'pronto' })}>Prontos para Morar</button>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <button className={`text-left font-bold text-lg hover:text-white transition-colors py-2 px-4 hover:bg-white/5 rounded-lg border-l-4 ${isAltoPadrao ? 'border-pc-gold text-pc-gold bg-white/5' : 'border-transparent text-zinc-200'}`} onClick={() => navigateTo('public.properties', { alto_padrao: 'true' })}>Alto Padrão</button>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <button className={`text-left font-bold text-lg hover:text-white transition-colors py-2 px-4 hover:bg-white/5 rounded-lg border-l-4 ${isSobreNos ? 'border-pc-gold text-pc-gold bg-white/5' : 'border-transparent text-zinc-200'}`} onClick={() => navigateTo('public.about')}>Sobre Nós</button>
                                    </SheetClose>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="hover:scale-105 transition-transform cursor-pointer flex items-baseline gap-6" onClick={() => navigateTo('home')}>
                            <img src="/logo_m.png" alt="Logo" className="h-10 w-auto" />
                            {(!isHome && !isSobreNos) ? (
                                <img src="/martadesouza_dark.png" alt="Logo" className="h-8 md:h-10 w-auto" />
                            ) : (
                                <img src="/martadesouza.png" alt="Logo" className="h-8 md:h-10 w-auto" />
                            )}
                        </div>
                        {/* {!isHome && (
                            <Button variant="ghost" onClick={handleBack} className="text-zinc-200 hover:bg-white/10 hover:text-white px-3 ml-2 lg:ml-4 border border-white/10 rounded-full h-9" title="Voltar">
                                <ArrowLeft className="h-4 w-4 lg:mr-2" />
                                <span className="hidden lg:inline font-bold">Voltar</span>
                            </Button>
                        )} */}
                    </div>
                </div>

                <nav className="hidden lg:flex h-full items-stretch space-x-1">
                    <NavbarLink isActive={isHome} onClick={() => navigateTo('home')}>Início</NavbarLink>
                    <NavbarLink isActive={isImoveis} onClick={() => navigateTo('public.properties')}>Imóveis</NavbarLink>
                    <NavbarLink isActive={isLancamentos} onClick={() => navigateTo('public.properties', { status: 'planta' })}>Lançamentos</NavbarLink>
                    <NavbarLink isActive={isProntoParaMorar} onClick={() => navigateTo('public.properties', { status: 'pronto' })}>Prontos para Morar</NavbarLink>
                    <NavbarLink isActive={isAltoPadrao} onClick={() => navigateTo('public.properties', { alto_padrao: 'true' })}>Alto Padrão</NavbarLink>
                    <NavbarLink isActive={isSobreNos} onClick={() => navigateTo('public.about')}>Sobre Nós</NavbarLink>
                </nav>
                <AuthActions auth={auth}/>
            </div>
        </header>
        <FloatingSocials />
        </>
    );
}
