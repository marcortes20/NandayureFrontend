'use client'
import { RegisterSchema } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Spinner from '../ui/spinner'

interface FormFields {
    UserName: string
    Name: string
    UserId: string
    Mail: string
    Password: string
}

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const { handleSubmit, register, formState: { errors } } = useForm<FormFields>({
        resolver: zodResolver(RegisterSchema)
    })
    const onSubmit = handleSubmit(async ({ UserId, Mail, UserName, Name, Password }) => {
        setIsLoading(true);
        const responseNextAuth = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    UserId: Number(UserId),
                    Mail: Mail,
                    UserName: UserName,
                    Name: Name,
                    Password: Password,
                }),
            }
        );

        if (responseNextAuth.ok) return

        if (!responseNextAuth.ok) {
            const error = await responseNextAuth.json()
            console.log(error)
            setError(error.error)
            setIsLoading(false)
            return
        }

    });


    return (
        <form onSubmit={onSubmit} noValidate>
            <div className="mt-3">
                <label htmlFor="Name" className="block mb-2 text-sm font-medium text-gray-900">
                    Nombre
                </label>
                <input
                    type="text"
                    placeholder="Escribe tu nombre aquí"
                    id="Name"
                    className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                    {...register("Name")}
                />
                {errors.Name && (
                    <p className="text-red-500 text-xs mt-1">{errors.Name.message}</p>
                )}
            </div>
            <div className='mt-3'>
                <label htmlFor="UserName" className="block mb-2 text-sm font-medium text-gray-900">
                    Nombre de usuario
                </label>
                <input
                    type="text"
                    placeholder="Escribe tu nombre de usuario aquí"
                    id="UserName"
                    className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                    {...register("UserName")}
                />
                {errors.UserName && (
                    <p className="text-red-500 text-xs mt-1">{errors.UserName.message}</p>
                )}
            </div>
            <div className='mt-3'>
                <label htmlFor="UserId" className="block mb-2 text-sm font-medium text-gray-900">
                    Identificación
                </label>
                <input
                    type="text"
                    placeholder="Escribe tu identificación aquí"
                    id="UserId"
                    className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                    {...register("UserId")}
                />
                {errors.UserId && (
                    <p className="text-red-500 text-xs mt-1">{errors.UserId.message}</p>
                )}
            </div>
            <div className='mt-3'>
                <label htmlFor="Mail" className="block mb-2 text-sm font-medium text-gray-900">
                    Correo electrónico
                </label>
                <input
                    type="text"
                    placeholder="Escribe tu correo electrónico aquí"
                    id="Mail"
                    className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                    {...register("Mail")}
                />
                {errors.Mail && (
                    <p className="text-red-500 text-xs mt-1">{errors.Mail.message}</p>
                )}
            </div>
            <div className="mt-3">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                    Contraseña
                </label>
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Escribe tu contraseña aquí"
                    id="password"
                    className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                    {...register("Password")}
                />
                {errors.Password && (
                    <p className="text-red-500 text-xs mt-1">{errors.Password.message}</p>
                )}
                {
                    error && (
                        <p className="text-red-500 text-xs mt-1">{error}</p>
                    )
                }
                <div className="mt-3">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            className=" h-4 w-4 rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            checked={showPassword}
                            onChange={(e) => setShowPassword(e.target.checked)}
                        />
                        <span className="ml-3 text-sm text-gray-600">Mostrar contraseña</span>
                    </label>
                </div>
            </div>
            <button
                type="submit"
                className="block w-full px-3 py-2 sm:py-3 mt-4 text-white bg-dodger-blue-600 rounded-md shadow-sm hover:bg-dodger-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
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

export default RegisterForm
