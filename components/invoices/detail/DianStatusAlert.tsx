import { CheckCircle2, AlertCircle } from 'lucide-react';
import { InvoiceStatus } from '@/lib/types/invoice';

interface DianStatusAlertProps {
    status: InvoiceStatus;
    dianResponse?: string;
    cufe?: string;
}

export function DianStatusAlert({ status, dianResponse, cufe }: DianStatusAlertProps) {
    if (!dianResponse) return null;

    const isAccepted = status === InvoiceStatus.ACCEPTED;

    return (
        <div className={`p-4 rounded-lg border flex gap-3 ${isAccepted ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-red-50 border-red-200 text-red-900'}`}>
            {isAccepted ? <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" /> : <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />}
            <div>
                <h4 className="font-semibold">{isAccepted ? 'Aceptada por la DIAN' : 'Rechazada por la DIAN'}</h4>
                <p className="text-sm mt-1">{dianResponse}</p>
                {cufe && (
                    <p className="text-xs font-mono mt-2 bg-white/50 p-2 rounded break-all border border-black/10">
                        CUFE: {cufe}
                    </p>
                )}
            </div>
        </div>
    );
}
