import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface Webhook {
    id: string;
    url: string;
    events: string[];
    secret: string;
    isActive: boolean;
    createdAt: Date;
}

export interface CreateWebhookDto {
    url: string;
    events?: string[];
    companyId?: string;
}

export const useWebhooks = (companyId?: string) => {
    const queryClient = useQueryClient();

    const useGetWebhooks = () =>
        useQuery<Webhook[]>({
            queryKey: ['webhooks', companyId],
            queryFn: async () => {
                const url = companyId ? `/webhooks?companyId=${companyId}` : '/webhooks';
                const { data } = await apiClient.get(url);
                return data;
            },
        });

    const useCreateWebhook = () =>
        useMutation({
            mutationFn: async (dto: CreateWebhookDto) => {
                const { data } = await apiClient.post('/webhooks', dto);
                return data;
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['webhooks', companyId] });
            },
        });

    const useDeleteWebhook = () =>
        useMutation({
            mutationFn: async (id: string) => {
                const url = companyId ? `/webhooks/${id}?companyId=${companyId}` : `/webhooks/${id}`;
                const { data } = await apiClient.delete(url);
                return data;
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['webhooks', companyId] });
            },
        });

    return { useGetWebhooks, useCreateWebhook, useDeleteWebhook };
};
