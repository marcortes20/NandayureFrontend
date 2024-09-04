import { ResetPassword } from '@/types/entities';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { postResetPassword } from '../../../server/auth/reset-password/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordSchema } from '@/lib/zod';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
interface Props {
  token: string;
}
const usePostResetPassword = ({ token }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetPassword>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: ResetPassword) =>
      await postResetPassword(data, token),
    onError: (error: any) => {
      setErrorMessage(error.message);
    },
  });

  const onSubmit = handleSubmit(async (data: ResetPassword) => {
    try {
      const response = await toast.promise(
        mutation.mutateAsync(data),
        {
          loading: 'Cargando...',
          success:
            'Contraseña editada exitosamente. Serás redirigido a la página inicial en breve.',
          error:
            'El enlace que intentas usar ya ha sido utilizado o ha expirado. Por favor, solicita uno nuevo para continuar.',
        },
        { duration: 2500 },
      );

      // Extract employeeId and password from the response
      const { EmployeeId } = response;
      const { Password: Password } = data;

      // Use signIn to log in the user
      await signIn('credentials', {
        redirect: false,
        EmployeeId,
        Password,
      });
      setTimeout(() => {
        router.push('/');
      }, 2500);
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
export default usePostResetPassword;
