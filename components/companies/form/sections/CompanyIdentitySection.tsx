import { UseFormReturn } from 'react-hook-form';
import { CompanyValues } from '@/schemas/company.schema';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DIAN_DOCUMENT_TYPES, DIAN_ORGANIZATION_TYPES } from '@/lib/constants/dian-catalogs';

export function CompanyIdentitySection({ form }: { form: UseFormReturn<CompanyValues> }) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-800">Identidad y Razón Social</h3>
            
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 sm:col-span-6">
                    <FormField
                        control={form.control}
                        name="documentType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tipo de Documento</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Seleccione..." /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        {DIAN_DOCUMENT_TYPES.map(doc => (
                                            <SelectItem key={doc.value} value={doc.value}>{doc.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="col-span-12 sm:col-span-6">
                    <FormField
                        control={form.control}
                        name="organizationType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tipo de Organización</FormLabel>
                                <Select onValueChange={(val) => field.onChange(Number(val))} defaultValue={String(field.value || '')}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Seleccione..." /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        {DIAN_ORGANIZATION_TYPES.map(org => (
                                            <SelectItem key={org.value} value={String(org.value)}>{org.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-9">
                    <FormField
                        control={form.control}
                        name="nit"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Número Doc / NIT</FormLabel>
                                <FormControl><Input placeholder="900123456" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="col-span-3">
                    <FormField
                        control={form.control}
                        name="dv"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>DV</FormLabel>
                                <FormControl><Input placeholder="1" maxLength={1} {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Razón Social / Nombre Completo</FormLabel>
                            <FormControl><Input placeholder="Ej: Hotel S.A.S" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tradeName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre Comercial (Opc.)</FormLabel>
                            <FormControl><Input placeholder="Ej: El Tesoro" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
}
