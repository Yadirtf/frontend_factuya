import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function CompaniesFilters() {
    return (
        <div className="flex flex-col md:flex-row gap-4 items-end bg-white p-4 rounded-lg border shadow-sm">
            <div className="w-full md:w-1/3 space-y-2">
                <label className="text-sm font-medium text-slate-700 ml-1 flex items-center gap-2">
                    <Search className="h-3 w-3" /> Buscar Empresa
                </label>
                <Input placeholder="Razón Social o NIT..." className="h-10" />
            </div>
        </div>
    );
}
