'use client';

import { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { CustomerForm } from '@/components/customers/CustomerForm';
import { useCustomers } from '@/hooks/useCustomers';
import { CustomersFilters } from './list/CustomersFilters';
import { CustomersTable } from './list/CustomersTable';

export function CustomersContent() {
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
                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Registrar Nuevo Cliente</DialogTitle>
                        </DialogHeader>
                        <CustomerForm onSuccess={() => setIsDialogOpen(false)} />
                    </DialogContent>
                </Dialog>
            </div>

            <CustomersFilters search={search} setSearch={setSearch} />

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
                <CustomersTable
                    data={data?.data}
                    onNewCustomerClick={() => setIsDialogOpen(true)}
                />
            )}
        </div>
    );
}
