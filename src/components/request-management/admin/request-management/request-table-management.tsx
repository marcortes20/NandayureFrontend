'use client';

import { useGetAllRequest } from '@/hooks';
import { RequestDetails } from '@/types';
import { useState } from 'react';
import RequestTable from './request-table';
import RequestModal from './request-modal';

export default function RequestTableManagement() {
  const [selectedRequest, setSelectedRequest] = useState<RequestDetails | null>(
    null,
  );
  const { allRequests, isLoading } = useGetAllRequest();

  const handleRowClick = (request: RequestDetails) => {
    setSelectedRequest(request);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Gestión de Solicitudes</h1>
      <RequestTable
        requests={allRequests || []}
        onRowClick={handleRowClick}
        isLoading={isLoading}
      />
      <RequestModal
        request={selectedRequest}
        isOpen={!!selectedRequest}
        onClose={handleCloseModal}
      />
    </div>
  );
}
