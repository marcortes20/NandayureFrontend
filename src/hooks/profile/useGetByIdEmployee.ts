import { getByIdEmployee } from '@/server/profile/actions';
import { useQuery } from '@tanstack/react-query';

interface Props {
  employeeId: number;
}

const useGetByIdEmployee = ({ employeeId }: Props) => {
  const {
    data: employeeById,
    isLoading,
  } = useQuery({
    queryFn: async () => await getByIdEmployee({ employeeId }),
    queryKey: ['employeeById', employeeId], // Incluye employeeId en la clave de la consulta
    enabled: !!employeeId, // Solo ejecuta la consulta si employeeId está definido
  });

  return {
    employeeById,
    isLoading
  };
};

export default useGetByIdEmployee;
