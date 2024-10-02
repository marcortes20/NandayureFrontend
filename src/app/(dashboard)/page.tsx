'use client'
import dynamic from 'next/dynamic';

// Importa el componente de forma dinámica solo en el cliente
const SalaryCertificateTemplate = dynamic(
  () => import('@/components/templates/salary-certificate/Salary-certificate-template'),
  { ssr: false }
);

export default function HomePage() {
  return (
    <>
      <SalaryCertificateTemplate />
    </>
  );
}
