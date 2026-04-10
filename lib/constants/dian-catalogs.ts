export const DIAN_ORGANIZATION_TYPES = [
    { value: 1, label: 'Persona Jurídica' },
    { value: 2, label: 'Persona Natural' },
];

export const DIAN_DOCUMENT_TYPES = [
    { value: '11', label: 'Registro civil' },
    { value: '12', label: 'Tarjeta de identidad' },
    { value: '13', label: 'Cédula de ciudadanía' },
    { value: '21', label: 'Tarjeta de extranjería' },
    { value: '22', label: 'Cédula de extranjería' },
    { value: '31', label: 'NIT (Número de Identificación Tributaria)' },
    { value: '41', label: 'Pasaporte' },
    { value: '42', label: 'Documento de identificación extranjero' },
    { value: '50', label: 'NIT de otro país' },
];

export const DIAN_TAX_RESPONSIBILITIES = [
    { value: 'O-13', label: 'Gran contribuyente' },
    { value: 'O-15', label: 'Autorretenedor' },
    { value: 'O-23', label: 'Agente de retención IVA' },
    { value: 'O-47', label: 'Régimen simple de tributación' },
    { value: 'R-99-PN', label: 'No responsable' },
];

// Catálogo Simplificado DANE - Para demostración/funcionalidad general
export const DANE_DEPARTMENTS = [
    { code: '05', name: 'Antioquia' },
    { code: '08', name: 'Atlántico' },
    { code: '11', name: 'Bogotá, D.C.' },
    { code: '25', name: 'Cundinamarca' },
    { code: '76', name: 'Valle del Cauca' },
];

export const DANE_CITIES: Record<string, { code: string; name: string }[]> = {
    '05': [
        { code: '05001', name: 'Medellín' },
        { code: '05088', name: 'Bello' },
        { code: '05266', name: 'Envigado' },
        { code: '05360', name: 'Itagüí' },
        { code: '05615', name: 'Rionegro' },
    ],
    '08': [
        { code: '08001', name: 'Barranquilla' },
        { code: '08433', name: 'Malambo' },
        { code: '08758', name: 'Soledad' },
    ],
    '11': [
        { code: '11001', name: 'Bogotá, D.C.' },
    ],
    '25': [
        { code: '25175', name: 'Chía' },
        { code: '25214', name: 'Cota' },
        { code: '25286', name: 'Funza' },
        { code: '25473', name: 'Mosquera' },
        { code: '25754', name: 'Soacha' },
    ],
    '76': [
        { code: '76001', name: 'Cali' },
        { code: '76109', name: 'Buenaventura' },
        { code: '76364', name: 'Jamundí' },
        { code: '76520', name: 'Palmira' },
        { code: '76892', name: 'Yumbo' },
    ],
};
