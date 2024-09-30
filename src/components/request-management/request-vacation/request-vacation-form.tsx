'use client';
import { Button } from '@/components/ui/button';
import InputField from '@/components/ui/input-field';
import Spinner from '@/components/ui/spinner';
import { titleFont } from '@/config/fonts';
import usePostVacation from '@/hooks/request-management/request-vacation/usePostVacation';
import { Checkbox, CheckboxIndicator } from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';

const RequestVacationForm = () => {
  const {
    onSubmit,
    register,
    mutation,
    isDepartmentApproved,
    isRRHHApproved,
    isMayorApproved,
    setIsDepartmentApproved,
    setIsRRHHApproved,
    setIsMayorApproved,
  } = usePostVacation();

  return (
    <form onSubmit={onSubmit}>
      <h5
        className={`${titleFont.className} mb-3 text-base font-semibold text-gray-900 md:text-xl`}
      >
        Solicitud de Vacaciones
      </h5>
      <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Por favor, introduce los datos requeridos para la solicitud.
      </p>
      <div className="flex mb-6 mt-4">
        <div className="flex-1 h-1 bg-dodger-blue-500"></div>
        <div className="flex-1 h-1 bg-golden-dream-500"></div>
        <div className="flex-1 h-1 bg-apple-500"></div>
      </div>

      {/* Campos del formulario */}
      <InputField
        id="diasSolicitados"
        label="Días Solicitados"
        type="number"
        placeholder="Número de días solicitados"
        register={register}
      />
      <InputField
        id="fechaSalida"
        label="Fecha de salida"
        type="date"
        register={register}
      />
      <InputField
        id="fechaEntrada"
        label="Fecha de entrada"
        type="date"
        register={register}
      />
      <InputField
        id="idSolicitud"
        label="ID de Solicitud"
        type="number"
        placeholder="Escribe el ID de la solicitud"
        register={register}
      />

      {/* Checkboxes para aprobaciones */}
      <div className="flex items-center space-x-2 mt-4">
        <Checkbox
          id="aprobacionDepartamento"
          checked={isDepartmentApproved}
          onCheckedChange={() => setIsDepartmentApproved(!isDepartmentApproved)}
          className="w-6 h-6 bg-white border border-gray-300 rounded-lg"
        >
          <CheckboxIndicator className="flex justify-center items-center">
            <CheckIcon className="w-4 h-4 text-green-600" />
          </CheckboxIndicator>
        </Checkbox>
        <label htmlFor="aprobacionDepartamento">
          Aprobación del Departamento
        </label>
      </div>

      <div className="flex items-center space-x-2 mt-4">
        <Checkbox
          id="aprobacionRRHH"
          checked={isRRHHApproved}
          onCheckedChange={() => setIsRRHHApproved(!isRRHHApproved)}
          className="w-6 h-6 bg-white border border-gray-300 rounded-lg"
        >
          <CheckboxIndicator className="flex justify-center items-center">
            <CheckIcon className="w-4 h-4 text-green-600" />
          </CheckboxIndicator>
        </Checkbox>
        <label htmlFor="aprobacionRRHH">Aprobación de RRHH</label>
      </div>

      <div className="flex items-center space-x-2 mt-4">
        <Checkbox
          id="aprobacionAlcalde"
          checked={isMayorApproved}
          onCheckedChange={() => setIsMayorApproved(!isMayorApproved)}
          className="w-6 h-6 bg-white border border-gray-300 rounded-lg"
        >
          <CheckboxIndicator className="flex justify-center items-center">
            <CheckIcon className="w-4 h-4 text-green-600" />
          </CheckboxIndicator>
        </Checkbox>
        <label htmlFor="aprobacionAlcalde">Aprobación del Alcalde</label>
      </div>
      <Button
        type="submit"
        className="w-full mt-4"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? <Spinner /> : 'Enviar Solicitud'}
      </Button>
    </form>
  );
};

export default RequestVacationForm;
