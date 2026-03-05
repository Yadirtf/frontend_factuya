import axios from 'axios';
import Cookies from 'js-cookie';

// Interfaz para la respuesta de Auth
interface TokenResponse {
    accessToken: string;
    // refreshToken usualmente viaja en httponly cookie desde el backend, pero si lo devuelve lo tipamos
    refreshToken?: string;
}

// Cliente global pre-configurado
export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
    withCredentials: true, // Importante para enviar Cookies (refresh token)
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor de REQUEST: Añadir Access Token
apiClient.interceptors.request.use(
    (config) => {
        const token = Cookies.get('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Variables para prevenir múltiples llamados de refresh simultáneos
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

// Interceptor de RESPONSE: Manejar 401 y Refresh Token automático
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Si es 401 y NO es una petición de auth/login (para evitar loop)
        if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes('/auth/login')) {
            if (isRefreshing) {
                // Si ya se está refrescando, poner la petición en espera
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return apiClient(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Intentar refrescar usando el refresh_token
                const refreshResponse = await axios.post<TokenResponse>(
                    `${apiClient.defaults.baseURL}/auth/refresh`,
                    {},
                    { withCredentials: true } // Enviar cookie jwt_refresh
                );

                const newAccessToken = refreshResponse.data.accessToken;

                // Guardar nuevo token en UI (cookie simple para fácil acceso cliente)
                Cookies.set('accessToken', newAccessToken, { secure: true, sameSite: 'strict' });

                apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                processQueue(null, newAccessToken);

                // Reintentar request original
                return apiClient(originalRequest);
            } catch (refreshError) {
                // Si falla el refresh, desloguear usuario
                processQueue(refreshError, null);
                Cookies.remove('accessToken');

                // Redirigir al login si estamos en el cliente
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);
