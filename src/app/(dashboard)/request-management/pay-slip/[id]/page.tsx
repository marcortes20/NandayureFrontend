'use client';
import SkeletonLoader from '@/components/ui/skeleton-loader';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

// Carga dinámica del componente BoletaPago
const PaySlipTemplate = dynamic(
  () => import('@/components/templates/pay-slip/pay-slip'),
  {
    ssr: false, // Indica que no se debe hacer SSR
    loading: () => <SkeletonLoader className="w-full h-screen" />, // Muestra un SkeletonLoader mientras se carga el componente
  },
);

type Params = {
  id: string;
};

export default function PaySlipTemplatePage() {
  const { id } = useParams<Params>();

  return (
    <>
      <PaySlipTemplate id={id} />
    </>
  );
}
