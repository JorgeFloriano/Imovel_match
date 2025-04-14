import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Delete, Edit, Expand } from 'lucide-react';

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

interface Property {
    id: number;
    district_id: number;
    type: 'casa' | 'casa (condom.)' | 'sobrado' | 'apartamento' | 'apart. c/ elevad.' | 'terreno' | 'loja' | 'garagem' | 'sala' | 'outros' | null;
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
    district: District;
}

export default function Properties({ properties }: { properties: Property[] }) {
    return (
        <AppLayout>
            <Head title="Propriedades" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
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
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                        <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-800 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Descrição/Link
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tipo
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Preço
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Quartos
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Bairro
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Região
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span>Ações</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {properties.map((property) => (
                                <tr key={property.id} className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-950">
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                        <a
                                            href={property.contact_link || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-2 font-medium"
                                        >
                                            {property.description || 'Sem descrição'}
                                        </a>
                                    </th>
                                    <td className="px-6 py-4">
                                        {property.type ? property.type.charAt(0).toUpperCase() + property.type.slice(1) : 'Não especificado'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL',
                                        }).format(property.price)}
                                    </td>
                                    <td className="px-6 py-4">{property.rooms}</td>
                                    <td className="px-6 py-4">{property.district.name}</td>
                                    <td className="px-6 py-4">{property.district.region.name}</td>

                                    <td className="flex gap-2 px-6 py-4">
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
