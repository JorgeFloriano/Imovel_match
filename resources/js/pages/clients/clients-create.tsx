import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Password settings',
        href: '/settings/password',
    },
];

interface CreateClientProps {
    maritalStatusOptions: Record<string, string>; // or more specific: { single: string; married: string; etc. }
    booleanOptions: Record<boolean, string>; // or { true: string; false: string }
}

export default function CreateClient({ 
    maritalStatusOptions, 
    booleanOptions 
}: CreateClientProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        phone: '',
        email: '',
        address: '',
        marital_status: '',
        need_financing: false,
        dependents: 0,
        profession: '',
        revenue: 0,
        capital: 0,
        fgts: 0,
        has_property: false,
        compromised_income: 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('clients.store'));
    };

    const handleNumberChange = (field, e) => {
        const value = parseFloat(e.target.value) || 0;
        setData(field, value);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Profile settings" />

        
        <div className="space-y-6">
            <h1 className="text-2xl font-bold mb-6">New Potential Client</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information Section */}
                <div className="space-y-4 border-b pb-6">
                    <h2 className="text-lg font-medium">Personal Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name">Full Name*</Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        <div>
                            <Label className="block text-sm font-medium text-gray-700">Phone*</Label>
                            <Input
                                type="tel"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                
                            />
                            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                        </div>

                        <div>
                            <Label className="block text-sm font-medium text-gray-700">Email*</Label>
                            <Input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        <div>
                            <Label className="block text-sm font-medium text-gray-700">Marital Status*</Label>
                            <select
                                value={data.marital_status}
                                onChange={(e) => setData('marital_status', e.target.value)}
                                
                            >
                                <option value="">Select status</option>
                                {Object.entries(maritalStatusOptions).map(([value, Label]) => (
                                    <option key={value} value={value}>{Label}</option>
                                ))}
                            </select>
                            {errors.marital_status && <p className="mt-1 text-sm text-red-600">{errors.marital_status}</p>}
                        </div>

                        <div>
                            <Label className="block text-sm font-medium text-gray-700">Address*</Label>
                            <Input
                                type="text"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                
                            />
                            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                        </div>

                        <div>
                            <Label className="block text-sm font-medium text-gray-700">Number of Dependents*</Label>
                            <Input
                                type="number"
                                min="0"
                                value={data.dependents}
                                onChange={(e) => handleNumberChange('dependents', e)}
                                
                            />
                            {errors.dependents && <p className="mt-1 text-sm text-red-600">{errors.dependents}</p>}
                        </div>
                    </div>
                </div>

                {/* Financial Information Section */}
                <div className="space-y-4 border-b pb-6">
                    <h2 className="text-lg font-medium">Financial Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label className="block text-sm font-medium text-gray-700">Profession*</Label>
                            <Input
                                type="text"
                                value={data.profession}
                                onChange={(e) => setData('profession', e.target.value)}
                                
                            />
                            {errors.profession && <p className="mt-1 text-sm text-red-600">{errors.profession}</p>}
                        </div>

                        <div>
                            <Label className="block text-sm font-medium text-gray-700">Monthly Revenue (R$)*</Label>
                            <Input
                                type="number"
                                min="0"
                                step="0.01"
                                value={data.revenue}
                                onChange={(e) => handleNumberChange('revenue', e)}
                                
                            />
                            {errors.revenue && <p className="mt-1 text-sm text-red-600">{errors.revenue}</p>}
                        </div>

                        <div>
                            <Label className="block text-sm font-medium text-gray-700">Available Capital (R$)*</Label>
                            <Input
                                type="number"
                                min="0"
                                step="0.01"
                                value={data.capital}
                                onChange={(e) => handleNumberChange('capital', e)}
                                
                            />
                            {errors.capital && <p className="mt-1 text-sm text-red-600">{errors.capital}</p>}
                        </div>

                        <div>
                            <Label className="block text-sm font-medium text-gray-700">FGTS Balance (R$)*</Label>
                            <Input
                                type="number"
                                min="0"
                                step="0.01"
                                value={data.fgts}
                                onChange={(e) => handleNumberChange('fgts', e)}
                                
                            />
                            {errors.fgts && <p className="mt-1 text-sm text-red-600">{errors.fgts}</p>}
                        </div>

                        <div>
                            <Label className="block text-sm font-medium text-gray-700">% of Compromised Income*</Label>
                            <Input
                                type="number"
                                min="0"
                                max="100"
                                value={data.compromised_income}
                                onChange={(e) => handleNumberChange('compromised_income', e)}
                                
                            />
                            {errors.compromised_income && <p className="mt-1 text-sm text-red-600">{errors.compromised_income}</p>}
                        </div>
                    </div>
                </div>

                {/* Property Information Section */}
                <div className="space-y-4">
                    <h2 className="text-lg font-medium">Property Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label className="block text-sm font-medium text-gray-700">Needs Financing?*</Label>
                            <select
                                value={data.need_financing}
                                onChange={(e) => setData('need_financing', e.target.value === 'true')}
                                
                            >
                                {Object.entries(booleanOptions).map(([value, Label]) => (
                                    <option key={value} value={value}>{Label}</option>
                                ))}
                            </select>
                            {errors.need_financing && <p className="mt-1 text-sm text-red-600">{errors.need_financing}</p>}
                        </div>

                        <div>
                            <Label className="block text-sm font-medium text-gray-700">Already Owns a Property?*</Label>
                            <select
                                value={data.has_property}
                                onChange={(e) => setData('has_property', e.target.value === 'true')}
                                
                            >
                                {Object.entries(booleanOptions).map(([value, Label]) => (
                                    <option key={value} value={value}>{Label}</option>
                                ))}
                            </select>
                            {errors.has_property && <p className="mt-1 text-sm text-red-600">{errors.has_property}</p>}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Save Client'}
                    </Button>
                </div>
            </form>
        </div>
        </AppLayout>
    );
}