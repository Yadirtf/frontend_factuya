'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuthStore } from '@/store/auth.store';
import { apiClient } from '@/lib/api-client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import axios, { AxiosError } from 'axios';

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

const loginSchema = z.object({
    email: z.string().email('Por favor ingrese un correo válido'),
    password: z.string().min(1, 'La contraseña es obligatoria'),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    });

    async function onSubmit(data: LoginValues) {
        try {
            setIsLoading(true);
            const response = await apiClient.post('/auth/login', data);

            // Backend debería devolver el token y los datos del usuario.
            const { accessToken, user } = response.data;

            setAuth(user, accessToken);
            toast.success('¡Bienvenido de nuevo!', {
                description: 'Inicio de sesión exitoso.',
            });

            // Forzamos redirección porque el middleware la requiere
            router.push('/dashboard');
        } catch (error: unknown) {
            let errorMessage = 'Credenciales incorrectas o error en el servidor.';
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || errorMessage;
            }
            toast.error('Error de Autenticación', {
                description: errorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full">
            <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">Iniciar Sesión</h2>
                <p className="text-slate-500 mt-2">Bienvenido a FacturaYa. Ingresa tus credenciales para continuar.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-slate-700">Correo Electrónico</FormLabel>
                                <FormControl>
                                    <Input placeholder="usuario@empresa.com" {...field} className="h-11" disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center justify-between">
                                    <FormLabel className="text-slate-700">Contraseña</FormLabel>
                                    <a href="#" className="text-sm text-emerald-600 hover:text-emerald-500 font-medium">
                                        ¿Olvidaste tu contraseña?
                                    </a>
                                </div>
                                <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} className="h-11" disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Ingresando...
                            </>
                        ) : (
                            'Ingresar al Sistema'
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
