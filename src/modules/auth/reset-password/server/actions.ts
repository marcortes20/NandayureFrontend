import { ResetPassword } from "@/types/entities";

export async function postResetPassword(resetPassword: ResetPassword, token: string) {
  const { Password } = resetPassword
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ Password: Password }),
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`,options);
  const data = await res.json();
  if(!res.ok){
   throw new Error(data.error);
  }
  return data;

}