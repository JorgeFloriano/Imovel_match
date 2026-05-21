import { Link, router, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import NavButton from '@/components/nav-button';
import AuthActions from '@/components/auth-actions';
import { type SharedData } from '@/types';

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
    const isImoveis = url.startsWith('/imoveis') && !url.includes('status=planta') && !url.includes('revenue=15000');
    const isLancamentos = url.includes('status=planta');
    const isAltoPadrao = url.includes('revenue=15000');
    const isSobreNos = url.startsWith('/sobre-nos');

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-[#123251] backdrop-blur-xl transition-all duration-300">
            <div className="w-full mx-auto flex h-18 items-center justify-between px-4 lg:px-40">
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
                                        <button className={`text-left font-bold text-lg hover:text-white transition-colors py-2 px-4 hover:bg-white/5 rounded-lg border-l-4 ${isAltoPadrao ? 'border-pc-gold text-pc-gold bg-white/5' : 'border-transparent text-zinc-200'}`} onClick={() => navigateTo('public.properties', { revenue: '15000' })}>Alto Padrão</button>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <button className={`text-left font-bold text-lg hover:text-white transition-colors py-2 px-4 hover:bg-white/5 rounded-lg border-l-4 ${isSobreNos ? 'border-pc-gold text-pc-gold bg-white/5' : 'border-transparent text-zinc-200'}`} onClick={() => navigateTo('public.about')}>Sobre Nós</button>
                                    </SheetClose>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <div className="hover:scale-105 transition-transform cursor-pointer" onClick={() => navigateTo('home')}>
                        <img src="/logo_m.png" alt="Logo" className="h-10 w-auto" />
                    </div>
                </div>

                <nav className="hidden lg:flex h-full items-stretch space-x-1">
                    <NavbarLink isActive={isHome} onClick={() => navigateTo('home')}>Início</NavbarLink>
                    <NavbarLink isActive={isImoveis} onClick={() => navigateTo('public.properties')}>Imóveis</NavbarLink>
                    <NavbarLink isActive={isLancamentos} onClick={() => navigateTo('public.properties', { status: 'planta' })}>Lançamentos</NavbarLink>
                    <NavbarLink isActive={isAltoPadrao} onClick={() => navigateTo('public.properties', { revenue: '15000' })}>Alto Padrão</NavbarLink>
                    <NavbarLink isActive={isSobreNos} onClick={() => navigateTo('public.about')}>Sobre Nós</NavbarLink>
                </nav>
                <AuthActions auth={auth} />
            </div>
        </header>
    );
}
