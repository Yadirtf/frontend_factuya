'use client';

import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCompanyDetail } from '@/hooks/useCompanyDetail';

import { CompanyBasicInfo } from './detail/CompanyBasicInfo';
import { CompanyDianSettings } from './detail/CompanyDianSettings';
import { CompanyIntegrations } from './detail/CompanyIntegrations';
import { CompanyCertificate } from './detail/CompanyCertificate';

export function CompanyDetailContent({ companyId }: { companyId: string }) {
    const router = useRouter();
    const {
        company, isLoading, isUpdating, isUploading,
        businessName, setBusinessName,
        address, setAddress,
        phone, setPhone,
        softwareId, setSoftwareId,
        technicalKey, setTechnicalKey,
        isTestEnvironment, setIsTestEnvironment,
        resolutionNumber, setResolutionNumber,
        setCertificateFile,
        certificatePassword, setCertificatePassword,
        webhookUrl, setWebhookUrl,
        generatedKey,
        apiKeys, isLoadingKeys, isCreatingKey,
        webhooks, isLoadingWebhooks, isCreatingWebhook,
        handleGenerateApiKey, handleRevokeApiKey, handleSaveWebhook,
        handleSaveProfile, handleUploadCertificate, deleteWebhook
    } = useCompanyDetail(companyId);

    if (isLoading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
        );
    }

    if (!company) {
        return (
            <div className="p-8 text-center text-red-500">
                <h2>Empresa no encontrada</h2>
                <Button onClick={() => router.push('/companies')} className="mt-4">Volver</Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-4 md:p-8">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/companies">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">{company.businessName}</h2>
                    <p className="text-slate-500">
                        Administrando configuración DIAN y credenciales del cliente.
                    </p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-6">
                    <CompanyBasicInfo
                        company={company}
                        businessName={businessName}
                        setBusinessName={setBusinessName}
                        address={address}
                        setAddress={setAddress}
                        phone={phone}
                        setPhone={setPhone}
                    />

                    <CompanyDianSettings
                        softwareId={softwareId}
                        setSoftwareId={setSoftwareId}
                        technicalKey={technicalKey}
                        setTechnicalKey={setTechnicalKey}
                        resolutionNumber={resolutionNumber}
                        setResolutionNumber={setResolutionNumber}
                        isTestEnvironment={isTestEnvironment}
                        setIsTestEnvironment={setIsTestEnvironment}
                        handleSaveProfile={handleSaveProfile}
                        isUpdating={isUpdating}
                    />
                </div>

                <div className="space-y-6">
                    <CompanyIntegrations
                        apiKeys={apiKeys || []}
                        isLoadingKeys={isLoadingKeys}
                        isCreatingKey={isCreatingKey}
                        generatedKey={generatedKey}
                        handleGenerateApiKey={handleGenerateApiKey}
                        handleRevokeApiKey={handleRevokeApiKey}
                        webhooks={webhooks || []}
                        isLoadingWebhooks={isLoadingWebhooks}
                        isCreatingWebhook={isCreatingWebhook}
                        webhookUrl={webhookUrl}
                        setWebhookUrl={setWebhookUrl}
                        handleSaveWebhook={handleSaveWebhook}
                        deleteWebhook={deleteWebhook}
                    />

                    <CompanyCertificate
                        setCertificateFile={setCertificateFile}
                        certificatePassword={certificatePassword}
                        setCertificatePassword={setCertificatePassword}
                        handleUploadCertificate={handleUploadCertificate}
                        isUploading={isUploading}
                    />
                </div>
            </div>
        </div>
    );
}
