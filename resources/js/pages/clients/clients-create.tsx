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
  };
  
  interface CreateClientProps {
    maritalStatusOptions: Record<string, string>;
    booleanOptions: Record<string, string>;
  }

  const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clientes',
        href: '/clients',
    },
];

export default function CreateClient({ maritalStatusOptions, booleanOptions }: CreateClientProps) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm<ClientCreateForm>({
        name: '',
        phone: '',
        email: '',
        address: '',
        marital_status: '',
        need_financing: true,
        dependents: parseInt(''),
        profession: '',
        revenue: parseInt(''),
        capital: parseInt(''),
        fgts: parseInt(''),
        has_property: false,
        compromised_income: parseInt(''),
      });

    const handleNumberChange = (field: keyof typeof data, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value) || '';
        setData(field, value);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        
        post(route('clients.store'));
      };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cadastro de Cliente" />
            <div className="h-full gap-4 space-y-6 rounded-xl p-4">
                <h1 className="mb-6 text-2xl font-bold">Cadastro de Cliente</h1>

                <form onSubmit={submit} className="space-y-6">
                    {/* Personal Information Section */}
                    <div className="space-y-4 border-b pb-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Label htmlFor="name">Nome Completo</Label>
                                <Input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} required/>
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            <div>
                                <Label htmlFor="phone">Telefone</Label>
                                <Input id="phone" type="tel" value={data.phone} onChange={(e) => setData('phone', e.target.value)} required/>
                                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                            </div>

                            <div>
                                <Label htmlFor="email">E-mail</Label>
                                <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div>
                                <Label>Estado Civil</Label>

                                <Select value={data.marital_status} onValueChange={(value) => setData('marital_status', value)}>
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
                                    min="0"
                                    value={data.dependents}
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
                                <Input id="profession" type="text" value={data.profession} onChange={(e) => setData('profession', e.target.value)} required />
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
