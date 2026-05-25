import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { router } from '@inertiajs/react';

interface AnimatedSearchProps {
    routeUrl: string;
    disableAnimation?: boolean;
    className?: string;
    inputClassName?: string;
    placeholder?: string;
}

export default function AnimatedSearch({ routeUrl, disableAnimation = false, className = '', inputClassName = '', placeholder = 'Buscar por...' }: AnimatedSearchProps) {
    const [isOpen, setIsOpen] = useState(disableAnimation);
    const [keyword, setKeyword] = useState('');
    const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholder);
    const [isSearching, setIsSearching] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Fechar ao clicar fora da caixa se o texto estiver vazio
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                if (keyword.trim() === '' && !disableAnimation) {
                    setIsOpen(false);
                }
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [keyword]);

    const handleSearch = async () => {
        if (!isOpen && !disableAnimation) {
            setIsOpen(true);
            return;
        }

        if (keyword.trim() !== '') {
            setIsSearching(true);
            try {
                // Fazer uma requisição para checar se há resultados antes de redirecionar
                const response = await fetch(`${routeUrl}?keyword=${encodeURIComponent(keyword.trim())}`, {
                    headers: {
                        'X-Inertia': 'true',
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    const properties = data.props.properties;
                    
                    if (properties && properties.data && properties.data.length === 0) {
                        // Nenhum resultado encontrado
                        setKeyword('');
                        setCurrentPlaceholder('Não encontrado...');
                    } else {
                        // Resultados encontrados, redirecionar
                        router.get(routeUrl, { keyword: keyword.trim() });
                    }
                }
            } catch (error) {
                console.error("Erro ao buscar imóveis:", error);
                router.get(routeUrl, { keyword: keyword.trim() });
            } finally {
                setIsSearching(false);
            }
        } else if (!disableAnimation) {
            setIsOpen(false);
            setCurrentPlaceholder(placeholder);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        } else if (e.key === 'Escape' && !disableAnimation) {
            setIsOpen(false);
            setKeyword('');
        }
    };

    return (
        <div ref={containerRef} className={`relative flex items-center justify-end ${className}`}>
            <div 
                className={`flex items-center overflow-hidden transition-all duration-300 ease-in-out border rounded-full ${
                    isOpen || disableAnimation
                        ? 'w-full border-white/30 bg-white/10 backdrop-blur-md shadow-lg px-8 py-2' 
                        : 'w-18 bg-transparent hover:bg-white/10 px-4 py-2'
                }`}
            >
                <input
                    ref={inputRef}
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={currentPlaceholder}
                    className={`bg-transparent text-white placeholder:text-zinc-300 outline-none transition-all duration-300 text-sm truncate ${
                        isOpen || disableAnimation ? 'w-full px-2 opacity-100' : 'w-0 opacity-0 px-0'
                    } ${currentPlaceholder !== placeholder ? '' : ''} ${inputClassName}`}
                    disabled={isSearching}
                />
                
                <button 
                    onClick={handleSearch}
                    disabled={isSearching}
                    className={`flex items-center justify-center w-10 h-10 flex-shrink-0 text-zinc-200 hover:text-white transition-colors ${isSearching ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                     <Search className={`h-5 w-5 ${isSearching ? 'animate-pulse' : ''}`} />
                </button>
            </div>
        </div>
    );
}
