import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/invoice-math';

interface InvoiceSummaryCardsProps {
    subtotal: number;
    totalTax: number;
    total: number;
    customerId: string;
}

export function InvoiceSummaryCards({ subtotal, totalTax, total, customerId }: InvoiceSummaryCardsProps) {
    return (
        <div className="space-y-6">
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle>Totales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm text-slate-600">
                        <span>Subtotal</span>
                        <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600">
                        <span>Impuestos</span>
                        <span>{formatCurrency(totalTax)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-4 border-t">
                        <span>Total</span>
                        <span>{formatCurrency(total)}</span>
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
                        <p className="text-sm font-medium">{customerId}</p>
                    </div>
                    {/* ideally customer details would be fetched or populated, showing only ID for now */}
                </CardContent>
            </Card>
        </div>
    );
}
