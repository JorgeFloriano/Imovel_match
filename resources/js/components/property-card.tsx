import { MapPin, Bed, Bath, Square, Car, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
}

interface PropertyCardProps {
    property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
    const formatType = (type: string) => {
        if (!type) return '';
        const lowerType = type.toLowerCase();
        if (lowerType === 'apart. c/ elevad.' || lowerType === 'apartamento') {
            return 'Apartamento';
        }
        return type.charAt(0).toUpperCase() + type.slice(1);
    };

    return (
        <Card className="group flex flex-col h-full overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-500 rounded-3xl bg-white dark:bg-zinc-900">
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden">
                <img 
                    src={property.image || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070'} 
                    alt={property.type}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute top-4 left-4">
                    <Badge className="bg-pc-blue/90 text-white hover:bg-pc-blue font-bold border-none shadow-lg px-4 py-1 rounded-full">
                        {formatType(property.type)}
                    </Badge>
                </div>
            </div>

            {/* Content Section */}
            <CardContent className="flex-1 pt-6 px-6">
                <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 mb-4 text-sm font-semibold tracking-tight">
                    <MapPin className="h-4 w-4 text-pc-gold" />
                    <span>
                        {property.district?.name || 'Localização não informada'}
                        {property.region?.name ? ` • ${property.region.name}` : ''}
                    </span>
                </div>
                
                <h3 className="text-zinc-900 dark:text-white font-bold text-lg mb-3 line-clamp-1">
                    {formatType(property.type)} em {property.district?.name}
                </h3>

                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-6 min-h-[4.5rem]">
                    {property.description || 'Sem descrição disponível para este imóvel.'}
                </p>

                <div className="grid grid-cols-4 gap-2 py-5 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="flex flex-col items-center justify-center gap-1 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl py-3">
                        <Bed className="h-4 w-4 text-pc-blue dark:text-pc-gold" />
                        <span className="text-[10px] font-bold uppercase text-zinc-400">Quartos</span>
                        <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{property.rooms}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-1 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl py-3">
                        <Bath className="h-4 w-4 text-pc-blue dark:text-pc-gold" />
                        <span className="text-[10px] font-bold uppercase text-zinc-400">Banh.</span>
                        <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{property.bathrooms}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-1 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl py-3">
                        <Square className="h-4 w-4 text-pc-blue dark:text-pc-gold" />
                        <span className="text-[10px] font-bold uppercase text-zinc-400">Área</span>
                        <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{Math.round(property.building_area)}m²</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-1 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl py-3">
                        <Car className="h-4 w-4 text-pc-blue dark:text-pc-gold" />
                        <span className="text-[10px] font-bold uppercase text-zinc-400">Vagas</span>
                        <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{property.garages}</span>
                    </div>
                </div>
            </CardContent>

            {/* Footer Section */}
            <CardFooter className="pb-6 px-6 pt-0">
                <Button className="w-full bg-zinc-900 hover:bg-pc-blue text-white transition-all duration-300 border-none font-bold py-6 rounded-2xl group/btn">
                    Conhecer Imóvel
                    <ChevronRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
            </CardFooter>
        </Card>
    );
}
