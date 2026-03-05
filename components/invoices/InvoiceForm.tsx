'use client';

import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, Trash2, Calculator, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InvoiceType, TaxType } from '@/lib/types/invoice';
import { useCustomers } from '@/hooks/useCustomers';
import { useInvoices } from '@/hooks/useInvoices';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

const itemSchema = z.object({
    productCode: z.string().min(1, 'Código requerido'),
    description: z.string().min(1, 'Descripción requerida'),
    quantity: z.number().positive('Mínimo 1'),
    unitPrice: z.number().positive('Mínimo 0.01'),
    discount: z.number().min(0, 'Mínimo 0'),
    taxRate: z.number().min(0).max(100),
    taxType: z.nativeEnum(TaxType),
});

const invoiceSchema = z.object({
    type: z.nativeEnum(InvoiceType),
    customerId: z.string().min(1, 'Seleccione un cliente'),
    issueDate: z.string(),
    dueDate: z.string().optional(),
    notes: z.string().optional(),
    items: z.array(itemSchema).min(1, 'Agregue al menos un ítem'),
});

type InvoiceFormValues = z.infer<typeof invoiceSchema>;

export const InvoiceForm = () => {
    const router = useRouter();
    const { useCreateInvoice } = useInvoices();
    const createMutation = useCreateInvoice();
    const { data: customersData } = useCustomers({ limit: 100 });

    const form = useForm<InvoiceFormValues>({
        resolver: zodResolver(invoiceSchema),
        defaultValues: {
            type: InvoiceType.FV,
            customerId: '',
            issueDate: format(new Date(), 'yyyy-MM-dd'),
            items: [{
                productCode: '',
                description: '',
                quantity: 1,
                unitPrice: 0,
                discount: 0,
                taxRate: 19,
                taxType: TaxType.IVA,
            }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'items',
    });

    const watchItems = form.watch('items');

    const calculateTotals = () => {
        let subtotal = 0;
        let totalTax = 0;

        watchItems.forEach((item) => {
            const qty = item.quantity || 0;
            const price = item.unitPrice || 0;
            const disc = item.discount || 0;
            const rate = item.taxRate || 0;

            const itemSubtotal = (qty * price) - disc;
            const itemTax = itemSubtotal * (rate / 100);
            subtotal += itemSubtotal;
            totalTax += itemTax;
        });

        return {
            subtotal,
            totalTax,
            total: subtotal + totalTax,
        };
    };

    const totals = calculateTotals();

    const onSubmit = (values: InvoiceFormValues) => {
        const payload = {
            ...values,
            items: values.items.map(item => ({
                productCode: item.productCode,
                description: item.description,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                discount: item.discount,
                taxes: [{ type: item.taxType, rate: item.taxRate }]
            }))
        };

        createMutation.mutate(payload, {
            onSuccess: (data) => {
                router.push(`/invoices/${data.id}`);
            },
            onError: (error: unknown) => {
                const axiosError = error as { response?: { data?: { message?: string } } };
                console.error("Error creating invoice:", axiosError);
            }
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-2 border-slate-200 shadow-sm">
                        <CardHeader className="bg-slate-50/50 border-b">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Calculator className="h-5 w-5 text-emerald-600" />
                                Información General
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="customerId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Cliente</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleccione un cliente" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {customersData?.data.map((c) => (
                                                        <SelectItem key={c.id} value={c.id}>
                                                            {c.businessName || `${c.firstName} ${c.lastName}`} ({c.documentNumber})
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tipo de Documento</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value={InvoiceType.FV}>Factura de Venta</SelectItem>
                                                    <SelectItem value={InvoiceType.NC}>Nota de Crédito</SelectItem>
                                                    <SelectItem value={InvoiceType.ND}>Nota de Débito</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="issueDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Fecha de Emisión</FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="dueDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Fecha de Vencimiento (Opcional)</FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader className="bg-slate-50/50 border-b">
                            <CardTitle className="text-lg">Resumen de Totales</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Subtotal:</span>
                                <span className="font-medium text-slate-900">
                                    {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(totals.subtotal)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Impuestos (IVA):</span>
                                <span className="font-medium text-slate-900">
                                    {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(totals.totalTax)}
                                </span>
                            </div>
                            <div className="border-t pt-4 flex justify-between items-center">
                                <span className="font-bold text-slate-900">TOTAL:</span>
                                <span className="text-xl font-bold text-emerald-600">
                                    {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(totals.total)}
                                </span>
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-emerald-600 hover:bg-emerald-700 h-11"
                                disabled={createMutation.isPending}
                            >
                                <Save className="mr-2 h-4 w-4" />
                                {createMutation.isPending ? 'Guardando...' : 'Guardar Factura'}
                            </Button>
                        </CardContent>
                    </Card>
                </div>

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
                                    {fields.map((field, index) => (
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
                                                {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(
                                                    ((watchItems[index]?.quantity || 0) * (watchItems[index]?.unitPrice || 0)) - (watchItems[index]?.discount || 0)
                                                )}
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
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

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
            </form>
        </Form>
    );
};
