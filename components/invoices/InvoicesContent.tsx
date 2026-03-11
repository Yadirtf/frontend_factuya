'use client';

import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InvoiceList } from "@/components/invoices/InvoiceList";
import Link from "next/link";
import { useInvoicePage } from "@/hooks/useInvoicePage";
import { InvoiceFilters } from "./list/InvoiceFilters";
import { InvoicePagination } from "./list/InvoicePagination";

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

            <InvoiceFilters handleStatusChange={handleStatusChange} />

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

                    <InvoicePagination 
                        total={data?.total || 0}
                        limit={filters.limit}
                        page={filters.page}
                        itemCount={data?.data.length || 0}
                        onPrevious={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                        onNext={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                    />
                </div>
            )}
        </div>
    );
}
