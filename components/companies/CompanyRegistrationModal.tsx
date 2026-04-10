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
import { handleApiValidationErrors } from '@/lib/utils/error-handler';

export function CompanyRegistrationModal() {
    const [open, setOpen] = useState(false);
    const { useCreateCompany } = useCompany();
    const createMutation = useCreateCompany();

    const form = useForm<CompanyValues>({
        mode: 'onTouched',
        resolver: zodResolver(companySchema) as any,
        defaultValues: {
            nit: '',
            dv: '',
            organizationType: 1,
            documentType: '31', // NIT
            businessName: '',
            tradeName: '',
            email: '',
            phone: '',
            address: '',
            postalCode: '',
            city: '',
            department: '',
            taxRegime: 'COMMON',
            taxResponsibilities: ['O-47'], // updated default just in case
            economicActivity: '',
            mercantileRegistration: '',
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
                handleApiValidationErrors(error, form);
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
