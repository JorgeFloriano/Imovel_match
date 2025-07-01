import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import IconTooltip from '@/components/ui/icon-tooltip';
import { Status } from '@/components/ui/status';
import { StatusIcon } from '@/components/ui/status-icon';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { HeartHandshake } from 'lucide-react';

interface TableRoleProps {
    label: string;
    clientValue?: React.ReactNode;
    propertyValue?: React.ReactNode;
    iconValue?: boolean | null | undefined;
    iconColor?: string;
}

const TableRole = ({ label, clientValue, propertyValue, iconValue, iconColor }: TableRoleProps) => {
    if (iconValue === undefined || iconValue ===null) {
        iconColor = 'bg-transparent text-transparent border-transparent';
        iconValue = undefined;
    } else if (iconValue === false) {
        iconColor = 'bg-red-200 text-red-800 border-red-800';
    } else if (iconValue === true) {
        iconColor = 'bg-green-200 text-green-800 border-green-800';
    } else {
        iconColor = '';
        iconValue = undefined;
    }
    return (
        <tr className="border-b">
            <th className="p-3">{label}</th>
            <th className="p-3 text-center">{clientValue || null}</th>
            <th className="p-3 text-center">{propertyValue || null}</th>
            <th className="p-3 text-center">
                <div className={`w-8 flex items-center p-1 justify-center rounded-md border-1 ${iconColor}`}>
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
        region_bool_c: string;
    };
    match: {
        type: boolean | null;
        range: boolean | null;
        delivery_key: boolean | null;
        building_area: boolean | null;
        rooms: boolean | null;
        suites: boolean | null;
        garages: boolean | null;
        balcony: boolean | null;
        region: boolean | null;
        bathrooms: boolean | null;
        air_conditioning: boolean | null;
        garden: boolean | null;
        pool: boolean | null;
        acept_pets: boolean | null;
        acessibility: boolean | null;
        installment_payment: boolean | null;
        min_act: boolean | null;
    }
}

export default function ClientProperties({ property, client, match }: ClientPropertyProps) {
    // This function formats the currency
    const formatCurrency = (value: number | null | undefined | string) => {
    // Convert string to number if it's a numeric string
    const numericValue = typeof value === 'string' ? Number(value) : value;
    
    // Check if the value is exactly 0 (not null/undefined/empty string/negative)
    if (numericValue === 0) {
        return new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(0);
    }
    
    // Return empty string for all other cases
    if (numericValue === null || 
        numericValue === undefined || 
        isNaN(numericValue) || 
        numericValue < 0) {
        return null;
    }
    
    // Format positive numbers
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(numericValue);
};

    const formatDate = (dateString?: string | null) => {
        return dateString ? new Date(dateString).toLocaleDateString('pt-BR') : null;
    };

    const formatArea = (area?: number | null) => {
        return area ? `${area} m²` : null;
    };

    return (
        <AppLayout>
            <Head title="Cliente / Imóvel" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="flex gap-3 p-2 text-xl font-semibold">
                        Cliente {HeartHandshake && <Icon className="h-4 w-4 text-[#BF9447]" iconNode={HeartHandshake} />} Imóvel
                    </h1>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => window.history.back()}>
                            Voltar
                        </Button>
                    </div>
                </div>
 
                <p className="text-sm">Informações do cliente e características do imóvel solicitado / Informaçõe do imóvel selecionado</p>

                <div className="relative overflow-x-auto overflow-y-hidden shadow-md sm:rounded-lg">
                    <table className="w-full text-left text-sm text-[#123251] rtl:text-right dark:text-[#B8B8B8]">
                        <thead className="m-1 bg-[#D8D8D8] text-[#123251] uppercase dark:bg-[#123251] dark:text-[#B8B8B8]">
                            <tr>
                                <th className="p-3">Referência</th>
                                <th className="p-3 text-center">Sonho (Cliente)</th>
                                <th className="p-3 text-center">Realidade (Imóvel)</th>
                                <th className="w-1 p-2 text-center">St.</th>
                            </tr>
                        </thead>
                        <tbody className="border-gray-200 text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-white">
                            <TableRole label="Nome / Descr." clientValue={client.name} propertyValue={property.description} />

                            <TableRole
                                label="Tipo"
                                clientValue={client.wishe?.type}
                                propertyValue={property.type}
                                iconValue={match.type}
                            />

                            <TableRole
                                label="Renda / Preço (R$)"
                                clientValue={formatCurrency(client.revenue)}
                                propertyValue={formatCurrency(property.price)}
                                iconValue={match.range}
                            />

                            <TableRole
                                label="Entrega das chaves"
                                clientValue={formatDate(client.wishe?.delivery_key ?? '')}
                                propertyValue={formatDate(property?.delivery_key ?? '')}
                                iconValue={match.delivery_key}
                            />

                            <TableRole
                                label="Área construída"
                                clientValue={formatArea(client.wishe?.building_area)}
                                propertyValue={formatArea(property.building_area)}
                                iconValue={match.building_area}
                            />

                            <TableRole
                                label="Número de quartos"
                                clientValue={formatCurrency(client.wishe?.rooms)}
                                propertyValue={formatCurrency(property.rooms)}
                                iconValue={match.rooms}
                            />

                            <TableRole
                                label="Número de suítes"
                                clientValue={formatCurrency(client.wishe?.suites)}
                                propertyValue={formatCurrency(property.suites)}
                                iconValue={match.suites}
                            />

                            <TableRole
                                label="Vagas de garagem"
                                clientValue={formatCurrency(client.wishe?.garages)}
                                propertyValue={formatCurrency(property.garages)}
                                iconValue={match.garages}
                            />

                            <TableRole
                                label="Possúi varanda?"
                                clientValue={Status({ value: client.wishe?.balcony })?.props.children}
                                propertyValue={Status({ value: property?.balcony })?.props.children}
                                iconValue={match.balcony}
                            />

                            <tr className="border-b">
                                <th className="p-3">Região (s)</th>
                                <th className="p-3 text-center">
                                    {client.wishe?.regions_descr || null}
                                </th>
                                <th className="p-3 text-center">
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
                                <th className="p-3 text-center">
                                    <div className={`w-8 ${property.region_bool_c}`}>
                                        <StatusIcon value={match?.region} />
                                    </div>
                                </th>
                            </tr>

                            <TableRole
                                label="Número de banheiros"
                                clientValue={formatCurrency(client.wishe?.bathrooms)}
                                propertyValue={formatCurrency(property.bathrooms)}
                                iconValue={match.bathrooms}
                            />

                            <TableRole
                                label="Ar condicionado"
                                clientValue={client.wishe?.air_conditioning}
                                propertyValue={property.air_conditioning}
                                iconValue={match.air_conditioning}
                            />

                            <TableRole
                                label="Possúi quintal?"
                                clientValue={Status({ value: client.wishe?.garden })?.props.children}
                                propertyValue={Status({ value: property?.garden })?.props.children}
                                iconValue={match.garden}
                            />

                            <TableRole
                                label="Possúi piscina?"
                                clientValue={Status({ value: client.wishe?.pool })?.props.children}
                                propertyValue={Status({ value: property?.pool })?.props.children}
                                iconValue={match.pool}
                            />

                            <TableRole
                                label="Aceita pets?"
                                clientValue={Status({ value: client.wishe?.acept_pets })?.props.children}
                                propertyValue={Status({ value: property?.acept_pets })?.props.children}
                                iconValue={match.acept_pets}
                            />

                            <TableRole
                                label="Acessibilidade?"
                                clientValue={Status({ value: client.wishe?.acessibility })?.props.children}
                                propertyValue={Status({ value: property?.acessibility })?.props.children}
                                iconValue={match.acessibility}
                            />

                            <TableRole
                                label="Parcela a entrada?"
                                clientValue={Status({ value: client.wishe?.installment_payment })?.props.children}
                                propertyValue={Status({ value: property?.installment_payment })?.props.children}
                                iconValue={match.installment_payment}
                            />

                            <TableRole
                                label="Ato mínimo (R$)"
                                clientValue={formatCurrency(client.wishe?.min_act)}
                                propertyValue={formatCurrency(property.min_act)}
                                iconValue={match.min_act}
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
