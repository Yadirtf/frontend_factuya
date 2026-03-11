import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send, XCircle, FileText, Download, Loader2 } from 'lucide-react';
import { InvoiceStatus } from '@/lib/types/invoice';
import { useRouter } from 'next/navigation';

interface InvoiceDetailHeaderProps {
    invoice: {
        id: string;
        prefix: string;
        number: string;
        status: InvoiceStatus;
        issueDate: string;
    };
    isCanceling: boolean;
    isSending: boolean;
    cancelInvoice: (id: string) => void;
    sendToDian: (id: string) => void;
    getStatusColor: (status: InvoiceStatus) => string;
}

export function InvoiceDetailHeader({
    invoice,
    isCanceling,
    isSending,
    cancelInvoice,
    sendToDian,
    getStatusColor
}: InvoiceDetailHeaderProps) {
    const router = useRouter();

    return (
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
    );
}
