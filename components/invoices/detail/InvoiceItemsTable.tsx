import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/invoice-math';

interface InvoiceItem {
    id: string;
    productCode: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

interface InvoiceItemsTableProps {
    items: InvoiceItem[];
}

export function InvoiceItemsTable({ items }: InvoiceItemsTableProps) {
    return (
        <Card className="col-span-2 shadow-sm">
            <CardHeader>
                <CardTitle>Detalle de Productos</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Código</TableHead>
                            <TableHead>Descripción</TableHead>
                            <TableHead className="text-right">Cant.</TableHead>
                            <TableHead className="text-right">V. Unitario</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-mono text-xs">{item.productCode}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell className="text-right">{item.quantity}</TableCell>
                                <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                                <TableCell className="text-right font-medium">{formatCurrency(item.total)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
