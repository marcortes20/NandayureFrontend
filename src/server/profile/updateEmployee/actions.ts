import { Employee } from "@/types/entities";

interface Props {
  employeeId: number;
  employee: Employee;
}

export async function updateEmployee({ employeeId, employee }: Props) {
  const options = {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/${employeeId}`,
    options
  );
  const data = (await res.json()) as Employee;
  return data;
}