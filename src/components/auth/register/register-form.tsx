'use client';
import Link from 'next/link';
import Spinner from '../../ui/spinner';
import useGetGenders from '@/hooks/auth/register/useGetGenders';
import useGetMaritalStatus from '@/hooks/auth/register/useGetMaritalStatus';
import usePostEmployee from '@/hooks/auth/register/usePostEmployee';
import useGetJobsPositions from '@/hooks/auth/register/useGetJobPositions';
import useGetDepartaments from '@/hooks/auth/register/useGetDepartaments';
import useGetEmbargoes from '@/hooks/auth/register/useGetEmbargoes';
import SelectField from './select/select-fields';
import InputField from './input/input-field';

const RegisterForm = () => {
  const { genders } = useGetGenders();
  const { maritalStatus } = useGetMaritalStatus();
  const { JobsPositions } = useGetJobsPositions();
  const { Departaments } = useGetDepartaments();
  const { Embargoes } = useGetEmbargoes();
  const { onSubmit, register, errorMessage, mutation, errors } =
    usePostEmployee();  
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Información Personal */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-3">
            Información Personal
          </h2>
          <div className="space-y-4">
            <InputField
              id="Name"
              label="Nombre"
              type="text"
              placeholder="Escribe tu nombre aquí"
              register={register}
              errors={errors}
            />
            <InputField
              id="Surname1"
              label="Primer Apellido"
              type="text"
              placeholder="Escribe tu primer apellido aquí"
              register={register}
              errors={errors}
            />
            <InputField
              id="Surname2"
              label="Segundo Apellido"
              type="text"
              placeholder="Escribe tu segundo apellido aquí"
              register={register}
              errors={errors}
            />
            <InputField
              id="Birthdate"
              label="Fecha de Nacimiento"
              type="date"
              register={register}
              errors={errors}
            />
            <SelectField
              id="GenderId"
              label="Género"
              options={genders}
              register={register}
              errors={errors}
            />
          </div>
        </div>
        {/* Información Laboral */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-3">
            Información Laboral
          </h2>
          <div className="space-y-4">
            <InputField
              id="id"
              label="Identificación"
              type="number"
              placeholder="Escribe tu identificación laboral aquí"
              register={register}
              errors={errors}
            />
            <InputField
              id="HiringDate"
              label="Fecha de Contratación"
              type="date"
              register={register}
              errors={errors}
            />
            <InputField
              id="NumberChlidren"
              label="Número de Hijos"
              type="number"
              placeholder="Escribe el número de hijos aquí"
              register={register}
              errors={errors}
            />
            <InputField
              id="AvailableVacationDays"
              label="Días de Vacaciones"
              type="number"
              placeholder="Escribe los días de vacaciones aquí"
              register={register}
              errors={errors}
            />
            <SelectField
              id="MaritalStatusId"
              label="Estado Civil"
              options={maritalStatus}
              register={register}
              errors={errors}
            />
            <SelectField
              id="JobPositionId"
              label="Puesto de Trabajo"
              options={JobsPositions}
              register={register}
              errors={errors}
            />
            <SelectField
              id="DepartmentId"
              label="Departamento"
              options={Departaments}
              register={register}
              errors={errors}
            />
            <SelectField
              id="EmbargoId"
              label="Embargo"
              options={Embargoes}
              register={register}
              errors={errors}
            />
          </div>
        </div>
        {/* Contacto */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-3">
            Información de Contacto
          </h2>
          <div className="space-y-4">
            <InputField
              id="Email"
              label="Correo Electrónico"
              type="email"
              placeholder="Escribe tu correo electrónico aquí"
              register={register}
              errors={errors}
            />
            <InputField
              id="CellPhone"
              label="Teléfono Celular"
              type="tel"
              placeholder="Escribe tu número de teléfono aquí"
              register={register}
              errors={errors}
            />
          </div>
        </div>
      </div>
      {errorMessage && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}
      <div className="flex flex-col items-center">
        <button
          type="submit"
          disabled={mutation.isPending}
          className="px-4 w-28 py-2 mt-4 text-white bg-dodger-blue-600 rounded-md shadow-sm hover:bg-dodger-blue-600 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500 transition-all"
        >
          <div className="flex justify-center items-center">
            {mutation.isPending ? <Spinner /> : <span>Registrar</span>}
          </div>
        </button>
        <Link
          href={'/'}
          className="mt-4 text-sm hover:text-dodger-blue-600 hover:underline"
        >
          Volver al Inicio
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
