import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import IconTooltip from '@/components/ui/icon-tooltip';
import { Status } from '@/components/ui/status';
import { StatusIcon } from '@/components/ui/status-icon';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { ArrowRight, Bath, Bed, Calendar, Car, Delete, Edit, Expand, KeyRound } from 'lucide-react';

interface Region {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
}

interface Property {
    id: number;
    region_id: number;
    type: 'casa' | 'casa (condom.)' | 'sobrado' | 'apartamento' | 'apart. c/ elevad.' | 'terreno' | 'loja' | 'garagem' | 'sala' | 'outros' | null;
    typ: string | null;
    iptu: number;
    contact_name: string | null;
    contact_phone: string | null;
    contact_link: string | null;
    description: string | null;
    price: number;
    land_area: number | null;
    building_area: number | null;
    image: string | null;
    address: string | null;
    rooms: number | null;
    bathrooms: number | null;
    suites: number | null;
    garages: number | null;
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
    acept_pets: boolean | null;
    acessibility: boolean | null;
    obs: string | null;
    user: User;
    region: Region;
}

export default function Properties({ properties }: { properties: Property[] }) {
    return (
        <AppLayout>
            <Head title="Propriedades" />
            <div className="flex h-full min-h-0 flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Imóveis</h1>

                    <Button asChild>
                        <a href={route('properties.create')}>
                            <span className="flex items-center gap-2">
                                <span>Cadastrar</span>
                            </span>
                        </a>
                    </Button>
                </div>
                <div className="relative overflow-x-auto overflow-y-hidden shadow-md sm:rounded-lg">
                    <table className="w-full text-left text-sm text-[#123251] rtl:text-right dark:text-[#B8B8B8]">
                        <thead className="bg-[#D8D8D8] text-xs text-[#123251] uppercase dark:bg-[#123251] dark:text-[#B8B8B8]">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Descrição/Link
                                </th>
                                <th>
                                    <div className="px-6">Tipo</div>
                                </th>
                                <th className="px-6">Preço(R$)</th>
                                <th className="px-6">
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
                                <th scope="col" className="px-6 py-3">
                                    <span>Ações</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {properties.map((property, index) => (
                                <tr
                                    key={property.id}
                                    className={`border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-950 ${
                                        index !== properties.length - 1 ? 'border-b' : ''
                                    }`}
                                >
                                    <th scope="row" className="px-6 py-3 font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                        <a
                                            href={property.contact_link || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-2 font-medium"
                                        >
                                            {property.description || 'Sem descrição'}
                                        </a>
                                    </th>
                                    <td className="px-6">{property.typ ? property.typ.charAt(0).toUpperCase() + property.typ.slice(1) : ' '}</td>
                                    <td className="px-6">
                                        {new Intl.NumberFormat('pt-BR', {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        }).format(property.price)}
                                    </td>
                                    <td className="px-6 text-center">
                                        {property.delivery_key ? new Date(property.delivery_key).toLocaleDateString('pt-BR') : null}
                                    </td>
                                    <td className="px-6 text-center">{property.building_area}</td>
                                    <td className="px-6 text-center">{property.rooms}</td>
                                    <td className="px-6 text-center">{property.suites}</td>
                                    <td className="px-6 text-center">{property.garages}</td>
                                    <td className="px-6 text-center">
                                        <StatusIcon value={property.balcony} />
                                    </td>
                                    <td className="px-6">
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
                                    </td>

                                    <td className="px-6 py-3 align-middle">
                                        <div className="inline-flex items-center gap-2">
                                            <a
                                                href={route('properties.edit', property.id)}
                                                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                            >
                                                {Edit && <Icon iconNode={Edit} />}
                                            </a>

                                            <a
                                                href={route('properties.show', property.id)}
                                                className="font-medium text-red-600 hover:underline dark:text-red-500"
                                            >
                                                {Delete && <Icon iconNode={Delete} />}
                                            </a>

                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <button>{Expand && <Icon iconNode={Expand} />}</button>
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
                                                        <strong>Entrada Parcelada: </strong>
                                                        <Status value={property.installment_payment} />
                                                        <br />
                                                        <strong>INCC/Financ.: </strong>
                                                        <Status value={property.incc_financing} />
                                                        <br />
                                                        <strong>Documentação Inclusa: </strong>
                                                        <Status value={property.documents} />
                                                        <br />
                                                        <strong>Tipo de Acabamento: </strong> {property.finsh_type || 'Não informado'}
                                                        <br />
                                                        <strong>Ar Condicionado: </strong> {property.air_conditioning}
                                                        <br />
                                                        <strong>Jardim: </strong>
                                                        <Status value={property.garden} />
                                                        <br />
                                                        <strong>Piscina: </strong>
                                                        <Status value={property.pool} />
                                                        <br />
                                                        <strong>Varanda: </strong>
                                                        <Status value={property.balcony} />
                                                        <br />
                                                        <strong>Aceita Pets: </strong>
                                                        <Status value={property.acept_pets} />
                                                        <br />
                                                        <strong>Acessibilidade: </strong>
                                                        <Status value={property.acessibility} />
                                                        <br />
                                                        <strong>Observações: </strong> {property.obs || 'Nenhuma'}
                                                    </p>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
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
