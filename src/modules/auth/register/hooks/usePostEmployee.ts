import { Employee } from "@/types/entities";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { postEmployee } from "../server/actions";
import { useRouter } from "next/navigation";


const usePostEmployee = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { handleSubmit, register } = useForm<Employee>();
  const router = useRouter();

  const mutation = useMutation({
      mutationFn: async (data: Employee) => await postEmployee(data),
      onError: (error: any) => {
          console.error(error);
          setErrorMessage(error.message);
      }
  });

  const onSubmit = handleSubmit(async (data: Employee) => {
      const convertedData = convertEmployeeTypes(data);
      await mutation.mutateAsync(convertedData);
      router.push('/success');
  });

  return {
      errorMessage,
      onSubmit,
      register,
      mutation
  };
}

export const convertEmployeeTypes = (employee: any): Employee => {
  return {
      EmployeeId: Number(employee.EmployeeId),
      Name: employee.Name,
      Surname1: employee.Surname1,
      Surname2: employee.Surname2,
      Birthdate: new Date(employee.Birthdate),
      HiringDate: new Date(employee.HiringDate),
      Email: employee.Email,
      CellPhone: employee.CellPhone,
      NumberChlidren: parseInt(employee.NumberChlidren, 10),
      AvailableVacationDays: parseInt(employee.AvailableVacationDays, 10),
      GrossSalary: Number(employee.GrossSalary),
      MaritalStatusId: parseInt(employee.MaritalStatusId, 10),
      GenderId: parseInt(employee.GenderId, 10),
  };
};

export default usePostEmployee;