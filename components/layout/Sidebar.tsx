'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth.store';
import {
    LayoutDashboard,
    FileText,
    Users,
    Settings,
    Shield,
    FileBadge,
    Building2,
} from 'lucide-react';

const routes = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard',
        roles: ['SUPER_ADMIN', 'ADMIN', 'OPERATOR', 'ACCOUNTANT'],
    },
    {
        label: 'Facturas',
        icon: FileText,
        href: '/invoices',
        roles: ['SUPER_ADMIN', 'ADMIN', 'OPERATOR', 'ACCOUNTANT'],
    },
    {
        label: 'Clientes',
        icon: Users,
        href: '/customers',
        roles: ['SUPER_ADMIN', 'ADMIN', 'OPERATOR'],
    },
    {
        label: 'Empresas Clientes',
        icon: Building2,
        href: '/companies',
        roles: ['SUPER_ADMIN'],
    },
    {
        label: 'Configuración Empresa',
        icon: Building2,
        href: '/company',
        roles: ['ADMIN'],
    },
    {
        label: 'Usuarios',
        icon: Shield,
        href: '/users',
        roles: ['SUPER_ADMIN', 'ADMIN'],
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const { user } = useAuthStore();
    const userRole = user?.role || '';

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-slate-900 text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4 bg-emerald-500 rounded-lg flex items-center justify-center">
                        <FileText className="text-white w-5 h-5" />
                    </div>
                    <h1 className="text-2xl font-bold">
                        Factura<span className="text-emerald-400">Ya</span>
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes
                        .filter((route) => route.roles.includes(userRole) || userRole === 'SUPER_ADMIN')
                        .map((route) => (
                            <Link
                                href={route.href}
                                key={route.href}
                                className={cn(
                                    'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
                                    pathname === route.href || pathname.startsWith(route.href + '/')
                                        ? 'text-white bg-white/10'
                                        : 'text-zinc-400'
                                )}
                            >
                                <div className="flex items-center flex-1">
                                    <route.icon className={cn('h-5 w-5 mr-3', pathname === route.href ? 'text-emerald-400' : '')} />
                                    {route.label}
                                </div>
                            </Link>
                        ))}
                </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-800">
                <div className="text-xs text-slate-400 mb-1">Empresa conectada:</div>
                <div className="text-sm font-semibold truncate">{user?.companyId || 'Cargando...'}</div>
            </div>
        </div>
    );
}
