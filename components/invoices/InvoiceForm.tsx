'use client';

import { Form } from '@/components/ui/form';
import { useInvoiceForm } from '@/hooks/useInvoiceForm';
import { InvoiceGeneralInfo } from './form/InvoiceGeneralInfo';
import { InvoiceTotals } from './form/InvoiceTotals';
import { InvoiceItemsTable } from './form/InvoiceItemsTable';
import { InvoiceNotes } from './form/InvoiceNotes';

export const InvoiceForm = () => {
    const {
        form,
        fields,
        append,
        remove,
        watchItems,
        totals,
        onSubmit,
        isPending,
        customersData,
    } = useInvoiceForm();

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InvoiceGeneralInfo 
                        form={form} 
                        customers={customersData?.data} 
                    />
                    <InvoiceTotals 
                        totals={totals} 
                        isPending={isPending} 
                    />
                </div>

                <InvoiceItemsTable 
                    form={form} 
                    fields={fields} 
                    append={append} 
                    remove={remove} 
                    watchItems={watchItems} 
                />

                <InvoiceNotes form={form} />
            </form>
        </Form>
    );
};
