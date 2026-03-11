import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InvoiceFormValues } from '../../../schemas/schema';

interface InvoiceNotesProps {
    form: UseFormReturn<InvoiceFormValues>;
}

export const InvoiceNotes = ({ form }: InvoiceNotesProps) => {
    return (
        <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b">
                <CardTitle className="text-lg flex items-center gap-2">
                    Notas Adicionales
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <textarea
                                    {...field}
                                    className="w-full min-h-[100px] p-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                                    placeholder="Observaciones de la factura, condiciones de pago, etc."
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
    );
};
