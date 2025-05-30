import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import IconTooltip from '@/components/ui/icon-tooltip';
import { Status } from '@/components/ui/status';
import { StatusIcon } from '@/components/ui/status-icon';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { HeartHandshake } from 'lucide-react';

interface TableRoleProps {
    label: string;
    clientValue?: React.ReactNode;
    propertyValue?: React.ReactNode;
    iconValue?: boolean;
    iconColor?: string;
}

const TableRole = ({ label, clientValue, propertyValue, iconValue, iconColor }: TableRoleProps) => {
    if (label === 'Região (s)') {
        console.log({ iconValue, clientValue, propertyValue });
    }
    if ([iconValue, clientValue, propertyValue].some((val) => val == null || val === '')) {
        iconColor = '';
        iconValue = undefined;
    } else if (iconValue === false) {
        iconColor = 'rounded-md bg-red-200 p-1 text-center text-red-800';
    } else if (iconValue === true) {
        iconColor = 'rounded-md bg-green-200 p-1 text-center text-green-800';
    } else {
        iconColor = '';
        iconValue = undefined;
    }
    return (
        <tr className="border-b">
            <th className="px-3 py-3">{label}</th>
            <th className="px-3 py-3 text-center">{clientValue || null}</th>
            <th className="px-3 py-3 text-center">{propertyValue || null}</th>
            <th className="px-3 py-3">
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

export default function ClientProperties({ property, client }: ClientPropertyProps) {
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
        <AppLayout>
            <Head title="Cliente / Imóvel" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="flex gap-3 p-2 text-xl font-semibold">
                        Cliente {HeartHandshake && <Icon className="h-4 w-4 text-[#BF9447]" iconNode={HeartHandshake} />} Imóvel
                    </h1>
                    <div className="flex gap-2">
                        <Button asChild variant="outline">
                            <Link href={route('clients.properties', client.id)}>Voltar</Link>
                        </Button>
                    </div>
                </div>

                <p className="text-sm">Informações do cliente e características do imóvel solicitado / Informaçõe do imóvel selecionado</p>

                <div className="relative overflow-x-auto overflow-y-hidden shadow-md sm:rounded-lg">
                    <table className="w-full text-left text-sm text-[#123251] rtl:text-right dark:text-[#B8B8B8]">
                        <thead className="m-1 bg-[#D8D8D8] text-[#123251] uppercase dark:bg-[#123251] dark:text-[#B8B8B8]">
                            <tr>
                                <th className="px-3 py-3">Referência</th>
                                <th className="px-3 py-3 text-center">Sonho (Cliente)</th>
                                <th className="px-3 py-3 text-center">Realidade (Imóvel)</th>
                                <th className="w-1 px-3 py-3">St.</th>
                            </tr>
                        </thead>
                        <tbody className="border-gray-200 text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-white">
                            <TableRole label="Nome / Descr." clientValue={client.name} propertyValue={property.description} />

                            <TableRole
                                label="Tipo"
                                clientValue={client.wishe?.type}
                                propertyValue={property.type}
                                iconValue={client.wishe?.type === property.type}
                            />

                            <TableRole
                                label="Renda / Preço (R$)"
                                clientValue={formatCurrency(client.revenue ?? 0)}
                                propertyValue={formatCurrency(property.price)}
                                iconValue={property.range ?? undefined}
                            />

                            <TableRole
                                label="Entrega das chaves"
                                clientValue={formatDate(client.wishe?.delivery_key ?? '')}
                                propertyValue={formatDate(property?.delivery_key ?? '')}
                                iconValue={(client.wishe?.delivery_key ?? '') >= (property?.delivery_key ?? '')}
                            />

                            <TableRole
                                label="Área construída"
                                clientValue={formatArea(client.wishe?.building_area)}
                                propertyValue={formatArea(property.building_area)}
                                iconValue={(client.wishe?.building_area ?? 0) <= (property.building_area ?? 0)}
                            />

                            <TableRole
                                label="Número de quartos"
                                clientValue={client.wishe?.rooms}
                                propertyValue={property.rooms}
                                iconValue={(client.wishe?.rooms ?? 0) <= (property.rooms ?? 0)}
                            />

                            <TableRole
                                label="Número de suítes"
                                clientValue={client.wishe?.suites}
                                propertyValue={property.suites}
                                iconValue={(client.wishe?.suites ?? 0) <= (property.suites ?? 0)}
                            />

                            <TableRole
                                label="Vagas de garagem"
                                clientValue={client.wishe?.garages}
                                propertyValue={property.garages}
                                iconValue={(client.wishe?.garages ?? 0) <= (property.garages ?? 0)}
                            />

                            <TableRole
                                label="Possúi varanda?"
                                clientValue={Status({ value: client.wishe?.balcony })?.props.children}
                                propertyValue={Status({ value: property?.balcony })?.props.children}
                                iconValue={client.wishe?.balcony === property.balcony}
                            />

                            <tr className="border-b">
                                <th className="px-3 py-3">Região (s)</th>
                                <th className="px-3 py-3 text-center">
                                    {client.wishe?.regions_descr ? (
                                        <IconTooltip
                                            tooltipClassName="right-full"
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

                            <TableRole
                                label="Número de banheiros"
                                clientValue={client.wishe?.bathrooms}
                                propertyValue={property.bathrooms}
                                iconValue={(client.wishe?.bathrooms ?? 0) <= (property.bathrooms ?? 0)}
                            />

                            <TableRole
                                label="Ar condicionado"
                                clientValue={client.wishe?.air_conditioning}
                                propertyValue={property.air_conditioning}
                                iconValue={client.wishe?.air_conditioning === property.air_conditioning}
                            />

                            <TableRole
                                label="Possúi quintal?"
                                clientValue={Status({ value: client.wishe?.garden })?.props.children}
                                propertyValue={Status({ value: property?.garden })?.props.children}
                                iconValue={client.wishe?.garden === property.garden}
                            />

                            <TableRole
                                label="Possúi piscina?"
                                clientValue={Status({ value: client.wishe?.pool })?.props.children}
                                propertyValue={Status({ value: property?.pool })?.props.children}
                                iconValue={client.wishe?.pool === property.pool}
                            />

                            <TableRole
                                label="Aceita pets?"
                                clientValue={Status({ value: client.wishe?.acept_pets })?.props.children}
                                propertyValue={Status({ value: property?.acept_pets })?.props.children}
                                iconValue={client.wishe?.acept_pets === property.acept_pets}
                            />

                            <TableRole
                                label="Acessibilidade?"
                                clientValue={Status({ value: client.wishe?.acessibility })?.props.children}
                                propertyValue={Status({ value: property?.acessibility })?.props.children}
                                iconValue={client.wishe?.acessibility === property.acessibility}
                            />

                            <TableRole
                                label="Parcela a entrada?"
                                clientValue={Status({ value: client.wishe?.installment_payment })?.props.children}
                                propertyValue={Status({ value: property?.installment_payment })?.props.children}
                                iconValue={client.wishe?.installment_payment === property.installment_payment}
                            />

                            <TableRole
                                label="Ato mínimo (R$)"
                                clientValue={formatCurrency(client.wishe?.min_act as number)}
                                propertyValue={formatCurrency(property.min_act as number)}
                                iconValue={(client.wishe?.min_act ?? 0) >= (property.min_act ?? 0)}
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
