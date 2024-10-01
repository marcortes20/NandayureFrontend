import { getSalaryCertificateInfo } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useGetSalaryCertificateTemplate = () => {
  const { data: SalaryCertificateInfo, isLoading } = useQuery({
    queryFn: async () => await getSalaryCertificateInfo(),
    queryKey: ['SalaryCertificateInfo'],
  });

  return {
    SalaryCertificateInfo,
    isLoading,
  };
};

export default useGetSalaryCertificateTemplate;
