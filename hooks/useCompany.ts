import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Company, UpdateCompanyDto } from '@/lib/types/company';

export const useCompany = () => {
    const queryClient = useQueryClient();

    const useGetProfile = () =>
        useQuery<Company>({
            queryKey: ['companyProfile'],
            queryFn: async () => {
                const { data } = await apiClient.get('/company/profile');
                return data;
            },
        });

    const useCreateCompany = () =>
        useMutation({
            mutationFn: async (dto: any) => {
                const { data } = await apiClient.post('/company', dto);
                return data;
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['companies'] });
            },
        });

    const useUpdateProfile = () =>
        useMutation({
            mutationFn: async (dto: UpdateCompanyDto) => {
                const { data } = await apiClient.patch('/company/profile', dto);
                return data;
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['companyProfile'] });
            },
        });

    const useUploadCertificate = () =>
        useMutation({
            mutationFn: async ({ file, password, companyId }: { file: File; password: string; companyId?: string }) => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('password', password);
                if (companyId) {
                    formData.append('companyId', companyId);
                }

                const { data } = await apiClient.patch('/company/certificate', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                return data;
            },
        });

    const useCompanies = (page = 1, limit = 50) =>
        useQuery<{ data: Company[]; total: number }>({
            queryKey: ['companies', page, limit],
            queryFn: async () => {
                const { data } = await apiClient.get(`/company?page=${page}&limit=${limit}`);
                return data;
            },
        });

    const useGetCompanyById = (id: string) =>
        useQuery<Company>({
            queryKey: ['company', id],
            queryFn: async () => {
                const { data } = await apiClient.get(`/company/${id}`);
                return data;
            },
            enabled: !!id,
        });

    return { useGetProfile, useCreateCompany, useUpdateProfile, useUploadCertificate, useCompanies, useGetCompanyById };
};
