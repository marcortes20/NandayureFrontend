import { useSession } from 'next-auth/react';

const useGetToken = () => {
  const { data: session } = useSession();
  const token = session?.user?.access_token as string;
  return {
    token,
  };
};
export default useGetToken;
