'use client';

import { useGetAllRequest } from '@/hooks';
import { RequestDetails } from '@/types';
import { useState, useMemo } from 'react';
import RequestTable from './request-table';
import RequestModal from './request-modal';
import { useDebounce } from '@/hooks/common/useDebounce';
import SearchBar from './search-bar/search-bar';

export default function RequestTableManagement() {
  const [selectedRequest, setSelectedRequest] = useState<RequestDetails | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchQuery = useDebounce<string>(searchQuery, 500);
  const { allRequests, isLoading } = useGetAllRequest();

  const handleRowClick = (request: RequestDetails) => {
    setSelectedRequest(request);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
  };

  // Filtrar las solicitudes por EmployeeId usando el valor debounced
  const filteredRequests = useMemo(() => {
    if (!debouncedSearchQuery) return allRequests;
    return allRequests?.filter((request) =>
      request.EmployeeId.toString()
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase()),
    );
  }, [allRequests, debouncedSearchQuery]);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">Gestión de Solicitudes</h1>
        <div className='flex justify-center items-center'>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
      </div>
      <RequestTable
        requests={filteredRequests || []}
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
