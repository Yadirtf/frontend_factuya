'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Invoice } from "@/lib/types/invoice";
import { InvoiceStatusBadge } from "./InvoiceStatusBadge";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Eye, Send, Ban } from "lucide-react";
import Link from "next/link";

interface InvoiceListProps {
    invoices: Invoice[];
    onSend?: (id: string) => void;
    onCancel?: (id: string) => void;
    isSending?: boolean;
}

export const InvoiceList = ({ invoices, onSend, onCancel, isSending }: InvoiceListProps) => {
    return (
        <div className="rounded-md border bg-white">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[120px]">Número</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center text-slate-500">
                                No se encontraron facturas.
                            </TableCell>
                        </TableRow>
                    ) : (
                        invoices.map((invoice) => (
                            <TableRow key={invoice.id}>
                                <TableCell className="font-medium">{invoice.prefix}-{invoice.number}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{invoice.customer.name}</span>
                                        <span className="text-xs text-slate-500">{invoice.customer.identification}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {format(new Date(invoice.issueDate), "dd MMM yyyy", { locale: es })}
                                </TableCell>
                                <TableCell>
                                    <InvoiceStatusBadge status={invoice.status} />
                                </TableCell>
                                <TableCell className="text-right font-medium">
                                    {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(invoice.totalAmount)}
                                </TableCell>
                                <TableCell className="text-right items-center">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="outline" size="icon" asChild title="Ver Detalle">
                                            <Link href={`/invoices/${invoice.id}`}>
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </Button>

                                        {invoice.status === 'DRAFT' && (
                                            <Button
                                                variant="default"
                                                size="icon"
                                                className="bg-emerald-600 hover:bg-emerald-700"
                                                onClick={() => onSend?.(invoice.id)}
                                                disabled={isSending}
                                                title="Enviar a DIAN"
                                            >
                                                <Send className="h-4 w-4 text-white" />
                                            </Button>
                                        )}

                                        {['DRAFT', 'PENDING'].includes(invoice.status) && (
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => onCancel?.(invoice.id)}
                                                title="Anular Factura"
                                            >
                                                <Ban className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
