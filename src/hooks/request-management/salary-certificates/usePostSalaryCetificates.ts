import { postSalaryCertificates } from '@/server/request-management/salary-certificates/actions';
import { RequestSalaryCertificate } from '@/types/entities';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const usePostSalaryCetificates = () => {
  const { register, handleSubmit } = useForm();

  const mutation = useMutation({
    mutationFn: async (data: RequestSalaryCertificate) => await postSalaryCertificates(data),
    onError: (error: any) => {
      console.error(error);
    },
  });

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      const mutationPromise = await toast.promise(mutation.mutateAsync(data), {
        loading: 'Enviando solicitud...',
        success: 'Solicitud enviada',
        error: 'Error al enviar solicitud',
      });
      await mutationPromise;
    } catch (error: any) {
      console.error(error);
    }
  });

  return {
    onSubmit,
    register,
    mutation,
  };
};
export default usePostSalaryCetificates;
