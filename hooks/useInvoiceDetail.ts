import { useInvoices } from '@/hooks/useInvoices';
import { InvoiceStatus } from '@/lib/types/invoice';

export function useInvoiceDetail(id: string) {
    const { useGetInvoice, useSendToDian, useCancelInvoice } = useInvoices();
    const { data: invoice, isLoading } = useGetInvoice(id);
    const { mutateAsync: sendToDian, isPending: isSending } = useSendToDian();
    const { mutateAsync: cancelInvoice, isPending: isCanceling } = useCancelInvoice();

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);

    const getStatusColor = (status: InvoiceStatus) => {
        switch (status) {
            case InvoiceStatus.ACCEPTED: return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case InvoiceStatus.REJECTED: return 'bg-red-100 text-red-800 border-red-200';
            case InvoiceStatus.DRAFT: return 'bg-slate-100 text-slate-800 border-slate-200';
            case InvoiceStatus.PENDING: return 'bg-amber-100 text-amber-800 border-amber-200';
            case InvoiceStatus.SENT: return 'bg-blue-100 text-blue-800 border-blue-200';
            case InvoiceStatus.CANCELLED: return 'bg-gray-100 text-gray-800 border-gray-200';
            default: return 'bg-slate-100 text-slate-800 border-slate-200';
        }
    };

    return {
        invoice,
        isLoading,
        sendToDian,
        isSending,
        cancelInvoice,
        isCanceling,
        formatCurrency,
        getStatusColor
    };
}
