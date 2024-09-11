'use client';

import Spinner from '@/components/ui/spinner';
import { titleFont } from '@/config/fonts';
import usePostSalaryCetificates from '@/hooks/request-management/salary-certificates/usePostSalaryCetificates';

const SalaryCertificatesForm = () => {
  const { onSubmit, register, mutation } = usePostSalaryCetificates();
  return (
    <form onSubmit={onSubmit}>
      <h5
        className={`${titleFont.className} mb-3 text-base font-semibold text-gray-900 md:text-xl`}
      >
        Solicitud de certificados de salario
      </h5>
      <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Por favor, introduce la fecha y el motivo de la solicitud.
      </p>
      <div className="mt-4">
        <label
          htmlFor="date"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Fecha
        </label>
        <input
          type="date"
          id="date"
          {...register('date')}
          className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="reason"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Motivo
        </label>
        <input
          type="textarea"
          id="reason"
          {...register('reason')}
          placeholder="Escribe el motivo aquí"
          className="block w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
        />
      </div>
      <button
        type="submit"
        className="w-full mt-4 py-2 px-4 bg-dodger-blue-600 hover:bg-dodger-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        <div className="flex justify-center items-center">
          {mutation.isPending ? <Spinner /> : <span>Enviar solicitud</span>}
        </div>
      </button>
    </form>
  );
};
export default SalaryCertificatesForm;
