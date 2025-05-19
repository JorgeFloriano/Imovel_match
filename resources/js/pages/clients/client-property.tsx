import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import IconTooltip from '@/components/ui/icon-tooltip';
import { StatusIcon } from '@/components/ui/status-icon';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Bath, Bed, Calendar, Car, HeartHandshake, KeyRound } from 'lucide-react';

interface ClientPropertyProps {
    client: {
        id: number;
        name: string;
        revenue: number;
        wishe?: {
            region?: {
                name: string;
            };
            typ?: string;
            rooms?: number;
            suites?: number;
            garages?: number;
            balcony?: boolean;
            building_area?: number;
            delivery_key?: string;
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
        delivery_key: string | null;
        delivery_key_c: string;
        region: {
            id: number;
            name: string;
        };
        region_c: string;
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
    };
}

export default function ClientProperties({ property, client }: ClientPropertyProps) {
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

                <p className="text-sm">
                    Informações do cliente e características do imóvel solicitado / Imóveis disponíveis ordenados por compatibilidade com o cliente
                </p> 

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-left text-sm text-[#123251] rtl:text-right dark:text-[#B8B8B8]">
                        <thead className="m-1 bg-[#D8D8D8] text-[#123251] uppercase dark:bg-[#123251] dark:text-[#B8B8B8]">
                            <tr>
                                <th className="px-6 py-3">Nome do Cliente</th>
                                <th>
                                    <div className="px-6">Tipo</div>
                                </th>
                                <th className="px-6">Renda(R$)</th>
                                <th>
                                    <IconTooltip
                                        iconNode={
                                            <div className="inline-flex gap-2">
                                                {Calendar && <Icon className="inline h-4 w-4" iconNode={Calendar} />}
                                                {ArrowRight && <Icon className="inline h-4 w-4" iconNode={ArrowRight} />}
                                                {KeyRound && <Icon className="inline h-4 w-4" iconNode={KeyRound} />}
                                            </div>
                                        }
                                        tooltipText="Previsão de entrega das chaves"
                                    />
                                </th>
                                <th className="text-center">
                                    <IconTooltip iconNode="M²" tooltipText="Área construída" />
                                </th>
                                <th>
                                    <IconTooltip iconNode={Bed && <Icon className="inline h-4 w-4" iconNode={Bed} />} tooltipText="Quartos" />
                                </th>
                                <th>
                                    <IconTooltip iconNode={Bath && <Icon className="inline h-4 w-4" iconNode={Bath} />} tooltipText="Suítes" />
                                </th>
                                <th>
                                    <IconTooltip iconNode={Car && <Icon className="inline h-4 w-4" iconNode={Car} />} tooltipText="Vagas" />
                                </th>
                                <th>
                                    <IconTooltip
                                        iconNode={
                                            <>
                                                <img src="/balcony.png" className="inline dark:hidden" width={16} alt="Varanda" />
                                                <img src="/balcony_dark.png" className="hidden dark:inline" width={16} alt="Varanda" />
                                            </>
                                        }
                                        tooltipText="Varanda"
                                    />
                                </th>
                                <th>
                                    <div className="px-6">Região</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-200 font-medium text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-white">
                                <th className="px-6 py-3">{client.name}</th>
                                <th className="px-6">
                                    <div className="px-2 py-1">{client.wishe?.typ}</div>
                                </th>
                                <th className="px-6">
                                    <div className="px-2">
                                        {new Intl.NumberFormat('pt-BR', {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        }).format(client.revenue)}
                                    </div>
                                </th>
                                <th className="px-6">
                                    <div className="py-1 text-center">
                                        {new Date(client.wishe?.delivery_key as string).toLocaleDateString('pt-BR')}
                                    </div>
                                </th>
                                <th className="px-6">
                                    <div className="p-1 text-center">{client.wishe?.building_area}</div>
                                </th>
                                <th className="px-6">
                                    <div className="p-1 text-center">{client.wishe?.rooms}</div>
                                </th>
                                <th className="px-6">
                                    <div className="p-1 text-center">{client.wishe?.suites}</div>
                                </th>
                                <th className="px-6">
                                    <div className="p-1 text-center">{client.wishe?.garages}</div>
                                </th>
                                <th className="px-6 text-center">
                                    <StatusIcon value={client.wishe?.balcony} />
                                </th>
                                <th className="px-6">
                                    <div className="px-2 py-1">{client.wishe?.region?.name}</div>
                                </th>
                            </tr>

                            <tr className="m-1 bg-[#D8D8D8] text-[#123251] uppercase dark:bg-[#123251] dark:text-[#B8B8B8]">
                                <th className="px-6 py-3">Descr. do imóvel</th>
                                <th>
                                    <div className="px-6">Tipo</div>
                                </th>
                                <th className="px-6">Preço(R$)</th>
                                <th>
                                    <IconTooltip
                                        iconNode={
                                            <div className="inline-flex gap-2">
                                                {Calendar && <Icon className="inline h-4 w-4" iconNode={Calendar} />}
                                                {ArrowRight && <Icon className="inline h-4 w-4" iconNode={ArrowRight} />}
                                                {KeyRound && <Icon className="inline h-4 w-4" iconNode={KeyRound} />}
                                            </div>
                                        }
                                        tooltipText="Previsão de entrega das chaves"
                                    />
                                </th>
                                <th className="text-center">
                                    <IconTooltip iconNode="M²" tooltipText="Área construída" />
                                </th>
                                <th>
                                    <IconTooltip iconNode={Bed && <Icon className="inline h-4 w-4" iconNode={Bed} />} tooltipText="Quartos" />
                                </th>
                                <th>
                                    <IconTooltip iconNode={Bath && <Icon className="inline h-4 w-4" iconNode={Bath} />} tooltipText="Suítes" />
                                </th>
                                <th>
                                    <IconTooltip iconNode={Car && <Icon className="inline h-4 w-4" iconNode={Car} />} tooltipText="Vagas" />
                                </th>
                                <th>
                                    <IconTooltip
                                        iconNode={
                                            <>
                                                <img src="/balcony.png" className="inline dark:hidden" width={16} alt="Varanda" />
                                                <img src="/balcony_dark.png" className="hidden dark:inline" width={16} alt="Varanda" />
                                            </>
                                        }
                                        tooltipText="Varanda"
                                    />
                                </th>
                                <th>
                                    <div className="px-6">Região</div>
                                </th>
                            </tr>

                            <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-950">
                                <th scope="row" className="px-6 py-3 font-medium text-gray-900 dark:text-white">
                                    <div className="inline-flex items-center gap-2">{property.description}</div>
                                </th>
                                <td className="px-6 py-3">
                                    <div className={property.typ_c}>
                                        {property.typ ? property.typ.charAt(0).toUpperCase() + property.typ.slice(1) : ' '}
                                    </div>
                                </td>
                                <td className="px-6">
                                    <div className={property.range_c}>
                                        {new Intl.NumberFormat('pt-BR', {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        }).format(property.price)}
                                    </div>
                                </td>
                                <td className="px-6">
                                    <div className={property.delivery_key_c}>
                                        {new Date(property.delivery_key as string).toLocaleDateString('pt-BR')}
                                    </div>
                                </td>
                                <td className="px-6">
                                    <div className={property.building_area_c}>{property.building_area}</div>
                                </td>
                                <td className="px-6">
                                    <div className={property.rooms_c}>{property.rooms}</div>
                                </td>
                                <td className="px-6">
                                    <div className={property.suites_c}>{property.suites}</div>
                                </td>
                                <td className="px-6">
                                    <div className={property.garages_c}>{property.garages}</div>
                                </td>
                                <td className="px-6">
                                    <div className={property.balcony_c}>
                                        <StatusIcon value={property.balcony} />
                                    </div>
                                </td>
                                <td className="px-6">
                                    <div className={property.region_c}>
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
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
