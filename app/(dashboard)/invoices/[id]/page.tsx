'use client';

import { useParams, useRouter } from 'next/navigation';
import { useInvoices } from '@/hooks/useInvoices';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Send, XCircle, FileText, Download, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { InvoiceStatus } from '@/lib/types/invoice';

export default function InvoiceDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const { useGetInvoice, useSendToDian, useCancelInvoice } = useInvoices();
    const { data: invoice, isLoading } = useGetInvoice(id);
    const { mutateAsync: sendToDian, isPending: isSending } = useSendToDian();
    const { mutateAsync: cancelInvoice, isPending: isCanceling } = useCancelInvoice();

    if (isLoading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
        );
    }

    if (!invoice) {
        return (
            <div className="flex flex-col h-[400px] items-center justify-center gap-4">
                <p className="text-slate-500">Factura no encontrada</p>
                <Button variant="outline" onClick={() => router.push('/invoices')}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                </Button>
            </div>
        );
    }

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);

    const getStatusColor = (status: InvoiceStatus) => {
        switch (status) {
            case InvoiceStatus.ACCEPTED: return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case InvoiceStatus.REJECTED: return 'bg-red-100 text-red-800 border-red-200';
            case InvoiceStatus.DRAFT: return 'bg-slate-100 text-slate-800 border-slate-200';
            case InvoiceStatus.PENDING: return 'bg-amber-100 text-amber-800 border-amber-200';
            case InvoiceStatus.SENT: return 'bg-blue-100 text-blue-800 border-blue-200';
            case InvoiceStatus.CANCELLED: return 'bg-gray-100 text-gray-800 border-gray-200';
            default: return 'bg-slate-100 text-slate-800 border-slate-200';
        }
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.push('/invoices')}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                            Factura {invoice.prefix}-{invoice.number}
                            <Badge variant="outline" className={getStatusColor(invoice.status)}>
                                {invoice.status}
                            </Badge>
                        </h2>
                        <p className="text-sm text-slate-500">
                            Fecha de emisión: {new Date(invoice.issueDate).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <div className="flex gap-2">
                    {invoice.status === InvoiceStatus.DRAFT && (
                        <>
                            <Button
                                variant="destructive"
                                onClick={() => cancelInvoice(invoice.id)}
                                disabled={isCanceling}
                            >
                                {isCanceling ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="mr-2 h-4 w-4" />}
                                Cancelar
                            </Button>
                            <Button
                                onClick={() => sendToDian(invoice.id)}
                                disabled={isSending}
                                className="bg-emerald-600 hover:bg-emerald-700"
                            >
                                {isSending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                                Enviar a la DIAN
                            </Button>
                        </>
                    )}

                    {(invoice.status === InvoiceStatus.ACCEPTED || invoice.status === InvoiceStatus.REJECTED) && (
                        <>
                            <Button variant="outline" disabled title="Próximamente">
                                <FileText className="mr-2 h-4 w-4" /> Ver XML
                            </Button>
                            <Button variant="outline" disabled title="Próximamente">
                                <Download className="mr-2 h-4 w-4" /> Descargar PDF
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {/* DIAN Status Alert */}
            {invoice.dianResponse && (
                <div className={`p-4 rounded-lg border flex gap-3 ${invoice.status === InvoiceStatus.ACCEPTED ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-red-50 border-red-200 text-red-900'}`}>
                    {invoice.status === InvoiceStatus.ACCEPTED ? <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" /> : <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />}
                    <div>
                        <h4 className="font-semibold">{invoice.status === InvoiceStatus.ACCEPTED ? 'Aceptada por la DIAN' : 'Rechazada por la DIAN'}</h4>
                        <p className="text-sm mt-1">{invoice.dianResponse}</p>
                        {invoice.cufe && (
                            <p className="text-xs font-mono mt-2 bg-white/50 p-2 rounded break-all border border-black/10">
                                CUFE: {invoice.cufe}
                            </p>
                        )}
                    </div>
                </div>
            )}

            <div className="grid md:grid-cols-3 gap-6">
                {/* Details */}
                <Card className="col-span-2 shadow-sm">
                    <CardHeader>
                        <CardTitle>Detalle de Productos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Código</TableHead>
                                    <TableHead>Descripción</TableHead>
                                    <TableHead className="text-right">Cant.</TableHead>
                                    <TableHead className="text-right">V. Unitario</TableHead>
                                    <TableHead className="text-right">Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invoice.items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-mono text-xs">{item.productCode}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell className="text-right">{item.quantity}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                                        <TableCell className="text-right font-medium">{formatCurrency(item.total)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Totals & Info */}
                <div className="space-y-6">
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle>Totales</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between text-sm text-slate-600">
                                <span>Subtotal</span>
                                <span>{formatCurrency(invoice.subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-slate-600">
                                <span>Impuestos</span>
                                <span>{formatCurrency(invoice.totalTax)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg pt-4 border-t">
                                <span>Total</span>
                                <span>{formatCurrency(invoice.total)}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle>Cliente Adquirente</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <p className="text-xs text-slate-500 uppercase font-semibold">ID / NIT</p>
                                <p className="text-sm font-medium">{invoice.customerId}</p>
                            </div>
                            {/* ideally customer details would be fetched or populated, showing only ID for now */}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
