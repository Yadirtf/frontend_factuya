import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface CustomersFiltersProps {
    search: string;
    setSearch: (val: string) => void;
}

export function CustomersFilters({ search, setSearch }: CustomersFiltersProps) {
    return (
        <div className="flex flex-col md:flex-row gap-4 items-end bg-white p-4 rounded-lg border shadow-sm">
            <div className="w-full md:w-1/3 space-y-2">
                <label className="text-sm font-medium text-slate-700 ml-1 flex items-center gap-2">
                    <Search className="h-3 w-3" /> Buscar Cliente
                </label>
                <Input
                    placeholder="Nombre, NIT o Cédula..."
                    className="h-10"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </div>
    );
}
