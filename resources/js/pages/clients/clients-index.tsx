import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Status } from '@/components/ui/status';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Delete, Edit, Expand, HeartHandshake, House, User } from 'lucide-react';

interface Wishe {
    id: number;
    client_id: number;
    regions_descr: string;
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

                <p className="py-3 text-sm">
                    Clique no nome do cliente para ver as melhores indicações de imóveis.
                </p>

                <div className="relative overflow-x-auto overflow-y-hidden shadow-md sm:rounded-lg">
                    <table className="h-full w-full text-left text-[#123251] rtl:text-right dark:text-[#B8B8B8]">
                        <thead className="bg-[#D8D8D8] text-xs text-[#123251] uppercase dark:bg-[#123251] dark:text-[#B8B8B8]">
                            <tr>
                                <th className="px-6 py-3 align-middle text-[#BF9447]">
                                    <div className="inline-flex items-center gap-2">
                                        {User && <Icon iconNode={User} />}
                                        {HeartHandshake && <Icon iconNode={HeartHandshake} />}
                                        {House && <Icon iconNode={House} />}
                                    </div>
                                </th>
                                <th scope="col" className="hidden px-6 py-3 md:table-cell">
                                    Profissão
                                </th>
                                <th scope="col" className="hidden px-6 py-3 md:table-cell">
                                    Renda
                                </th>
                                <th scope="col" className="hidden px-6 py-3 md:table-cell">
                                    Tel./Whatsapp
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    <span>Ações</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((client, index) => (
                                <tr
                                    key={client.id}
                                    className={`border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-950 ${
                                        index !== clients.length - 1 ? 'border-b' : ''
                                    }`}
                                >
                                    <th scope="row" className="px-6 py-3 font-medium whitespace-normal text-gray-900 dark:text-white">
                                        <a href={route('clients.properties', client.id)} className="font-medium hover:underline">
                                            {client.name}
                                        </a>
                                    </th>
                                    <td className="hidden px-6 py-3 md:table-cell">{client.profession}</td>
                                    <td className="hidden px-6 py-3 md:table-cell">
                                        {new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL',
                                        }).format(client.revenue)}
                                    </td>
                                    <td className="hidden px-6 py-3 md:table-cell">{client.phone}</td>

                                    <td className="px-6 py-3 text-center align-middle">
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
                                                        <strong>Precisa de Financiamento: </strong>
                                                        <Status value={client.need_financing} />
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
                                                        <strong>Possúi Propriedade: </strong>
                                                        <Status value={client.has_property} />
                                                        <br />
                                                        <strong>Renda Comprometida (%): </strong> {client.compromised_income}
                                                        <br />
                                                    </p>

                                                    {client.wishe && (
                                                        <div className="mt-4">
                                                            <h2 className="pb-3 text-lg font-semibold">Caracteristicas do imóvel desejado:</h2>
                                                            <p>
                                                                <strong>Regiões preferidas:</strong>{' '}
                                                                {client.wishe?.regions_descr || 'Não especificadas'}
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
                                                                <Status value={client.wishe.installment_payment} />
                                                                <br />
                                                                <strong>Ar Condicionado: </strong> {client.wishe.air_conditioning}
                                                                <br />
                                                                <strong>Jardim: </strong>
                                                                <Status value={client.wishe.garden} />
                                                                <br />
                                                                <strong>Piscina: </strong>
                                                                <Status value={client.wishe.pool} />
                                                                <br />
                                                                <strong>Varanda: </strong>
                                                                <Status value={client.wishe.balcony} />
                                                                <br />
                                                                <strong>Aceita Pets: </strong>
                                                                <Status value={client.wishe.acept_pets} />
                                                                <br />
                                                                <strong>Acessibilidade: </strong>
                                                                <Status value={client.wishe.acessibility} />
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
