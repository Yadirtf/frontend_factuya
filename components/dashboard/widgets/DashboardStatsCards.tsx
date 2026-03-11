import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { DashboardStats } from '@/hooks/useDashboardStats';

interface DashboardStatsCardsProps {
    stats: DashboardStats;
    isLoading: boolean;
}

export function DashboardStatsCards({ stats, isLoading }: DashboardStatsCardsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">Total Emitidas</CardTitle>
                    <FileText className="h-4 w-4 text-slate-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{isLoading ? '-' : stats.totalInvoices}</div>
                    <p className="text-xs text-slate-500 mt-1">Facturas registradas en sistema</p>
                </CardContent>
            </Card>

            <Card className="border-l-4 border-l-emerald-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">Aceptadas DIAN</CardTitle>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-emerald-600">{isLoading ? '-' : stats.acceptedDian}</div>
                    <p className="text-xs text-slate-500 mt-1">Con CUFE validado</p>
                </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">Borradores / Pendientes</CardTitle>
                    <Clock className="h-4 w-4 text-amber-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-amber-600">{isLoading ? '-' : stats.pendingDocs}</div>
                    <p className="text-xs text-slate-500 mt-1">Sin enviar a la DIAN</p>
                </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">Rechazadas</CardTitle>
                    <AlertCircle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-red-600">{isLoading ? '-' : stats.rejectedDian}</div>
                    <p className="text-xs text-slate-500 mt-1">Requieren corrección</p>
                </CardContent>
            </Card>
        </div>
    );
}
