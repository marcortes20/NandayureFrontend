import { Employee } from '@/types/entities';

export async function getEmployeeById(EmployeeId: string, token: string): Promise<Employee> {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/${EmployeeId}`, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    const data = (await response.json()) as Employee;
    return data;
  } catch (error: any) {
    throw new Error(`Error fetching employee data: ${error.message}`);
  }
}