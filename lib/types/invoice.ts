export enum InvoiceStatus {
    DRAFT = 'DRAFT',
    PENDING = 'PENDING',
    SENT = 'SENT',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
    CANCELLED = 'CANCELLED',
}

export enum InvoiceType {
    FV = 'FV',
    NC = 'NC',
    ND = 'ND',
}

export enum TaxType {
    IVA = '01',
    ICA = '03',
    INC = '04',
}

export interface Tax {
    type: TaxType;
    rate: number;
    base: number;
    amount: number;
}

export interface InvoiceItem {
    id: string;
    productCode: string;
    description: string;
    quantity: number;
    unitPrice: number;
    discount: number;
    subtotal: number;
    totalTax: number;
    total: number;
    taxes: Tax[];
}

export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    businessName?: string;
    documentType: string;
    documentNumber: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    department: string;
}

export interface Invoice {
    id: string;
    companyId: string;
    number: string;
    prefix: string;
    fullNumber: string;
    type: InvoiceType;
    status: InvoiceStatus;
    customerId: string;
    items: InvoiceItem[];
    subtotal: number;
    totalTax: number;
    total: number;
    cufe?: string;
    qrCode?: string;
    issueDate: string;
    dueDate?: string;
    notes?: string;
    dianResponse?: string;
    createdAt: string;
    updatedAt: string;
}

export interface InvoiceFilters {
    status?: InvoiceStatus;
    from?: string;
    to?: string;
    customerId?: string;
    page?: number;
    limit?: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}
