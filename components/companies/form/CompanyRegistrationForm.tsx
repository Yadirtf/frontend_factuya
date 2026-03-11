import { UseFormReturn } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CompanyValues } from '@/schemas/company.schema';

interface CompanyRegistrationFormProps {
    form: UseFormReturn<CompanyValues>;
    onSubmit: (data: CompanyValues) => void;
    onCancel: () => void;
    isPending: boolean;
}

export function CompanyRegistrationForm({
    form,
    onSubmit,
    onCancel,
    isPending
}: CompanyRegistrationFormProps) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="nit"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>NIT</FormLabel>
                                <FormControl><Input placeholder="900123456-1" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Teléfono</FormLabel>
                                <FormControl><Input placeholder="300..." {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Razón Social</FormLabel>
                            <FormControl><Input placeholder="Hotel El Tesoro S.A.S" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="tradeName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre Comercial (Opcional)</FormLabel>
                                <FormControl><Input placeholder="El Tesoro" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Correo Electrónico (Opcional)</FormLabel>
                                <FormControl><Input type="email" placeholder="recepcion@hotel.com" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ciudad</FormLabel>
                                <FormControl><Input placeholder="Medellín" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Departamento</FormLabel>
                                <FormControl><Input placeholder="Antioquia" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dirección Física</FormLabel>
                            <FormControl><Input placeholder="Carrera 123..." {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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

                <div className="flex justify-end pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        className="mr-3"
                        onClick={onCancel}
                        disabled={isPending}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Guardando...
                            </>
                        ) : (
                            'Crear Empresa'
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
