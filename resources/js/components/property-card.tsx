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
    address: string;
    obs?: string;
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
    
    // Curated list of high-quality real estate images to differentiate properties without photos
    const fallbackImages = [
        '1564013799919-ab600027ffc6', // Classic Modern House
        '1570129477492-45c003edd2be', // Modern Villa
        '1512917774080-9991f1c4c750', // Luxury Home
        //'1600585154340-be61912e3318', // Contemporary Exterior
        '1600596542815-ffad4c1539a9', // Minimalist House
        '1600607687920-4e2a09cf159d', // Glass House
        //'1600566753190-17f0bcd2a6d4', // Suburban Home
        //'1600585154542-630846657151', // Modern Mansion
    ];
    const photoId = fallbackImages[property.id % fallbackImages.length];
    const dynamicFallback = `https://images.unsplash.com/photo-${photoId}?q=80&w=1200`;

    return (
        <Card className="group flex flex-col h-full overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-500 rounded-3xl bg-white dark:bg-zinc-900 p-0">
            {/* Image Section */}
            <div className="relative h-52 overflow-hidden">
                <img
                    src={property.image || dynamicFallback}
                    alt={property.type}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute top-4 left-4">
                    <Badge className="bg-pc-blue/90 text-white hover:bg-pc-blue font-bold border-none shadow-lg px-4 py-1 rounded-full text-[10px]">
                        {formatType(property.type)}
                    </Badge>
                </div>
            </div>

            {/* Content Section */}
            <CardContent className="flex-1 pt-4 px-5 pb-5">
                <h3 className="text-zinc-900 dark:text-white font-bold text-base mb-1.5 line-clamp-1">
                    {property.description}
                </h3>

                <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 mb-2 text-[14px] font-semibold tracking-tight">
                    <MapPin className="h-3.5 w-3.5 text-pc-gold" />
                    <span className="line-clamp-1">
                        {property.district?.name ? ` ${property.district.name}` : ` ${property.address}`}
                    </span>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 text-[14px] leading-relaxed line-clamp-2 mb-4 min-h-[2.5rem]">
                    {property.obs || ''}
                </p>

                <div className="grid grid-cols-4 gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="flex flex-col items-center justify-center gap-1 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl py-2">
                        <Bed className="h-3.5 w-3.5 text-pc-blue dark:text-pc-gold" />
                        <span className="text-[9px] font-bold uppercase text-zinc-400">Dorm.</span>
                        <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{property.rooms}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-1 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl py-2">
                        <Bath className="h-3.5 w-3.5 text-pc-blue dark:text-pc-gold" />
                        <span className="text-[9px] font-bold uppercase text-zinc-400">Banh.</span>
                        <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{property.bathrooms}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-1 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl py-2">
                        <Square className="h-3.5 w-3.5 text-pc-blue dark:text-pc-gold" />
                        <span className="text-[9px] font-bold uppercase text-zinc-400">Área</span>
                        <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{Math.round(property.building_area)}m²</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-1 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl py-2">
                        <Car className="h-3.5 w-3.5 text-pc-blue dark:text-pc-gold" />
                        <span className="text-[9px] font-bold uppercase text-zinc-400">Vagas</span>
                        <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{property.garages}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
