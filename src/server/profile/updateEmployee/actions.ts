import { UpdateEmployee } from "@/types";


interface Props {
  employeeId: number;
  employee: UpdateEmployee;
}

export async function updateEmployee({ employeeId, employee }: Props) {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/${employeeId}`,
    options,
  );
  const data = (await res.json()) as UpdateEmployee;
  return data;
}
