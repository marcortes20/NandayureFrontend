import { Employee } from '@/types/entities';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from '@/lib/zod';
import { postEmployee } from '@/server/auth/register/actions';

const usePostEmployee = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Employee>({
    resolver: zodResolver(RegisterSchema),
  });
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: Employee) => await postEmployee(data),
    onError: (error: any) => {
      console.error(error);
      setErrorMessage(error.message);
    },
  });

  const onSubmit = handleSubmit(async (data: Employee) => {
    try {
      const convertedData = convertEmployeeTypes(data);
      const mutationPromise = mutation.mutateAsync(convertedData);
      toast.promise(mutationPromise, {
        loading: 'Guardando empleado...',
        success: 'Empleado guardado',
        error: 'Error al guardar empleado',
      });
      await mutationPromise;
      router.push('/success');
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  });

  return {
    errorMessage,
    onSubmit,
    register,
    mutation,
    errors,
  };
};

export const convertEmployeeTypes = (employee: any): Employee => {
  return {
    id: Number(employee.id),
    Name: employee.Name,
    Surname1: employee.Surname1,
    Surname2: employee.Surname2,
    Birthdate: new Date(employee.Birthdate),
    HiringDate: new Date(employee.HiringDate),
    Email: employee.Email,
    CellPhone: employee.CellPhone,
    NumberChlidren: parseInt(employee.NumberChlidren, 10),
    AvailableVacationDays: parseInt(employee.AvailableVacationDays, 10),
    MaritalStatusId: parseInt(employee.MaritalStatusId, 10),
    GenderId: parseInt(employee.GenderId, 10),
  };
};

export default usePostEmployee;
