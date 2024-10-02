import { SalaryCertificatTemplateProps } from '@/types';

export async function getSalaryCertificateInfo() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const res = await fetch(
    // TODO - Change the URL to the correct one
    `https://66331bf7f7d50bbd9b48366c.mockapi.io/Test/salary-certificate/1`,
    options,
  );
  const data = (await res.json()) as SalaryCertificatTemplateProps;
  return data;
}


