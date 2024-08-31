import { getGenders } from '@/server/auth/register/actions';
import { useQuery } from '@tanstack/react-query';

const useGetGenders = () => {
  const { data: genders } = useQuery({
    queryFn: async () => await getGenders(),
    queryKey: ['genders'],
  });

  return {
    genders,
  };
};

export default useGetGenders;
