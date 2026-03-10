'use client';

import { Loader2, ShieldCheck, UserCircle, ArrowRight } from 'lucide-react';
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
import { Card, CardContent } from '@/components/ui/card';
import { useSetup } from '@/hooks/useSetup';

export function SetupContent() {
    const { form, isLoading, isChecking, onSubmit } = useSetup();

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
                    <form onSubmit={onSubmit} className="space-y-8">
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
