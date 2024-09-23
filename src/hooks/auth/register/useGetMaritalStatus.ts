import { getMaritalStatus } from '@/server/auth/register/actions';
import { useQuery } from '@tanstack/react-query';

const useGetMaritalStatus = () => {
  const { data: maritalStatus } = useQuery({
    queryFn: async () => await getMaritalStatus(),
    queryKey: ['maritalStatus'],
  });

  return {
    maritalStatus,
  };
};
export default useGetMaritalStatus;
