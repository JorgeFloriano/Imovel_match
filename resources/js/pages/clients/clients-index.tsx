import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Delete, Edit, Expand, HeartHandshake, House, User } from 'lucide-react';

interface Region {
    id: number;
    name: string;
}

interface Wishe {
    id: number;
    client_id: number;
    region_id: number | null;
    region: Region | null;
    rooms: number | null;
    bathrooms: number | null;
    suites: number | null;
    garages: number | null;
    delivery_key: string | null;
    building_area: number | null;
    installment_payment: boolean;
    air_conditioning: 'incluso' | 'somente infra' | 'não incluso';
    garden: boolean | null;
    pool: boolean | null;
    balcony: boolean | null;
    acept_pets: boolean | null;
    acessibility: boolean | null;
    obs: string | null;
}

interface Client {
    id: number;
    name: string;
    phone: string;
    email: string;
    address: string;
    marital_status: string;
    need_financing: boolean;
    dependents: number;
    profession: string;
    revenue: number;
    capital: number;
    fgts: number;
    has_property: boolean;
    compromised_income: number;
    wishe: Wishe | null;
}

export default function Clients({ clients }: { clients: Client[] }) {
    return (
        <AppLayout>
            <Head title="Clientes" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Clientes</h1>

                    {/* Button to call route 'clients.create' */}
                    <Button asChild>
                        <a href={route('clients.create')}>
                            <span className="flex items-center gap-2">
                                <span>Cadastrar</span>
                            </span>
                        </a>
                    </Button>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-left text-sm text-[#123251] rtl:text-right dark:text-[#B8B8B8]">
                        <thead className="bg-[#D8D8D8] text-xs text-[#123251] uppercase dark:bg-[#123251] dark:text-[#B8B8B8]">
                            <tr>
                                <th className="px-6 py-3 align-middle text-[#BF9447]">
                                    <div className="inline-flex items-center gap-2">
                                        {User && <Icon iconNode={User} />}
                                        {HeartHandshake && <Icon iconNode={HeartHandshake} />}
                                        {House && <Icon iconNode={House} />}
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Profissão
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Renda
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tel./Whatsapp
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span>Ações</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((client) => (
                                <tr key={client.id} className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-950">
                                    <th scope="row" className="px-6 py-3 font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                        <a
                                            href={route('clients.properties', client.id)}
                                            className="font-medium  hover:underline"
                                        >
                                            {client.name}
                                        </a>
                                    </th>
                                    <td className="px-6 py-3">{client.profession}</td>
                                    <td className="px-6 py-3">
                                        {new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL',
                                        }).format(client.revenue)}
                                    </td>
                                    <td className="px-6 py-3">{client.phone}</td>

                                    <td className="px-6 py-3 align-middle">
                                        <div className="inline-flex items-center gap-2">
                                            <a
                                                href={route('clients.edit', client.id)}
                                                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                            >
                                                {Edit && <Icon iconNode={Edit} />}
                                            </a>

                                            <a
                                                href={route('clients.show', client.id)}
                                                className="font-medium text-red-600 hover:underline dark:text-red-500"
                                            >
                                                {Delete && <Icon iconNode={Delete} />}
                                            </a>

                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <button>{Expand && <Icon iconNode={Expand} />}</button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogTitle>{client.name}</DialogTitle>
                                                    <p>
                                                        <strong>Telefone: </strong> {client.phone}
                                                        <br />
                                                        <strong>Email: </strong> {client.email}
                                                        <br />
                                                        <strong>Endereço: </strong> {client.address}
                                                        <br />
                                                        <strong>Estado Civil: </strong> {client.marital_status}
                                                        <br />
                                                        <strong>Precisa de Financiamento: </strong> {client.need_financing ? 'Sim' : 'Não'}
                                                        <br />
                                                        <strong>Número de Dependentes: </strong> {client.dependents}
                                                        <br />
                                                        <strong>Profissão: </strong> {client.profession}
                                                        <br />
                                                        <strong>Renda (R$): </strong> {client.revenue}
                                                        <br />
                                                        <strong>Capital Disponível(R$): </strong> {client.capital}
                                                        <br />
                                                        <strong>FGTS (R$): </strong> {client.fgts}
                                                        <br />
                                                        <strong>Possúi Propriedade: </strong> {client.has_property ? 'Sim' : 'Não'}
                                                        <br />
                                                        <strong>Renda Comprometida (%): </strong> {client.compromised_income}
                                                        <br />
                                                    </p>

                                                    {client.wishe && (
                                                        <div className="mt-4">
                                                            <h2 className="pb-3 text-lg font-semibold">Caracteristicas do imóvel desejado:</h2>
                                                            <p>
                                                                <strong>Localização:</strong> {client.wishe?.region?.name || 'Não especificado'}
                                                                <br />
                                                                <strong>Número de Quartos: </strong> {client.wishe.rooms || 'Não especificado'}
                                                                <br />
                                                                <strong>Banheiros: </strong> {client.wishe.bathrooms || 'Não especificado'}
                                                                <br />
                                                                <strong>Suítes: </strong> {client.wishe.suites || 'Não especificado'}
                                                                <br />
                                                                <strong>Vagas de Garagem: </strong> {client.wishe.garages || 'Não especificado'}
                                                                <br />
                                                                <strong>Data prevista de Entrega: </strong>
                                                                {client.wishe?.delivery_key
                                                                    ? new Date(client.wishe.delivery_key).toLocaleDateString('pt-BR')
                                                                    : 'Não especificada'}
                                                                <br />
                                                                <strong>Área construída: </strong> {client.wishe.building_area || 'Não especificado'}
                                                                <br />
                                                                <strong>Entrada Parcelada: </strong>{' '}
                                                                {client.wishe.installment_payment ? 'Sim' : 'Não'}
                                                                <br />
                                                                <strong>Ar Condicionado: </strong> {client.wishe.air_conditioning}
                                                                <br />
                                                                <strong>Jardim: </strong> {client.wishe.garden ? 'Sim' : 'Não'}
                                                                <br />
                                                                <strong>Piscina: </strong> {client.wishe.pool ? 'Sim' : 'Não'}
                                                                <br />
                                                                <strong>Varanda: </strong> {client.wishe.balcony ? 'Sim' : 'Não'}
                                                                <br />
                                                                <strong>Aceita Pets: </strong> {client.wishe.acept_pets ? 'Sim' : 'Não'}
                                                                <br />
                                                                <strong>Acessibilidade: </strong> {client.wishe.acessibility ? 'Sim' : 'Não'}
                                                                <br />
                                                                <strong>Observações: </strong> {client.wishe.obs || 'Nenhuma'}
                                                                <br />
                                                            </p>
                                                        </div>
                                                    )}
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
