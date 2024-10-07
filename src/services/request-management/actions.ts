import { RequestDetails } from "@/types";

export async function getAllRequests() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MOCK_BACKEND_URL}/requests`,
    options,
  );
  const data = await res.json() as RequestDetails[];
  return data;
}