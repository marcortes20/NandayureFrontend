import { RequestSalaryCertificate } from "@/types";


export async function getSalaryCertificates() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MOCK_BACKEND_UR}/salary-certificates`,
    options,
  );
  const data = await res.json();
  return data;
}

export async function postSalaryCertificates(
  salaryCertificate: RequestSalaryCertificate,
) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(salaryCertificate),
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/salary-certificates`,
    options,
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}
