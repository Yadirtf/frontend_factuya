import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardCompanyInfoProps {
    user: any;
}

export function DashboardCompanyInfo({ user }: DashboardCompanyInfoProps) {
    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Información de Empresa</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-lg border">
                        <p className="text-xs font-semibold text-slate-500 uppercase">Tenant ID</p>
                        <p className="text-sm font-mono mt-1 text-slate-900">{user?.companyId || 'No disponible'}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg border">
                        <p className="text-xs font-semibold text-slate-500 uppercase">Usuario Operador</p>
                        <p className="text-sm mt-1 text-slate-900 font-medium">{user?.email}</p>
                        <p className="text-xs text-slate-500">{user?.role}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
