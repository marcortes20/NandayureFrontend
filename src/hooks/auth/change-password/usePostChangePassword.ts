import { ChangePasswordSchema } from '@/lib/zod';
import { ChangePassword } from '@/types/entities';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { postChangePassword } from '@/server/auth/change-password/actions';
import useGetToken from '@/hooks/common/useGetToken';

const useChangePassword = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { token } = useGetToken();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ChangePassword>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: ChangePassword) =>
      await postChangePassword(data, token),
    onError: (error: any) => {
      setErrorMessage(error.message);
    },
  });

  const onSubmit = handleSubmit(async (data: ChangePassword) => {
    try {
      await toast.promise(mutation.mutateAsync(data), {
        loading: 'Cargando...',
        success: 'Contraseña editada exitosamente.',
        error: 'Error al cambiar la contraseña.',
      });
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  });

  return {
    register,
    onSubmit,
    errorMessage,
    mutation,
    errors,
  };
};
export default useChangePassword;
