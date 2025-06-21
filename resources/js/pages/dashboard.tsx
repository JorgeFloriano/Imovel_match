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

interface AtribIconProps {
    iconValue?: boolean | null | undefined;
    iconColor?: string;
    icon?: LucideIcon | React.ComponentType<{ className?: string }>;
}

export const BalconyIcon = ({ className = '' }: { className?: string }) => (
    <img src="/balcony.png" className={` ${className}`} alt="Balcony" />
);

const AtribIcon = ({ iconValue, iconColor, icon }: AtribIconProps) => {
    // Determine icon display logic
    if (iconValue == undefined || iconValue == null) {
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
                            {'$$typeof' in icon ? (
                                <Icon className="h-5 w-5" iconNode={icon} />
                            ) : (
                                React.createElement(icon, { className: "h-4 w-5"})
                            )}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

interface ClientPropertyProps {
    client: {
        id: number;
        name: string;
        revenue: number | null;
        wishe?: {
            regions_msg?: string | null;
            regions_descr?: string | null;
            type?: string | null;
            rooms?: number | null;
            suites?: number | null;
            garages?: number | null;
            balcony?: boolean | null;
            building_area?: number | null;
            delivery_key?: string | null;
            bathrooms?: number | null;
            installment_payment?: boolean | null;
            air_conditioning?: string;
            garden?: boolean | null;
            pool?: boolean | null;
            acept_pets?: boolean | null;
            acessibility?: boolean | null;
            min_act?: number | null;
            obs?: string | null;
        };
    };
    property: {
        id: number;
        description: string | null;
        contact_name: string | null;
        contact_phone: string | null;
        contact_link: string | null;
        place_link: string | null;
        region_id?: string;
        type: 'casa' | 'casa (condom.)' | 'sobrado' | 'apartamento' | 'apart. c/ elevad.' | 'terreno' | 'loja' | 'garagem' | 'sala' | 'outros' | null;
        typ: string | null;
        typ_c: string;
        iptu: number;
        price: number;
        range_c: string;
        land_area: number | null;
        building_area: number | null;
        building_area_c: string;
        image: string | null;
        address: string | null;
        rooms: number | null;
        rooms_c: string;
        bathrooms: number | null;
        suites: number | null;
        suites_c: string;
        garages: number | null;
        garages_c: string;
        floor: number | null;
        building_floors: number | null;
        property_floors: number | null;
        delivery_key?: string | null;
        delivery_key_c: string;
        region: {
            id: number;
            name: string;
        };
        min_act: number | null;
        installment_payment: boolean;
        incc_financing: boolean | null;
        documents: boolean | null;
        finsh_type: string | null;
        air_conditioning: 'incluso' | 'somente infra' | 'não incluso' | '';
        garden: boolean | null;
        pool: boolean | null;
        balcony: boolean | null;
        balcony_c: string;
        acept_pets: boolean | null;
        acessibility: boolean | null;
        obs: string | null;
    };
    id: number;
    region_bool: boolean | null;
    range: boolean | null;
    type: boolean | null;
}

export default function Dashboard({ matches }: { matches: Array<ClientPropertyProps> }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {matches.map((match) => (
                        <a key={match.id} href={route('clients.property', [match.client.id, match.property.id])}>
                            <div
                                key={match.id}
                                className="relative overflow-hidden rounded-xl border-[1px] border-[#B8B8B8] bg-[#EFEEEC] dark:bg-[#123251]"
                            >
                                <div className="flex justify-evenly border-b-[1px] border-[#B8B8B8] p-3 font-bold text-[#123251] dark:text-[#EFEEEC]">
                                    <div className="pt-2 text-left">{match.client.name}</div>
                                    <div className="text-center">
                                        <img src="/logo_build.png" className="" width={30} alt="Varanda" />
                                    </div>
                                    <div className="pt-2 text-right">{match.property.description}</div>
                                </div>
                                <div className="flex w-full justify-between px-4 text-sm text-[#123251] rtl:text-right">
                                    <AtribIcon icon={House} iconValue={match.type} />

                                    <AtribIcon icon={DollarSign} iconValue={match.range} />

                                    <AtribIcon
                                        icon={KeyRound}
                                        iconValue={(match.client.wishe?.delivery_key ?? '') >= (match.property?.delivery_key ?? '')}
                                    />

                                    <AtribIcon
                                        icon={Ruler}
                                        iconValue={(match.client.wishe?.building_area ?? 0) <= (match.property.building_area ?? 0)}
                                    />

                                    <AtribIcon
                                        icon={Bed}
                                        iconValue={
                                            (match.client.wishe?.rooms ?? null) !== null && (match.property.rooms ?? null) !== null
                                                ? (match.client.wishe?.rooms ?? 0) <= (match.property.rooms ?? 0)
                                                : undefined
                                        }
                                    />

                                    <AtribIcon
                                        icon={Bath}
                                        iconValue={
                                            (match.client.wishe?.suites ?? null) !== null && (match.property.suites ?? null) !== null
                                                ? (match.client.wishe?.suites ?? 0) <= (match.property.suites ?? 0)
                                                : undefined
                                        }
                                    />

                                    <AtribIcon
                                        icon={Car}
                                        iconValue={
                                            (match.client.wishe?.garages ?? null) !== null && (match.property.garages ?? null) !== null
                                                ? (match.client.wishe?.garages ?? 0) <= (match.property.garages ?? 0)
                                                : undefined
                                        }
                                    />

                                    <AtribIcon icon={BalconyIcon} iconValue={match.client.wishe?.balcony === match.property.balcony} />
                                    <AtribIcon icon={MapPin} iconValue={match.region_bool} />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
