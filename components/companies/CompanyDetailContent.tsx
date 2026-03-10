'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, FileKey, ShieldCheck, Loader2, ArrowLeft, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCompanyDetail } from '@/hooks/useCompanyDetail';

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
                    {/* Basic Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-slate-500" />
                                Datos de la Empresa
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>NIT</Label>
                                <Input value={company.nit ? (typeof company.nit === 'object' ? `${company.nit.raw}-${company.nit.checkDigit}` : company.nit) : ''} disabled />
                            </div>
                            <div className="space-y-2">
                                <Label>Razón Social</Label>
                                <Input value={businessName} onChange={e => setBusinessName(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Dirección</Label>
                                <Input value={address} onChange={e => setAddress(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Teléfono</Label>
                                <Input value={phone} onChange={e => setPhone(e.target.value)} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* DIAN Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-slate-500" />
                                Credenciales DIAN
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Software ID</Label>
                                <Input value={softwareId} onChange={e => setSoftwareId(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Test Set ID / Llave técnica</Label>
                                <Input value={technicalKey} onChange={e => setTechnicalKey(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Número de Resolución (Pruebas)</Label>
                                <Input value={resolutionNumber} onChange={e => setResolutionNumber(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Entorno</Label>
                                <Select value={isTestEnvironment ? "test" : "prod"} onValueChange={(val) => setIsTestEnvironment(val === 'test')}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="test">Pruebas (Habilitación)</SelectItem>
                                        <SelectItem value="prod">Producción</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button onClick={handleSaveProfile} disabled={isUpdating} className="w-full mt-2">
                                {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Guardar Configuración
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    {/* API Keys and Webhooks */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileKey className="h-5 w-5 text-indigo-500" />
                                Integraciones (API & Webhooks)
                            </CardTitle>
                            <CardDescription>Genera llaves de acceso para el software de este cliente.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* API Keys Block */}
                                <div>
                                    <Label className="text-base font-semibold">API Keys Registradas</Label>
                                    {isLoadingKeys ? (
                                        <p className="text-sm text-slate-500 mt-2">Cargando llaves...</p>
                                    ) : apiKeys && apiKeys.length > 0 ? (
                                        <div className="mt-2 space-y-2 max-h-[150px] overflow-y-auto pr-2">
                                            {apiKeys.map(key => (
                                                <div key={key.id} className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm font-medium text-indigo-900">{key.name}</p>
                                                        <p className="text-xs text-indigo-700 font-mono mt-1">{key.secretPrefix}*******************</p>
                                                    </div>
                                                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleRevokeApiKey(key.id)}>
                                                        Revocar
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-slate-500 mt-2">No hay API Keys generadas.</p>
                                    )}

                                    {generatedKey && (
                                        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                                            <p className="text-sm font-bold text-amber-900 mb-1">¡Copia esta llave ahora!</p>
                                            <p className="text-xs text-amber-800 mb-2">Por seguridad, no se volverá a mostrar.</p>
                                            <code className="block p-2 bg-white rounded border border-amber-300 text-xs break-all font-mono select-all">
                                                {generatedKey}
                                            </code>
                                        </div>
                                    )}

                                    <Button onClick={handleGenerateApiKey} disabled={isCreatingKey} variant="outline" size="sm" className="mt-4 w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                                        {isCreatingKey ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                                        Generar nueva API Key
                                    </Button>
                                </div>

                                <div className="border-t my-4"></div>

                                {/* Webhooks Block */}
                                <div>
                                    <Label className="text-base font-semibold">Webhooks Destino</Label>
                                    {isLoadingWebhooks ? (
                                        <p className="text-sm text-slate-500 mt-2">Cargando webhooks...</p>
                                    ) : webhooks && webhooks.length > 0 ? (
                                        <div className="mt-2 space-y-2">
                                            {webhooks.map((wh: any) => (
                                                <div key={wh.id} className="p-2 border rounded-lg flex items-center justify-between text-sm">
                                                    <span className="truncate max-w-[200px]" title={wh.url}>{wh.url}</span>
                                                    <Button variant="ghost" size="sm" className="text-red-500 h-6 px-2" onClick={() => deleteWebhook(wh.id)}>
                                                        Eliminar
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-slate-500 mt-2 mb-4">Ningún webhook registrado.</p>
                                    )}

                                    <div className="mt-4 space-y-2">
                                        <Label className="text-xs text-slate-500">Registrar nueva URL</Label>
                                        <div className="flex gap-2">
                                            <Input placeholder="https://api.tu-hotel.com/webhook" value={webhookUrl} onChange={e => setWebhookUrl(e.target.value)} className="h-9" />
                                            <Button size="sm" onClick={handleSaveWebhook} disabled={isCreatingWebhook} className="h-9">Guardar</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Certificate Upload */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileKey className="h-5 w-5 text-slate-500" />
                                Certificado Digital (.p12)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Archivo .p12</Label>
                                <Input type="file" accept=".p12,.pfx" onChange={e => setCertificateFile(e.target.files?.[0] || null)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Contraseña del Certificado</Label>
                                <Input type="password" value={certificatePassword} onChange={e => setCertificatePassword(e.target.value)} />
                            </div>
                            <Button variant="secondary" onClick={handleUploadCertificate} disabled={isUploading || !certificatePassword} className="w-full">
                                {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Subir y Validar Certificado
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
