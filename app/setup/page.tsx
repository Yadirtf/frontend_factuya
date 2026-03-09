'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { apiClient } from '@/lib/api-client';
import { toast } from 'sonner';
import { Loader2, Building2, UserCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from '@/components/ui/card';

const setupSchema = z.object({
    // Admin Data
    adminEmail: z.string().email('Correo de administrador inválido'),
    adminPassword: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    adminFirstName: z.string().min(2, 'Nombre obligatorio'),
    adminLastName: z.string().min(2, 'Apellido obligatorio'),
});

type SetupValues = z.infer<typeof setupSchema>;

export default function SetupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        async function checkStatus() {
            try {
                const response = await apiClient.get('/auth/setup-status');
                if (response.data.initialized) {
                    toast.info('El sistema ya ha sido configurado.');
                    router.replace('/login');
                }
            } catch (error) {
                console.error('Error checking setup status', error);
            } finally {
                setIsChecking(false);
            }
        }
        checkStatus();
    }, [router]);

    const form = useForm<SetupValues>({
        resolver: zodResolver(setupSchema),
        defaultValues: {
            adminEmail: '',
            adminPassword: '',
            adminFirstName: '',
            adminLastName: '',
        },
    });

    async function onSubmit(data: SetupValues) {
        try {
            setIsLoading(true);
            await apiClient.post('/auth/setup', data);

            toast.success('¡Sistema Inicializado!', {
                description: 'La empresa y el administrador han sido creados. Ahora puedes iniciar sesión.',
            });

            router.push('/login');
        } catch (error: any) {
            let errorMessage = 'Error al inicializar el sistema.';
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || errorMessage;
            }
            toast.error('Error de Configuración', {
                description: errorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    }

    if (isChecking) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
                <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
                <p className="text-slate-500 font-medium">Verificando estado del sistema...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12 space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-2xl shadow-xl shadow-emerald-200 mb-4">
                        <ShieldCheck className="text-white w-10 h-10" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                        Configuración Inicial de Factura<span className="text-emerald-600">Ya</span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Bienvenido. Estás a un paso de habilitar tu plataforma de facturación electrónica.
                        Completa los datos de tu empresa y crea tu cuenta de administrador principal.
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="flex justify-center gap-8">
                            {/* Admin Information */}
                            <Card className="border-slate-200 shadow-sm rounded-3xl overflow-hidden h-fit w-full max-w-lg">
                                <div className="bg-slate-100/50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
                                    <UserCircle className="w-5 h-5 text-emerald-600" />
                                    <h2 className="font-bold text-slate-700">Cuenta de Dueño (Admin)</h2>
                                </div>
                                <CardContent className="p-6 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="adminFirstName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nombres</FormLabel>
                                                    <FormControl><Input placeholder="Juan" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="adminLastName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Apellidos</FormLabel>
                                                    <FormControl><Input placeholder="Pérez" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="adminEmail"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Correo de Acceso</FormLabel>
                                                <FormControl><Input placeholder="admin@empresa.com" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="adminPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Contraseña Maestra</FormLabel>
                                                <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                        </div>

                        <div className="flex flex-col items-center gap-4 pt-8">
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full max-w-md h-14 text-lg font-bold bg-emerald-600 hover:bg-emerald-700 rounded-2xl shadow-xl shadow-emerald-200"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Inicializando Sistema...
                                    </>
                                ) : (
                                    <>
                                        Finalizar Configuración <ArrowRight className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </Button>
                            <p className="text-sm text-slate-400">
                                Una vez completado, este instalador se desactivará por seguridad.
                            </p>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
