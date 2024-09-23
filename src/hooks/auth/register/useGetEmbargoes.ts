import { getEmbargoes } from '@/server/auth/register/actions';
import { useQuery } from '@tanstack/react-query';

const useGetEmbargoes = () => {
  const { data: Embargoes } = useQuery({
    queryFn: async () => await getEmbargoes(),
    queryKey: ['Embargoes'],
  });

  return {
    Embargoes,
  };
};

export default useGetEmbargoes;
