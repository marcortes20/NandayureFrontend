import { ResetPassword } from '@/types/entities';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { postResetPassword } from '../server/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordSchema } from '@/lib/zod';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
interface Props {
  token: string
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
    mutationFn: async (data: ResetPassword) => await postResetPassword(data, token),
    onError: (error: any) => {
      console.error(error);
      setErrorMessage(error.message);
    }
  })
  const onSubmit = handleSubmit(async (data: ResetPassword) => {
    try {
      const response = await mutation.mutateAsync(data);

      // Extract employeeId and password from the response
      const { EmployeeId } = response;
      const { Password: Password } = data;

      // Use signIn to log in the user
      await signIn('credentials', {
        redirect: false,
        EmployeeId,
        Password,
      });
      // Show a success message
      toast.success('Contraseña actualizada con éxito');

      // Redirect to the desired page after successful sign-in
      router.push('/');
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message);
    }
  });

  return {
    register,
    onSubmit,
    errorMessage,
    mutation,
    errors
  }
}
export default usePostResetPassword;