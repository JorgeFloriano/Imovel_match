import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import WhatsAppButton from '@/components/whatsapp-button';
import InstagramButton from '@/components/instagram-button';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function Welcome() {
    const [revenue, setRevenue] = useState<string>('');

    const handleExplore = () => {
        const params: any = {};
        if (revenue) params.revenue = revenue;
        
        router.get(route('public.properties'), params);
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
                            <img src="/logo_text.png" alt="Logo" className="h-24 md:h-40 w-auto" />
                        </div>

                        <Badge variant="outline" className="mb-6 text-white border-white/30 px-4 py-1.5 rounded-full backdrop-blur-sm bg-white/10 uppercase tracking-[0.2em] text-[10px] font-bold hidden md:block mx-auto">
                            Excelência em cada detalhe
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white my-12 tracking-tight leading-none">
                            Seu novo capítulo <br className="block md:hidden" /> <span className="text-pc-gold">começa agora</span>
                        </h1>
                        <p className="text-lg md:text-2xl text-zinc-200 mb-6 mx-auto px-4 font-light leading-relaxed">
                            <div className="hidden md:block">Curadoria exclusiva de empreendimentos que combinam com seu estilo de vida. <br/> Descubra o lar dos seus sonhos com a Marta de Souza Imobiliária.</div><div>Preencha o campo abaixo para iniciarmos a busca pelo imóvel perfeito.</div>
                        </p>

                        <div id="search" className="max-w-lg md:mb-40 mb-20 mx-auto bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-[0_0_30px_rgba(212,175,55,0.15)] flex flex-col sm:flex-row gap-2 items-center hover:shadow-[0_0_40px_rgba(212,175,55,0.25)] transition-all duration-300">
                            <div className="relative w-full flex-1">
                                <input
                                    type="number"
                                    placeholder="Digite sua renda"
                                    value={revenue}
                                    onChange={(e) => setRevenue(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleExplore();
                                        }
                                    }}
                                    className="h-15 w-full pl-12 pr-4 py-3 bg-white/5 focus:bg-white/10 border border-white/10 focus:border-pc-gold/50 rounded-xl text-white placeholder-zinc-300 font-semibold focus:outline-none focus:ring-2 focus:ring-pc-gold/50 transition-all text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
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
                                .animate-float-icon {
                                    animation: float-icon 4s ease-in-out infinite;
                                }
                            `}</style>
                            <Button 
                                onClick={handleExplore}
                                className="group relative overflow-hidden h-15 w-full sm:w-auto bg-[#123251] hover:bg-[#0a1e33] text-white uppercase font-bold px-10 py-6 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(18,50,81,0.4)] hover:shadow-[0_0_25px_rgba(212,175,55,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 border border-pc-gold/20 hover:border-pc-gold/40 text-lg tracking-widest whitespace-nowrap"
                            >
                                {/* Efeito de luz contínuo */}
                                <div className="absolute top-0 -left-[150%] w-[150%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[30deg] animate-sweep" />
                                
                                <img src="/logo_build.png" alt="Logo" className="h-10 w-auto mr-3 relative z-10 drop-shadow-md animate-float-icon" />
                                <span className="relative z-10">buscar!</span>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            <WhatsAppButton />
            <InstagramButton />
        </div>
    );
}
