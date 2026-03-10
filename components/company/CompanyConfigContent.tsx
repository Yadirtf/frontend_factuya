'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, FileKey, ShieldCheck, Loader2 } from 'lucide-react';
import { useCompanySettings } from '@/hooks/useCompanySettings';

export function CompanyConfigContent() {
    const {
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
        handleSaveProfile,
        handleUploadCertificate
    } = useCompanySettings();

    if (isLoading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">Configuración</h2>
                <p className="text-slate-500">
                    Administra los datos de tu empresa y la conexión con la DIAN.
                </p>
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
                            <CardDescription>Información básica comercial y de contacto.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>NIT</Label>
                                <Input value={company?.nit ? (typeof company.nit === 'object' ? `${company.nit.raw}-${company.nit.checkDigit}` : company.nit) : ''} disabled />
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
                            <CardDescription>Identificadores proporcionados por el portal de habilitación.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Software ID</Label>
                                <Input value={softwareId} onChange={e => setSoftwareId(e.target.value)} placeholder="Ej: 3k4j5h-..." />
                            </div>
                            <div className="space-y-2">
                                <Label>Test Set ID / Llave técnica</Label>
                                <Input value={technicalKey} onChange={e => setTechnicalKey(e.target.value)} placeholder="Ej: 900sdf..." />
                            </div>
                            <div className="space-y-2">
                                <Label>Número de Resolución (Pruebas)</Label>
                                <Input value={resolutionNumber} onChange={e => setResolutionNumber(e.target.value)} placeholder="18760000001" />
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
                    {/* Certificate Upload */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileKey className="h-5 w-5 text-slate-500" />
                                Certificado Digital (.p12)
                            </CardTitle>
                            <CardDescription>Sube tu certificado de firma digital provisto por GSE, Certicamara u otro.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 bg-amber-50 text-amber-800 text-sm rounded-lg border border-amber-200">
                                <span className="font-semibold">¡Importante!</span> El certificado se encriptará inmediatamente en el servidor. Tu contraseña nunca se guarda en texto plano.
                            </div>

                            <div className="space-y-2">
                                <Label>Archivo .p12</Label>
                                <Input type="file" accept=".p12,.pfx" onChange={e => setCertificateFile(e.target.files?.[0] || null)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Contraseña del Certificado</Label>
                                <Input type="password" value={certificatePassword} onChange={e => setCertificatePassword(e.target.value)} placeholder="••••••••" />
                            </div>
                            <Button variant="secondary" onClick={handleUploadCertificate} disabled={isUploading || !certificateFile || !certificatePassword} className="w-full">
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
