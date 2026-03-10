'use client';

import { Plus, Search, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { InvoiceList } from "@/components/invoices/InvoiceList";
import { InvoiceStatus } from "@/lib/types/invoice";
import Link from "next/link";
import { useInvoicePage } from "@/hooks/useInvoicePage";

export function InvoicesContent() {
    const {
        filters, setFilters,
        data, isLoading, isError,
        sendMutation, cancelMutation,
        handleStatusChange
    } = useInvoicePage();

    return (
        <div className="flex flex-col gap-8 p-4 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Facturación Electrónica</h1>
                    <p className="text-slate-500 mt-1">Gestione sus facturas, notas de crédito y comunicaciones con la DIAN.</p>
                </div>
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                    <Link href="/invoices/new">
                        <Plus className="mr-2 h-4 w-4" /> Nueva Factura
                    </Link>
                </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-end bg-white p-4 rounded-lg border shadow-sm">
                <div className="w-full md:w-1/3 space-y-2">
                    <label className="text-sm font-medium text-slate-700 ml-1 flex items-center gap-2">
                        <Search className="h-3 w-3" /> Buscar Cliente
                    </label>
                    <Input placeholder="Nombre o NIT..." className="h-10" />
                </div>

                <div className="w-full md:w-1/4 space-y-2">
                    <label className="text-sm font-medium text-slate-700 ml-1 flex items-center gap-2">
                        <Filter className="h-3 w-3" /> Estado
                    </label>
                    <Select onValueChange={handleStatusChange} defaultValue="ALL">
                        <SelectTrigger className="h-10">
                            <SelectValue placeholder="Todos los estados" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">Todos los estados</SelectItem>
                            <SelectItem value={InvoiceStatus.DRAFT}>Borrador</SelectItem>
                            <SelectItem value={InvoiceStatus.PENDING}>Pendiente</SelectItem>
                            <SelectItem value={InvoiceStatus.SENT}>Enviado</SelectItem>
                            <SelectItem value={InvoiceStatus.ACCEPTED}>Aceptado</SelectItem>
                            <SelectItem value={InvoiceStatus.REJECTED}>Rechazado</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button variant="outline" className="h-10 px-6">
                    Filtrar
                </Button>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white rounded-lg border">
                    <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
                    <p className="text-slate-500 font-medium">Cargando facturas...</p>
                </div>
            ) : isError ? (
                <div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-lg text-center">
                    <h3 className="text-lg font-semibold mb-2">Error al cargar las facturas</h3>
                    <p>No pudimos conectarnos al servidor. Por favor, verifique su conexión e intente nuevamente.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    <InvoiceList
                        invoices={data?.data || []}
                        onSend={(id) => sendMutation.mutate(id)}
                        onCancel={(id) => cancelMutation.mutate(id)}
                        isSending={sendMutation.isPending}
                    />

                    <div className="flex items-center justify-between text-sm text-slate-500 px-2 mt-4">
                        <p>Mostrando {data?.data.length || 0} de {data?.total || 0} resultados</p>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={filters.page === 1}
                                onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                            >
                                Anterior
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={!data || filters.page >= Math.ceil(data.total / filters.limit)}
                                onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                            >
                                Siguiente
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
