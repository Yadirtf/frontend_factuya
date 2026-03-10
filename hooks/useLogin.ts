import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { apiClient } from '@/lib/api-client';
import { toast } from 'sonner';
import axios from 'axios';
import { LoginValues } from '@/schemas/login.schema';

export function useLogin() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (data: LoginValues) => {
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
    };

    return {
        login,
        isLoading,
    };
}
