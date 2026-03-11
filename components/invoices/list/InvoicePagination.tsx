import { Button } from "@/components/ui/button";

interface InvoicePaginationProps {
    total: number;
    limit: number;
    page: number;
    itemCount: number;
    onPrevious: () => void;
    onNext: () => void;
}

export function InvoicePagination({ 
    total, 
    limit, 
    page, 
    itemCount, 
    onPrevious, 
    onNext 
}: InvoicePaginationProps) {
    const totalPages = Math.ceil(total / limit);

    return (
        <div className="flex items-center justify-between text-sm text-slate-500 px-2 mt-4">
            <p>Mostrando {itemCount} de {total} resultados</p>
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 1}
                    onClick={onPrevious}
                >
                    Anterior
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPages || total === 0}
                    onClick={onNext}
                >
                    Siguiente
                </Button>
            </div>
        </div>
    );
}
