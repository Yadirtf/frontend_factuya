import { useState, useEffect } from 'react';
import { useCompany } from '@/hooks/useCompany';
import { useApiKeys } from '@/hooks/useApiKeys';
import { useWebhooks } from '@/hooks/useWebhooks';
import { toast } from 'sonner';

export function useCompanyDetail(companyId: string) {
    const { useGetCompanyById, useUpdateProfile, useUploadCertificate } = useCompany();
    const { data: company, isLoading, refetch } = useGetCompanyById(companyId);
    const { mutateAsync: updateProfile, isPending: isUpdating } = useUpdateProfile();
    const { mutateAsync: uploadCertificate, isPending: isUploading } = useUploadCertificate();

    // Integrations Hooks
    const { useGetApiKeys, useCreateApiKey, useRevokeApiKey } = useApiKeys(companyId);
    const { data: apiKeys, isLoading: isLoadingKeys } = useGetApiKeys();
    const { mutateAsync: createApiKey, isPending: isCreatingKey } = useCreateApiKey();
    const { mutateAsync: revokeApiKey } = useRevokeApiKey();

    const { useGetWebhooks, useCreateWebhook, useDeleteWebhook } = useWebhooks(companyId);
    const { data: webhooks, isLoading: isLoadingWebhooks } = useGetWebhooks();
    const { mutateAsync: createWebhook, isPending: isCreatingWebhook } = useCreateWebhook();
    const { mutateAsync: deleteWebhook } = useDeleteWebhook();

    // Form states
    const [businessName, setBusinessName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [softwareId, setSoftwareId] = useState('');
    const [technicalKey, setTechnicalKey] = useState('');
    const [isTestEnvironment, setIsTestEnvironment] = useState(true);
    const [resolutionNumber, setResolutionNumber] = useState('');

    // File state
    const [certificateFile, setCertificateFile] = useState<File | null>(null);
    const [certificatePassword, setCertificatePassword] = useState('');

    const [webhookUrl, setWebhookUrl] = useState('');
    const [generatedKey, setGeneratedKey] = useState<string | null>(null);

    useEffect(() => {
        if (company) {
            setBusinessName(company.businessName || '');
            setAddress(company.address || '');
            setPhone(company.phone || '');
            setSoftwareId(company.dianConfig?.softwareId || '');
            setTechnicalKey(company.dianConfig?.technicalKey || '');
            setIsTestEnvironment(company.dianConfig?.isTestEnvironment ?? true);
            setResolutionNumber(company.dianConfig?.resolutionNumber || '');
        }
    }, [company]);

    const handleGenerateApiKey = async () => {
        try {
            const result = await createApiKey({ name: 'Sistema Externo', companyId });
            setGeneratedKey(result.rawSecret || null);
            toast.success('API Key generada. Cópiela y configúrela en el software del cliente.');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Error al generar API Key');
        }
    };

    const handleRevokeApiKey = async (id: string) => {
        try {
            await revokeApiKey(id);
            toast.success('API Key revocada');
        } catch (error: any) {
            toast.error('Error al revocar API Key');
        }
    };

    const handleSaveWebhook = async () => {
        if (!webhookUrl) return toast.error('Ingresa una URL válida');
        try {
            await createWebhook({ url: webhookUrl, companyId, events: ['INVOICE_ACCEPTED', 'INVOICE_REJECTED'] });
            toast.success('Webhook de notificaciones registrado');
            setWebhookUrl('');
        } catch (error: any) {
            toast.error('Error al registrar Webhook');
        }
    };

    const handleSaveProfile = async () => {
        try {
            await updateProfile({
                companyId, // We send the specific companyId for SUPER_ADMIN
                businessName,
                address,
                phone,
                dianConfig: {
                    softwareId,
                    technicalKey,
                    isTestEnvironment,
                    resolutionNumber,
                }
            } as any);
            toast.success('Configuración guardada exitosamente');
            refetch();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Error al guardar configuración');
        }
    };

    const handleUploadCertificate = async () => {
        if (!certificateFile || !certificatePassword) {
            toast.error('Por favor selecciona un archivo .p12 y escribe la contraseña');
            return;
        }

        try {
            await uploadCertificate({ file: certificateFile, password: certificatePassword, companyId });
            toast.success('Certificado subido exitosamente');
            setCertificateFile(null);
            setCertificatePassword('');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Error al subir el certificado');
        }
    };

    return {
        company, isLoading, isUpdating, isUploading,
        businessName, setBusinessName,
        address, setAddress,
        phone, setPhone,
        softwareId, setSoftwareId,
        technicalKey, setTechnicalKey,
        isTestEnvironment, setIsTestEnvironment,
        resolutionNumber, setResolutionNumber,
        certificateFile, setCertificateFile,
        certificatePassword, setCertificatePassword,
        webhookUrl, setWebhookUrl,
        generatedKey, setGeneratedKey,
        apiKeys, isLoadingKeys, isCreatingKey,
        webhooks, isLoadingWebhooks, isCreatingWebhook,
        handleGenerateApiKey, handleRevokeApiKey, handleSaveWebhook,
        handleSaveProfile, handleUploadCertificate, deleteWebhook
    };
}
