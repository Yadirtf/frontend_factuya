import { UseFormReturn } from 'react-hook-form';
import { Calculator } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InvoiceType } from '@/lib/types/invoice';
import { InvoiceFormValues } from '../../../schemas/schema';

interface CustomerData {
    id: string;
    businessName?: string;
    firstName?: string;
    lastName?: string;
    documentNumber: string;
}

interface InvoiceGeneralInfoProps {
    form: UseFormReturn<InvoiceFormValues>;
    customers: CustomerData[] | undefined;
}

export const InvoiceGeneralInfo = ({ form, customers }: InvoiceGeneralInfoProps) => {
    return (
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
                                        {customers?.map((c) => (
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
    );
};
