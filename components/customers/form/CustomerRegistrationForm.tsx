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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { FormCombobox } from '@/components/ui/form-combobox';

interface CustomerRegistrationFormProps {
    form: UseFormReturn<any>; // using 'any' to avoid strict circular types with Zod inferrence, or we could export the type
    onSubmit: (values: any) => void;
    isPending: boolean;
    user?: any;
    companies?: any[];
}

export function CustomerRegistrationForm({
    form,
    onSubmit,
    isPending,
    user,
    companies
}: CustomerRegistrationFormProps) {
    const companyOptions = companies?.map((c) => ({
        label: `${c.businessName} (NIT: ${c.nit.raw})`,
        value: c.id,
    })) || [];

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                
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

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="documentType"
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
                                        <SelectItem value="13">Cédula de Ciudadanía</SelectItem>
                                        <SelectItem value="31">NIT</SelectItem>
                                        <SelectItem value="22">Cédula de Extranjería</SelectItem>
                                        <SelectItem value="41">Pasaporte</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="documentNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Número de Documento</FormLabel>
                                <FormControl>
                                    <Input placeholder="12345678" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombres</FormLabel>
                                <FormControl>
                                    <Input placeholder="Juan" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Apellidos</FormLabel>
                                <FormControl>
                                    <Input placeholder="Pérez" {...field} />
                                </FormControl>
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
                            <FormLabel>Razón Social (Opcional)</FormLabel>
                            <FormControl>
                                <Input placeholder="Empresa S.A.S" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="cliente@ejemplo.com" {...field} />
                                </FormControl>
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
                                <FormControl>
                                    <Input placeholder="3001234567" {...field} />
                                </FormControl>
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
                            <FormLabel>Dirección</FormLabel>
                            <FormControl>
                                <Input placeholder="Calle 123 #45-67" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ciudad</FormLabel>
                                <FormControl>
                                    <Input placeholder="Bogotá" {...field} />
                                </FormControl>
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
                                <FormControl>
                                    <Input placeholder="Cundinamarca" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 mt-6"
                    disabled={isPending}
                >
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Registrando...
                        </>
                    ) : (
                        'Registrar Cliente'
                    )}
                </Button>
            </form>
        </Form>
    );
}
