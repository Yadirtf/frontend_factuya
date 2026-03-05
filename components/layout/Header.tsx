'use client';

import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
    const { user, logout } = useAuthStore();

    return (
        <header className="h-16 flex items-center justify-end px-6 border-b bg-white shadow-sm">
            <div className="flex items-center gap-x-4">
                <span className="text-sm font-medium text-slate-600">
                    {user?.email || 'Usuario'}
                </span>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full bg-slate-100 w-10 h-10">
                            <User className="h-5 w-5 text-slate-600" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-xs text-slate-500">
                            Rol: {user?.role}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer focus:text-red-600">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Cerrar sesión</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
