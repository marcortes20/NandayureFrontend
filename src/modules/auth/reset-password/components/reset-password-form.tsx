'use client'
import { useState } from "react";
import usePostResetPassword from "../hooks/usePostResetPasssword"
import Spinner from "@/components/ui/spinner";
interface Props {
  token: string
}
const ResetPasswordForm = ({ token }: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { onSubmit, register, errorMessage, mutation, errors } = usePostResetPassword({ token })
  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="mt-3">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Contraseña
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Escribe tu contraseña aquí"
          id="password"
          {...register('Password')}
          className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
        />
        {errors?.Password && (
          <div className="text-red-500 text-sm">
            {errors.Password.message}
          </div>
        )}
      </div>
      <div className="mt-3">
        <label
          htmlFor="confirmPassword"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Confirmar contraseña
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Confirma tu contraseña aquí"
          id="confirmPassword"
          {...register('ConfirmPassword')}
          className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
        />
        {errors?.ConfirmPassword && (
          <div className="text-red-500 text-sm">
            {errors.ConfirmPassword.message}
          </div>
        )}
      </div>
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
      {errorMessage && (
        <div className="mt-3 text-red-500 text-sm">
          {errorMessage}
        </div>
      )}
      <button
        type="submit"
        disabled={mutation.isPending}
        className="block w-full px-3 py-2 sm:py-3 mt-4 text-white bg-dodger-blue-600 rounded-md shadow-sm hover:bg-dodger-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
      >
        {mutation.isPending ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <span>Iniciar sesión</span>
        )}
      </button>
    </form>
  )
}

export default ResetPasswordForm
