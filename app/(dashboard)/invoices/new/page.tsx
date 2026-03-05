'use client';

import { Suspense } from 'react';
import { InvoiceForm } from '@/components/invoices/InvoiceForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function NewInvoicePage() {
    return (
        <div className="flex flex-col gap-8 p-4 md:p-8 max-w-7xl mx-auto w-full">
            <div className="flex flex-col gap-4">
                <Button variant="ghost" asChild className="w-fit p-0 hover:bg-transparent text-slate-500 hover:text-emerald-600">
                    <Link href="/invoices" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" /> Volver a facturas
                    </Link>
                </Button>

                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Nueva Factura Electrónica</h1>
                    <p className="text-slate-500 mt-1">Complete los detalles de la venta para generar el borrador de la factura.</p>
                </div>
            </div>

            <Suspense fallback={
                <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white rounded-lg border">
                    <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
                    <p className="text-slate-500 font-medium">Cargando formulario...</p>
                </div>
            }>
                <InvoiceForm />
            </Suspense>
        </div>
    );
}
