import { LoginForm } from '@/components/login/LoginForm';

export default function LoginPage() {
    return (
        <div className="w-full">
            <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">Iniciar Sesión</h2>
                <p className="text-slate-500 mt-2">Bienvenido a FacturaYa. Ingresa tus credenciales para continuar.</p>
            </div>

            <LoginForm />
        </div>
    );
}
