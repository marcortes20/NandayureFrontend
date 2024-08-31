import { jwtDecode } from 'jwt-decode';
import { useSession } from 'next-auth/react';

const useGetRoles = () => {
  const { data: session } = useSession();
  const token = session?.user?.access_token;
  console.log(token);

  let roles;
  if (token) {
    const payload: any = jwtDecode(token);
    roles = payload.roles;
  }
  return {
    token,
    roles,
  };
};

export default useGetRoles;
