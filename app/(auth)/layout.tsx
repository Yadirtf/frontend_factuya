import { FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Lado Izquierdo - Ilustración/Marca */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 text-white flex-col justify-between p-12 relative overflow-hidden">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-20 pointer-events-none" />
                <div className="absolute bottom-0 -left-20 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-20 pointer-events-none" />

                <div className="flex items-center gap-x-3 z-10">
                    <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                        <FileText className="text-white w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight">Factura<span className="text-emerald-400">Ya</span></span>
                </div>

                <div className="space-y-6 z-10 max-w-lg mt-20">
                    <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                        Facturación Electrónica DIAN para Empresas Modernas.
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Cumple con la Resolución 165 de manera fácil, rápida y centralizada. Emite facturas XML y firma con XAdES en un solo lugar.
                    </p>
                </div>

                <div className="z-10 text-sm text-slate-500">
                    © {new Date().getFullYear()} FacturaYa Colombia. Todos los derechos reservados.
                </div>
            </div>

            {/* Lado Derecho - Formulario Auth */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white/50 backdrop-blur-xl">
                <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in-95 duration-500">
                    {children}
                </div>
            </div>
        </div>
    );
}
