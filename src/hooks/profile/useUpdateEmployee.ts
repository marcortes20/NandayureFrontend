import { UpdateEmployeeSchema } from '@/lib/zod';
import { updateEmployee } from '@/server/profile/updateEmployee/actions';
import { UpdateEmployee } from '@/types/entities';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface Props {
  employeeId: number | undefined;
  setIsOpen: (value: boolean) => void;
}

const useUpdateEmployee = ({ employeeId, setIsOpen }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UpdateEmployeeSchema)
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: UpdateEmployee) =>
      await updateEmployee({ employeeId: employeeId!, employee: data }),
    mutationKey: ['updateEmployee', employeeId],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employeeById', employeeId] });
    },
  });

  const onSubmit = handleSubmit(async (data: UpdateEmployee) => {
    try {
      await toast.promise(
        new Promise((resolve, reject) => {
          setTimeout(async () => {
            try {
              await mutation.mutateAsync(data);
              resolve('Empleado actualizado');
            } catch (error) {
              reject('Error al actualizar empleado');
            }
          }, 500); // artificial waiting
        }),
        {
          loading: 'Actualizando empleado...',
          success: 'Empleado actualizado',
          error: 'Error al actualizar empleado',
        },
        { duration: 2500 },
      );
      setIsOpen(false);
    } catch (error: any) {
      console.error(error);
      setIsOpen(false);
    }
  });

  return {
    mutation,
    onSubmit,
    register,
    errors,
  };
};

export default useUpdateEmployee;
