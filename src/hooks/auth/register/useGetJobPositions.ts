import { getJobsPositions } from '@/server/auth/register/actions';
import { useQuery } from '@tanstack/react-query';

const useGetJobsPositions = () => {
  const { data: JobsPositions } = useQuery({
    queryFn: async () => await getJobsPositions(),
    queryKey: ['JobsPositions'],
  });

  return {
    JobsPositions,
  };
};
export default useGetJobsPositions;
