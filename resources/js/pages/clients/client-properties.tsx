import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import IconTooltip from '@/components/ui/icon-tooltip';
import { StatusIcon } from '@/components/ui/status-icon';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Bath, Bed, Car, HeartHandshake } from 'lucide-react';

interface ClientPropertiesProps {
    regionOptions: string[];
    typeOptions: string[];
    districtOptions: { value: string; label: string }[];
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
        };
    };
    properties: {
        id: number;
        district_id: number;
        type: 'casa' | 'casa (condom.)' | 'sobrado' | 'apartamento' | 'apart. c/ elevad.' | 'terreno' | 'loja' | 'garagem' | 'sala' | 'outros' | null;
        typ: string | null;
        typ_c: string | null;
        iptu: number;
        contact_name: string | null;
        contact_phone: string | null;
        contact_link: string | null;
        description: string | null;
        price: number;
        range_c: string;
        land_area: number | null;
        building_area: number | null;
        image: string | null;
        address: string | null;
        rooms: number | null;
        rooms_c: string;
        bathrooms: number | null;
        bathrooms_c: string;
        suites: number | null;
        suites_c: string;
        garages: number | null;
        garages_c: string;
        floor: number | null;
        building_floors: number | null;
        property_floors: number | null;
        delivery_key: string | null;
        min_act: number | null;
        installment_payment: boolean;
        incc_financing: boolean | null;
        documents: boolean | null;
        finsh_type: string | null;
        air_conditioning: 'incluso' | 'somente infra' | 'não incluso';
        garden: boolean | null;
        pool: boolean | null;
        balcony: boolean | null;
        balcony_c: string;
        acept_pets: boolean | null;
        acessibility: boolean | null;
        obs: string | null;
        user: User;
        district: District;
    };
}

interface Region {
    id: number;
    name: string;
}

interface District {
    id: number;
    name: string;
    region_id: number;
    region: Region;
}

interface User {
    id: number;
    name: string;
}

export default function ClientProperties({ properties, client }: ClientPropertiesProps) {
    return (
        <AppLayout>
            <Head title="Propriedades" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="flex text-xl font-semibold">Cliente {HeartHandshake && <Icon iconNode={HeartHandshake} />} Imóveis</h1>

                    <Button asChild>
                        <a href={route('properties.create')}>
                            <span className="flex items-center gap-2">
                                <span>Cliente Imóveis</span>
                            </span>
                        </a>
                    </Button>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                        <thead className="m-1 bg-blue-50 text-gray-700 uppercase dark:bg-gray-800 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Nome do Cliente
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className="px-2 py-1">Tipo</div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Renda(R$)
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <IconTooltip iconNode={Bed && <Icon className="inline" iconNode={Bed} />} tooltipText="Quartos" />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <IconTooltip iconNode={Bath && <Icon className="inline" iconNode={Bath} />} tooltipText="Suítes" />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <IconTooltip iconNode={Car && <Icon className="inline" iconNode={Car} />} tooltipText="Vagas" />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <IconTooltip
                                        iconNode={<img src="/balcony.png" className="inline" width={16} alt="Varanda" />}
                                        tooltipText="Varanda"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className="px-2 py-1">Região</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-200 dark:border-gray-700 dark:bg-gray-950">
                                <th scope="row" className="px-6 py-3 font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                    {client.name}
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                    <div className="px-2 py-1">{client.wishe?.typ}</div>
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                    <div className="px-2 py-1">{client.revenue}</div>
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                    <div className="p-1 text-center">{client.wishe?.rooms}</div>
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                    <div className="p-1 text-center">{client.wishe?.suites}</div>
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                    <div className="p-1 text-center">{client.wishe?.garages}</div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-center font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                    <StatusIcon value={client.wishe?.balcony} />
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                    <div className="px-2 py-1">{client.wishe?.region?.name}</div>
                                </th>
                            </tr>

                            <tr className="m-1 bg-blue-50 text-gray-700 uppercase dark:bg-gray-800 dark:text-gray-400">
                                <th scope="col" className="px-6 py-3">
                                    Descr. Imóvel
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className="px-2 py-1">Tipo</div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Preço(R$)
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <IconTooltip iconNode={Bed && <Icon className="inline" iconNode={Bed} />} tooltipText="Quartos" />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <IconTooltip iconNode={Bath && <Icon className="inline" iconNode={Bath} />} tooltipText="Suítes" />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <IconTooltip iconNode={Car && <Icon className="inline" iconNode={Car} />} tooltipText="Vagas" />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <IconTooltip
                                        iconNode={<img src="/balcony.png" className="inline" width={16} alt="Varanda" />}
                                        tooltipText="Varanda"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className="px-2 py-1">Região</div>
                                </th>
                            </tr>

                            {Array.isArray(properties) &&
                                properties.map((property) => (
                                    <tr key={property.id} className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-950">
                                        <th scope="row" className="px-6 py-3 font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                            <div className="inline-flex items-center gap-2">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <button>{property.description || 'Sem descrição'}</button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogTitle>{property.description || 'Imóvel sem descrição'}</DialogTitle>
                                                        <p>
                                                            <strong>Nome do Contato: </strong> {property.contact_name || 'Sem contato'} <br />
                                                            <strong>Tel./Whatsapp: </strong> {property.contact_phone || 'Sem contato'} <br />
                                                            <strong>IPTU: </strong>
                                                            {new Intl.NumberFormat('pt-BR', {
                                                                style: 'currency',
                                                                currency: 'BRL',
                                                            }).format(property.iptu)}
                                                            <br />
                                                            <strong>Área do Terreno (m²): </strong> {property.land_area || 'Não informado'}
                                                            <br />
                                                            <strong>Área Construída (m²): </strong> {property.building_area || 'Não informado'}
                                                            <br />
                                                            <strong>Banheiros: </strong> {property.bathrooms || 'Não informado'}
                                                            <br />
                                                            <strong>Suítes: </strong> {property.suites || 'Não informado'}
                                                            <br />
                                                            <strong>Vagas de Garagem: </strong> {property.garages || 'Não informado'}
                                                            <br />
                                                            <strong>Andar: </strong> {property.floor || 'Não informado'}
                                                            <br />
                                                            <strong>Andares do Prédio: </strong> {property.building_floors || 'Não informado'}
                                                            <br />
                                                            <strong>Andares da Propriedade: </strong> {property.property_floors || 'Não informado'}
                                                            <br />
                                                            <strong>Data de Entrega: </strong>
                                                            {property.delivery_key
                                                                ? new Date(property.delivery_key).toLocaleDateString('pt-BR')
                                                                : 'Não informada'}
                                                            <br />
                                                            <strong>Ato Mínimo: </strong> {property.min_act || 'Não informado'}
                                                            <br />
                                                            <strong>Entrada Parcelada: </strong> {property.installment_payment ? 'Sim' : 'Não'}
                                                            <br />
                                                            <strong>INCC/Financ.: </strong> {property.incc_financing ? 'Sim' : 'Não'}
                                                            <br />
                                                            <strong>Documentação Inclusa: </strong> {property.documents ? 'Sim' : 'Não'}
                                                            <br />
                                                            <strong>Tipo de Acabamento: </strong> {property.finsh_type || 'Não informado'}
                                                            <br />
                                                            <strong>Ar Condicionado: </strong> {property.air_conditioning}
                                                            <br />
                                                            <strong>Jardim: </strong> {property.garden ? 'Sim' : 'Não'}
                                                            <br />
                                                            <strong>Piscina: </strong> {property.pool ? 'Sim' : 'Não'}
                                                            <br />
                                                            <strong>Varanda: </strong> {property.balcony ? 'Sim' : 'Não'}
                                                            <br />
                                                            <strong>Aceita Pets: </strong> {property.acept_pets ? 'Sim' : 'Não'}
                                                            <br />
                                                            <strong>Acessibilidade: </strong> {property.acessibility ? 'Sim' : 'Não'}
                                                            <br />
                                                            <strong>Observações: </strong> {property.obs || 'Nenhuma'}
                                                        </p>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </th>
                                        <td className="px-6 py-3">
                                            <div className={property.typ_c}>
                                                {property.typ ? property.typ.charAt(0).toUpperCase() + property.typ.slice(1) : ' '}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className={property.range_c}>
                                                {new Intl.NumberFormat('pt-BR', {
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0,
                                                }).format(property.price)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className={property.rooms_c}>{property.rooms}</div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className={property.suites_c}>{property.suites}</div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className={property.garages_c}>{property.garages}</div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className={property.balcony_c}>
                                                <StatusIcon value={property.balcony} />
                                            </div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className={property.region_c}>{property.district.region.name}</div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
