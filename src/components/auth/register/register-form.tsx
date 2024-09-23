'use client';
import Spinner from '../../ui/spinner';
import useGetGenders from '@/hooks/auth/register/useGetGenders';
import useGetMaritalStatus from '@/hooks/auth/register/useGetMaritalStatus';
import usePostEmployee from '@/hooks/auth/register/usePostEmployee';
import useGetJobsPositions from '@/hooks/auth/register/useGetJobPositions';
import useGetDepartaments from '@/hooks/auth/register/useGetDepartaments';
import useGetEmbargoes from '@/hooks/auth/register/useGetEmbargoes';
import SelectField from '../../ui/select/select-fields';
import InputField from '../../ui/input/input-field';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const RegisterForm = () => {
  const { genders } = useGetGenders();
  const { maritalStatus } = useGetMaritalStatus();
  const { JobsPositions } = useGetJobsPositions();
  const { Departaments } = useGetDepartaments();
  const { Embargoes } = useGetEmbargoes();
  const { handleSubmit, onSubmit, register, mutation, errors } =
    usePostEmployee();

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Información Personal */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
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
            <SelectField
              id="MaritalStatusId"
              label="Estado Civil"
              options={maritalStatus}
              register={register}
              errors={errors}
            />
          </div>
          {/* Información de Contacto */}
          <div className="mt-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
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

        {/* Información Laboral */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
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
            <InputField
              id="AvailableVacationDays"
              label="Días de Vacaciones"
              type="number"
              placeholder="Escribe los días de vacaciones aquí"
              register={register}
              errors={errors}
            />

            {/* Otros */}
            <div className="mt-4">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Otros</h2>
              <div className="space-y-4">
                <SelectField
                  id="EmbargoId"
                  label="Embargo"
                  options={Embargoes}
                  register={register}
                  errors={errors}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? <Spinner /> : 'Registrarse'}
        </Button>
        <Link href={'/'}>
          <Button className="mt-4 w-full" variant={'link'}>
            Regresar al inicio
          </Button>
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
