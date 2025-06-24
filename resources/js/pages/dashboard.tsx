import { Icon } from '@/components/icon';
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

export const BalconyIcon = (
    { className = '' }: { className?: string }
) => <img src="/balcony.png" width={300} className={`${className}`} alt="Balcony" />;

interface AtribIconProps {
    iconValue?: boolean | null | undefined;
    iconColor?: string;
    icon?: LucideIcon | React.ComponentType<{ className?: string }>;
}

const AtribIcon = ({ iconValue, iconColor, icon }: AtribIconProps) => {
    // Determine icon display logic
    if (iconValue === undefined || iconValue === null) {
        iconColor = 'bg-[#EFEEEC] border-[#BF9447]';
    } else if (iconValue === false) {
        iconColor = 'bg-red-200 border-red-800';
    } else if (iconValue === true) {
        iconColor = 'bg-green-200 border-green-800';
    }

    return (
        <div className="py-3">
            {iconValue !== undefined && (
                <div className={`flex p-1 items-center justify-center rounded-md border-1 ${iconColor}`}>
                    {icon && (
                        <span className="inline">
                            {'$$typeof' in icon ? 
                            <Icon className="h-5 w-5" iconNode={icon} /> : 
                            React.createElement(icon, { className: 'h-5 w-5' })}
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
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {matches.map((match) => (
                        <a
                            key={match.id}
                            href={route('clients.property', [match.client_id, match.property_id])}
                            className="transition-transform duration-200 hover:scale-[1.02]"
                        >
                            <div
                                key={match.id}
                                className="overflow-hidden rounded-xl border-[1px] border-[#B8B8B8] bg-[#EFEEEC] text-[#123251] shadow-md transition-all duration-400 hover:border-[#BF9447] hover:text-[#BF9447] dark:bg-[#123251] dark:text-[#EFEEEC] hover:dark:text-[#BF9447]"
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
                                <div className="flex justify-between px-3 text-[#123251]">
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
