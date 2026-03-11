import { Button } from "@/components/ui/button";

interface CompaniesPaginationProps {
    total: number;
    limit: number;
    page: number;
    itemCount: number;
    onPrevious: () => void;
    onNext: () => void;
}

export function CompaniesPagination({
    total,
    limit,
    page,
    itemCount,
    onPrevious,
    onNext
}: CompaniesPaginationProps) {
    const totalPages = Math.ceil(total / limit);

    return (
        <div className="flex items-center justify-between border-t p-4 text-sm text-slate-500">
            <p>Mostrando {itemCount} de {total} empresas</p>
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
