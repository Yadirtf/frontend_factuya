import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Calculator, Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { InvoiceType } from '@/lib/types/invoice';
import { InvoiceFormValues } from '../../../schemas/schema';

interface CustomerData {
    id: string;
    businessName?: string;
    firstName?: string;
    lastName?: string;
    documentNumber: string;
}

interface CompanyData {
    id: string;
    businessName: string;
    nit: { raw: string };
}

interface InvoiceGeneralInfoProps {
    form: UseFormReturn<InvoiceFormValues>;
    customers: CustomerData[] | undefined;
    companies?: CompanyData[] | undefined;
    user?: any;
}

import { FormCombobox } from '@/components/ui/form-combobox';

export const InvoiceGeneralInfo = ({ form, customers, companies, user }: InvoiceGeneralInfoProps) => {
    const customerOptions = customers?.map((c) => ({
        label: `${c.businessName || `${c.firstName} ${c.lastName}`} (${c.documentNumber})`,
        value: c.id,
    })) || [];

    const companyOptions = companies?.map((c) => ({
        label: `${c.businessName} (NIT: ${c.nit.raw})`,
        value: c.id,
    })) || [];

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
                    
                    {user?.role === 'SUPER_ADMIN' && (
                        <FormField
                            control={form.control}
                            name="companyId"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Empresa Emisora (SuperAdmin)</FormLabel>
                                    <FormCombobox
                                        options={companyOptions}
                                        placeholder="Buscar empresa..."
                                        value={field.value || ''}
                                        onChange={field.onChange}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    <FormField
                        control={form.control}
                        name="customerId"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Cliente</FormLabel>
                                <FormCombobox
                                    options={customerOptions}
                                    placeholder="Buscar cliente..."
                                    value={field.value}
                                    onChange={field.onChange}
                                />
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
