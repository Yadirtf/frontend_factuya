import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Invoice, InvoiceFilters, PaginatedResponse } from '@/lib/types/invoice';
import { toast } from 'sonner';

export const useInvoices = (filters: InvoiceFilters = {}) => {
    const queryClient = useQueryClient();

    // Query para obtener facturas paginadas
    const useGetInvoices = () => {
        return useQuery({
            queryKey: ['invoices', filters],
            queryFn: async () => {
                const params = new URLSearchParams();
                if (filters.status) params.append('status', filters.status);
                if (filters.from) params.append('from', filters.from);
                if (filters.to) params.append('to', filters.to);
                if (filters.customerId) params.append('customerId', filters.customerId);
                if (filters.page) params.append('page', filters.page.toString());
                if (filters.limit) params.append('limit', filters.limit.toString());

                const response = await apiClient.get<PaginatedResponse<Invoice>>(`/invoices?${params.toString()}`);
                return response.data;
            },
        });
    };

    // Query para obtener detalle de una factura
    const useGetInvoice = (id: string) => {
        return useQuery({
            queryKey: ['invoice', id],
            queryFn: async () => {
                const response = await apiClient.get<Invoice>(`/invoices/${id}`);
                return response.data;
            },
            enabled: !!id,
        });
    };

    // Mutation para enviar a DIAN
    const useSendToDian = () => {
        return useMutation({
            mutationFn: async (id: string) => {
                const response = await apiClient.post(`/invoices/${id}/send-to-dian`);
                return response.data;
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['invoices'] });
                toast.success('Factura enviada a la DIAN correctamente');
            },
            onError: (error: any) => {
                toast.error('Error al enviar a la DIAN', {
                    description: error.response?.data?.message || 'Ocurrió un error inesperado',
                });
            },
        });
    };

    // Mutation para cancelar factura
    const useCancelInvoice = () => {
        return useMutation({
            mutationFn: async (id: string) => {
                const response = await apiClient.post(`/invoices/${id}/cancel`);
                return response.data;
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['invoices'] });
                toast.success('Factura cancelada correctamente');
            },
            onError: (error: any) => {
                toast.error('Error al cancelar la factura', {
                    description: error.response?.data?.message || 'Ocurrió un error inesperado',
                });
            },
        });
    };

    return {
        useGetInvoices,
        useGetInvoice,
        useSendToDian,
        useCancelInvoice,
    };
};
