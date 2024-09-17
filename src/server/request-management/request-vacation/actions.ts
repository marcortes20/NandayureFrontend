import { RequestVacation } from '@/types/entities';

export async function postVacation(Vacation: RequestVacation) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Vacation),
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MOCK_BACKEND_URL}/request-vacation`,
    options,
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}
