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
import { DIAN_TAX_RESPONSIBILITIES } from '@/lib/constants/dian-catalogs';

export function CompanyTaxSection({ form }: { form: UseFormReturn<CompanyValues> }) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-800 pt-4 border-t">Obligaciones Tributarias y Legales</h3>
            
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="taxRegime"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Régimen Tributario</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione..." />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="COMMON">Responsable IVA</SelectItem>
                                    <SelectItem value="SIMPLIFIED">No Responsable</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="economicActivity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Código CIIU</FormLabel>
                            <FormControl><Input placeholder="5511" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={form.control}
                name="mercantileRegistration"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Registro de Matrícula Mercantil</FormLabel>
                        <FormControl><Input placeholder="Ej: 0000123456" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="taxResponsibilities"
                render={() => (
                    <FormItem>
                        <FormLabel>Responsabilidades Tributarias (Múltiple)</FormLabel>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 bg-slate-50 p-4 rounded-lg border border-slate-100">
                            {DIAN_TAX_RESPONSIBILITIES.map((item) => (
                                <FormField
                                    key={item.value}
                                    control={form.control}
                                    name="taxResponsibilities"
                                    render={({ field }) => {
                                        return (
                                            <FormItem
                                                key={item.value}
                                                className="flex flex-row items-start space-x-3 space-y-0"
                                            >
                                                <FormControl>
                                                    <input
                                                        type="checkbox"
                                                        className="w-4 h-4 mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                                        checked={field.value?.includes(item.value)}
                                                        onChange={(e) => {
                                                            return e.target.checked
                                                                ? field.onChange([...field.value, item.value])
                                                                : field.onChange(
                                                                      field.value?.filter(
                                                                          (value) => value !== item.value
                                                                      )
                                                                  );
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal text-sm leading-snug cursor-pointer">
                                                    {item.label} <span className="text-slate-400">({item.value})</span>
                                                </FormLabel>
                                            </FormItem>
                                        )
                                    }}
                                />
                            ))}
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
