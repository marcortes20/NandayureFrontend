import { getSalaryCertificateInfo } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useGetSalaryCertificateTemplate = ({ id }: { id: string }) => {
  const { data: SalaryCertificateInfo, isLoading } = useQuery({
    queryFn: async () => await getSalaryCertificateInfo({ id }),
    queryKey: ['SalaryCertificateInfo'],
  });

  return {
    SalaryCertificateInfo,
    isLoading,
  };
};

export default useGetSalaryCertificateTemplate;
