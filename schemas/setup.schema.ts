import * as z from 'zod';

export const setupSchema = z.object({
    // Admin Data
    adminEmail: z.string().email('Correo de administrador inválido'),
    adminPassword: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    adminFirstName: z.string().min(2, 'Nombre obligatorio'),
    adminLastName: z.string().min(2, 'Apellido obligatorio'),
});

export type SetupValues = z.infer<typeof setupSchema>;
