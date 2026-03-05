import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Customer, PaginatedResponse } from '@/lib/types/invoice';

export const useCustomers = (filters: { search?: string; page?: number; limit?: number } = {}) => {
    return useQuery({
        queryKey: ['customers', filters],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (filters.search) params.append('search', filters.search);
            if (filters.page) params.append('page', filters.page.toString());
            if (filters.limit) params.append('limit', filters.limit.toString());

            const response = await apiClient.get<PaginatedResponse<Customer>>(`/customers?${params.toString()}`);
            return response.data;
        },
    });
};

export const useCreateCustomer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: Partial<Customer>) => {
            const response = await apiClient.post<Customer>('/customers', data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
        },
    });
};
