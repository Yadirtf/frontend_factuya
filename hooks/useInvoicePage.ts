import { useState } from 'react';
import { useInvoices } from '@/hooks/useInvoices';
import { InvoiceStatus } from '@/lib/types/invoice';

export function useInvoicePage() {
    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        status: undefined as InvoiceStatus | undefined,
    });

    const { useGetInvoices, useSendToDian, useCancelInvoice } = useInvoices(filters);
    const { data, isLoading, isError } = useGetInvoices();
    const sendMutation = useSendToDian();
    const cancelMutation = useCancelInvoice();

    const handleStatusChange = (value: string) => {
        setFilters(prev => ({
            ...prev,
            status: value === 'ALL' ? undefined : (value as InvoiceStatus),
            page: 1
        }));
    };

    return {
        filters,
        setFilters,
        data,
        isLoading,
        isError,
        sendMutation,
        cancelMutation,
        handleStatusChange
    };
}
