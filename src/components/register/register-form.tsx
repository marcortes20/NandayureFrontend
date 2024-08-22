'use client'
import { RegisterSchema } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Spinner from '../ui/spinner'
import { useQuery } from '@tanstack/react-query'
import getGendersData from '@/server/actions'

interface FormFields {

    //Information Personal 
    UserId: number;
    Name: string;
    Surname1: string;
    Surname2: string;
    Birthdate: Date;
    GenderId: number;
    MaritalStatusId: number;

    //Information Laboral
    EmployeeId: number;
    HiringDate: Date;
    NumberChlidren: number;
    GrossSalary: number;
    AvailableVacationDays: number;

    //Information Contacto
    Mail: string;
    CellPhone: string;

}

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { handleSubmit, register } = useForm<FormFields>()

    const { data: genders } = useQuery({
        queryFn: async () => await getGendersData(),
        queryKey: ["genders"],
    })

    const onSubmit = handleSubmit((data) => {
        console.log(data)
    })


    return (
        <form onSubmit={onSubmit} noValidate>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Información Personal</h2>
                    <div className="mt-3">
                        <label htmlFor="UserId" className="block mb-2 text-sm font-medium text-gray-900">
                            Identificación
                        </label>
                        <input
                            type="number"
                            placeholder="Escribe tu identificación aquí"
                            id="UserId"
                            className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                        />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="Name" className="block mb-2 text-sm font-medium text-gray-900">
                            Nombre
                        </label>
                        <input
                            type="text"
                            placeholder="Escribe tu nombre aquí"
                            id="Name"
                            className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                        />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="Surname1" className="block mb-2 text-sm font-medium text-gray-900">
                            Primer Apellido
                        </label>
                        <input
                            type="text"
                            placeholder="Escribe tu primer apellido aquí"
                            id="Surname1"
                            className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                        />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="Surname2" className="block mb-2 text-sm font-medium text-gray-900">
                            Segundo Apellido
                        </label>
                        <input
                            type="text"
                            placeholder="Escribe tu segundo apellido aquí"
                            id="Surname2"
                            className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                        />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="Birthdate" className="block mb-2 text-sm font-medium text-gray-900">
                            Fecha de Nacimiento
                        </label>
                        <input
                            type="date"
                            id="Birthdate"
                            className="block w-full px-3 py-2 sm:py-3 border text-gray-300 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                        />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="GenderId" className="block mb-2 text-sm font-medium text-gray-900">
                            Género
                        </label>
                        <select
                            id="GenderId"
                            className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                            {...register('GenderId')}
                        >
                            <option>Selecciona tu género</option>
                            {genders?.map((gender: { GenderId: number; Name: string }) => (
                                <option key={gender.GenderId} value={gender.GenderId}>
                                    {gender.Name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="MaritalStatusId" className="block mb-2 text-sm font-medium text-gray-900">
                            Estado Civil
                        </label>
                        <select
                            id="MaritalStatusId"
                            className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                        >
                            <option>Selecciona tu estado civil</option>
                            <option value="1">Soltero</option>
                            <option value="2">Casado</option>
                            <option value="3">Divorciado</option>
                            <option value="4">Viudo</option>
                        </select>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Información Laboral</h2>
                    <div className="mt-3">
                        <label htmlFor="EmployeeId" className="block mb-2 text-sm font-medium text-gray-900">
                            Identificación Laboral
                        </label>
                        <input
                            type="number"
                            placeholder="Escribe tu identificación laboral aquí"
                            id="EmployeeId"
                            className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                        />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="HiringDate" className="block mb-2 text-sm font-medium text-gray-900">
                            Fecha de Contratación
                        </label>
                        <input
                            type="date"
                            id="HiringDate"
                            className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                        />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="NumberChlidren" className="block mb-2 text-sm font-medium text-gray-900">
                            Número de Hijos
                        </label>
                        <input
                            type="number"
                            placeholder="Escribe el número de hijos aquí"
                            id="NumberChlidren"
                            className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                        />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="GrossSalary" className="block mb-2 text-sm font-medium text-gray-900">
                            Salario Bruto
                        </label>
                        <input
                            type="number"
                            placeholder="Escribe tu salario bruto aquí"
                            id="GrossSalary"
                            className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                        />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="AvailableVacationDays" className="block mb-2 text-sm font-medium text-gray-900">
                            Días de Vacaciones Disponibles
                        </label>
                        <input
                            type="number"
                            placeholder="Escribe los días de vacaciones disponibles aquí"
                            id="AvailableVacationDays"
                            className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                        />
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Información de Contacto</h2>
                    <div className="mt-3">
                        <label htmlFor="Mail" className="block mb-2 text-sm font-medium text-gray-900">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            placeholder="Escribe tu correo electrónico aquí"
                            id="Mail"
                            className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                        />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="CellPhone" className="block mb-2 text-sm font-medium text-gray-900">
                            Teléfono Celular
                        </label>
                        <input
                            type="text"
                            placeholder="Escribe tu teléfono celular aquí"
                            id="CellPhone"
                            className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                        />
                    </div>
                </div>
            </div>
            <button
                type="submit"
                className="px-6 py-2 sm:py-3 mt-4 text-white bg-dodger-blue-600 rounded-md shadow-sm hover:bg-dodger-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all mx-auto block"
            >
                {
                    isLoading ? (
                        <div className="flex justify-center">
                            <Spinner />
                        </div>
                    ) : (
                        <span>
                            Registrarse
                        </span>
                    )
                }
            </button>
        </form>
    )
}

export default RegisterForm;
