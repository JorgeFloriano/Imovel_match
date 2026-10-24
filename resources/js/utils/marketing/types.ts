export interface Client {
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
    origin: string | null;
    created_at?: string;
    last_contact_at?: string | null;
}

export interface PropertyMarketingData {
    description?: string;
    obs?: string | null;
    delivery_key?: string | null;
    building_area?: number | null;
    rooms?: number | null;
    suites?: number | null;
    garages?: number | null;
    balcony?: boolean | null;
    region?: {
        name?: string;
    } | null;
    [key: string]: unknown;
}
