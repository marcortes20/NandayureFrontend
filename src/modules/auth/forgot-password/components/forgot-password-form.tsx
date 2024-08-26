'use client'
import Link from 'next/link'
import React from 'react'
import usePostSendEmail from '../hooks/usePostSendEmail'
import Spinner from '@/components/ui/spinner'

const ForgotPasswordForm = () => {
  const { errorMessage, register, onSubmit, mutation } = usePostSendEmail()
  return (
    <form onSubmit={onSubmit}>
      <div className="mt-4">
        <label htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900">
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          {...register('Email')}
          placeholder="Escribe tu correo electrónico aquí"
          className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
        />
      </div>
      {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
      <button
        type="submit"
        className="w-full mt-4 py-2 px-4 bg-dodger-blue-600 hover:bg-dodger-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        <div className="flex justify-center items-center">
          {mutation.isPending ? (
            <Spinner />
          ) : (
            <span>
              Enviar enlace de recuperación
            </span>
          )}
        </div>
      </button>
      <section>
        <Link href="/auth/login" className="block mt-4 text-sm text-center text-dodger-blue-600 hover:underline">
          Volver a inicio de sesión
        </Link>
      </section>
    </form>
  )
}

export default ForgotPasswordForm
