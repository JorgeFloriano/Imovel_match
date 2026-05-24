import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function Welcome() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleExplore = () => {
        router.get(route('public.properties'));
    };

    const handleSelectFaixa = (revenueValue: number) => {
        setIsDialogOpen(false);
        router.get(route('public.properties'), { revenue: revenueValue });
    };

    return (
        <div className="min-h-screen bg-[#FDFDFC] flex flex-col">
            <Head title="Marta de Souza Imobiliária" />

            <Navbar />

            <main className="flex-1 w-full">
                {/* Hero Section */}
                <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-[url('/welcome_bg_mobile.jpg')] md:bg-[url('/welcome_bg.jpg')] bg-cover bg-center scale-100">
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
                    </div>

                    <div className="relative z-10 container mx-auto px-4 text-center">
                        <div className="flex justify-center mb-6 md:mb-20">
                            <img src="/logo_text.png" alt="Logo" className="h-30 md:h-40 w-auto" />
                        </div>

                        <Badge variant="outline" className="mb-6 text-white border-white/30 px-4 py-1.5 rounded-full backdrop-blur-sm bg-white/10 uppercase tracking-[0.2em] text-[10px] font-bold hidden md:block mx-auto">
                            Excelência em cada detalhe
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white my-12 tracking-tight leading-none">
                            Seu novo capítulo <br className="block md:hidden" /> <span className="text-pc-gold">começa agora</span>
                        </h1>
                        <div className="text-lg md:text-2xl text-zinc-200 mb-6 mx-auto px-4 font-light leading-relaxed">
                            <div className="hidden md:block">Curadoria exclusiva de empreendimentos que combinam com seu estilo de vida. <br /> Descubra o lar dos seus sonhos com a Marta de Souza Imobiliária.</div>
                        </div>

                        <div id="search" className="max-w-xl md:mb-40 mb-20 mx-auto flex flex-col sm:flex-row gap-2 items-center transition-all duration-300">
                            <Button
                                onClick={() => setIsDialogOpen(true)}
                                className="group relative overflow-hidden h-18 w-full sm:w-auto bg-[#123251] hover:bg-[#0a1e33] text-white px-10 py-6 rounded-xl flex items-center justify-center hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 border border-pc-gold/20 hover:border-pc-gold/40 text-lg tracking-widest whitespace-nowrap"
                            >
                                {/* Efeito de luz contínuo */}
                                <div className="absolute top-0 -left-[150%] w-[150%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[30deg] animate-sweep" />

                                <img src="/mcmv2026.png" alt="Logo" className="h-10 w-auto mr-3 relative z-10 drop-shadow-md" />
                            </Button>
                            <style>{`
                                @keyframes sweep {
                                    0% { left: -150%; }
                                    40%, 100% { left: 150%; }
                                }
                                .animate-sweep {
                                    animation: sweep 4s ease-in-out infinite;
                                }
                                @keyframes float-icon {
                                    0%, 100% { transform: translateY(0); }
                                    50% { transform: translateY(-4px) scale(1.05); }
                                }
                            `}</style>
                            <Button
                                onClick={handleExplore}
                                className="group relative overflow-hidden h-18 w-full sm:w-auto bg-[#123251] hover:bg-[#0a1e33] text-white px-10 py-6 rounded-xl flex items-center justify-center hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 border border-pc-gold/20 hover:border-pc-gold/40 text-lg tracking-widest whitespace-nowrap"
                            >
                                {/* Efeito de luz contínuo */}
                                <div className="absolute top-0 -left-[150%] w-[150%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[30deg] animate-sweep" />

                                <img src="/logo_build.png" alt="Logo" className="h-10 w-auto mr-3 relative z-10 drop-shadow-md" />
                                <span className="relative z-10 uppercase">Exibir catálogo</span>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[500px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-center text-[#123251] dark:text-zinc-100 mb-2 flex flex-col items-center gap-3">
                            <div className="bg-[#123251] px-4 py-2 rounded-xl">
                                <img src="/mcmv2026.png" alt="MCMV" className="h-8 w-auto object-contain" />
                            </div>
                            Novas Condições MCMV
                        </DialogTitle>
                        <DialogDescription className="text-center text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                            A caixa Econômica Federal ampliou as faixas de renda e o valor dos imóveis. Com juros menores e novos limites, ficou mais fácil realizar o sonho da casa própria.
                            <br/>
                            Selecione a sua faixa de renda familiar abaixo para descobrirmos os imóveis ideais para o seu financiamento:
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-3 mt-4">
                        <Button 
                            variant="outline" 
                            className="h-auto py-3 px-4 flex flex-col items-start gap-1 border-emerald-600/30 hover:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all text-left"
                            onClick={() => handleSelectFaixa(3200)}
                        >
                            <span className="font-bold text-[16px] text-emerald-700 dark:text-emerald-500">Faixa 1</span>
                            <span className="text-sm font-normal text-zinc-600 dark:text-zinc-400">Renda de até R$ 3.200 (Imóveis até R$ 275 mil)</span>
                        </Button>

                        <Button 
                            variant="outline" 
                            className="h-auto py-3 px-4 flex flex-col items-start gap-1 border-blue-600/30 hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all text-left"
                            onClick={() => handleSelectFaixa(5000)}
                        >
                            <span className="font-bold text-[16px] text-blue-700 dark:text-blue-500">Faixa 2</span>
                            <span className="text-sm font-normal text-zinc-600 dark:text-zinc-400">Renda de R$ 3.200 a R$ 5.000 (Imóveis até R$ 275 mil)</span>
                        </Button>

                        <Button 
                            variant="outline" 
                            className="h-auto py-3 px-4 flex flex-col items-start gap-1 border-lime-600/30 hover:border-lime-600 hover:bg-lime-50 dark:hover:bg-lime-950/30 transition-all text-left"
                            onClick={() => handleSelectFaixa(9600)}
                        >
                            <span className="font-bold text-[16px] text-lime-700 dark:text-lime-500">Faixa 3</span>
                            <span className="text-sm font-normal text-zinc-600 dark:text-zinc-400">Renda de R$ 5.000 a R$ 9.600 (Imóveis até R$ 400 mil)</span>
                        </Button>

                        <Button 
                            variant="outline" 
                            className="h-auto py-3 px-4 flex flex-col items-start gap-1 border-cyan-600/30 hover:border-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-950/30 transition-all text-left"
                            onClick={() => handleSelectFaixa(13000)}
                        >
                            <span className="font-bold text-[16px] text-cyan-700 dark:text-cyan-500">Faixa 4</span>
                            <span className="text-sm font-normal text-zinc-600 dark:text-zinc-400">Renda de R$ 9.600 a R$ 13.000 (Imóveis até R$ 600 mil)</span>
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
