import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import { Delete, Edit, Expand } from 'lucide-react';

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clientes',
        href: '/clients',
    },
];

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
  }

export default function Clients({ clients }: { clients: Client[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
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
                    <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                        <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Nome
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Profissão
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Renda (R$)
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Telefone
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span>Ações</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((client) => (
                                <tr key={client.id} className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                        {client.name}
                                    </th>
                                    <td className="px-6 py-4">{client.profession}</td>
                                    <td className="px-6 py-4">{client.revenue}</td>
                                    <td className="px-6 py-4">{client.phone}</td>

                                    <td className="flex gap-2 px-6 py-4">
                                        <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                                            {Edit && <Icon iconNode={Edit} />}
                                        </a>

                                        <a href="#" className="font-medium text-red-600 hover:underline dark:text-red-500">
                                            {Delete && <Icon iconNode={Delete} />}
                                        </a>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button>{Expand && <Icon iconNode={Expand} />}</button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogTitle>{client.name}</DialogTitle>
                                                <p>
                                                    <strong>Telefone: </strong> {client.phone}<br/>
                                                    <strong>Email: </strong> {client.email}<br/>
                                                    <strong>Endereço: </strong> {client.address}<br/>
                                                    <strong>Estado Civil: </strong> {client.marital_status}<br/>
                                                    <strong>Precisa de Financiamento: </strong> {client.need_financing ? 'Sim' : 'Não'}<br/>
                                                    <strong>Número de Dependentes: </strong> {client.dependents}<br/>
                                                    <strong>Profissão: </strong> {client.profession}<br/>
                                                    <strong>Renda (R$): </strong> {client.revenue}<br/>
                                                    <strong>Capital Disponível(R$): </strong> {client.capital}<br/>
                                                    <strong>FGTS (R$): </strong> {client.fgts}<br/>
                                                    <strong>Possúi Propriedade: </strong> {client.has_property ? 'Sim' : 'Não'}<br/>
                                                    <strong>Renda Comprometida (R$): </strong> {client.compromised_income}<br/>
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
