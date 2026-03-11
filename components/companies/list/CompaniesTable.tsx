import { Building2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Company } from "@/lib/types/company";

interface CompaniesTableProps {
    companies: any[];
}

export function CompaniesTable({ companies }: CompaniesTableProps) {
    return (
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
                {companies.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={5} className="h-32 text-center text-slate-500 font-medium">
                            <div className="flex flex-col items-center gap-2">
                                <Building2 className="h-8 w-8 text-slate-300" />
                                <span>No hay empresas clientes registradas</span>
                            </div>
                        </TableCell>
                    </TableRow>
                )}
                {companies.map((company) => (
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
    );
}
