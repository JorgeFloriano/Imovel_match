import { Head } from '@inertiajs/react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';


export default function About() {
    return (
        <div className="min-h-screen bg-[#123251] flex flex-col font-sans relative">
            <Head title="Sobre Nós | Marta de Souza Imobiliária" />
            <Navbar />

            <div className="container mx-auto px-4 py-8 relative z-30">
                <Breadcrumbs variant="dark" breadcrumbs={[
                    { title: 'Início', href: route('home') },
                    { title: 'Quem Somos', href: '#' }
                ]} />
            </div>

            <div className="pt-8 pb-4 flex justify-center opacity-90 gap-20">
                {/* We use an image with brightness adjustments to make the logo look somewhat golden/bright like the image provided */}
                <img
                    src="/logo_build.png"
                    alt="Marta de Souza Imobiliária"
                    className="h-28 w-auto hidden lg:block"
                />
                <img
                    src="/logo_text.png"
                    alt="Marta de Souza Imobiliária"
                    className="w-auto px-8 h-30 md:h-40"
                //style={{ filter: 'brightness(0) invert(0.8) sepia(1) hue-rotate(5deg) saturate(4)' }}
                />
                <img
                    src="/logo_build.png"
                    alt="Marta de Souza Imobiliária"
                    className="h-28 w-auto hidden lg:block"
                />
            </div>

            {/* Subtle background effects to mimic waves/curves from the image */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <svg className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] text-pc-gold" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none" stroke="currentColor" strokeWidth="0.5" d="M38.1,-56.9C49.9,-47.9,60.2,-37.2,68.2,-23.7C76.2,-10.2,81.9,6.2,78.2,20.4C74.6,34.7,61.7,46.8,47.7,55.3C33.7,63.9,18.5,69,3.1,64.8C-12.3,60.5,-27.4,46.9,-42.6,35.5C-57.8,24.1,-73.2,14.9,-77.3,2.4C-81.4,-10.2,-74.3,-26.2,-62.4,-37.6C-50.5,-49.1,-33.9,-55.9,-19.7,-59.5C-5.5,-63.1,6.3,-63.4,20,-62.4C33.7,-61.4,45.4,-59.2,38.1,-56.9Z" transform="translate(100 100) scale(1.1)" />
                </svg>
                <svg className="absolute bottom-[-10%] right-[-10%] w-[100%] h-[100%] text-pc-gold" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none" stroke="currentColor" strokeWidth="0.3" d="M48.6,-66.1C61.3,-56.5,68.7,-39.8,72.7,-23C76.7,-6.3,77.3,10.6,71.2,25C65,39.4,52,51.3,37.3,60.5C22.6,69.7,6.1,76.2,-9.3,73.5C-24.7,70.8,-39,58.8,-51.9,46.2C-64.8,33.5,-76.3,20.2,-80.4,4.2C-84.4,-11.8,-81.1,-30.5,-70.7,-43.8C-60.3,-57.1,-42.8,-65.1,-27.1,-69.5C-11.4,-73.9,2.5,-74.6,18.7,-72C35,-69.4,53.5,-63.5,48.6,-66.1Z" transform="translate(100 100) scale(1.1)" />
                </svg>
            </div>

            <main className="flex-1 w-full flex flex-col items-center py-16 md:py-24 px-6 relative z-10">
                <div className="max-w-4xl w-full mx-auto text-center space-y-10">
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-extrabold text-pc-gold font-serif uppercase tracking-widest drop-shadow-md">
                            Quem Somos
                        </h1>
                        <p className="text-xl md:text-2xl text-white font-medium">
                            Conectamos imóveis e pessoas. Esse é nosso lema!
                        </p>
                    </div>

                    <div className="text-white/95 text-left md:text-center text-base md:text-lg leading-relaxed max-w-3xl mx-auto space-y-6">
                        <p>
                            Há 6 anos no mercado, Marta de Souza Imobiliária foi criada com o intuito de trazer mais praticidade ao setor imobiliário. Aqui, focamos no cliente e por isso nos esforçamos para atendê-lo de acordo com suas necessidades, buscando o imóvel que se encaixa nos seus sonhos e condições. Sem engodo, com muita transparência e segurança.
                        </p>
                        <p>
                            Em parceria com as maiores construtoras de Sorocaba e região, temos em nosso portfólio os melhores lançamentos, com perfil padrão até o alto padrão, tudo para que o objetivo de nossos clientes seja alcançado.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
                        {/* Missão */}
                        <div className="bg-[#123251] border-4 border-pc-gold/80 rounded-[2rem] p-8 flex flex-col items-center text-center shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_35px_rgba(212,175,55,0.4)] hover:-translate-y-2 transition-all duration-300">
                            <h2 className="text-2xl font-bold text-pc-gold font-serif mb-6 uppercase tracking-wider">Missão</h2>
                            <p className="text-white/95 leading-relaxed text-base font-medium">
                                Conectar o cliente através de um atendimento humanizado, compreendendo suas necessidades e expectativas, fazendo-o alcançar o objetivo desejado de maneira leve, prática e rápida.
                            </p>
                        </div>

                        {/* Visão */}
                        <div className="bg-[#123251] border-4 border-pc-gold/80 rounded-[2rem] p-8 flex flex-col items-center text-center shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_35px_rgba(212,175,55,0.4)] hover:-translate-y-2 transition-all duration-300">
                            <h2 className="text-2xl font-bold text-pc-gold font-serif mb-6 uppercase tracking-wider">Visão</h2>
                            <p className="text-white/95 leading-relaxed text-base font-medium">
                                Estar, em 5 anos, entre as 10 melhores imobiliárias de Sorocaba e Região, sendo reconhecida como uma empresa com foco no cliente.
                            </p>
                        </div>

                        {/* Valores */}
                        <div className="bg-[#123251] border-4 border-pc-gold/80 rounded-[2rem] p-8 flex flex-col items-center text-center shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_35px_rgba(212,175,55,0.4)] hover:-translate-y-2 transition-all duration-300">
                            <h2 className="text-2xl font-bold text-pc-gold font-serif mb-6 uppercase tracking-wider">Valores</h2>
                            <ul className="text-white/95 space-y-3 text-base font-medium">
                                <li>Compromisso</li>
                                <li>Transparência</li>
                                <li>Eficiência</li>
                                <li>Segurança</li>
                                <li>Humanização</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />

        </div>
    );
}
