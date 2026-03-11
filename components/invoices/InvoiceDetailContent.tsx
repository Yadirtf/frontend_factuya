'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useInvoiceDetail } from '@/hooks/useInvoiceDetail';
import { InvoiceDetailHeader } from './detail/InvoiceDetailHeader';
import { DianStatusAlert } from './detail/DianStatusAlert';
import { InvoiceItemsTable } from './detail/InvoiceItemsTable';
import { InvoiceSummaryCards } from './detail/InvoiceSummaryCards';

export function InvoiceDetailContent({ invoiceId }: { invoiceId: string }) {
    const router = useRouter();
    const {
        invoice, isLoading,
        sendToDian, isSending,
        cancelInvoice, isCanceling,
        getStatusColor
    } = useInvoiceDetail(invoiceId);

    if (isLoading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
        );
    }

    if (!invoice) {
        return (
            <div className="flex flex-col h-[400px] items-center justify-center gap-4">
                <p className="text-slate-500">Factura no encontrada</p>
                <Button variant="outline" onClick={() => router.push('/invoices')}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <InvoiceDetailHeader
                invoice={invoice}
                isCanceling={isCanceling}
                isSending={isSending}
                cancelInvoice={cancelInvoice}
                sendToDian={sendToDian}
                getStatusColor={getStatusColor}
            />

            <DianStatusAlert
                status={invoice.status}
                dianResponse={invoice.dianResponse}
                cufe={invoice.cufe}
            />

            <div className="grid md:grid-cols-3 gap-6">
                <InvoiceItemsTable items={invoice.items} />
                
                <InvoiceSummaryCards
                    subtotal={invoice.subtotal}
                    totalTax={invoice.totalTax}
                    total={invoice.total}
                    customerId={invoice.customerId}
                />
            </div>
        </div>
    );
}
