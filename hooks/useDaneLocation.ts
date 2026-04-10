import { useState, useEffect } from 'react';

export interface DaneDepartment {
    code: string;
    name: string;
}

export interface DaneCity {
    code: string;
    name: string;
    departmentCode: string;
}

// URL base de SODA "Datos Abiertos Colombia" para Divipola (Dataset actualizado)
const SODA_URL = 'https://www.datos.gov.co/resource/gdxc-w37w.json';

export function useDaneLocation() {
    const [departments, setDepartments] = useState<DaneDepartment[]>([]);
    const [cities, setCities] = useState<DaneCity[]>([]);
    const [isLoadingDepartments, setIsLoadingDepartments] = useState(false);
    const [isLoadingCities, setIsLoadingCities] = useState(false);

    // Fetch Unique Departments
    useEffect(() => {
        const fetchDepartments = async () => {
            setIsLoadingDepartments(true);
            try {
                // Fetching grouped departments to avoid downloading 1000+ rows if possible.
                // SODA limit logic
                const response = await fetch(`${SODA_URL}?$select=cod_dpto,dpto&$group=cod_dpto,dpto`);
                if (response.ok) {
                    const data = await response.json();
                    const mapped = data.map((d: any) => ({
                        code: d.cod_dpto,
                        name: d.dpto
                    }));
                    // Order alphabetically by name
                    mapped.sort((a: any, b: any) => a.name.localeCompare(b.name));
                    setDepartments(mapped);
                } else {
                    console.error('Failed to fetch departments from SODA');
                }
            } catch (error) {
                console.error('Error fetching departments:', error);
            } finally {
                setIsLoadingDepartments(false);
            }
        };

        fetchDepartments();
    }, []);

    // Fetch Cities for a specific department
    const fetchCitiesByDepartment = async (departmentCode: string) => {
        if (!departmentCode) {
            setCities([]);
            return;
        }

        setIsLoadingCities(true);
        try {
            const response = await fetch(`${SODA_URL}?cod_dpto=${departmentCode}&$select=cod_mpio,nom_mpio`);
            if (response.ok) {
                const data = await response.json();
                const mapped = data.map((c: any) => ({
                    code: c.cod_mpio,
                    name: c.nom_mpio,
                    departmentCode
                }));
                // Order alphabetically by name
                mapped.sort((a: any, b: any) => a.name.localeCompare(b.name));
                setCities(mapped);
            } else {
                console.error('Failed to fetch cities from SODA');
                setCities([]);
            }
        } catch (error) {
            console.error('Error fetching cities:', error);
            setCities([]);
        } finally {
            setIsLoadingCities(false);
        }
    };

    return {
        departments,
        cities,
        isLoadingDepartments,
        isLoadingCities,
        fetchCitiesByDepartment
    };
}
