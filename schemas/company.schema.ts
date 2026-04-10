import * as z from 'zod';

export const companySchema = z.object({
    nit: z.string().min(8, 'NIT inválido'),
    dv: z.string().length(1, 'El DV debe tener 1 dígito'),
    organizationType: z.coerce.number().min(1, 'Seleccione tipo de organización'),
    documentType: z.string().min(1, 'Seleccione tipo de documento'),
    businessName: z.string().min(3, 'Nombre de empresa demasiado corto'),
    tradeName: z.string().optional().or(z.literal('')),
    email: z.string().email('Correo inválido').optional().or(z.literal('')),
    phone: z.string().min(7, 'Teléfono obligatorio'),
    address: z.string().min(5, 'Dirección física obligatoria'),
    postalCode: z.string().length(6, 'El código postal debe ser de 6 dígitos'),
    city: z.string().min(2, 'Ciudad obligatoria'),
    department: z.string().min(2, 'Departamento obligatorio'),
    taxRegime: z.enum(['SIMPLIFIED', 'COMMON']),
    taxResponsibilities: z.array(z.string()).min(1, 'Seleccione al menos una responsabilidad'),
    mercantileRegistration: z.string().min(1, 'Matrícula mercantil obligatoria'),
    economicActivity: z.string().min(4, 'Código CIIU obligatorio'),
});

export type CompanyValues = z.infer<typeof companySchema>;
