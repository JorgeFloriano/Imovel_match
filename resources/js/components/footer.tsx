import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-zinc-950 text-white pt-16 pb-8">
            <div className="container mx-auto px-4 lg:px-40">
                <div className="flex flex-col md:flex-row justify-between">
                    <div>
                        <img src="/logo_text.png" alt="Logo" className="h-12 w-auto mb-6 brightness-0 invert" />
                        <p className="text-zinc-400 text-sm leading-relaxed mb-10 max-w-md">
                            Transformando o mercado imobiliário com transparência, tecnologia e atendimento humanizado em cada negociação.
                        </p>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-10 max-w-md">
                        Whatsapp / Telefone: 15 99160-0906<br />
                        E-mail: souzamartaimoveis@gmail.com<br />
                        CRECI - Pessoa Física: 240707-F<br />
                        CRECI - Pessoa Jurídica: 43608-J<br />
                        CNPJ: 28094541/0001-45
                    </p>
                </div>

                <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-500 text-xs font-medium">
                    <p>&copy; {new Date().getFullYear()} Marta de Souza Imobiliária. Todos os direitos reservados.</p>
                    <a href="https://github.com/JorgeFloriano" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                        Desenvolvido por <span className='font-bold text-zinc-400'>JL-Dev</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
