import { RequestDetails } from '@/types';

export async function getAllRequests() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/requests`,
    options,
  );
  const data = (await res.json()) as RequestDetails[];
  return data;
}

export async function getAllRequestsById(employeeId: number) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/requests/${employeeId}`,
    options,
  );
  const data = (await res.json()) as RequestDetails[];
  return data;
}
