import { Employee } from '@/types/entities';

interface Props {
  employeeId: number;
}

export async function getByIdEmployee({ employeeId }: Props) {
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