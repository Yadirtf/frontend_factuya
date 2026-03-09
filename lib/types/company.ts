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
    address: string;
    city: string;
    department: string;
    taxRegime: string;
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
    businessName: string;
    tradeName?: string;
    email?: string;
    phone: string;
    address: string;
    city: string;
    department: string;
    taxRegime: 'SIMPLIFIED' | 'COMMON';
    economicActivity: string;
}

export interface UpdateCompanyDto {
    businessName?: string;
    tradeName?: string;
    address?: string;
    city?: string;
    department?: string;
    phone?: string;
    economicActivity?: string;
    dianConfig?: Partial<DianConfig>;
    isActive?: boolean;
}
