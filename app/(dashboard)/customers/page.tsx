'use client';

import { useState } from 'react';
import { Plus, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { CustomerForm } from '@/components/customers/CustomerForm';
import { useCustomers } from '@/hooks/useCustomers';
import { Loader2 } from 'lucide-react';

export default function CustomersPage() {
    const [search, setSearch] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { data, isLoading, isError } = useCustomers({ search });

    return (
        <div className="flex flex-col gap-8 p-4 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Clientes / Adquirentes</h1>
                    <p className="text-slate-500 mt-1">Gestione la base de datos de sus clientes para facturación electrónica.</p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                            <Plus className="mr-2 h-4 w-4" /> Nuevo Cliente
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Registrar Nuevo Cliente</DialogTitle>
                        </DialogHeader>
                        <CustomerForm onSuccess={() => setIsDialogOpen(false)} />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-end bg-white p-4 rounded-lg border shadow-sm">
                <div className="w-full md:w-1/3 space-y-2">
                    <label className="text-sm font-medium text-slate-700 ml-1 flex items-center gap-2">
                        <Search className="h-3 w-3" /> Buscar Cliente
                    </label>
                    <Input
                        placeholder="Nombre, NIT o Cédula..."
                        className="h-10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white rounded-lg border">
                    <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
                    <p className="text-slate-500 font-medium">Cargando clientes...</p>
                </div>
            ) : isError ? (
                <div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-lg text-center">
                    <h3 className="text-lg font-semibold mb-2">Error al cargar clientes</h3>
                    <p>No se pudo conectar con el servidor.</p>
                </div>
            ) : (
                <div className="rounded-md border bg-white shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader className="bg-slate-50">
                            <TableRow>
                                <TableHead>Cliente</TableHead>
                                <TableHead>Identificación</TableHead>
                                <TableHead>Contacto</TableHead>
                                <TableHead>Ubicación</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                                        No se encontraron clientes.
                                        <Button variant="link" className="text-emerald-600" onClick={() => setIsDialogOpen(true)}>
                                            Crear el primero
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data?.data.map((customer) => (
                                    <TableRow key={customer.id} className="hover:bg-slate-50/50">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                                    <User className="h-4 w-4" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-slate-900">
                                                        {customer.businessName || `${customer.firstName} ${customer.lastName}`}
                                                    </span>
                                                    <span className="text-xs text-slate-500">{customer.email}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm text-slate-700 font-mono">
                                                {customer.documentType === '31' ? 'NIT: ' : 'CC: '}
                                                {customer.documentNumber}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm text-slate-600">{customer.phone}</span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col text-xs">
                                                <span>{customer.address}</span>
                                                <span className="text-slate-500">{customer.city}, {customer.department}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm">Editar</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}
