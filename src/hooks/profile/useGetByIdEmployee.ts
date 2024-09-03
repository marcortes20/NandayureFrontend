import { getByIdEmployee } from '@/server/profile/actions';
import { useQuery } from '@tanstack/react-query';

interface Props {
  employeeId: number;
}

const useGetByIdEmployee = ({ employeeId }: Props) => {
  const { data: employeeById } = useQuery({
    queryFn: async () => await getByIdEmployee({ employeeId }),
    queryKey: ['employeeById'],
  });

  return {
    employeeById,
  };
};

export default useGetByIdEmployee;