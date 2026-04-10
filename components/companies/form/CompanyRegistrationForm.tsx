import { UseFormReturn } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { CompanyValues } from '@/schemas/company.schema';

// Sections
import { CompanyIdentitySection } from './sections/CompanyIdentitySection';
import { CompanyContactSection } from './sections/CompanyContactSection';
import { CompanyTaxSection } from './sections/CompanyTaxSection';

interface CompanyRegistrationFormProps {
    form: UseFormReturn<CompanyValues>;
    onSubmit: (data: CompanyValues) => void;
    onCancel: () => void;
    isPending: boolean;
}

export function CompanyRegistrationForm({
    form,
    onSubmit,
    onCancel,
    isPending
}: CompanyRegistrationFormProps) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-2 pb-4">
                
                <CompanyIdentitySection form={form} />
                <CompanyContactSection form={form} />
                <CompanyTaxSection form={form} />

                <div className="flex justify-end pt-6 border-t">
                    <Button
                        type="button"
                        variant="outline"
                        className="mr-3"
                        onClick={onCancel}
                        disabled={isPending}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Guardando...
                            </>
                        ) : (
                            'Crear Empresa'
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
