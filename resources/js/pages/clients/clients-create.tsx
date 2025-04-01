import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { FormEventHandler } from 'react';

type ClientCreateForm = {
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
    district_id?: string;
    rooms?: number;
    bathrooms?: number;
    suites?: number;
    garages?: number;
    delivery_key?: string;
    min_act?: number;
    installment_payment?: boolean;
    air_conditioning?: string;
    garden?: boolean;
    pool?: boolean;
    balcony?: boolean;
    acept_pets?: boolean;
    acessibility?: boolean;
    obs?: string;
};

interface CreateClientProps {
    maritalStatusOptions: Record<string, string>;
    booleanOptions: Record<string, string>;
    districtOptions: Record<string, string>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clientes',
        href: '/clients',
    },
];

export default function CreateClient({ maritalStatusOptions, booleanOptions, districtOptions }: CreateClientProps) {
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm<ClientCreateForm>({
        name: '',
        phone: '',
        email: '',
        address: '',
        marital_status: '',
        need_financing: true,
        dependents: 0,
        profession: '',
        revenue: 0,
        capital: 0,
        fgts: 0,
        has_property: false,
        compromised_income: 0,
        district_id: '',
        rooms: 0,
        bathrooms: 0,
        suites: 0,
        garages: 0,
        delivery_key: '',
        min_act: 0,
        installment_payment: false,
        air_conditioning: '',
        garden: false,
        pool: false,
        balcony: false,
        acept_pets: false,
        acessibility: false,
        obs: '',
    });

    const handleNumberChange = (field: keyof typeof data, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value) || '';
        setData(field, value);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('clients.store'), {
            onSuccess: () =>
                reset(
                    'address',
                    'capital',
                    'dependents',
                    'email',
                    'fgts',
                    'has_property',
                    'marital_status',
                    'name',
                    'phone',
                    'profession',
                    'revenue',
                    'compromised_income',
                ),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cadastro de Cliente" />
            <div className="h-full gap-4 space-y-6 rounded-xl p-4">
                <h1 className="mb-6 text-2xl font-bold">Cadastro de Cliente</h1>

                <form onSubmit={submit} className="space-y-6">
                    {/* Personal Information Section */}
                    <h2 className="text-lg font-semibold">Informações Pessoais</h2>
                    <div className="space-y-4 border-b pb-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Label htmlFor="name">Nome Completo</Label>
                                <Input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            <div>
                                <Label htmlFor="phone">Telefone</Label>
                                <Input id="phone" type="tel" value={data.phone} onChange={(e) => setData('phone', e.target.value)} required />
                                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                            </div>

                            <div>
                                <Label htmlFor="email">E-mail</Label>
                                <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div>
                                <Label htmlFor="marital_status">Estado Civil</Label>

                                <Select name="marital_status" onValueChange={(value) => setData('marital_status', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione uma opção" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {Object.entries(maritalStatusOptions).map(([value, Label]) => (
                                            <SelectItem key={value} value={value}>
                                                {Label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {errors.marital_status && <p className="mt-1 text-sm text-red-600">{errors.marital_status}</p>}
                            </div>

                            <div>
                                <Label htmlFor="address">Endereço</Label>
                                <Input id="address" type="text" value={data.address} onChange={(e) => setData('address', e.target.value)} />
                                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                            </div>

                            <div>
                                <Label htmlFor="dependents">Número de Dependentes</Label>
                                <Input
                                    id="dependents"
                                    type="number"
                                    min={0}
                                    value={data.dependents}
                                    onFocus={(e) => parseInt(e.target.value) === 0 && setData('dependents', '')}
                                    onChange={(e) => setData('dependents', parseInt(e.target.value))}
                                    required
                                />
                                {errors.dependents && <p className="mt-1 text-sm text-red-600">{errors.dependents}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Financial Information Section */}
                    <div className="space-y-4 border-b pb-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Label htmlFor="profession">Profissão</Label>
                                <Input
                                    id="profession"
                                    type="text"
                                    value={data.profession}
                                    onChange={(e) => setData('profession', e.target.value)}
                                    required
                                />
                                {errors.profession && <p className="mt-1 text-sm text-red-600">{errors.profession}</p>}
                            </div>

                            <div>
                                <Label htmlFor="revenue">Renda Mensal (R$)</Label>
                                <Input
                                    id="revenue"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={data.revenue}
                                    onFocus={(e) => parseFloat(e.target.value) === 0 && setData('revenue', '')}
                                    onChange={(e) => handleNumberChange('revenue', e)}
                                    required
                                />
                                {errors.revenue && <p className="mt-1 text-sm text-red-600">{errors.revenue}</p>}
                            </div>

                            <div>
                                <Label htmlFor="capital">Capital Disponível (R$)</Label>
                                <Input
                                    id="capital"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={data.capital}
                                    onFocus={(e) => parseInt(e.target.value) === 0 && setData('capital', '')}
                                    onChange={(e) => handleNumberChange('capital', e)}
                                    required
                                />
                                {errors.capital && <p className="mt-1 text-sm text-red-600">{errors.capital}</p>}
                            </div>

                            <div>
                                <Label htmlFor="fgts">Saldo de FGTS (R$)</Label>
                                <Input
                                    id="fgts"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={data.fgts}
                                    onFocus={(e) => parseInt(e.target.value) === 0 && setData('fgts', '')}
                                    onChange={(e) => handleNumberChange('fgts', e)}
                                />
                                {errors.fgts && <p className="mt-1 text-sm text-red-600">{errors.fgts}</p>}
                            </div>

                            <div>
                                <Label htmlFor="compromised_income">Renda Comprometida (%)</Label>
                                <Input
                                    id="compromised_income"
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={data.compromised_income}
                                    onFocus={(e) => parseInt(e.target.value) === 0 && setData('compromised_income', '')}
                                    onChange={(e) => handleNumberChange('compromised_income', e)}
                                    required
                                />
                                {errors.compromised_income && <p className="mt-1 text-sm text-red-600">{errors.compromised_income}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Property Information Section */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Need Financing Select */}
                            <div>
                                <Label>Precisa de Financiamento?</Label>
                                <Select
                                    value={data.need_financing ? 'true' : 'false'}
                                    onValueChange={(value) => setData('need_financing', value === 'true')}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione sim ou não" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(booleanOptions).map(([value, label]) => (
                                            <SelectItem key={value} value={value}>
                                                {label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.need_financing && <p className="mt-1 text-sm text-red-600">{errors.need_financing}</p>}
                            </div>

                            {/* Has Property Select */}
                            <div>
                                <Label>Já possúi propriedade?</Label>
                                <Select
                                    value={data.has_property ? 'true' : 'false'}
                                    onValueChange={(value) => setData('has_property', value === 'true')}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione sim ou não" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(booleanOptions).map(([value, label]) => (
                                            <SelectItem key={value} value={value}>
                                                {label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.has_property && <p className="mt-1 text-sm text-red-600">{errors.has_property}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">Informações do Imóvel Desejado</h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* District */}
                            <div>
                                <Label>Selecione a Região</Label>
                                <Select value={data.district_id} onValueChange={(value) => setData('district_id', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o bairro" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(districtOptions).map(([value, Label]) => (
                                            <SelectItem key={value} value={value}>
                                                {Label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.district_id && <p className="mt-1 text-sm text-red-600">{errors.district_id}</p>}
                            </div>

                            {/* Rooms */}
                            <div>
                                <Label htmlFor='rooms'>Quartos</Label>
                                <Input id='rooms' type="number" min="0" value={data.rooms} onFocus={(e) => parseInt(e.target.value) === 0 && setData('rooms', '')} onChange={(e) => setData('rooms', parseInt(e.target.value))} />
                                {errors.rooms && <p className="mt-1 text-sm text-red-600">{errors.rooms}</p>}
                            </div>

                            {/* Bathrooms */}
                            <div>
                                <Label htmlFor='bathrooms'>Banheiros</Label>
                                <Input
                                    id="bathrooms"
                                    type="number"
                                    min="0"
                                    value={data.bathrooms}
                                    onFocus={(e) => parseInt(e.target.value) === 0 && setData('bathrooms', '')}
                                    onChange={(e) => setData('bathrooms', parseInt(e.target.value))}
                                />
                                {errors.bathrooms && <p className="mt-1 text-sm text-red-600">{errors.bathrooms}</p>}
                            </div>

                            {/* Suites */}
                            <div>
                                <Label htmlFor='suites'>Suítes</Label>
                                <Input id="suites" type="number" min="0" value={data.suites} onFocus={(e) => parseInt(e.target.value) === 0 && setData('suites', '')} onChange={(e) => setData('suites', parseInt(e.target.value))} />
                                {errors.suites && <p className="mt-1 text-sm text-red-600">{errors.suites}</p>}
                            </div>

                            {/* Garages */}
                            <div>
                                <Label htmlFor='garages'>Vagas na Garagem</Label>
                                <Input id="garages" type="number" min="0" value={data.garages} onFocus={(e) => parseInt(e.target.value) === 0 && setData('garages', '')} onChange={(e) => setData('garages', parseInt(e.target.value))} />
                                {errors.garages && <p className="mt-1 text-sm text-red-600">{errors.garages}</p>}
                            </div>

                            {/* Delivery Date */}
                            <div>
                                <Label htmlFor='delivery_key'>Previsão Entrega</Label>
                                <Input id='delivery_key' type="date" value={data.delivery_key} onChange={(e) => setData('delivery_key', e.target.value)} />
                                {errors.delivery_key && <p className="mt-1 text-sm text-red-600">{errors.delivery_key}</p>}
                            </div>

                            {/* Min ACT */}
                            <div>
                                <Label htmlFor='min_act'>Área Útil Mínima</Label>
                                <Input id='min_act' type="number" min="0" value={data.min_act} onFocus={(e) => parseInt(e.target.value) === 0 && setData('min_act', '')} onChange={(e) => setData('min_act', parseInt(e.target.value))} />
                                {errors.min_act && <p className="mt-1 text-sm text-red-600">{errors.min_act}</p>}
                            </div>

                            {/* Installment Payment */}
                            <div>
                                <Label>Entrada Parcelada?</Label>
                                <Select
                                    value={data.installment_payment ? 'true' : 'false'}
                                    onValueChange={(value) => setData('installment_payment', value === 'true')}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(booleanOptions).map(([value, label]) => (
                                            <SelectItem key={value} value={value}>
                                                {label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.installment_payment && <p className="mt-1 text-sm text-red-600">{errors.installment_payment}</p>}
                            </div>

                            {/* Air Conditioning */}
                            <div>
                                <Label>Ar Condicionado</Label>
                                <Select value={data.air_conditioning} onValueChange={(value) => setData('air_conditioning', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="incluso">Incluso</SelectItem>
                                        <SelectItem value="somente infra">Somente Infra</SelectItem>
                                        <SelectItem value="não incluso">Não incluso</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.air_conditioning && <p className="mt-1 text-sm text-red-600">{errors.air_conditioning}</p>}
                            </div>

                            {/* Boolean Features */}
                            {['garden', 'pool', 'balcony', 'acept_pets', 'acessibility'].map((field) => (
                                <div key={field}>
                                    <Label>
                                        {
                                            {
                                                garden: 'Jardim',
                                                pool: 'Piscina',
                                                balcony: 'Varanda',
                                                acept_pets: 'Aceita Pets',
                                                acessibility: 'Acessibilidade',
                                            }[field]
                                        }
                                    </Label>
                                    <Select value={data[field] ? 'true' : 'false'} onValueChange={(value) => setData(field, value === 'true')}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(booleanOptions).map(([value, label]) => (
                                                <SelectItem key={value} value={value}>
                                                    {label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors[field] && <p className="mt-1 text-sm text-red-600">{errors[field]}</p>}
                                </div>
                            ))}

                            {/* Observations */}
                            <div className="col-span-full">
                                <Label htmlFor='obs'>Observações</Label>
                                <textarea
                                    id="obs"
                                    className="w-full rounded-md border p-2"
                                    rows={3}
                                    value={data.obs}
                                    onChange={(e) => setData('obs', e.target.value)}
                                />
                                {errors.obs && <p className="mt-1 text-sm text-red-600">{errors.obs}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button disabled={processing} type="submit">
                            {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Salvar
                        </Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">Cadastro Salvo</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
