import { ResetPassword } from '@/types/entities';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { postResetPassword } from '../server/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordSchema } from '@/lib/zod';
import { useRouter } from 'next/navigation';
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
    await mutation.mutateAsync(data);
    router.push('/auth/login');
  })

  return {
    register,
    onSubmit,
    errorMessage,
    mutation,
    errors
  }
}
export default usePostResetPassword;