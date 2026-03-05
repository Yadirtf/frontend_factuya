'use client';

import { useInvoices } from '@/hooks/useInvoices';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { InvoiceStatus } from '@/lib/types/invoice';

// Interface mock asumiendo que el backend nos devolverá en un futuro un enpoint de stats
interface DashboardStats {
    totalInvoices: number;
    acceptedDian: number;
    rejectedDian: number;
    pendingDocs: number;
    recentInvoices: any[];
}

export default function DashboardPage() {
    const { user } = useAuthStore();
    const { useGetInvoices } = useInvoices({ limit: 100 });
    const { data: invoicesResult, isLoading } = useGetInvoices();

    const invoices = invoicesResult?.data || [];

    const stats: DashboardStats = {
        totalInvoices: invoices.length,
        acceptedDian: invoices.filter((i) => i.status === InvoiceStatus.ACCEPTED).length,
        rejectedDian: invoices.filter((i) => i.status === InvoiceStatus.REJECTED).length,
        pendingDocs: invoices.filter((i) => i.status === InvoiceStatus.DRAFT || i.status === InvoiceStatus.PENDING).length,
        recentInvoices: invoices.slice(0, 5),
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h2>
                <p className="text-slate-500">
                    Resumen general de facturación electrónica y estado DIAN.
                </p>
            </div>

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

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Facturas Recientes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <p className="text-sm text-slate-500">Cargando datos...</p>
                        ) : stats.recentInvoices.length > 0 ? (
                            <div className="space-y-4">
                                {stats.recentInvoices.map((inv) => (
                                    <div key={inv.id} className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border">
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">{inv.prefix}-{inv.number}</p>
                                            <p className="text-xs text-slate-500">{new Date(inv.issueDate).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-slate-900">
                                                {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(inv.totalAmount)}
                                            </p>
                                            <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${inv.status === 'ACCEPTED' ? 'bg-emerald-100 text-emerald-700' :
                                                inv.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                                                    inv.status === 'DRAFT' ? 'bg-slate-200 text-slate-700' :
                                                        'bg-amber-100 text-amber-700'
                                                }`}>
                                                {inv.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed rounded-lg">
                                <FileText className="h-8 w-8 text-slate-300 mb-2" />
                                <p className="text-sm text-slate-500">No hay facturas registradas aún.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
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
            </div>
        </div>
    );
}
