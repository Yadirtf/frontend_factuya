import { Badge } from "@/components/ui/badge";
import { InvoiceStatus } from "@/lib/types/invoice";

interface InvoiceStatusBadgeProps {
    status: InvoiceStatus;
}

export const InvoiceStatusBadge = ({ status }: InvoiceStatusBadgeProps) => {
    switch (status) {
        case InvoiceStatus.DRAFT:
            return <Badge variant="secondary">Borrador</Badge>;
        case InvoiceStatus.PENDING:
            return <Badge variant="warning">Pendiente</Badge>;
        case InvoiceStatus.SENT:
            return <Badge variant="info">Enviado</Badge>;
        case InvoiceStatus.ACCEPTED:
            return <Badge variant="success">Aceptado</Badge>;
        case InvoiceStatus.REJECTED:
            return <Badge variant="error">Rechazado</Badge>;
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
};
