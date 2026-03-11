import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShieldCheck, Loader2 } from 'lucide-react';

interface CompanyDianSettingsProps {
    softwareId: string;
    setSoftwareId: (val: string) => void;
    technicalKey: string;
    setTechnicalKey: (val: string) => void;
    resolutionNumber: string;
    setResolutionNumber: (val: string) => void;
    isTestEnvironment: boolean;
    setIsTestEnvironment: (val: boolean) => void;
    handleSaveProfile: () => void;
    isUpdating: boolean;
}

export function CompanyDianSettings({
    softwareId, setSoftwareId,
    technicalKey, setTechnicalKey,
    resolutionNumber, setResolutionNumber,
    isTestEnvironment, setIsTestEnvironment,
    handleSaveProfile,
    isUpdating
}: CompanyDianSettingsProps) {
    return (
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
    );
}
