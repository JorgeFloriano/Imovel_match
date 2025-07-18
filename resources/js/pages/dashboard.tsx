import { FormSelect } from '@/components/form-select';
import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Bath, Bed, Car, DollarSign, House, KeyRound, LucideIcon, MapPin, Ruler } from 'lucide-react';
import React, { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Painel',
        href: '/dashboard',
    },
];

type FilterForm = {
    client_id?: string;
    property_id?: string;
    show?: string;
};

const showOptions = [
    { value: '30', label: '30 conexões' },
    { value: '60', label: '60 conexões' },
    { value: '90', label: '90 conexões' },
    { value: '120', label: '120 conexões' },
];

export const BalconyIcon = ({ className = '' }: { className?: string }) => (
    <img src="/balcony.png" width={300} className={`${className}`} alt="Balcony" />
);

interface AtribIconProps {
    iconValue?: boolean | null | undefined;
    iconClass?: string;
    icon?: React.ComponentType<{ className?: string }> | LucideIcon;
}

const AtribIcon = ({ iconValue, iconClass, icon }: AtribIconProps) => {
    // Determine icon display logic
    let finalIconClass = iconClass;
    let iconToRender = icon;

    if (iconValue === undefined || iconValue === null) {
        finalIconClass = 'bg-[#EFEEEC] border-[#BF9447]';
    } else if (iconValue === false) {
        finalIconClass = 'bg-red-200 border-red-500 text-red-800';
        // If it's the BalconyIcon, use the red version
        if (icon === BalconyIcon) {
            iconToRender = ({ className = '' }) => (
                <img src="/balcony_red.png" width={300} className={`${className}`} alt="Balcony" />
            );
        }
    } else if (iconValue === true) {
        finalIconClass = 'bg-green-200 border-green-500 text-green-800';
        // If it's the BalconyIcon, use the green version
        if (icon === BalconyIcon) {
            iconToRender = ({ className = '' }) => (
                <img src="/balcony_green.png" width={300} className={`${className}`} alt="Balcony" />
            );
        }
    }

    return (
        <div className="w-8">
            {iconValue !== undefined && (
                <div className={`flex items-center justify-center rounded-md border-1 p-1 text-[#123251] ${finalIconClass}`}>
                    {iconToRender && (
                        <span className="inline">
                            {'$$typeof' in iconToRender ? 
                                <Icon className="h-5 w-5" iconNode={iconToRender} /> : 
                                React.createElement(iconToRender, { className: 'h-5 w-5' })
                            }
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

interface ClientPropertyProps {
    client_id: number;
    client_name: string;
    property_id: number;
    property_description: string;
    pts: number;
    id: number;
    type: boolean | null;
    range: boolean | null;
    delivery_key: boolean | null;
    building_area: boolean | null;
    rooms: boolean | null;
    suites: boolean | null;
    garages: boolean | null;
    balcony: boolean | null;
    region: boolean | null;
}
export default function Dashboard({
    matches,
    clientOptions,
    propertyOptions,
}: {
    matches: Array<ClientPropertyProps>;
    clientOptions: Array<{ value: string; label: string }>;
    propertyOptions: Array<{ value: string; label: string }>;
}) {
    const { data, setData, post, errors } = useForm<FilterForm>({
        client_id: undefined,
        property_id: undefined,
        show: '30',
    });

    const handleSetData = (field: keyof FilterForm, value: string | number | undefined | boolean) => {
        setData(field, value?.toString());
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('dashboard.filter'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col rounded-xl p-3">
                <div className="flex gap-3 py-3 font-bold">
                    <div className="flex items-center">Provável comprador</div>
                    <div>
                        <img src="/logo_build.png" width={30} alt="Build" />
                    </div>
                    <div className="flex items-center">Imóvel</div>
                    <div className="ml-auto flex items-center space-x-2">
                        <div className="relative flex items-center space-x-1">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="size-10 rounded-full p-1">
                                        <div className="relative flex size-8 shrink-0 overflow-hidden rounded-full">
                                            <div className="flex size-full items-center justify-center rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                inf
                                            </div>
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-100 p-3" align="end">
                                    <p className="mb-5">
                                        Icones <span className="text-green-500">VERDES</span> representam que determinada característica do imóvel
                                        está de acordo com a espectativa do cliente, <span className="text-red-500">VERMELHOS</span> representa
                                        característica incompatível com a espectativa do cliente
                                    </p>
                                    <ul>
                                        <li className="mt-3 flex items-center">
                                            <AtribIcon icon={House} iconValue={null} />
                                            <div className="ml-2"> - Tipo de imóvel (casa, apartamento, etc...)</div>
                                        </li>
                                        <li className="mt-3 flex items-center">
                                            <AtribIcon icon={DollarSign} iconValue={null} />
                                            <div className="ml-2"> - Faixa (progr. minha casa minha vida)</div>
                                        </li>
                                        <li className="mt-3 flex items-center">
                                            <AtribIcon icon={KeyRound} iconValue={null} />
                                            <div className="ml-2"> - Provável data de entrega das chaves</div>
                                        </li>
                                        <li className="mt-3 flex items-center">
                                            <AtribIcon icon={Ruler} iconValue={null} />
                                            <div className="ml-2"> - Area interna do imóvel</div>
                                        </li>
                                        <li className="mt-3 flex items-center">
                                            <AtribIcon icon={Bed} iconValue={null} />
                                            <div className="ml-2"> - Número de Quartos</div>
                                        </li>
                                        <li className="mt-3 flex items-center">
                                            <AtribIcon icon={Bath} iconValue={null} />
                                            <div className="ml-2"> - Número de Banheiros</div>
                                        </li>
                                        <li className="mt-3 flex items-center">
                                            <AtribIcon icon={Car} iconValue={null} />
                                            <div className="ml-2"> - Número de Garagens</div>
                                        </li>
                                        <li className="mt-3 flex items-center">
                                            <AtribIcon icon={BalconyIcon} iconValue={null} />
                                            <div className="ml-2"> - Com ou Sem varanda</div>
                                        </li>
                                        <li className="mt-3 flex items-center">
                                            <AtribIcon icon={MapPin} iconValue={null} />
                                            <div className="ml-2"> - Região da cidade</div>
                                        </li>
                                        <p className="mt-5">* Clique na conexão cliente / imóvel desejada para ver mais detalhes.</p>
                                    </ul>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
                <form onSubmit={submit} className="space-y-6 pt-4 pb-6">
                    <div className="grid grid-cols-2 items-end gap-4 md:grid-cols-4">
                        <FormSelect
                            label="Cliente"
                            value={data.client_id || '0'}
                            onValueChange={(value) => handleSetData('client_id', value)}
                            customOptions={clientOptions}
                            error={errors.client_id}
                        />

                        <FormSelect
                            label="Imóvel"
                            value={data.property_id || '0'}
                            onValueChange={(value) => handleSetData('property_id', value)}
                            customOptions={propertyOptions}
                            error={errors.property_id}
                        />

                        <FormSelect
                            label="Mostrar"
                            value={data.show || '30'} // Default to '30' if empty
                            onValueChange={(value) => handleSetData('show', value)}
                            customOptions={showOptions}
                            error={errors.show}
                        />

                        <Button type="submit">Exibir Resultados</Button>
                    </div>
                </form>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {matches.map((match) => (
                        <a
                            key={match.id}
                            href={route('dashboard.details', [match.client_id, match.property_id])}
                            className="transition-transform duration-200 hover:scale-[1.02]"
                        >
                            <div
                                key={match.id}
                                className="overflow-hidden rounded-xl border-[1px] border-[#B8B8B8] bg-[#EFEEEC] py-3 text-[#123251] shadow-md transition-all duration-400 hover:border-[#BF9447] hover:text-[#BF9447] dark:bg-[#123251] dark:text-[#EFEEEC] hover:dark:text-[#BF9447]"
                            >
                                <div className="flex justify-evenly p-3 font-bold">
                                    <div className="flex items-center">
                                        {match.pts} - {match.client_name}
                                    </div>
                                    <div>
                                        <img src="/logo_build.png" width={30} alt="Build" />
                                    </div>
                                    <div className="flex items-center">{match.property_description}</div>
                                </div>
                                <div className="flex justify-between px-3">
                                    <AtribIcon icon={House} iconValue={match.type} />
                                    <AtribIcon icon={DollarSign} iconValue={match.range} />
                                    <AtribIcon icon={KeyRound} iconValue={match.delivery_key} />
                                    <AtribIcon icon={Ruler} iconValue={match.building_area} />
                                    <AtribIcon icon={Bed} iconValue={match.rooms} />
                                    <AtribIcon icon={Bath} iconValue={match.suites} />
                                    <AtribIcon icon={Car} iconValue={match.garages} />
                                    <AtribIcon icon={BalconyIcon} iconValue={match.balcony} />
                                    <AtribIcon icon={MapPin} iconValue={match.region} />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
