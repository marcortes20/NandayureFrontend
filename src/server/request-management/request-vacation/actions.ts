import { RequestVacation } from "@/types";

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
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/request-vacation`,
    options,
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}


export async function getVacation() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MOCK_BACKEND_URL}/request-vacation`,
    options,
  );
  const data = await res.json();
  return data;
}