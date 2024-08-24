import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { postForgotPassword } from "../server/actions";
import { ForgotPassword } from "@/types/entities";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema } from "@/lib/zod";

const usePostSendEmail = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ForgotPassword>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: ForgotPassword) => await postForgotPassword(data),
    onError: (error: any) => {
      console.error(error);
      setErrorMessage(error.message);
    }
  })

  const onSubmit = handleSubmit(async (data: ForgotPassword) => {
    console.log(data);
    await mutation.mutateAsync(data);
  });

  return {
    errorMessage,
    onSubmit,
    register,
    mutation,
    errors
  };
}
export default usePostSendEmail;