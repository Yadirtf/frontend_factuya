import { InvoiceFormItem } from '@/schemas/schema';

export interface InvoiceTotals {
    subtotal: number;
    totalTax: number;
    total: number;
}

export const calculateInvoiceTotals = (items: InvoiceFormItem[]): InvoiceTotals => {
    let subtotal = 0;
    let totalTax = 0;

    items.forEach((item) => {
        const qty = item.quantity || 0;
        const price = item.unitPrice || 0;
        const disc = item.discount || 0;
        const rate = item.taxRate || 0;

        const itemSubtotal = (qty * price) - disc;
        const itemTax = itemSubtotal * (rate / 100);

        subtotal += itemSubtotal;
        totalTax += itemTax;
    });

    return {
        subtotal,
        totalTax,
        total: subtotal + totalTax,
    };
};

export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP'
    }).format(value);
};
