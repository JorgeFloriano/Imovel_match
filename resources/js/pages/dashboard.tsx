import { FormSelect } from '@/components/form-select';
import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Collapse } from '@/components/ui/collapse';
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

export const BalconyIcon = ({ className = '' }: { className?: string }) => <img src="/balcony.png" className={`${className}`} alt="Balcony" />;

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
            iconToRender = ({ className = '' }) => <img src="/balcony_red.png" className={`${className}`} alt="Balcony" />;
        }
    } else if (iconValue === true) {
        finalIconClass = 'bg-green-200 border-green-500 text-green-800';
        // If it's the BalconyIcon, use the green version
        if (icon === BalconyIcon) {
            iconToRender = ({ className = '' }) => <img src="/balcony_green.png" className={`${className}`} alt="Balcony" />;
        }
    }

    return (
        <div className="w-8">
            {iconValue !== undefined && (
                <div className={`flex h-8 w-8 items-center justify-center rounded-md border-1 p-1 text-[#123251] ${finalIconClass}`}>
                    {iconToRender && (
                        <span className="inline">
                            {'$$typeof' in iconToRender ? (
                                <Icon className="h-5 w-5" iconNode={iconToRender} />
                            ) : (
                                React.createElement(iconToRender, { className: 'h-5 w-5' })
                            )}
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
                <div className="flex gap-3 py-3 text-xl font-semibold">
                    <div className="flex items-center">Cliente</div>
                    <div>
                        <img src="/logo_build.png" width={30} alt="Build" />
                    </div>
                    <div className="flex items-center">Imóvel</div>
                </div>

                <p className="py-3 text-sm">
                    Conexões Cliente/Imóvel, ordenadas por maior compatibilidade entre características do imóvel e espectativa do cliente, clique para
                    ver as informações em detalhes.
                </p>

                <Collapse id="legend" title="Legenda" asButton={true} buttonClassName="bg-blue-100 hover:bg-blue-200">
                    <p className='pb-4'>
                        As cores dos icones indicam o resultado de um comparativo entre cada uma das caracteristica do imóvel idealizado pelo cliente
                        (sonho) e as caracteristicas do imóvel em questão (realidade), sendo <span className="text-green-500">verde</span> para
                        compatível, <span className="text-red-500">vermelho</span> para incompatível e cor neutra para informação não declarada, por
                        exemplo:
                    </p>

                    <div className='w-max m-auto'>
                        <div className="overflow-hidden rounded-xl border-[1px] border-[#B8B8B8] bg-[#EFEEEC] py-3 text-[#123251] shadow-md transition-all duration-400 hover:border-[#BF9447] hover:text-[#BF9447] dark:bg-[#123251] dark:text-[#EFEEEC] hover:dark:text-[#BF9447]">
                            <div className="flex justify-evenly p-3 font-bold">
                                <div className="flex items-center">Fulano de Tal</div>
                                <div>
                                    <img src="/logo_build.png" width={30} alt="Build" />
                                </div>
                                <div className="flex items-center">Imóvel X</div>
                            </div>
                            <div className="flex justify-between px-3">
                                <AtribIcon icon={House} iconValue={true} />
                                <AtribIcon icon={DollarSign} iconValue={true} />
                                <AtribIcon icon={KeyRound} iconValue={false} />
                                <AtribIcon icon={Ruler} iconValue={true} />
                                <AtribIcon icon={Bed} iconValue={null} />
                                <AtribIcon icon={Bath} iconValue={true} />
                                <AtribIcon icon={Car} iconValue={false} />
                                <AtribIcon icon={BalconyIcon} iconValue={true} />
                                <AtribIcon icon={MapPin} iconValue={null} />
                            </div>
                        </div>
                    </div>

                    <ul>
                        <li className="mt-4 flex items-center">
                            <AtribIcon icon={House} iconValue={true} />
                            <div className="ml-2">Tipo do imóvel X (casa, apartamento, sobrado, etc...) compatível com o desejo do cliente Fulano de Tal.</div>
                        </li>
                        <li className="mt-3 flex items-center">
                            <AtribIcon icon={DollarSign} iconValue={true} />
                            <div className="ml-2">
                                Faixa salarial de Fulano de Tal é compatível com o preço do imóvel X, segundo os critérios do programa "minha casa minha vida"
                            </div>
                        </li>
                        <li className="mt-3 flex items-center">
                            <AtribIcon icon={KeyRound} iconValue={false} />
                            <div className="ml-2">Provável data de entrega das chaves do imóvel X não atende à espectativa de Fulano de Tal.</div>
                        </li>
                        <li className="mt-3 flex items-center">
                            <AtribIcon icon={Ruler} iconValue={true} />
                            <div className="ml-2">Área interna do imóvel X igual ou superior à espectativa de Fulano de Tal</div>
                        </li>
                        <li className="mt-3 flex items-center">
                            <AtribIcon icon={Bed} iconValue={null} />
                            <div className="ml-2">Número de dormitórios do imóvel X ou desejo de Fulano de Tal não especificados.</div>
                        </li>
                        <li className="mt-3 flex items-center">
                            <AtribIcon icon={Bath} iconValue={true} />
                            <div className="ml-2">Número de banheiros do imóvel X igual ou superior à espectativa de Fulano de Tal</div>
                        </li>
                        <li className="mt-3 flex items-center">
                            <AtribIcon icon={Car} iconValue={false} />
                            <div className="ml-2">Número de vagas de garagem do imóvel X inferior à espectativa de Fulano de Tal</div>
                        </li>
                        <li className="mt-3 flex items-center">
                            <AtribIcon icon={BalconyIcon} iconValue={true} />
                            <div className="ml-2"> Imóvel X possúi varanda, compatível com a espectativa de Fulano de Tal</div>
                        </li>
                        <li className="mt-3 flex items-center">
                            <AtribIcon icon={MapPin} iconValue={null} />
                            <div className="ml-2"> - Localização do imóvel X ou desejada por Fulano de Tal não especificados</div>
                        </li>
                    </ul>
                </Collapse>

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
                                    <div className="flex items-center">{match.client_name}</div>
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
