import { UseFormReturn, UseFieldArrayReturn } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { FormField, FormItem, FormControl } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TaxType } from '@/lib/types/invoice';
import { InvoiceFormValues } from '../../../schemas/schema';
import { formatCurrency } from '@/lib/invoice-math';

interface InvoiceItemsTableProps {
    form: UseFormReturn<InvoiceFormValues>;
    fields: UseFieldArrayReturn<InvoiceFormValues, "items">['fields'];
    append: UseFieldArrayReturn<InvoiceFormValues, "items">['append'];
    remove: UseFieldArrayReturn<InvoiceFormValues, "items">['remove'];
    watchItems: InvoiceFormValues['items'];
}

export const InvoiceItemsTable = ({ form, fields, append, remove, watchItems }: InvoiceItemsTableProps) => {
    return (
        <Card className="border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b flex flex-row items-center justify-between py-4">
                <CardTitle className="text-lg">Ítems de la Factura</CardTitle>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({
                        productCode: '', description: '', quantity: 1,
                        unitPrice: 0, discount: 0, taxRate: 19, taxType: TaxType.IVA
                    })}
                    className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                >
                    <Plus className="mr-2 h-4 w-4" /> Agregar Ítem
                </Button>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b">
                            <tr>
                                <th className="px-4 py-3 min-w-[120px]">Código</th>
                                <th className="px-4 py-3 min-w-[250px]">Descripción</th>
                                <th className="px-4 py-3 w-[100px]">Cant.</th>
                                <th className="px-4 py-3 min-w-[150px]">Precio Unit.</th>
                                <th className="px-4 py-3 w-[120px]">IVA %</th>
                                <th className="px-4 py-3 min-w-[150px] text-right">Subtotal</th>
                                <th className="px-4 py-3 w-[50px]"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {fields.map((field, index) => {
                                const qty = watchItems[index]?.quantity || 0;
                                const price = watchItems[index]?.unitPrice || 0;
                                const disc = watchItems[index]?.discount || 0;
                                const subtotal = (qty * price) - disc;

                                return (
                                    <tr key={field.id} className="hover:bg-slate-50/30 transition-colors">
                                        <td className="px-4 py-3">
                                            <FormField
                                                control={form.control}
                                                name={`items.${index}.productCode`}
                                                render={({ field }) => (
                                                    <Input placeholder="REF-001" {...field} className="h-9" />
                                                )}
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <FormField
                                                control={form.control}
                                                name={`items.${index}.description`}
                                                render={({ field }) => (
                                                    <Input placeholder="Descripción del producto" {...field} className="h-9" />
                                                )}
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <FormField
                                                control={form.control}
                                                name={`items.${index}.quantity`}
                                                render={({ field }) => (
                                                    <Input
                                                        type="number"
                                                        {...field}
                                                        onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                                                        className="h-9"
                                                    />
                                                )}
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <FormField
                                                control={form.control}
                                                name={`items.${index}.unitPrice`}
                                                render={({ field }) => (
                                                    <Input
                                                        type="number"
                                                        {...field}
                                                        onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                                                        className="h-9"
                                                    />
                                                )}
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <FormField
                                                control={form.control}
                                                name={`items.${index}.taxRate`}
                                                render={({ field }) => (
                                                    <Select
                                                        onValueChange={(val) => field.onChange(parseFloat(val))}
                                                        defaultValue={field.value.toString()}
                                                    >
                                                        <SelectTrigger className="h-9">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="19">19%</SelectItem>
                                                            <SelectItem value="5">5%</SelectItem>
                                                            <SelectItem value="0">0%</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-right font-medium">
                                            {formatCurrency(subtotal)}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => remove(index)}
                                                className="text-slate-400 hover:text-red-600 h-8 w-8"
                                                disabled={fields.length === 1}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
};
