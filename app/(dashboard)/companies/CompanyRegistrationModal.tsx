'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCompany } from '@/hooks/useCompany';
import { toast } from 'sonner';
import { Loader2, Plus, Building2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const companySchema = z.object({
    nit: z.string().min(8, 'NIT inválido'),
    businessName: z.string().min(3, 'Nombre de empresa demasiado corto'),
    tradeName: z.string().optional().or(z.literal('')),
    email: z.string().email('Correo inválido').optional().or(z.literal('')),
    phone: z.string().min(7, 'Teléfono obligatorio'),
    address: z.string().min(5, 'Dirección física obligatoria'),
    city: z.string().min(2, 'Ciudad obligatoria'),
    department: z.string().min(2, 'Departamento obligatorio'),
    taxRegime: z.enum(['SIMPLIFIED', 'COMMON']),
    economicActivity: z.string().min(4, 'Código CIIU obligatorio'),
});

type CompanyValues = z.infer<typeof companySchema>;

export function CompanyRegistrationModal() {
    const [open, setOpen] = useState(false);
    const { useCreateCompany } = useCompany();
    const createMutation = useCreateCompany();

    const form = useForm<CompanyValues>({
        resolver: zodResolver(companySchema),
        defaultValues: {
            nit: '',
            businessName: '',
            tradeName: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            department: '',
            taxRegime: 'COMMON',
            economicActivity: '',
        },
    });

    const onSubmit = (data: CompanyValues) => {
        createMutation.mutate(data, {
            onSuccess: () => {
                toast.success('Empresa registrada', {
                    description: 'La empresa cliente fue creada exitosamente.',
                });
                form.reset();
                setOpen(false);
            },
            onError: (error: any) => {
                console.error('FRONTEND ERROR DUMP:', error?.response?.data || error);
                toast.error('Error al registrar empresa', {
                    description: JSON.stringify(error?.response?.data?.message || error.message),
                });
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="mr-2 h-4 w-4" /> Registrar Empresa
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl cursor-default">
                        <Building2 className="h-6 w-6 text-emerald-600" />
                        Registrar Nueva Empresa Cliente
                    </DialogTitle>
                    <DialogDescription>
                        Complete los datos de la entidad a la que le va a proveer servicios de facturación.
                    </DialogDescription>
                </DialogHeader>

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
                                onClick={() => setOpen(false)}
                                disabled={createMutation.isPending}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                className="bg-emerald-600 hover:bg-emerald-700"
                                disabled={createMutation.isPending}
                            >
                                {createMutation.isPending ? (
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
            </DialogContent>
        </Dialog>
    );
}
