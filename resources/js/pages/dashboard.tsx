import { Icon } from '@/components/icon';
import IconTooltip from '@/components/ui/icon-tooltip';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Status } from '@/components/ui/status';
import { StatusIcon } from '@/components/ui/status-icon';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Bath, Bed, Car, DollarSign, House, KeyRound, MapPin, Ruler } from 'lucide-react';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface TableRoleProps {
    iconLabel?: React.ReactNode;
    clientValue?: React.ReactNode;
    propertyValue?: React.ReactNode;
    iconValue?: boolean;
    iconColor?: string;
}

const TableRole = ({ iconLabel, clientValue, propertyValue, iconValue, iconColor }: TableRoleProps) => {
    if ([iconValue, clientValue, propertyValue].some((val) => val == null || val === '')) {
        iconColor = '';
        iconValue = undefined;
    } else if (iconValue === false) {
        iconColor = 'rounded-md bg-red-200 text-center text-red-800 px-2 py-1';
    } else if (iconValue === true) {
        iconColor = 'rounded-md bg-green-200 text-center text-green-800 px-2 py-1';
    } else {
        iconColor = '';
        iconValue = undefined;
    }
    return (
        <tr className="border-b">
            <th className="py-3 pl-3">{iconLabel}</th>
            <th className="py-3 text-center">{clientValue || null}</th>
            <th className="py-3 text-center">{propertyValue || null}</th>
            <th className="w-1 items-center px-3 py-3">
                <div className={`flex items-center gap-2 ${iconColor}`}>
                    <StatusIcon value={iconValue} />
                </div>
            </th>
        </tr>
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
        range: boolean | null;
        region_bool: boolean | null;
        region_bool_c: string;
    };
}

export default function Dashboard({ property, client }: ClientPropertyProps) {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    {
        new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(client.revenue || 0);
    }

    const formatDate = (dateString?: string | null) => {
        return dateString ? new Date(dateString).toLocaleDateString('pt-BR') : null;
    };

    const formatArea = (area?: number | null) => {
        return area ? `${area} m²` : null;
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative overflow-hidden rounded-xl border-[1px] border-[#B8B8B8] bg-[#EFEEEC] dark:bg-[#123251]">
                        <div className="flex justify-evenly border-b-[1px] border-[#B8B8B8] p-3">
                            <div className="pt-2 text-left">{client.name}</div>
                            <div className="text-center">
                                <img src="/logo_build.png" className="" width={30} alt="Varanda" />
                            </div>
                            <div className="pt-2 text-right">{property.description}</div>
                        </div>
                        <table className="w-full text-sm text-[#123251] rtl:text-right dark:text-[#B8B8B8]">
                            <tbody>
                                <TableRole
                                    iconLabel={
                                        <IconTooltip iconNode={House && <Icon className="h-6 w-5" iconNode={House} />} tooltipText="Tipo de imóvel" />
                                    }
                                    clientValue={client.wishe?.type}
                                    propertyValue={property.type}
                                    iconValue={client.wishe?.type === property.type}
                                />

                                <TableRole
                                    iconLabel={
                                        <IconTooltip
                                            iconNode={DollarSign && <Icon className="h-6 w-5" iconNode={DollarSign} />}
                                            tooltipText="Renda do cliente / Preço do imóvel"
                                        />
                                    }
                                    clientValue={formatCurrency(client.revenue ?? 0)}
                                    propertyValue={formatCurrency(property.price)}
                                    iconValue={property.range ?? undefined}
                                />

                                <TableRole
                                    iconLabel={
                                        <IconTooltip
                                            iconNode={KeyRound && <Icon className="h-6 w-5" iconNode={KeyRound} />}
                                            tooltipText="Provável entrega das chaves"
                                        />
                                    }
                                    clientValue={formatDate(client.wishe?.delivery_key ?? '')}
                                    propertyValue={formatDate(property?.delivery_key ?? '')}
                                    iconValue={(client.wishe?.delivery_key ?? '') >= (property?.delivery_key ?? '')}
                                />

                                <TableRole
                                    iconLabel={
                                        <IconTooltip
                                            iconNode={Ruler && <Icon className="h-6 w-5" iconNode={Ruler} />}
                                            tooltipText="Tamanho interno do imóvel"
                                        />
                                    }
                                    clientValue={formatArea(client.wishe?.building_area)}
                                    propertyValue={formatArea(property.building_area)}
                                    iconValue={(client.wishe?.building_area ?? 0) <= (property.building_area ?? 0)}
                                />

                                <TableRole
                                    iconLabel={
                                        <IconTooltip iconNode={Bed && <Icon className="h-6 w-5" iconNode={Bed} />} tooltipText="Número de quartos" />
                                    }
                                    clientValue={client.wishe?.rooms}
                                    propertyValue={property.rooms}
                                    iconValue={(client.wishe?.rooms ?? 0) <= (property.rooms ?? 0)}
                                />

                                <TableRole
                                    iconLabel={
                                        <IconTooltip iconNode={Bath && <Icon className="h-6 w-5" iconNode={Bath} />} tooltipText="Número de suites" />
                                    }
                                    clientValue={client.wishe?.suites}
                                    propertyValue={property.suites}
                                    iconValue={(client.wishe?.suites ?? 0) <= (property.suites ?? 0)}
                                />

                                <TableRole
                                    iconLabel={
                                        <IconTooltip iconNode={Car && <Icon className="h-6 w-5" iconNode={Car} />} tooltipText="Vagas de garagem" />
                                    }
                                    clientValue={client.wishe?.garages}
                                    propertyValue={property.garages}
                                    iconValue={(client.wishe?.garages ?? 0) <= (property.garages ?? 0)}
                                />

                                <TableRole
                                    iconLabel={
                                        <IconTooltip
                                            iconNode={
                                                <>
                                                    <img src="/balcony.png" className="dark:hidden" width={20} alt="Varanda" />
                                                    <img src="/balcony_dark.png" className="hidden dark:block" width={20} alt="Varanda" />
                                                </>
                                            }
                                            tooltipText="Possúi varanda"
                                        />
                                    }
                                    clientValue={Status({ value: client.wishe?.balcony })?.props.children}
                                    propertyValue={Status({ value: property?.balcony })?.props.children}
                                    iconValue={client.wishe?.balcony === property.balcony}
                                />

                                <tr className="border-b">
                                    <th className="px-3 py-3">
                                        {
                                            <IconTooltip
                                                iconNode={MapPin && <Icon className="h-6 w-5" iconNode={MapPin} />}
                                                containerClassName='flex'
                                                tooltipClassName="left-full"
                                                iconClassName="inline"
                                                tooltipText="Região"
                                            />
                                        }
                                    </th>
                                    <th className="px-3 py-3">
                                        {client.wishe?.regions_descr ? (
                                            <IconTooltip
                                                iconClassName="inline"
                                                iconNode={client.wishe?.regions_msg}
                                                tooltipText={client.wishe?.regions_descr}
                                            />
                                        ) : (
                                            client.wishe?.regions_msg
                                        )}
                                    </th>
                                    <th className="px-3 py-3 text-center">
                                        {property.address ? (
                                            <IconTooltip
                                                tooltipClassName="right-full"
                                                iconClassName="inline"
                                                iconNode={property.region?.name}
                                                tooltipText={property.address}
                                            />
                                        ) : (
                                            property.region?.name
                                        )}
                                    </th>
                                    <th className="px-3 py-3">
                                        <div className={`flex items-center gap-2 ${property.region_bool_c}`}>
                                            <StatusIcon value={property.region_bool ?? undefined} />
                                        </div>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="relative overflow-hidden rounded-xl border-[1px] border-[#B8B8B8] bg-[#EFEEEC] dark:bg-[#123251]">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative overflow-hidden rounded-xl border-[1px] border-[#B8B8B8] bg-[#EFEEEC] dark:bg-[#123251]">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border-[1px] border-[#B8B8B8] bg-[#EFEEEC] dark:bg-[#123251]">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
