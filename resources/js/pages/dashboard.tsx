import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Bath, Bed, Car, DollarSign, House, KeyRound, LucideIcon, MapPin, Ruler } from 'lucide-react';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export const BalconyIcon = ({ className = '' }: { className?: string }) => (
    <img src="/balcony.png" width={300} className={`${className}`} alt="Balcony" />
);

interface AtribIconProps {
    iconValue?: boolean | null | undefined;
    iconClass?: string;
    icon?: LucideIcon | React.ComponentType<{ className?: string }>;
}

const AtribIcon = ({ iconValue, iconClass, icon }: AtribIconProps) => {
    // Determine icon display logic
    if (iconValue === undefined || iconValue === null) {
        iconClass = 'bg-[#EFEEEC] border-[#BF9447]';
    } else if (iconValue === false) {
        iconClass = 'bg-red-200 border-red-500';
    } else if (iconValue === true) {
        iconClass = 'bg-green-200 border-green-500';
    }

    return (
        <div className="w-8">
            {iconValue !== undefined && (
                <div className={`flex items-center justify-center rounded-md border-1 p-1 text-[#123251] ${iconClass}`}>
                    {icon && (
                        <span className="inline">
                            {'$$typeof' in icon ? <Icon className="h-5 w-5" iconNode={icon} /> : React.createElement(icon, { className: 'h-5 w-5' })}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

interface ClientPropertyProps {
    client_id: number;
    client_name: string;
    property_id: number;
    property_description: string;
    pts: number;
    id: number;
    type: boolean | null;
    range: boolean | null;
    delivery_key: boolean | null;
    building_area: boolean | null;
    rooms: boolean | null;
    suites: boolean | null;
    garages: boolean | null;
    balcony: boolean | null;
    region: boolean | null;
}

export default function Dashboard({ matches }: { matches: Array<ClientPropertyProps> }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col rounded-xl p-3">
                <div className="flex gap-3 py-3 font-bold">
                    <div className="flex items-center">Cliente com potencial de compra</div>
                    <div>
                        <img src="/logo_build.png" width={30} alt="Build" />
                    </div>
                    <div className="flex items-center">Imóvel</div>
                    <div className="ml-auto flex items-center space-x-2">
                        <div className="relative flex items-center space-x-1">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="size-10 rounded-full p-1">
                                        <div className="size-8 overflow-hidden rounded-full relative flex shrink-0">
                                            <div className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white  flex size-full items-center justify-center">inf</div>
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-100 p-3" align="end">
                                    <p className='mb-5'>
                                        Icones <span className="text-green-500">VERDES</span> representam que determinada característica do imóvel está de acordo com a espectativa do cliente, <span className="text-red-500">VERMELHOS</span> representa característica incompatível com a espectativa do cliente
                                    </p>
                                    <ul>
                                        <li className="flex items-center mt-3">
                                            <AtribIcon icon={House} iconValue={null} /><div className="ml-2"> - Tipo de imóvel (casa, apartamento, etc...)</div>
                                        </li>
                                        <li className="flex items-center mt-3">
                                            <AtribIcon icon={DollarSign} iconValue={null} /><div className="ml-2"> - Faixa (progr. minha casa minha vida)</div>
                                        </li>
                                        <li className='flex items-center mt-3'>
                                            <AtribIcon icon={KeyRound} iconValue={null} /><div className="ml-2"> - Provável data de entrega das chaves</div>
                                        </li>
                                        <li className='flex items-center mt-3'>
                                            <AtribIcon icon={Ruler} iconValue={null} /><div className="ml-2"> - Area interna do imóvel</div>
                                        </li>
                                        <li className='flex items-center mt-3'>
                                            <AtribIcon icon={Bed} iconValue={null} /><div className="ml-2"> - Número de Quartos</div>
                                        </li>
                                        <li className='flex items-center mt-3'>
                                            <AtribIcon icon={Bath} iconValue={null} /><div className="ml-2"> - Número de Banheiros</div>
                                        </li>
                                        <li className='flex items-center mt-3'>
                                            <AtribIcon icon={Car} iconValue={null} /><div className="ml-2"> - Número de Garagens</div>
                                        </li>
                                        <li className='flex items-center mt-3'>
                                            <AtribIcon icon={BalconyIcon} iconValue={null} /><div className="ml-2"> - Com ou Sem varanda</div>
                                        </li>
                                        <li className="flex items-center mt-3">
                                            <AtribIcon icon={MapPin} iconValue={null} /><div className="ml-2"> - Região da cidade</div>
                                        </li>
                                        <p className="mt-5">
                                            * Clique na conexão cliente / imóvel desejada para ver mais detalhes.
                                        </p>
                                    </ul>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {matches.map((match) => (
                        <a
                            key={match.id}
                            href={route('clients.property', [match.client_id, match.property_id])}
                            className="transition-transform duration-200 hover:scale-[1.02]"
                        >
                            <div
                                key={match.id}
                                className="overflow-hidden rounded-xl border-[1px] border-[#B8B8B8] bg-[#EFEEEC] text-[#123251] shadow-md transition-all duration-400 hover:border-[#BF9447] hover:text-[#BF9447] dark:bg-[#123251] dark:text-[#EFEEEC] hover:dark:text-[#BF9447] py-3"
                            >
                                <div className="flex justify-evenly p-3 font-bold">
                                    <div className="flex items-center">
                                        {match.pts} - {match.client_name}
                                    </div>
                                    <div>
                                        <img src="/logo_build.png" width={30} alt="Build" />
                                    </div>
                                    <div className="flex items-center">{match.property_description}</div>
                                </div>
                                <div className="flex justify-between px-3">
                                    <AtribIcon icon={House} iconValue={match.type} />
                                    <AtribIcon icon={DollarSign} iconValue={match.range} />
                                    <AtribIcon icon={KeyRound} iconValue={match.delivery_key} />
                                    <AtribIcon icon={Ruler} iconValue={match.building_area} />
                                    <AtribIcon icon={Bed} iconValue={match.rooms} />
                                    <AtribIcon icon={Bath} iconValue={match.suites} />
                                    <AtribIcon icon={Car} iconValue={match.garages} />
                                    <AtribIcon icon={BalconyIcon} iconValue={match.balcony} />
                                    <AtribIcon icon={MapPin} iconValue={match.region} />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
