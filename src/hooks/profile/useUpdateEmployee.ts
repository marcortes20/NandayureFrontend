import { updateEmployee } from '@/server/profile/updateEmployee/actions';
import { Employee, UpdateEmployee } from '@/types/entities';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface Props {
  employeeId: number | undefined;
  setIsOpen: (value: boolean) => void;
}

const useUpdateEmployee = ({ employeeId, setIsOpen }: Props) => {
  const { register, handleSubmit } = useForm();
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
      await toast.promise(mutation.mutateAsync(data), {
        loading: 'Actualizando empleado...',
        success: 'Empleado actualizado',
        error: 'Error al actualizar empleado',
      });
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
  };
};
export default useUpdateEmployee;
