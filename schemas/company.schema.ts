import * as z from 'zod';

export const companySchema = z.object({
    nit: z.string().min(8, 'NIT inválido'),
    businessName: z.string().min(3, 'Nombre de empresa demasiado corto'),
    tradeName: z.string().optional().or(z.literal('')),
    email: z.string().email('Correo inválido').optional().or(z.literal('')),
    phone: z.string().min(7, 'Teléfono obligatorio'),
    address: z.string().min(5, 'Dirección física obligatoria'),
    city: z.string().min(2, 'Ciudad obligatoria'),
    department: z.string().min(2, 'Departamento obligatorio'),
    taxRegime: z.enum(['SIMPLIFIED', 'COMMON']),
    economicActivity: z.string().min(4, 'Código CIIU obligatorio'),
});

export type CompanyValues = z.infer<typeof companySchema>;
