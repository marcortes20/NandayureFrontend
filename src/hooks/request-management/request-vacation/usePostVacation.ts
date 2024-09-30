import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { RequestVacation } from '@/types';
import { postVacation } from '@/services';

const usePostVacation = () => {
  const { register, handleSubmit } = useForm<RequestVacation>();
  const [isDepartmentApproved, setIsDepartmentApproved] = useState(false);
  const [isRRHHApproved, setIsRRHHApproved] = useState(false);
  const [isMayorApproved, setIsMayorApproved] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: RequestVacation) => await postVacation(data),
    onSuccess: () => {
      toast.success('Solicitud enviada con éxito');
    },
    onError: (error: any) => {
      console.error('Error al enviar la solicitud', error);
      toast.error('Error al enviar la solicitud');
    },
  });

  const onSubmit = handleSubmit(async (data: RequestVacation) => {
    try {
      const formData: RequestVacation = {
        ...data,
        departmentApproval: isDepartmentApproved,
        RRHHApproval: isRRHHApproved,
        mayorApproval: isMayorApproved,
      };

      await toast.promise(
        mutation.mutateAsync(formData),
        {
          loading: 'Enviando solicitud...',
          success: 'Solicitud enviada',
          error: 'Error al enviar solicitud',
        },
        { duration: 2500 },
      );
    } catch (error: any) {
      console.error('Error durante el envío del formulario', error);
    }
  });

  return {
    onSubmit,
    register,
    mutation,
    isDepartmentApproved,
    isRRHHApproved,
    isMayorApproved,
    setIsDepartmentApproved,
    setIsRRHHApproved,
    setIsMayorApproved,
  };
};

export default usePostVacation;
