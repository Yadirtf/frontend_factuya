import { UseFormReturn } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { CompanyValues } from '@/schemas/company.schema';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDaneLocation } from '@/hooks/useDaneLocation';

export function CompanyContactSection({ form }: { form: UseFormReturn<CompanyValues> }) {
    const watchDepartment = form.watch('department');
    const { 
        departments, cities, isLoadingDepartments, isLoadingCities, fetchCitiesByDepartment 
    } = useDaneLocation();

    const [openDep, setOpenDep] = useState(false);
    const [openCity, setOpenCity] = useState(false);

    useEffect(() => {
        if (watchDepartment) {
            fetchCitiesByDepartment(watchDepartment);
        }
    }, [watchDepartment]);

    useEffect(() => {
        const currentCity = form.getValues('city');
        if (currentCity && cities.length > 0 && !cities.find(c => c.code === currentCity)) {
            form.setValue('city', '');
        }
    }, [watchDepartment, cities, form]);

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-800 pt-4 border-t">Contacto y Ubicación</h3>
            
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Correo Electrónico (Opcional)</FormLabel>
                            <FormControl><Input type="email" placeholder="recepcion@hotel.com" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Teléfono</FormLabel>
                            <FormControl><Input placeholder="300..." {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* DEPARTAMENTO COMBOBOX */}
                <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Departamento (DANE)</FormLabel>
                            <Popover open={openDep} onOpenChange={setOpenDep}>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-full justify-between font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? departments.find(
                                                      (dep) => dep.code === field.value
                                                  )?.name || (isLoadingDepartments ? "Cargando..." : "Seleccione...")
                                                : "Seleccionar departamento"}
                                            {isLoadingDepartments ? (
                                                <Loader2 className="ml-2 h-4 w-4 shrink-0 opacity-50 animate-spin" />
                                            ) : (
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            )}
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[300px] p-0" align="start">
                                    <Command>
                                        <CommandInput placeholder="Buscar departamento..." />
                                        <CommandList>
                                            <CommandEmpty>No se encontraron departamentos.</CommandEmpty>
                                            <CommandGroup>
                                                {departments.map((dep) => (
                                                    <CommandItem
                                                        value={dep.name}
                                                        key={dep.code}
                                                        onSelect={() => {
                                                            form.setValue("department", dep.code);
                                                            setOpenDep(false);
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                dep.code === field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {dep.name}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* CIUDAD COMBOBOX */}
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Ciudad (DANE)</FormLabel>
                            <Popover open={openCity} onOpenChange={setOpenCity}>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            disabled={!watchDepartment || isLoadingCities}
                                            className={cn(
                                                "w-full justify-between font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? cities.find(
                                                      (city) => city.code === field.value
                                                  )?.name || "Seleccione..."
                                                : watchDepartment ? "Seleccionar ciudad" : "Elija un departamento primero"}
                                            {isLoadingCities ? (
                                                <Loader2 className="ml-2 h-4 w-4 shrink-0 opacity-50 animate-spin" />
                                            ) : (
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            )}
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[300px] p-0" align="start">
                                    <Command>
                                        <CommandInput placeholder="Buscar ciudad..." />
                                        <CommandList>
                                            <CommandEmpty>No se encontraron ciudades.</CommandEmpty>
                                            <CommandGroup>
                                                {cities.map((city) => (
                                                    <CommandItem
                                                        value={city.name}
                                                        key={city.code}
                                                        onSelect={() => {
                                                            form.setValue("city", city.code);
                                                            setOpenCity(false);
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                city.code === field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {city.name}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-8">
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Dirección Física</FormLabel>
                                <FormControl><Input placeholder="Carrera 123..." {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="col-span-4">
                    <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cod. Postal</FormLabel>
                                <FormControl><Input placeholder="110011" maxLength={6} {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
