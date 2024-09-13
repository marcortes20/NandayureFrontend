import { getDepartments } from '@/server/auth/register/actions';
import { useQuery } from '@tanstack/react-query';

const useGetDepartaments = () => {
  const { data: Departaments } = useQuery({
    queryFn: async () => await getDepartments(),
    queryKey: ['Embargoes'],
  });

  return {
    Departaments,
  };
};

export default useGetDepartaments;
