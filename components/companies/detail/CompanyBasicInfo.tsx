import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2 } from 'lucide-react';
import { Company } from '@/lib/types/company';

interface CompanyBasicInfoProps {
    company: Company;
    businessName: string;
    setBusinessName: (val: string) => void;
    address: string;
    setAddress: (val: string) => void;
    phone: string;
    setPhone: (val: string) => void;
}

export function CompanyBasicInfo({
    company,
    businessName,
    setBusinessName,
    address,
    setAddress,
    phone,
    setPhone
}: CompanyBasicInfoProps) {
    // Format NIT safely
    const formattedNit = useMemo(() => {
        if (!company.nit) return '';
        if (typeof company.nit === 'object' && company.nit !== null) {
            return `${company.nit.raw}-${company.nit.checkDigit}`;
        }
        return String(company.nit);
    }, [company.nit]);

    return (
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
                    <Input value={formattedNit} disabled />
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
    );
}
