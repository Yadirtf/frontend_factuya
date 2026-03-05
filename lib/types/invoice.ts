export enum InvoiceStatus {
    DRAFT = 'DRAFT',
    PENDING = 'PENDING',
    SENT = 'SENT',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
}

export enum InvoiceType {
    FV = 'FV',
    NC = 'NC',
    ND = 'ND',
}

export interface Money {
    amount: number;
    currency: string;
}

export interface Tax {
    type: string;
    name: string;
    rate: number;
    amount: number;
    base: number;
}

export interface InvoiceItem {
    id?: string;
    description: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    tax: number;
    total: number;
}

export interface Customer {
    id: string;
    name: string;
    identification: string;
    email: string;
}

export interface Invoice {
    id: string;
    number: string;
    prefix: string;
    type: InvoiceType;
    status: InvoiceStatus;
    customer: Customer;
    issueDate: string;
    totalAmount: number;
    cufe?: string;
    dianResponse?: string;
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
    totalPages: number;
}
