import { useInvoices } from '@/hooks/useInvoices';
import { useAuthStore } from '@/store/auth.store';
import { InvoiceStatus } from '@/lib/types/invoice';

export interface DashboardStats {
    totalInvoices: number;
    acceptedDian: number;
    rejectedDian: number;
    pendingDocs: number;
    recentInvoices: any[];
}

export function useDashboardStats() {
    const { user } = useAuthStore();
    const { useGetInvoices } = useInvoices({ limit: 100 });
    const { data: invoicesResult, isLoading } = useGetInvoices();

    const invoices = invoicesResult?.data || [];

    const stats: DashboardStats = {
        totalInvoices: invoices.length,
        acceptedDian: invoices.filter((i: any) => i.status === InvoiceStatus.ACCEPTED).length,
        rejectedDian: invoices.filter((i: any) => i.status === InvoiceStatus.REJECTED).length,
        pendingDocs: invoices.filter((i: any) => i.status === InvoiceStatus.DRAFT || i.status === InvoiceStatus.PENDING).length,
        recentInvoices: invoices.slice(0, 5),
    };

    return {
        user,
        stats,
        isLoading,
    };
}
