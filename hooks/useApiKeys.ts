import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface ApiKeyPermission {
    // Enum matching backend
}

export interface CreateApiKeyDto {
    name: string;
    permissions?: string[];
    companyId?: string;
}

export interface ApiKey {
    id: string;
    name: string;
    secretPrefix: string;
    permissions: string[];
    isActive: boolean;
    lastUsedAt?: Date;
    createdAt: Date;
    rawSecret?: string;
}

export const useApiKeys = (companyId?: string) => {
    const queryClient = useQueryClient();

    const useGetApiKeys = () =>
        useQuery<ApiKey[]>({
            queryKey: ['apiKeys', companyId],
            queryFn: async () => {
                const url = companyId ? `/api-keys?companyId=${companyId}` : '/api-keys';
                const { data } = await apiClient.get(url);
                return data;
            },
        });

    const useCreateApiKey = () =>
        useMutation({
            mutationFn: async (dto: CreateApiKeyDto) => {
                const { data } = await apiClient.post('/api-keys', dto);
                return data;
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['apiKeys', companyId] });
            },
        });

    const useRevokeApiKey = () =>
        useMutation({
            mutationFn: async (id: string) => {
                const url = companyId ? `/api-keys/${id}?companyId=${companyId}` : `/api-keys/${id}`;
                const { data } = await apiClient.delete(url);
                return data;
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['apiKeys', companyId] });
            },
        });

    return { useGetApiKeys, useCreateApiKey, useRevokeApiKey };
};
