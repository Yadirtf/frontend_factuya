import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiClient } from '@/lib/api-client';
import { toast } from 'sonner';
import axios from 'axios';
import { setupSchema, SetupValues } from '@/schemas/setup.schema';

export function useSetup() {
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

    return {
        form,
        isLoading,
        isChecking,
        onSubmit: form.handleSubmit(onSubmit)
    };
}
