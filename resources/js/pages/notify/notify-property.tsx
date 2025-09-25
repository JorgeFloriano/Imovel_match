import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import IconTooltip from '@/components/ui/icon-tooltip';
import { StatusIcon } from '@/components/ui/status-icon';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Bath, Bed, Calendar, Car, Check, Copy, KeyRound, MessageCircle } from 'lucide-react';
import React, { useState } from 'react';

interface NotifyPropertyProps {
    clients: {
        id: number;
        name: string;
        revenue: number;
        wishe?: {
            regions?: [];
            regions_msg?: string;
            regions_descr?: string;
            typ?: string;
            rooms?: number;
            suites?: number;
            garages?: number;
            balcony?: boolean;
            building_area?: number;
            delivery_key?: string;
        };
    };
    property: {
        id: number;
        description: string;
        contact_name: string;
        contact_phone: string;
        contact_link: string;
        place_link: string;
        region_id: number;
        type: string;
        typ: string;
        iptu: number;
        price: number;
        land_area: number;
        building_area: number;
        image: string;
        rooms: number;
        region: { name: string };
        region_c: string;
        range_c: string;
        bathrooms: number;
        suites: number;
        garages: number;
        floor: number;
        building_floors: number;
        property_floors: number;
        delivery_key: string;
        balcony: boolean | null;
        balcony_c: string;
        address: string;
        pts: number;
    };
}

export default function ClientProperties({ property, clients }: NotifyPropertyProps) {
    const [copiedId, setCopiedId] = useState<number | null>(null);
    const [copiedTextType, setCopiedTextType] = useState<'name' | 'marketing' | null>(null);
    const [isLoading, setIsLoading] = useState<number | null>(null); // Track loading state per client

    // Copy client name to clipboard
    const copyNameToClipboard = (client: NotifyPropertyProps['clients']) => {
        navigator.clipboard
            .writeText(client.name)
            .then(() => {
                setCopiedId(client.id);
                setCopiedTextType('name');
                setTimeout(() => {
                    setCopiedId(null);
                    setCopiedTextType(null);
                }, 1500);
            })
            .catch((err) => {
                console.error('Failed to copy: ', err);
            });
    };

    // Copy marketing text to clipboard via API
    const copyMarketingTextToClipboard = async (client: NotifyPropertyProps['clients'], e: React.MouseEvent) => {
        e.preventDefault();
        setIsLoading(client.id);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const response = await fetch(route('notify.generate-property-marketing-text', [client.id, property.id]), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken!, // Now properly typed as string
                    'X-Requested-With': 'XMLHttpRequest', // Add this for Laravel to recognize as AJAX
                },
            });

            if (!response.ok) {
                throw new Error('Falha ao gerar o texto de marketing.');
            }

            const data = await response.json();
            const marketingText = data.marketingText;

            await navigator.clipboard.writeText(marketingText);

            setCopiedId(client.id);
            setCopiedTextType('marketing');
            setTimeout(() => {
                setCopiedId(null);
                setCopiedTextType(null);
            }, 1500);
        } catch (err) {
            console.error('Failed to generate/copy marketing text: ', err);
        } finally {
            setIsLoading(null);
        }
    };

    return (
        <AppLayout>
            <Head title="Cliente / Imóveis" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="flex gap-3 p-2 text-xl font-semibold">Notificar informações do imóvel para os clientes</h1>
                    <div className="flex gap-2">
                        <Button asChild variant="outline">
                            <Link href={route('notify')}>Voltar</Link>
                        </Button>
                    </div>
                </div>

                <p className="text-sm">Informações do imóvel selecionado / Informações dos clientes e características do imóvel desejado.</p>

                <div className="relative overflow-x-auto overflow-y-hidden shadow-md sm:rounded-lg">
                    <table className="h-fulltext-left w-full text-sm text-[#123251] rtl:text-right dark:text-[#B8B8B8]">
                        <thead className="m-1 bg-[#D8D8D8] text-[#123251] uppercase dark:bg-[#123251] dark:text-[#B8B8B8]">
                            <tr>
                                <th className="px-5 py-3 text-left">Descrição do imóvel</th>
                                <th className="hidden px-5 text-left sm:table-cell">Tipo</th>
                                <th className="hidden px-5 text-left sm:table-cell">Preço(R$)</th>
                                <th className="hidden sm:table-cell">
                                    <IconTooltip
                                        iconNode={
                                            <div className="inline-flex gap-2 text-left">
                                                {Calendar && <Icon className="inline h-4 w-4" iconNode={Calendar} />}
                                                {ArrowRight && <Icon className="inline h-4 w-4" iconNode={ArrowRight} />}
                                                {KeyRound && <Icon className="inline h-4 w-4" iconNode={KeyRound} />}
                                            </div>
                                        }
                                        tooltipText="Previsão de entrega das chaves"
                                    />
                                </th>
                                <th className="hidden text-center sm:table-cell">
                                    <IconTooltip iconNode="M²" tooltipText="Área construída" />
                                </th>
                                <th className="hidden sm:table-cell">
                                    <IconTooltip iconNode={Bed && <Icon className="inline h-4 w-4" iconNode={Bed} />} tooltipText="Quartos" />
                                </th>
                                <th className="hidden sm:table-cell">
                                    <IconTooltip iconNode={Bath && <Icon className="inline h-4 w-4" iconNode={Bath} />} tooltipText="Suítes" />
                                </th>
                                <th className="hidden sm:table-cell">
                                    <IconTooltip iconNode={Car && <Icon className="inline h-4 w-4" iconNode={Car} />} tooltipText="Vagas" />
                                </th>
                                <th className="hidden sm:table-cell">
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
                                <th className="hidden sm:table-cell">
                                    <div className="px-5">Região</div>
                                </th>
                                <th className="px-5"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-200 font-medium text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-white">
                                <th className="px-5 py-3 text-left">{property.description}</th>
                                <th className="hidden px-5 text-left sm:table-cell">{property?.typ}</th>
                                <th className="hidden px-5 sm:table-cell">
                                    <div className="px-2">
                                        {new Intl.NumberFormat('pt-BR', {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        }).format(property.price)}
                                    </div>
                                </th>
                                <th className="hidden px-5 sm:table-cell">
                                    <div className="py-1">
                                        {property?.delivery_key ? new Date(property.delivery_key).toLocaleDateString('pt-BR') : null}
                                    </div>
                                </th>
                                <th className="hidden px-5 sm:table-cell">
                                    <div className="p-1 text-center">{property?.building_area}</div>
                                </th>
                                <th className="hidden px-5 sm:table-cell">
                                    <div className="p-1 text-center">{property?.rooms}</div>
                                </th>
                                <th className="hidden px-5 sm:table-cell">
                                    <div className="p-1 text-center">{property?.suites}</div>
                                </th>
                                <th className="hidden px-5 sm:table-cell">
                                    <div className="p-1 text-center">{property?.garages}</div>
                                </th>
                                <th className="hidden px-5 text-center sm:table-cell">
                                    <StatusIcon value={property?.balcony} />
                                </th>
                                <th className="hidden px-5 text-center sm:table-cell">
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
                                </th>
                            </tr>

                            <tr className="m-1 bg-[#D8D8D8] text-[#123251] uppercase dark:bg-[#123251] dark:text-[#B8B8B8]">
                                <th className="px-5 py-3 text-left">Cliente</th>
                                <th className="hidden px-5 text-left sm:table-cell">Tipo</th>
                                <th className="hidden px-5 text-left sm:table-cell">Renda (R$)</th>
                                <th className="hidden px-5 text-left sm:table-cell">
                                    <IconTooltip
                                        iconNode={
                                            <div className="inline-flex gap-2 text-left">
                                                {Calendar && <Icon className="inline h-4 w-4" iconNode={Calendar} />}
                                                {ArrowRight && <Icon className="inline h-4 w-4" iconNode={ArrowRight} />}
                                                {KeyRound && <Icon className="inline h-4 w-4" iconNode={KeyRound} />}
                                            </div>
                                        }
                                        tooltipText="Previsão de entrega das chaves"
                                    />
                                </th>
                                <th className="hidden text-center sm:table-cell">
                                    <IconTooltip iconNode="M²" tooltipText="Área construída" />
                                </th>
                                <th className="hidden sm:table-cell">
                                    <IconTooltip iconNode={Bed && <Icon className="inline h-4 w-4" iconNode={Bed} />} tooltipText="Quartos" />
                                </th>
                                <th className="hidden sm:table-cell">
                                    <IconTooltip iconNode={Bath && <Icon className="inline h-4 w-4" iconNode={Bath} />} tooltipText="Suítes" />
                                </th>
                                <th className="hidden sm:table-cell">
                                    <IconTooltip iconNode={Car && <Icon className="inline h-4 w-4" iconNode={Car} />} tooltipText="Vagas" />
                                </th>
                                <th className="hidden sm:table-cell">
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
                                <th className="hidden sm:table-cell">
                                    <div className="px-5">Região</div>
                                </th>
                                <th className="px-5 text-center text-green-600">{MessageCircle && <Icon iconNode={MessageCircle} />}</th>
                            </tr>

                            {Array.isArray(clients) &&
                                clients.map((client, index) => (
                                    <tr
                                        key={client.id}
                                        className={`border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-950 ${
                                            index !== clients.length - 1 ? 'border-b' : ''
                                        }`}
                                    >
                                        <th scope="row" className="px-6 py-3 font-medium whitespace-normal text-gray-900 dark:text-white">
                                            <button
                                                onClick={() => copyNameToClipboard(client)}
                                                className="flex items-center gap-2 text-left transition-colors hover:text-blue-600"
                                            >
                                                {client.name}
                                                {copiedId === client.id && copiedTextType === 'name' && (
                                                    <span className="flex items-center text-sm text-green-600">
                                                        <Copy size={16} className="mr-1" />
                                                        <Check size={16} className="mr-1" />
                                                    </span>
                                                )}
                                            </button>
                                        </th>
                                        <td className="hidden px-5 py-3 text-left sm:table-cell">
                                            <div className={client.wishe.typ_c}>
                                                {client.wishe.typ ? client.wishe.typ.charAt(0).toUpperCase() + client.wishe.typ.slice(1) : ' '}
                                            </div>
                                        </td>
                                        <td className="hidden px-5 text-left sm:table-cell">
                                            <div className={client.wishe.range_c}>
                                                {new Intl.NumberFormat('pt-BR', {
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0,
                                                }).format(client.revenue)}
                                            </div>
                                        </td>
                                        <td className="hidden px-5 sm:table-cell">
                                            <div className={client.wishe.delivery_key_c}>
                                                {client.wishe?.delivery_key ? new Date(client.wishe.delivery_key).toLocaleDateString('pt-BR') : null}
                                            </div>
                                        </td>
                                        <td className="hidden px-5 sm:table-cell">
                                            <div className={client.wishe.building_area_c}>{client.wishe.building_area}</div>
                                        </td>
                                        <td className="hidden px-5 sm:table-cell">
                                            <div className={client.wishe.rooms_c}>{client.wishe.rooms}</div>
                                        </td>
                                        <td className="hidden px-5 sm:table-cell">
                                            <div className={client.wishe.suites_c}>{client.wishe.suites}</div>
                                        </td>
                                        <td className="hidden px-5 sm:table-cell">
                                            <div className={client.wishe.garages_c}>{client.wishe.garages}</div>
                                        </td>
                                        <td className="hidden px-5 sm:table-cell">
                                            <div className={client.wishe.balcony_c}>
                                                <StatusIcon value={client.wishe.balcony} />
                                            </div>
                                        </td>
                                        <td className="hidden px-5 sm:table-cell">
                                            <div className={client.wishe.region_c}>
                                                {client.wishe?.regions_descr ? (
                                                    <IconTooltip
                                                        iconNode={client.wishe?.regions_msg}
                                                        tooltipClassName="right-full"
                                                        iconClassName="inline"
                                                        tooltipText={client.wishe?.regions_descr as string}
                                                    />
                                                ) : (
                                                    client.wishe?.regions_msg
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-5 text-center text-blue-400">
                                            <a
                                                href={route('clients.show', client.id)}
                                                className="relative font-medium text-blue-500 hover:underline"
                                                onClick={(e) => copyMarketingTextToClipboard(client, e)}
                                                title="Gerar e copiar texto de marketing"
                                            >
                                                {isLoading === client.id ? (
                                                    <span className="absolute -top-7 -right-4 flex items-center rounded bg-white px-2 py-1 text-xs whitespace-nowrap text-gray-600 shadow-md">
                                                        Gerando...
                                                    </span>
                                                ) : copiedId === client.id && copiedTextType === 'marketing' ? (
                                                    <span className="absolute -top-7 -right-4 flex items-center rounded bg-white px-2 py-1 text-xs whitespace-nowrap text-green-600 shadow-md">
                                                        <Check size={12} className="mr-1" />
                                                        Texto copiado!
                                                    </span>
                                                ) : (
                                                    <Icon iconNode={Copy} />
                                                )}
                                            </a>
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
