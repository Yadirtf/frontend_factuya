import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileKey, Loader2 } from 'lucide-react';

interface CompanyCertificateProps {
    setCertificateFile: (file: File | null) => void;
    certificatePassword: string;
    setCertificatePassword: (val: string) => void;
    handleUploadCertificate: () => void;
    isUploading: boolean;
}

export function CompanyCertificate({
    setCertificateFile,
    certificatePassword,
    setCertificatePassword,
    handleUploadCertificate,
    isUploading
}: CompanyCertificateProps) {
    return (
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
    );
}
