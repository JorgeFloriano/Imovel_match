import { Icon } from '@/components/icon';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Bath, Bed, Car, DollarSign, House, KeyRound, Ruler, MapPin } from 'lucide-react';
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
    iconNode?: React.ReactNode;
}

const AtribIcon = ({ iconValue, iconColor, iconNode }: AtribIconProps) => {
    // Determine icon display logic
    if (iconValue == undefined || iconValue === null) {
        iconColor = 'rounded-md text-center px-2 py-1 border-1 border-[#BF9447] bg-[#EFEEEC]';
    } else if (iconValue === false) {
        iconColor = 'rounded-md bg-red-200 text-center border-1 border-red-800 px-2 py-1';
    } else if (iconValue === true) {
        iconColor = 'rounded-md bg-green-200 text-center border-1 border-green-800 px-2 py-1';
    }

    return (
        <div className="py-3">
            {iconValue !== undefined && (
                <div className={`flex w-8 h-8 items-center justify-center ${iconColor}`}>{iconNode && <span className="inline">{iconNode}</span>}</div>
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
    region_bool: boolean | null;
    region_bool_c: string;
    range: boolean | null;
}

export default function Dashboard({ matches }: { matches: Array<ClientPropertyProps> }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {matches.map((match, index) => (
                        <a href={route('clients.property', [match.client.id, match.property.id])}>
                            <div
                                key={index}
                                className="relative overflow-hidden rounded-xl border-[1px] border-[#B8B8B8] bg-[#EFEEEC] dark:bg-[#123251]"
                            >
                                <div className="flex justify-evenly border-b-[1px] border-[#B8B8B8] p-3 font-bold text-[#123251] dark:text-[#B8B8B8]">
                                    <div className="pt-2 text-left">{match.client.name}</div>
                                    <div className="text-center">
                                        <img src="/logo_build.png" className="" width={30} alt="Varanda" />
                                    </div>
                                    <div className="pt-2 text-right">{match.property.description}</div>
                                </div>
                                <div className="px-4 justify-between flex w-full text-sm text-[#123251] rtl:text-right">
                                    <AtribIcon
                                        iconNode={House && <Icon className="h-6 w-5" iconNode={House} />}
                                        iconValue={match.client.wishe?.type == match.property.type}
                                    />

                                    <AtribIcon
                                        iconNode={DollarSign && <Icon className="h-6 w-5" iconNode={DollarSign} />}
                                        iconValue={match.range}
                                    />

                                    <AtribIcon
                                        iconNode={KeyRound && <Icon className="h-6 w-5" iconNode={KeyRound} />}
                                        iconValue={(match.client.wishe?.delivery_key ?? '') >= (match.property?.delivery_key ?? '')}
                                    />

                                    <AtribIcon
                                        iconNode={Ruler && <Icon className="h-6 w-5" iconNode={Ruler} />}
                                        iconValue={(match.client.wishe?.building_area ?? 0) <= (match.property.building_area ?? 0)}
                                    />

                                    <AtribIcon
                                        iconNode={Bed && <Icon className="h-6 w-5" iconNode={Bed} />}
                                        iconValue={
                                            (match.client.wishe?.rooms ?? null) !== null && (match.property.rooms ?? null) !== null
                                                ? (match.client.wishe?.rooms ?? 0) <= (match.property.rooms ?? 0)
                                                : undefined
                                        }
                                    />

                                    <AtribIcon
                                        iconNode={Bath && <Icon className="h-6 w-5" iconNode={Bath} />}
                                        iconValue={
                                            (match.client.wishe?.suites ?? null) !== null && (match.property.suites ?? null) !== null
                                                ? (match.client.wishe?.suites ?? 0) <= (match.property.suites ?? 0)
                                                : undefined
                                        }
                                    />

                                    <AtribIcon
                                        iconNode={Car && <Icon className="h-6 w-5" iconNode={Car} />}
                                        iconValue={
                                            (match.client.wishe?.garages ?? null) !== null && (match.property.garages ?? null) !== null
                                                ? (match.client.wishe?.garages ?? 0) <= (match.property.garages ?? 0)
                                                : undefined
                                        }
                                    />

                                    <AtribIcon
                                        iconNode={
                                            <>
                                                <img src="/balcony.png" className="h-5" alt="Varanda" />
                                            </>
                                        }
                                        iconValue={match.client.wishe?.balcony === match.property.balcony}
                                    />

                                    <AtribIcon
                                        iconNode={MapPin && <Icon className="h-6 w-5" iconNode={MapPin} />}
                                        iconValue={match.region_bool}
                                    />

                                    {/* <tr className="overflow-hidden">
                                            <th className="px-3 py-3">
                                                {
                                                    <IconTooltip
                                                        iconNode={MapPin && <Icon className="h-6 w-5" iconNode={MapPin} />}
                                                        containerClassName="flex"
                                                        tooltipClassName="bottom-full"
                                                        iconClassName="inline"
                                                        tooltipText="Região"
                                                    />
                                                }
                                            </th>
                                            <th className="px-3 py-3">
                                                {match.client.wishe?.regions_descr ? (
                                                    <IconTooltip
                                                        tooltipClassName="bottom-full"
                                                        iconClassName="inline"
                                                        iconNode={match.client.wishe?.regions_msg}
                                                        tooltipText={match.client.wishe?.regions_descr}
                                                    />
                                                ) : (
                                                    match.client.wishe?.regions_msg
                                                )}
                                            </th>
                                            <th className="px-3 py-3 text-center">
                                                {match.property.address ? (
                                                    <IconTooltip
                                                        tooltipClassName="right-full"
                                                        iconClassName="inline"
                                                        iconNode={match.property.region?.name}
                                                        tooltipText={match.property.address}
                                                    />
                                                ) : (
                                                    match.property.region?.name
                                                )}
                                            </th>
                                            <th className="px-3 py-3">
                                                <div className={`flex items-center gap-2 ${match.region_bool_c}`}>
                                                    <StatusIcon value={match.region_bool} />
                                                </div>
                                            </th>
                                        </tr> */}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
