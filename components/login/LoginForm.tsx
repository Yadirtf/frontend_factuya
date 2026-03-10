'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

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

import { loginSchema, LoginValues } from '@/schemas/login.schema';
import { useLogin } from '@/hooks/useLogin';

export function LoginForm() {
    const { login, isLoading } = useLogin();

    const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    });

    const onSubmit = (data: LoginValues) => {
        login(data);
    };

    return (
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
    );
}
