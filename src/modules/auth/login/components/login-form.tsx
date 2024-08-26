"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Spinner from "../../../../components/ui/spinner";
import { LoginSchema } from "@/lib/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface FormFields {
    EmployeeId: string;
    Password: string;
}

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormFields>({
        resolver: zodResolver(LoginSchema),
    });
    const onSubmit = handleSubmit(async ({ EmployeeId, Password }) => {
        setIsLoading(true);
        const responseNextAuth = await signIn("credentials", {
            EmployeeId,
            Password,
            redirect: false,
        });

        if (responseNextAuth?.error) {
            setError(responseNextAuth.error);
            setIsLoading(false);
            return;
        } else {
            router.push("/");
        }
    });
    return (
        <form onSubmit={onSubmit} noValidate>
            <div>
                <label
                    htmlFor="EmployeeId"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Identificación
                </label>
                <input
                    type="text"
                    placeholder="Escribe tu identificación aquí"
                    id="EmployeeId"
                    className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                    {...register("EmployeeId")}
                />
                {errors.EmployeeId && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.EmployeeId.message}
                    </p>
                )}
            </div>
            <div className="mt-3">
                <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
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
                    <p className="text-red-500 text-xs mt-1">
                        {errors.Password.message}
                    </p>
                )}
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                <div className="mt-3">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            className=" h-4 w-4 rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            checked={showPassword}
                            onChange={(e) => setShowPassword(e.target.checked)}
                        />
                        <span className="ml-3 text-sm text-gray-600">
                            Mostrar contraseña
                        </span>
                    </label>
                </div>
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className="block w-full px-3 py-2 sm:py-3 mt-4 text-white bg-dodger-blue-600 rounded-md shadow-sm hover:bg-dodger-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
            >
                {isLoading ? (
                    <div className="flex justify-center">
                        <Spinner />
                    </div>
                ) : (
                    <span>Iniciar sesión</span>
                )}
            </button>
            <section>
                <Link
                    href="/auth/forgot-password"
                    className="block mt-4 text-sm text-center text-dodger-blue-600 hover:underline transition-all"
                >
                    ¿Olvidaste tu contraseña?
                </Link>
            </section>
        </form>
    );
};

export default LoginForm;
