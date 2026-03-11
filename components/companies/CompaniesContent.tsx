'use client';

import { useState } from "react";
import { useCompany } from "@/hooks/useCompany";
import { Loader2 } from "lucide-react";
import { CompanyRegistrationModal } from "@/components/companies/CompanyRegistrationModal";
import { CompaniesFilters } from "./list/CompaniesFilters";
import { CompaniesTable } from "./list/CompaniesTable";
import { CompaniesPagination } from "./list/CompaniesPagination";

export function CompaniesContent() {
    const [page, setPage] = useState(1);
    const { useCompanies } = useCompany();
    const { data, isLoading, isError } = useCompanies(page, 10);

    return (
        <div className="flex flex-col gap-8 p-4 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Empresas Clientes</h1>
                    <p className="text-slate-500 mt-1">Gestione las entidades empresariales que operan bajo su sistema de facturación.</p>
                </div>
                <CompanyRegistrationModal />
            </div>

            <CompaniesFilters />

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white rounded-lg border">
                    <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
                    <p className="text-slate-500 font-medium">Cargando empresas...</p>
                </div>
            ) : isError ? (
                <div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-lg text-center">
                    <h3 className="text-lg font-semibold mb-2">Error al cargar listado</h3>
                    <p>No pudimos conectar con los datos de las empresas.</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg border shadow-sm">
                    <CompaniesTable companies={data?.data || []} />

                    <CompaniesPagination
                        total={data?.total || 0}
                        limit={10}
                        page={page}
                        itemCount={data?.data.length || 0}
                        onPrevious={() => setPage(p => p - 1)}
                        onNext={() => setPage(p => p + 1)}
                    />
                </div>
            )}
        </div>
    );
}
