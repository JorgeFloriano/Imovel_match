import { Icon } from '@/components/icon';
import IconTooltip from '@/components/ui/icon-tooltip';
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
    // Handle null/undefined values
    const showClientValue = clientValue !== null && clientValue !== undefined;
    const showPropertyValue = propertyValue !== null && propertyValue !== undefined;

    // Determine icon display logic
    if (iconValue === undefined) {
        iconColor = '';
    } else if (iconValue === false) {
        iconColor = 'rounded-md bg-red-200 text-center text-red-800 px-2 py-1';
    } else if (iconValue === true) {
        iconColor = 'rounded-md bg-green-200 text-center text-green-800 px-2 py-1';
    }

    return (
        <tr className="border-b">
            <th className="py-3 pl-3">{iconLabel}</th>
            <th className="py-3 text-center">{showClientValue ? clientValue : null}</th>
            <th className="py-3 text-center">{showPropertyValue ? propertyValue : null}</th>
            <th className="w-1 items-center px-3 py-3">
                {iconValue !== undefined && (
                    <div className={`flex items-center gap-2 ${iconColor}`}>
                        <StatusIcon value={iconValue} />
                    </div>
                )}
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

export default function Dashboard({ matches }: { matches: Array<ClientPropertyProps> }) {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const formatDate = (dateString?: string | null) => {
        return dateString ? new Date(dateString).toLocaleDateString('pt-BR') : null;
    };

    const formatArea = (area?: number | null) => {
        return area ? `${area} m²` : null;
    };

    // First, let's create a helper function to format numeric values
    const formatNumericValue = (value: number | null | undefined) => {
        if (value === null) return null;
        if (value === undefined) return undefined;
        return value === 0 ? '0' : value.toString();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {matches.map((match, index) => (
                        <div key={index} className="relative overflow-hidden rounded-xl border-[1px] border-[#B8B8B8] bg-[#EFEEEC] dark:bg-[#123251]">
                            <div className="flex justify-evenly border-b-[1px] border-[#B8B8B8] p-3 font-bold text-[#123251] dark:text-[#B8B8B8]">
                                <div className="pt-2 text-left">{match.client.name}</div>
                                <div className="text-center">
                                    <img src="/logo_build.png" className="" width={30} alt="Varanda" />
                                </div>
                                <div className="pt-2 text-right">{match.property.description}</div>
                            </div>
                            <table className="w-full text-sm text-[#123251] rtl:text-right dark:text-[#B8B8B8]">
                                <tbody>
                                    <TableRole
                                        iconLabel={
                                            <IconTooltip
                                                iconNode={House && <Icon className="h-6 w-5" iconNode={House} />}
                                                tooltipText="Tipo de imóvel"
                                            />
                                        }
                                        clientValue={match.client.wishe?.type}
                                        propertyValue={match.property.type}
                                        iconValue={match.client.wishe?.type === match.property.type}
                                    />

                                    <TableRole
                                        iconLabel={
                                            <IconTooltip
                                                iconNode={DollarSign && <Icon className="h-6 w-5" iconNode={DollarSign} />}
                                                tooltipText="Renda do cliente / Preço do imóvel"
                                            />
                                        }
                                        clientValue={formatCurrency(match.client.revenue ?? 0)}
                                        propertyValue={formatCurrency(match.property.price)}
                                        iconValue={match.property.range ?? undefined}
                                    />

                                    <TableRole
                                        iconLabel={
                                            <IconTooltip
                                                iconNode={KeyRound && <Icon className="h-6 w-5" iconNode={KeyRound} />}
                                                tooltipText="Provável entrega das chaves"
                                            />
                                        }
                                        clientValue={formatDate(match.client.wishe?.delivery_key ?? '')}
                                        propertyValue={formatDate(match.property?.delivery_key ?? '')}
                                        iconValue={(match.client.wishe?.delivery_key ?? '') >= (match.property?.delivery_key ?? '')}
                                    />

                                    <TableRole
                                        iconLabel={
                                            <IconTooltip
                                                iconNode={Ruler && <Icon className="h-6 w-5" iconNode={Ruler} />}
                                                tooltipText="Tamanho interno do imóvel"
                                            />
                                        }
                                        clientValue={formatArea(match.client.wishe?.building_area)}
                                        propertyValue={formatArea(match.property.building_area)}
                                        iconValue={(match.client.wishe?.building_area ?? 0) <= (match.property.building_area ?? 0)}
                                    />

                                    <TableRole
                                        iconLabel={
                                            <IconTooltip
                                                iconNode={Bed && <Icon className="h-6 w-5" iconNode={Bed} />}
                                                tooltipText="Número de quartos"
                                            />
                                        }
                                        clientValue={formatNumericValue(match.client.wishe?.rooms)}
                                        propertyValue={formatNumericValue(match.property.rooms)}
                                        iconValue={
                                            (match.client.wishe?.rooms ?? null) !== null && (match.property.rooms ?? null) !== null
                                                ? (match.client.wishe?.rooms ?? 0) <= (match.property.rooms ?? 0)
                                                : undefined
                                        }
                                    />

                                    <TableRole
                                        iconLabel={
                                            <IconTooltip
                                                iconNode={Bath && <Icon className="h-6 w-5" iconNode={Bath} />}
                                                tooltipText="Número de suites"
                                            />
                                        }
                                        clientValue={formatNumericValue(match.client.wishe?.suites)}
                                        propertyValue={formatNumericValue(match.property.suites)}
                                        iconValue={
                                            (match.client.wishe?.suites ?? null) !== null && (match.property.suites ?? null) !== null
                                                ? (match.client.wishe?.suites ?? 0) <= (match.property.suites ?? 0)
                                                : undefined
                                        }
                                    />

                                    <TableRole
                                        iconLabel={
                                            <IconTooltip
                                                iconNode={Car && <Icon className="h-6 w-5" iconNode={Car} />}
                                                tooltipText="Vagas de garagem"
                                            />
                                        }
                                        clientValue={formatNumericValue(match.client.wishe?.garages)}
                                        propertyValue={formatNumericValue(match.property.garages)}
                                        iconValue={
                                            (match.client.wishe?.garages ?? null) !== null && (match.property.garages ?? null) !== null
                                                ? (match.client.wishe?.garages ?? 0) <= (match.property.garages ?? 0)
                                                : undefined
                                        }
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
                                        clientValue={Status({ value: match.client.wishe?.balcony })?.props.children}
                                        propertyValue={Status({ value: match.property?.balcony })?.props.children}
                                        iconValue={match.client.wishe?.balcony === match.property.balcony}
                                    />

                                    <tr className="overflow-hidden border-b">
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
                                            <div className={`flex items-center gap-2 ${match.property.region_bool_c}`}>
                                                <StatusIcon value={match.property.region_bool ?? undefined} />
                                            </div>
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
