'use client';
import SalaryCertificateTemplate from '@/components/templates/salary-certificate/Salary-certificate-template';
import { useParams } from 'next/navigation';

type Params = {
  id: string;
};

export default function SalaryCertificateTemplatePage() {
  const { id } = useParams<Params>();

  return (
    <>
      <SalaryCertificateTemplate id={id} />
    </>
  );
}
