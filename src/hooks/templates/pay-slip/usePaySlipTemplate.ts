import { getPaySlipInfo } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useGetPaySlipTemplate = ({ id }: { id: string }) => {
  const {
    data: PaySlipInfo,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => await getPaySlipInfo({ id }),
    queryKey: ['PaySlipInfo', id], // Incluye el id en la queryKey para evitar conflictos
    staleTime: 5000,
  });

  return {
    PaySlipInfo,
    isLoading,
    isError,
  };
};

export default useGetPaySlipTemplate;
