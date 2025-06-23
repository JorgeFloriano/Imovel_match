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

export const BalconyIcon = ({ className = '' }: { className?: string }) => <img src="/balcony.png" className={` ${className}`} alt="Balcony" />;

interface AtribIconProps {
    iconValue?: boolean | null | undefined;
    iconColor?: string;
    icon?: LucideIcon | React.ComponentType<{ className?: string }>;
}

const AtribIcon = ({ iconValue, iconColor, icon }: AtribIconProps) => {
    // Determine icon display logic
    if (iconValue === undefined || iconValue === null) {
        iconColor = 'rounded-md text-center px-2 py-1 border-1 border-[#BF9447] bg-[#EFEEEC]';
    } else if (iconValue === false) {
        iconColor = 'rounded-md bg-red-200 text-center border-1 border-red-800 px-2 py-1';
    } else if (iconValue === true) {
        iconColor = 'rounded-md bg-green-200 text-center border-1 border-green-800 px-2 py-1';
    }

    return (
        <div className="py-3">
            {iconValue !== undefined && (
                <div className={`flex h-8 w-8 items-center justify-center ${iconColor}`}>
                    {icon && (
                        <span className="inline">
                            {'$$typeof' in icon ? <Icon className="h-5 w-5" iconNode={icon} /> : React.createElement(icon, { className: 'h-4 w-5' })}
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
            <div className="flex h-full flex-1 flex-col gap-3 rounded-xl p-3">
                <div className="grid auto-rows-min gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {matches.map((match) => (
                        <a key={match.id} href={route('clients.property', [match.client_id, match.property_id])}>
                            <div
                                key={match.id}
                                className="relative overflow-hidden rounded-xl border-[1px] border-[#B8B8B8] bg-[#EFEEEC] dark:bg-[#123251]"
                            >
                                <div className="flex justify-evenly border-b-[1px] border-[#B8B8B8] p-3 font-bold text-[#123251] dark:text-[#EFEEEC]">
                                    <div className="pt-2 text-left">
                                        {match.pts} - {match.client_name}
                                    </div>
                                    <div className="text-center">
                                        <img src="/logo_build.png" className="" width={30} alt="Varanda" />
                                    </div>
                                    <div className="pt-2 text-right">{match.property_description}</div>
                                </div>
                                <div className="flex w-full justify-between px-4 text-sm text-[#123251] rtl:text-right">
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
