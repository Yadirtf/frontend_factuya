import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { useInvoices } from '@/hooks/useInvoices';
import { useCustomers } from '@/hooks/useCustomers';
import { InvoiceType, TaxType } from '@/lib/types/invoice';
import { invoiceSchema, InvoiceFormValues } from '@/schemas/schema';
import { calculateInvoiceTotals } from '@/lib/invoice-math';

export const useInvoiceForm = () => {
    const router = useRouter();
    const { useCreateInvoice } = useInvoices();
    const createMutation = useCreateInvoice();
    const { data: customersData } = useCustomers({ limit: 100 });

    const form = useForm<InvoiceFormValues>({
        resolver: zodResolver(invoiceSchema),
        defaultValues: {
            type: InvoiceType.FV,
            customerId: '',
            issueDate: format(new Date(), 'yyyy-MM-dd'),
            items: [{
                productCode: '',
                description: '',
                quantity: 1,
                unitPrice: 0,
                discount: 0,
                taxRate: 19,
                taxType: TaxType.IVA,
            }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'items',
    });

    const watchItems = form.watch('items');
    const totals = calculateInvoiceTotals(watchItems as any);

    const onSubmit = (values: InvoiceFormValues) => {
        const payload = {
            ...values,
            items: values.items.map(item => ({
                productCode: item.productCode,
                description: item.description,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                discount: item.discount,
                taxes: [{ type: item.taxType, rate: item.taxRate }]
            }))
        };

        createMutation.mutate(payload, {
            onSuccess: (data) => {
                router.push(`/invoices/${data.id}`);
            },
            onError: (error: unknown) => {
                const axiosError = error as { response?: { data?: { message?: string } } };
                console.error("Error creating invoice:", axiosError);
            }
        });
    };

    return {
        form,
        fields,
        append,
        remove,
        watchItems,
        totals,
        onSubmit,
        isPending: createMutation.isPending,
        customersData,
    };
};
