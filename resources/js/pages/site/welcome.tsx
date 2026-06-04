import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AnimatedSearch from '@/components/animated-search';

const formatMonetaryText = (text: string) => {
    const parts = text.split(/(R\$\s[\d.,]+(?:\smil)?)/g);
    return parts.map((part, index) => {
        if (/^R\$\s[\d.,]+(?:\smil)?$/.test(part)) {
            const match = part.match(/^(R\$\s)([\d.,]+)(\smil)?$/);
            if (match) {
                return (
                    <span key={index}>
                        {match[1]}<strong className="text-pc-gold font-bold">{match[2]}</strong>{match[3] || ''}
                    </span>
                );
            }
        }
        return <span key={index}>{part}</span>;
    });
};

const MCMVFaixaButton = ({
    faixa,
    description,
    onClick
}: {
    faixa: string;
    description: string;
    onClick: () => void;
}) => (
    <Button
        variant="outline"
        className="h-auto w-full py-3 px-4 flex flex-col items-start gap-1 border-[#123251] hover:bg-[#123251]/5 hover:scale-[1.02] transition-all duration-300 text-left whitespace-normal"
        onClick={onClick}
    >
        <span className="font-bold text-[16px] text-[#123251]">{faixa}</span>
        <span className="text-sm font-semibold text-[#123251] leading-relaxed block">
            {formatMonetaryText(description)}
        </span>
    </Button>
);

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
                        <div id="main-image" className="flex justify-center mb-[8vh] md:mb-[8vh]">
                            <img src="/logo_text.png" alt="Logo" className="h-30 md:h-40 w-auto" />
                        </div>

                        <Badge id="center-badge" variant="outline" className="text-white border-white/30 px-4 py-1.5 rounded-full backdrop-blur-sm bg-white/10 uppercase tracking-[0.2em] text-[10px] font-bold hidden md:block mx-auto mb-[2vh]">
                            Excelência em cada detalhe
                        </Badge>

                        <h1 id="main-slogan" className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-none mb-[1vh]">
                            Seu novo capítulo <br className="block md:hidden" /> <span className="text-pc-gold">começa agora</span>
                        </h1>

                        <div id="main-text" className="text-lg md:text-2xl text-zinc-200 mx-auto px-4 font-light leading-relaxed mb-[3vh]">
                            <div className="hidden md:block">Curadoria exclusiva de empreendimentos que combinam com seu estilo de vida. <br /> Descubra o lar dos seus sonhos com a Marta de Souza Imobiliária.</div>
                        </div>

                        <div id="search-text" className="max-w-xl mx-auto w-full flex justify-center mb-[2vh]">
                            <AnimatedSearch
                                routeUrl={route('public.properties')}
                                disableAnimation={true}
                                className="w-full"
                                inputClassName="text-base p-4 text-[20px]"
                                placeholder="Buscar por empreendimento ou referência"
                            />
                        </div>

                        <div id="search" className="max-w-xl mx-auto flex flex-col sm:flex-row gap-6 items-center transition-all duration-300 mb-[7vh]">
                            <Button
                                onClick={() => setIsDialogOpen(true)}
                                className="group relative overflow-hidden h-18 w-full sm:w-auto bg-[#123251] hover:bg-[#0a1e33] text-white px-10 py-6 rounded-xl flex items-center justify-center hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 border border-pc-gold/20 hover:border-pc-gold/40 text-lg tracking-widest whitespace-nowrap"
                            >
                                {/* Efeito de luz contínuo */}
                                <div className="absolute top-0 -left-[150%] w-[150%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[30deg] animate-sweep" />

                                <img src="/mcmv2027.png" alt="Logo" className="h-10 w-auto mr-3 relative z-10 drop-shadow-md" />
                            </Button>
                            <style>{`
                                @keyframes sweep {
                                    0% { left: -200%; }
                                    40%, 100% { left: 200%; }
                                }
                                .animate-sweep {
                                    animation: sweep 6s ease-in-out infinite;
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
                                <div className="absolute top-0 -left-[150%] w-[150%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[30deg] animate-sweep" />

                                <img src="/logo_build.png" alt="Logo" className="h-10 w-auto mr-3 relative z-10 drop-shadow-md" />
                                <span className="relative z-10 uppercase">Exibir catálogo</span>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[500px] bg-white border border-zinc-200 max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-center text-[#123251] mb-2 flex flex-col items-center gap-3">
                            <div className="p-2">
                                <img src="/mcmv.png" alt="MCMV" className="h-8 w-auto object-contain" />
                            </div>
                            Novas Condições MCMV
                        </DialogTitle>
                        <DialogDescription className="text-center text-[15px] leading-relaxed text-zinc-600">
                            A Caixa Econômica Federal ampliou as faixas de renda e o valor dos imóveis contemplados pelo Minha Casa Minha Vida. Com juros menores e novos limites, ficou mais fácil realizar o sonho da casa própria (<a href="https://caixanoticias.caixa.gov.br/Paginas/Not%C3%ADcias/2026/04-ABRIL/CAIXA-inicia-opera%C3%A7%C3%A3o-das-novas-condi%C3%A7%C3%B5es-do-Minha-Casa,-Minha-Vida-na-pr%C3%B3xima-quarta-feira-(22).aspx" target="_blank" rel="noreferrer" className="text-[#123251] font-semibold hover:underline">saiba mais</a>). Selecione a sua faixa de renda familiar abaixo para descobrirmos os imóveis ideais para o seu financiamento:
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-3 mt-4">
                        <MCMVFaixaButton
                            faixa="Faixa 1"
                            description="Renda de até R$ 3.200 (Imóveis até R$ 275 mil)"
                            onClick={() => handleSelectFaixa(3200)}
                        />

                        <MCMVFaixaButton
                            faixa="Faixa 2"
                            description="Renda de R$ 3.200 a R$ 5.000 (Imóveis até R$ 275 mil)"
                            onClick={() => handleSelectFaixa(5000)}
                        />

                        <MCMVFaixaButton
                            faixa="Faixa 3"
                            description="Renda de R$ 5.000 a R$ 9.600 (Imóveis até R$ 400 mil)"
                            onClick={() => handleSelectFaixa(9600)}
                        />

                        <MCMVFaixaButton
                            faixa="Faixa 4"
                            description="Renda de R$ 9.600 a R$ 13.000 (Imóveis até R$ 600 mil)"
                            onClick={() => handleSelectFaixa(13000)}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
