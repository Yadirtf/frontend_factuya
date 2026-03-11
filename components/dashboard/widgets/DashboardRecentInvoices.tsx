import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { InvoiceStatus } from '@/lib/types/invoice';

interface DashboardRecentInvoicesProps {
    recentInvoices: any[];
    isLoading: boolean;
}

export function DashboardRecentInvoices({ recentInvoices, isLoading }: DashboardRecentInvoicesProps) {
    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Facturas Recientes</CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <p className="text-sm text-slate-500">Cargando datos...</p>
                ) : recentInvoices.length > 0 ? (
                    <div className="space-y-4">
                        {recentInvoices.map((inv) => (
                            <div key={inv.id} className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border">
                                <div>
                                    <p className="text-sm font-medium text-slate-900">{inv.prefix}-{inv.number}</p>
                                    <p className="text-xs text-slate-500">{new Date(inv.issueDate).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-slate-900">
                                        {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(inv.totalAmount)}
                                    </p>
                                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${inv.status === InvoiceStatus.ACCEPTED ? 'bg-emerald-100 text-emerald-700' :
                                        inv.status === InvoiceStatus.REJECTED ? 'bg-red-100 text-red-700' :
                                            inv.status === InvoiceStatus.DRAFT ? 'bg-slate-200 text-slate-700' :
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
    );
}
