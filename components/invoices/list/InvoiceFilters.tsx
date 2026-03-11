import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { InvoiceStatus } from "@/lib/types/invoice";

interface InvoiceFiltersProps {
    handleStatusChange: (status: string) => void;
}

export function InvoiceFilters({ handleStatusChange }: InvoiceFiltersProps) {
    return (
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
    );
}
