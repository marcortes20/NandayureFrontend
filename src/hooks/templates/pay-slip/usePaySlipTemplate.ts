import { useQuery } from '@tanstack/react-query';
import { getIdEmployee, getByIdOvertimes, getByIdAannuites, getByIdJobPosition } from '@/services';
import { Employee, JobPosition } from '@/types';
import { OverTime } from '@/types/OverTime';
import { Annuites } from '@/types/Annuites';

interface UseGetPaySlipTemplateProps {
  employeeId: number;
}

const useGetPaySlipTemplate = ({ employeeId }: UseGetPaySlipTemplateProps) => {
  // Fetch individual data for employee, overtime, annuities, and job position

  const {
    data: employee,
    isLoading: isEmployeeLoading,
    isError: isEmployeeError,
  } = useQuery<Employee>({
    queryFn: async () => await getIdEmployee({ employeeId }),
    queryKey: ['employee', employeeId],
    staleTime: 5000,
  });

  const {
    data: overTime,
    isLoading: isOverTimeLoading,
    isError: isOverTimeError,
  } = useQuery<OverTime>({
    queryFn: async () => await getByIdOvertimes({ employeeId }),
    queryKey: ['overTime', employeeId],
    staleTime: 5000,
  });

  const {
    data: annuities,
    isLoading: isAnnuitiesLoading,
    isError: isAnnuitiesError,
  } = useQuery<Annuites>({
    queryFn: async () => await getByIdAannuites({ employeeId }),
    queryKey: ['annuities', employeeId],
    staleTime: 5000,
  });

  const {
    data: jobPosition,
    isLoading: isJobPositionLoading,
    isError: isJobPositionError,
  } = useQuery<JobPosition>({
    queryFn: async () => await getByIdJobPosition(),
    queryKey: ['jobPosition'],
    staleTime: 5000,
  });

  // Consolidate loading and error states
  const isLoading = isEmployeeLoading || isOverTimeLoading || isAnnuitiesLoading || isJobPositionLoading;
  const isError = isEmployeeError || isOverTimeError || isAnnuitiesError || isJobPositionError;

  return {
    employee,
    overTime,
    annuities,
    jobPosition,
    isLoading,
    isError,
  };
};

export default useGetPaySlipTemplate;
