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

export default function Clients() {
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
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Color
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span>Opções</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Apple MacBook Pro 17"
                                </th>
                                <td className="px-6 py-4">
                                    Silver
                                </td>
                                <td className="px-6 py-4">
                                    Laptop
                                </td>
                                <td className="px-6 py-4"> 
                                    $2999
                                </td>
                                <td className="px-6 py-4 flex gap-2">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        {Edit && <Icon iconNode={Edit}/>}
                                    </a>

                                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">
                                        {Delete && <Icon iconNode={Delete}/>}
                                    </a>
                            
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button >{Expand && <Icon iconNode={Expand}/>}</button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                                            <DialogDescription>
                                                Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password
                                                to confirm you would like to permanently delete your account.
                                            </DialogDescription>
                                            enter your password
                                                to confirm you would like to permanently delete your account.
                                        </DialogContent>
                                    </Dialog>
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Microsoft Surface Pro
                                </th>
                                <td className="px-6 py-4">
                                    White
                                </td>
                                <td className="px-6 py-4">
                                    Laptop PC
                                </td>
                                <td className="px-6 py-4">
                                    $1999
                                </td>
                                <td className="px-6 py-4 flex gap-2">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        {Edit && <Icon iconNode={Edit}/>}
                                    </a>
                                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">
                                        {Delete && <Icon iconNode={Delete}/>}
                                    </a>
                                    <a href="#" className="font-medium hover:underline">
                                        {Expand && <Icon iconNode={Expand}/>}
                                    </a>
                                </td>
                            </tr>
                            <tr className="bg-white dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Magic Mouse 2
                                </th>
                                <td className="px-6 py-4">
                                    Black
                                </td>
                                <td className="px-6 py-4">
                                    Accessories
                                </td>
                                <td className="px-6 py-4">
                                    $99
                                </td>
                                <td className="px-6 py-4 flex gap-2">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        {Edit && <Icon iconNode={Edit}/>}
                                    </a>
                                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">
                                        {Delete && <Icon iconNode={Delete}/>}
                                    </a>
                                    <a href="#" className="font-medium hover:underline">
                                        {Expand && <Icon iconNode={Expand}/>}
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
