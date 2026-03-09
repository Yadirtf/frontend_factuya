'use client';

import { useState } from "react";
import { Plus, Search, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCompany } from "@/hooks/useCompany";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CompanyRegistrationModal } from "./CompanyRegistrationModal";

export default function CompaniesPage() {
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

            <div className="flex flex-col md:flex-row gap-4 items-end bg-white p-4 rounded-lg border shadow-sm">
                <div className="w-full md:w-1/3 space-y-2">
                    <label className="text-sm font-medium text-slate-700 ml-1 flex items-center gap-2">
                        <Search className="h-3 w-3" /> Buscar Empresa
                    </label>
                    <Input placeholder="Razón Social o NIT..." className="h-10" />
                </div>
            </div>

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
                    <Table>
                        <TableHeader className="bg-slate-50">
                            <TableRow>
                                <TableHead className="font-semibold text-slate-700 w-[300px]">Razón / Nombre Comercial</TableHead>
                                <TableHead className="font-semibold text-slate-700">NIT</TableHead>
                                <TableHead className="font-semibold text-slate-700">Ubicación</TableHead>
                                <TableHead className="font-semibold text-slate-700">Configuración DIAN</TableHead>
                                <TableHead className="font-semibold text-slate-700 text-right pr-4">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.data?.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-32 text-center text-slate-500 font-medium">
                                        <div className="flex flex-col items-center gap-2">
                                            <Building2 className="h-8 w-8 text-slate-300" />
                                            <span>No hay empresas clientes registradas</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                            {data?.data?.map((company) => (
                                <TableRow key={company.id} className="cursor-pointer hover:bg-slate-50/70 transition-colors">
                                    <TableCell>
                                        <div className="font-medium text-slate-900">{company.businessName}</div>
                                        {company.tradeName && <div className="text-sm text-slate-500">{company.tradeName}</div>}
                                    </TableCell>
                                    <TableCell className="text-slate-600 font-medium">
                                        {typeof company.nit === 'object' ? `${company.nit.raw}-${company.nit.checkDigit}` : company.nit}
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm text-slate-700">{company.city}, {company.department}</div>
                                        <div className="text-xs text-slate-400">{company.address}</div>
                                    </TableCell>
                                    <TableCell>
                                        {company.dianConfig?.softwareId && company.dianConfig?.technicalKey ? (
                                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                                                Configurada
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary" className="bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200">
                                                Incompleta
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right pr-4">
                                        <Button asChild variant="ghost" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-medium">
                                            <Link href={`/companies/${company.id}`}>
                                                Administrar
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <div className="flex items-center justify-between border-t p-4 text-sm text-slate-500">
                        <p>Mostrando {data?.data.length || 0} de {data?.total || 0} empresas</p>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page === 1}
                                onClick={() => setPage(p => p - 1)}
                            >
                                Anterior
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={!data || page >= Math.ceil(data.total / 10)}
                                onClick={() => setPage(p => p + 1)}
                            >
                                Siguiente
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
