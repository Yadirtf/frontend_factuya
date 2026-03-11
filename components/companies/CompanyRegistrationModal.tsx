'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCompany } from '@/hooks/useCompany';
import { toast } from 'sonner';
import { Plus, Building2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { companySchema, CompanyValues } from '@/schemas/company.schema';
import { CompanyRegistrationForm } from './form/CompanyRegistrationForm';

export function CompanyRegistrationModal() {
    const [open, setOpen] = useState(false);
    const { useCreateCompany } = useCompany();
    const createMutation = useCreateCompany();

    const form = useForm<CompanyValues>({
        resolver: zodResolver(companySchema),
        defaultValues: {
            nit: '',
            businessName: '',
            tradeName: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            department: '',
            taxRegime: 'COMMON',
            economicActivity: '',
        },
    });

    const onSubmit = (data: CompanyValues) => {
        createMutation.mutate(data, {
            onSuccess: () => {
                toast.success('Empresa registrada', {
                    description: 'La empresa cliente fue creada exitosamente.',
                });
                form.reset();
                setOpen(false);
            },
            onError: (error: any) => {
                console.error('FRONTEND ERROR DUMP:', error?.response?.data || error);
                toast.error('Error al registrar empresa', {
                    description: JSON.stringify(error?.response?.data?.message || error.message),
                });
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="mr-2 h-4 w-4" /> Registrar Empresa
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl cursor-default">
                        <Building2 className="h-6 w-6 text-emerald-600" />
                        Registrar Nueva Empresa Cliente
                    </DialogTitle>
                    <DialogDescription>
                        Complete los datos de la entidad a la que le va a proveer servicios de facturación.
                    </DialogDescription>
                </DialogHeader>

                <CompanyRegistrationForm
                    form={form}
                    onSubmit={onSubmit}
                    onCancel={() => setOpen(false)}
                    isPending={createMutation.isPending}
                />
            </DialogContent>
        </Dialog>
    );
}
