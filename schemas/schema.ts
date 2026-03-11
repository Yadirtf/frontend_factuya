import * as z from 'zod';
import { InvoiceType, TaxType } from '@/lib/types/invoice';

export const itemSchema = z.object({
    productCode: z.string().min(1, 'Código requerido'),
    description: z.string().min(1, 'Descripción requerida'),
    quantity: z.number().positive('Mínimo 1'),
    unitPrice: z.number().positive('Mínimo 0.01'),
    discount: z.number().min(0, 'Mínimo 0'),
    taxRate: z.number().min(0).max(100),
    taxType: z.nativeEnum(TaxType),
});

export const invoiceSchema = z.object({
    type: z.nativeEnum(InvoiceType),
    customerId: z.string().min(1, 'Seleccione un cliente'),
    issueDate: z.string(),
    dueDate: z.string().optional(),
    notes: z.string().optional(),
    items: z.array(itemSchema).min(1, 'Agregue al menos un ítem'),
});

export type InvoiceFormItem = z.infer<typeof itemSchema>;
export type InvoiceFormValues = z.infer<typeof invoiceSchema>;
