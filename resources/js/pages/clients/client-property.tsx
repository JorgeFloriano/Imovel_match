import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import IconTooltip from '@/components/ui/icon-tooltip';
import { Status } from '@/components/ui/status';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { HeartHandshake } from 'lucide-react';

interface TableRoleProps {
  label: string;
  clientValue?: React.ReactNode;
  propertyValue?: React.ReactNode;
}

const TableRole = ({ label, clientValue, propertyValue }: TableRoleProps) => {
  return (
    <tr className="border-b">
      <th className="px-3 py-3">{label}</th>
      <th className="px-3 py-3">{clientValue || ' '}</th>
      <th className="px-3 py-3">{propertyValue || ' '}</th>
    </tr>
  );
};

interface ClientPropertyProps {
    client: {
        id: number;
        name: string;
        revenue: number;
        wishe?: {
            regions_msg?: string;
            regions_descr?: string;
            type?: string;
            rooms?: number;
            suites?: number;
            garages?: number;
            balcony?: boolean;
            building_area?: number;
            delivery_key?: string;
            bathrooms?: number;
            installment_payment?: boolean;
            air_conditioning?: string;
            garden?: boolean;
            pool?: boolean;
            acept_pets?: boolean;
            acessibility?: boolean;
            min_act?: number;
            obs?: string;
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
        acept_pets: boolean | null;
        acessibility: boolean | null;
        obs: string | null;
    };
}

export default function ClientProperties({ property, client }: ClientPropertyProps) {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    const formatDate = (dateString?: string | null) => {
        return dateString ? new Date(dateString).toLocaleDateString('pt-BR') : ' ';
    };

    const formatArea = (area?: number | null) => {
        return area ? `${area} m²` : ' ';
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
                                <th className="px-6 py-3">Referência</th>
                                <th className="px-6 py-3">Sonho (Cliente)</th>
                                <th className="px-6 py-3">Realidade (Imóvel)</th>
                            </tr>
                        </thead>
                        <tbody className="border-gray-200 text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-white">
                            <TableRole 
                                label="Nome / Descr." 
                                clientValue={client.name} 
                                propertyValue={property.description} 
                            />

                            <TableRole 
                                label="Tipo" 
                                clientValue={client.wishe?.type} 
                                propertyValue={property.type} 
                            />

                            <TableRole 
                                label="Renda / Preço" 
                                clientValue={formatCurrency(client.revenue)} 
                                propertyValue={formatCurrency(property.price)} 
                            />

                            <TableRole 
                                label="Entrega das chaves" 
                                clientValue={formatDate(client.wishe?.delivery_key)} 
                                propertyValue={formatDate(property.delivery_key)} 
                            />

                            <TableRole 
                                label="Área construída" 
                                clientValue={formatArea(client.wishe?.building_area)} 
                                propertyValue={formatArea(property.building_area)} 
                            />

                            <TableRole 
                                label="Número de quartos" 
                                clientValue={client.wishe?.rooms} 
                                propertyValue={property.rooms} 
                            />

                            <TableRole 
                                label="Número de suítes" 
                                clientValue={client.wishe?.suites} 
                                propertyValue={property.suites} 
                            />

                            <TableRole 
                                label="Vagas de garagem" 
                                clientValue={client.wishe?.garages} 
                                propertyValue={property.garages} 
                            />

                            <TableRole 
                                label="Possúi varanda?" 
                                clientValue={<Status value={client.wishe?.balcony} />} 
                                propertyValue={<Status value={property.balcony} />} 
                            />

                            <TableRole 
                                label="Região (s)" 
                                clientValue={
                                    client.wishe?.regions_descr ? (
                                        <IconTooltip
                                            iconNode={client.wishe?.regions_msg}
                                            tooltipClassName="right-full"
                                            iconClassName="inline"
                                            tooltipText={client.wishe?.regions_descr as string}
                                        />
                                    ) : (
                                        client.wishe?.regions_msg
                                    )
                                } 
                                propertyValue={
                                    property.address ? (
                                        <IconTooltip
                                            tooltipClassName="right-full"
                                            iconClassName="inline"
                                            iconNode={property.region?.name}
                                            tooltipText={property.address}
                                        />
                                    ) : (
                                        property.region?.name
                                    )
                                } 
                            />

                            <TableRole 
                                label="Número de banheiros" 
                                clientValue={client.wishe?.bathrooms} 
                                propertyValue={property.bathrooms} 
                            />

                            <TableRole 
                                label="Ar condicionado" 
                                clientValue={client.wishe?.air_conditioning} 
                                propertyValue={property.air_conditioning} 
                            />

                            <TableRole 
                                label="Possúi quintal?" 
                                clientValue={<Status value={client.wishe?.garden} />} 
                                propertyValue={<Status value={property.garden} />} 
                            />

                            <TableRole 
                                label="Possúi piscina?" 
                                clientValue={<Status value={client.wishe?.pool} />} 
                                propertyValue={<Status value={property.pool} />} 
                            />

                            <TableRole 
                                label="Aceita pets?" 
                                clientValue={<Status value={client.wishe?.acept_pets} />} 
                                propertyValue={<Status value={property.acept_pets} />} 
                            />

                            <TableRole 
                                label="Acessibilidade?" 
                                clientValue={<Status value={client.wishe?.acessibility} />} 
                                propertyValue={<Status value={property.acessibility} />} 
                            />

                            <TableRole 
                                label="Parcela a entrada?" 
                                clientValue={<Status value={client.wishe?.installment_payment} />} 
                                propertyValue={<Status value={property.installment_payment} />} 
                            />

                            <TableRole 
                                label="Ato mínimo" 
                                clientValue={formatCurrency(client.wishe?.min_act as number)} 
                                propertyValue={formatCurrency(property.min_act as number)} 
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}