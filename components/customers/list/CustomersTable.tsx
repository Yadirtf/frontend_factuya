import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface CustomersTableProps {
    data: any[] | undefined;
    onNewCustomerClick: () => void;
}

export function CustomersTable({ data, onNewCustomerClick }: CustomersTableProps) {
    return (
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
                    {!data || data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                                No se encontraron clientes.
                                <Button variant="link" className="text-emerald-600" onClick={onNewCustomerClick}>
                                    Crear el primero
                                </Button>
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((customer: any) => (
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
    );
}
