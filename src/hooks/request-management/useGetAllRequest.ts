import { getAllRequests } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useGetAllRequest = () => {
  const { data: allRequests } = useQuery({
    queryFn: async () => await getAllRequests(),
    queryKey: ['getAllRequests'],
  });

  return {
    allRequests,
  };
};

export default useGetAllRequest;
