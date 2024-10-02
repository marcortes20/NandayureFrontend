'use client';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
const SalaryCertificateTemplate = dynamic(
  () =>
    import(
      '@/components/templates/salary-certificate/Salary-certificate-template'
    ),
  { ssr: false },
);

export default function PdfPage() {
  const pathname = usePathname();
  const parts = pathname.split('/');
  const id = parts[parts.length - 2];
  console.log(id);

  return (
    <>
        <SalaryCertificateTemplate id={id} />
    </>
  );
}
