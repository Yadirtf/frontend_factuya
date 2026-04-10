import { useState, useEffect } from 'react';
import { useCompany } from '@/hooks/useCompany';
import { toast } from 'sonner';

export function useCompanySettings() {
    const { useGetProfile, useUpdateProfile, useUploadCertificate } = useCompany();
    const { data: company, isLoading, refetch } = useGetProfile();
    const { mutateAsync: updateProfile, isPending: isUpdating } = useUpdateProfile();
    const { mutateAsync: uploadCertificate, isPending: isUploading } = useUploadCertificate();

    // Form states
    const [businessName, setBusinessName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [softwareId, setSoftwareId] = useState('');
    const [softwarePin, setSoftwarePin] = useState('');
    const [technicalKey, setTechnicalKey] = useState('');
    const [isTestEnvironment, setIsTestEnvironment] = useState(true);
    const [resolutionNumber, setResolutionNumber] = useState('');

    // File state
    const [certificateFile, setCertificateFile] = useState<File | null>(null);
    const [certificatePassword, setCertificatePassword] = useState('');

    useEffect(() => {
        if (company) {
            setBusinessName(company.businessName || '');
            setAddress(company.address || '');
            setPhone(company.phone || '');
            setSoftwareId(company.dianConfig?.softwareId || '');
            setSoftwarePin(company.dianConfig?.pin || '');
            setTechnicalKey(company.dianConfig?.technicalKey || '');
            setIsTestEnvironment(company.dianConfig?.isTestEnvironment ?? true);
            setResolutionNumber(company.dianConfig?.resolutionNumber || '');
        }
    }, [company]);

    const handleSaveProfile = async () => {
        try {
            await updateProfile({
                businessName,
                address,
                phone,
                dianConfig: {
                    softwareId,
                    pin: softwarePin,
                    technicalKey,
                    isTestEnvironment,
                    resolutionNumber,
                }
            });
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
            await uploadCertificate({ file: certificateFile, password: certificatePassword });
            toast.success('Certificado subido y validado exitosamente');
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
        softwarePin, setSoftwarePin,
        technicalKey, setTechnicalKey,
        isTestEnvironment, setIsTestEnvironment,
        resolutionNumber, setResolutionNumber,
        certificateFile, setCertificateFile,
        certificatePassword, setCertificatePassword,
        handleSaveProfile,
        handleUploadCertificate
    };
}
