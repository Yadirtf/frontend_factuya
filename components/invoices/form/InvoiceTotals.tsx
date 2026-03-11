import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, InvoiceTotals as InvoiceTotalsType } from '@/lib/invoice-math';

interface InvoiceTotalsProps {
    totals: InvoiceTotalsType;
    isPending: boolean;
}

export const InvoiceTotals = ({ totals, isPending }: InvoiceTotalsProps) => {
    return (
        <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b">
                <CardTitle className="text-lg">Resumen de Totales</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Subtotal:</span>
                    <span className="font-medium text-slate-900">
                        {formatCurrency(totals.subtotal)}
                    </span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Impuestos (IVA):</span>
                    <span className="font-medium text-slate-900">
                        {formatCurrency(totals.totalTax)}
                    </span>
                </div>
                <div className="border-t pt-4 flex justify-between items-center">
                    <span className="font-bold text-slate-900">TOTAL:</span>
                    <span className="text-xl font-bold text-emerald-600">
                        {formatCurrency(totals.total)}
                    </span>
                </div>
                <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 h-11"
                    disabled={isPending}
                >
                    <Save className="mr-2 h-4 w-4" />
                    {isPending ? 'Guardando...' : 'Guardar Factura'}
                </Button>
            </CardContent>
        </Card>
    );
};
