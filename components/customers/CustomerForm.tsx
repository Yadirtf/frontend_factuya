'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCreateCustomer } from '@/hooks/useCustomers';
import { useAuthStore } from '@/store/auth.store';
import { useCompany } from '@/hooks/useCompany';
import { toast } from 'sonner';
import { CustomerRegistrationForm } from './form/CustomerRegistrationForm';

const customerSchema = z.object({
    companyId: z.string().optional(),
    documentType: z.string().min(1, 'Tipo requerido'),
    documentNumber: z.string().min(1, 'Número requerido'),
    firstName: z.string().min(1, 'Nombre requerido'),
    lastName: z.string().min(1, 'Apellido requerido'),
    businessName: z.string().optional(),
    email: z.string().email('Email inválido'),
    phone: z.string().min(7, 'Mínimo 7 dígitos'),
    address: z.string().min(5, 'Dirección requerida'),
    city: z.string().min(1, 'Ciudad requerida'),
    department: z.string().min(1, 'Departamento requerido'),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;

interface CustomerFormProps {
    onSuccess?: () => void;
}

export const CustomerForm = ({ onSuccess }: CustomerFormProps) => {
    const createMutation = useCreateCustomer();
    const { user } = useAuthStore();
    const { useCompanies } = useCompany();
    const { data: companiesData } = useCompanies(1, 100);

    const form = useForm<CustomerFormValues>({
        resolver: zodResolver(customerSchema),
        defaultValues: {
            documentType: '13', // Cédula de ciudadanía por defecto
            documentNumber: '',
            firstName: '',
            lastName: '',
            businessName: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            department: '',
        },
    });

    const onSubmit = (values: CustomerFormValues) => {
        createMutation.mutate(values, {
            onSuccess: () => {
                toast.success('Cliente registrado exitosamente');
                form.reset();
                onSuccess?.();
            },
            onError: (error: unknown) => {
                const axiosError = error as { response?: { data?: { message?: string } } };
                toast.error('Error al registrar cliente', {
                    description: axiosError.response?.data?.message || 'Error inesperado',
                });
            },
        });
    };

    return (
        <CustomerRegistrationForm
            form={form}
            onSubmit={onSubmit}
            isPending={createMutation.isPending}
            user={user}
            companies={companiesData?.data}
        />
    );
};
