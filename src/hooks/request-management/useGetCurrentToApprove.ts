import { getCurrentToApprove } from '@/services';
import { useQuery } from '@tanstack/react-query';
import useGetToken from '../common/useGetToken';

const useGetCurrentToApprove = () => {
  const { token } = useGetToken();
  const { data: currentToApprove, isLoading } = useQuery({
    queryFn: async () => await getCurrentToApprove(token),
    queryKey: ['getCurrentToApprove'],
  });

  return {
    currentToApprove,
    isLoading,
  };
};

export default useGetCurrentToApprove;
