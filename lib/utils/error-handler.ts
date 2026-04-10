import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

/**
 * Extracts the specific field name from a mongoose validation string.
 * Example input: "CompanyDocument validation failed: mercantileRegistration: Path `mercantileRegistration` is required..."
 */
function attemptToMapMongooseError(errorMessage: string, form?: UseFormReturn<any>) {
    // "CompanyDocument validation failed: mercantileRegistration: Path `mercantileRegistration` is required., postalCode: Path `postalCode` is required."
    const parts = errorMessage.split('validation failed: ');
    if (parts.length > 1) {
        const errorsStr = parts[1]; // "mercantileRegistration: Path `mercantileRegistration` is required., postalCode: ..."
        const individualErrors = errorsStr.split(/, (?=[a-zA-Z0-9]+:)/);
        
        individualErrors.forEach(err => {
            // e.g. "mercantileRegistration: Path `mercantileRegistration` is required."
            const [field, ...rest] = err.split(': ');
            // Attempt to map to form
            if (form && field) {
                form.setError(field as any, { 
                    type: 'server', 
                    message: rest.join(': ').replace(/Path `[^`]+`/g, 'Este campo').trim() 
                }, { shouldFocus: true });
            }
        });
        
        return 'Revisa los campos marcados en rojo en el formulario.';
    }
    return errorMessage;
}

/**
 * Global handler for API rejections.
 * @param error Axios error or generic error
 * @param form Optional React Hook Form instance to map specific errors
 */
export function handleApiValidationErrors(error: any, form?: UseFormReturn<any>) {
    const rawError = error?.response?.data;
    const fallbackMessage = 'Ha ocurrido un error inesperado al contactar con el servidor.';
    
    // 1. No network / Bad server rejection (no message wrapper)
    if (!rawError) {
        toast.error('Error de Conexión', { description: error.message || fallbackMessage });
        return;
    }

    let summaryMessage = '';

    // 2. Class Validator Arrays (BadRequestException)
    if (Array.isArray(rawError.message)) {
        summaryMessage = 'Algunos datos ingresados no son válidos.';
        
        rawError.message.forEach((msg: string) => {
            // E.g., "mercantileRegistration must be longer than or equal to 1 characters"
            // We can attempt to bind to form fields if they match 1:1, but class-validator 
            // usually starts with the DTO field name.
            let fieldMatched = false;
            if (form) {
                const keys = Object.keys(form.getValues());
                for (const key of keys) {
                    if (msg.toLowerCase().startsWith(key.toLowerCase())) {
                        form.setError(key as any, { type: 'server', message: 'Dato inválido según el servidor' });
                        fieldMatched = true;
                        break;
                    }
                }
            }
            if (!fieldMatched) {
                toast.error('Dato Inválido', { description: msg });
            }
        });

        if (form) {
            toast.error('Campos Inválidos', { description: summaryMessage });
        }
        return;
    }

    // 3. String message from backend
    if (typeof rawError.message === 'string') {
        const msgStr = rawError.message;
        
        // Mongoose Schema Validation format
        if (msgStr.includes('validation failed') || msgStr.includes('Path `')) {
            summaryMessage = attemptToMapMongooseError(msgStr, form);
            toast.error('Faltan datos obligatorios', { description: summaryMessage });
            return;
        }

        // Domain Exceptions (e.g. Invalid NIT format)
        if (msgStr.includes('Invalid NIT format')) {
            if (form) {
                form.setError('nit', { type: 'server', message: 'Formato de NIT inválido (8 a 10 dígitos)' });
            }
            toast.error('NIT Inválido', { description: 'El NIT ingresado no cumple con el formato aceptado.' });
            return;
        }

        // Duplicated entries from MongoDB (E11000 duplicate key error)
        if (msgStr.includes('E11000 duplicate key error')) {
            toast.error('Dato Duplicado', { description: 'Ya existe un registro con este identificador principal (como el NIT).' });
            return;
        }

        // Standard string fallback
        toast.error('Operación fallida', { description: msgStr });
        return;
    }

    // Ultimate fallback
    toast.error('Error Servidor', { description: JSON.stringify(rawError) });
}
