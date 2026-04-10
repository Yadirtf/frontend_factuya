export interface DianConfig {
    softwareId?: string;
    pin?: string;
    isTestEnvironment: boolean;
    technicalKey?: string;
    resolutionNumber?: string;
    resolutionDate?: string;
    invoicePrefix?: string;
}

export interface Company {
    id: string;
    businessName: string;
    tradeName?: string;
    nit: { raw: string; checkDigit: string };
    dv: string;
    organizationType: number;
    documentType: string;
    address: string;
    postalCode: string;
    city: string;
    department: string;
    taxRegime: string;
    taxResponsibilities: string[];
    mercantileRegistration: string;
    economicActivity: string;
    email: { raw: string };
    phone: string;
    dianConfig: DianConfig;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface CreateCompanyDto {
    nit: string;
    dv: string;
    organizationType: number;
    documentType: string;
    businessName: string;
    tradeName?: string;
    email?: string;
    phone: string;
    address: string;
    postalCode: string;
    city: string;
    department: string;
    taxRegime: 'SIMPLIFIED' | 'COMMON';
    taxResponsibilities: string[];
    mercantileRegistration: string;
    economicActivity: string;
}

export interface UpdateCompanyDto {
    dv?: string;
    organizationType?: number;
    documentType?: string;
    businessName?: string;
    tradeName?: string;
    address?: string;
    postalCode?: string;
    city?: string;
    department?: string;
    phone?: string;
    taxResponsibilities?: string[];
    mercantileRegistration?: string;
    economicActivity?: string;
    dianConfig?: Partial<DianConfig>;
    isActive?: boolean;
}
