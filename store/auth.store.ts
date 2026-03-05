import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

export interface UserContext {
    sub: string;
    companyId: string;
    role: string;
    email: string;
}

interface AuthState {
    user: UserContext | null;
    isAuthenticated: boolean;
    setAuth: (user: UserContext, accessToken: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                isAuthenticated: false,

                setAuth: (user: UserContext, accessToken: string) => {
                    // Guardamos token en cookie cliente (Next Middleware podrá leerlo rápido)
                    Cookies.set('accessToken', accessToken, { secure: true, sameSite: 'strict' });
                    set({ user, isAuthenticated: true });
                },

                logout: () => {
                    Cookies.remove('accessToken');
                    // TODO: llamar opcionalmente api-client para eliminar refresh cookie de backend
                    set({ user: null, isAuthenticated: false });
                },
            }),
            {
                name: 'auth-storage', // key en localStorage
                // persistimos solo datos usuario, token en cookie
                partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
            }
        ),
        { name: 'AuthStore' }
    )
);
