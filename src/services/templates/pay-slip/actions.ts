import { Employee, JobPosition } from "@/types";
import { Annuites } from "@/types/Annuites";
import { OverTime } from "@/types/OverTime";

interface GetEmployeeByIdProps {
    employeeId: number;
  }
  
  export async function getIdEmployee({ employeeId }: GetEmployeeByIdProps) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    };
  
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/${employeeId}`,
      options,
    );
    const data = (await res.json()) as Employee;
    return data;
  }

  export async function getByIdOvertimes({ employeeId }: GetEmployeeByIdProps) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    };
  
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/overtimes/${employeeId}`,
      options,
    );
    const data = (await res.json()) as OverTime;
    return data;
  }

  export async function getByIdAannuites({ employeeId }: GetEmployeeByIdProps) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    };
  
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/annuities/${employeeId}`,
      options,
    );
    const data = (await res.json()) as Annuites;
    return data;
  }

  export async function getByIdJobPosition() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    };
  
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/job-positions/`,
      options,
    );
    const data = (await res.json()) as JobPosition;
    return data;
  }