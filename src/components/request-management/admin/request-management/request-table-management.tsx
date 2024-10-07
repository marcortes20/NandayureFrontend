'use client';

import { useState } from 'react';
import { format } from '@formkit/tempo';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText, DollarSign } from 'lucide-react';
import { RequestDetails } from '@/types';
import { useGetAllRequest } from '@/hooks';

// Helper functions
const formatDate = (dateString: string) =>
  format(new Date(dateString), 'DD/MM/YYYY');

const getRequestType = (typeId: number) => {
  const types = {
    1: 'Vacaciones',
    2: 'Certificado de Salario',
    3: 'Confirmación de Pago',
  };
  return types[typeId as keyof typeof types] || 'Desconocido';
};

const getRequestState = (stateId: number) => {
  const states = {
    1: 'Pendiente',
    2: 'Aprobado',
    3: 'Rechazado',
  };
  return states[stateId as keyof typeof states] || 'Desconocido';
};

const RequestTable = ({
  requests,
  onRowClick,
}: {
  requests: RequestDetails[];
  onRowClick: (request: RequestDetails) => void;
}) => (
  <div className="border rounded shadow">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID de Solicitud</TableHead>
          <TableHead>ID de Empleado</TableHead>
          <TableHead>Tipo de Solicitud</TableHead>
          <TableHead>Fecha de Solicitud</TableHead>
          <TableHead>Estado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow
            key={request.id}
            onClick={() => onRowClick(request)}
            className="cursor-pointer hover:bg-muted"
          >
            <TableCell>{request.id}</TableCell>
            <TableCell>{request.EmployeeId}</TableCell>
            <TableCell>{getRequestType(request.RequestTypeId)}</TableCell>
            <TableCell>{formatDate(request.date)}</TableCell>
            <TableCell>
              <Badge
                variant={
                  request.RequestStateId === 2
                    ? 'approving'
                    : request.RequestStateId === 3
                    ? 'rejecting'
                    : 'pending'
                }
              >
                {getRequestState(request.RequestStateId)}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

const RequestModal = ({
  request,
  isOpen,
  onClose,
}: {
  request: RequestDetails | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!request) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalles de la Solicitud</DialogTitle>
          <DialogDescription>
            ID de Solicitud: {request.id} | ID de Empleado: {request.EmployeeId}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <div className="flex items-center gap-2">
              {request.RequestTypeId === 1 && <Calendar className="h-4 w-4" />}
              {request.RequestTypeId === 2 && <FileText className="h-4 w-4" />}
              {request.RequestTypeId === 3 && (
                <DollarSign className="h-4 w-4" />
              )}
              <span className="font-semibold">Tipo de Solicitud:</span>
            </div>
            <span>{getRequestType(request.RequestTypeId)}</span>
            <span className="font-semibold">Fecha de Solicitud:</span>
            <span>{formatDate(request.date)}</span>
            <span className="font-semibold">Estado:</span>
            <Badge
              variant={
                request.RequestStateId === 2
                  ? 'approving'
                  : request.RequestStateId === 3
                  ? 'rejecting'
                  : 'pending'
              }
              className="w-24 flex items-center justify-center"
            >
              {getRequestState(request.RequestStateId)}
            </Badge>
          </div>

          {request.RequestTypeId === 1 && request.RequestVacation && (
            <div className="grid grid-cols-2 items-center gap-4">
              <span className="font-semibold">Días Solicitados:</span>
              <span>{request.RequestVacation.daysRequested}</span>
              <span className="font-semibold">Fecha de Salida:</span>
              <span>{formatDate(request.RequestVacation.departureDate)}</span>
              <span className="font-semibold">Fecha de Regreso:</span>
              <span>{formatDate(request.RequestVacation.entryDate)}</span>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Proceso de Aprobación</h3>
            {request.RequestApprovals.map((approval) => (
              <div key={approval.id} className="rounded-md border p-4">
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-semibold">Número de Proceso:</span>
                  <span>{approval.processNumber}</span>
                  <span className="font-semibold">ID del Aprobador:</span>
                  <span>{approval.approverId || 'N/A'}</span>
                  <span className="font-semibold">Estado:</span>
                  <Badge
                    variant={
                      approval.approved
                        ? 'approving'
                        : approval.approved === false
                        ? 'rejecting'
                        : 'pending'
                    }
                    className="w-24 flex items-center justify-center"
                  >
                    {approval.approved
                      ? 'Aprobado'
                      : approval.approved === false
                      ? 'Rechazado'
                      : 'Pendiente'}
                  </Badge>
                  {approval.ApprovedDate && (
                    <>
                      <span className="font-semibold">
                        Fecha de Aprobación:
                      </span>
                      <span>{formatDate(approval.ApprovedDate)}</span>
                    </>
                  )}
                  {approval.observation && (
                    <>
                      <span className="font-semibold">Observación:</span>
                      <span>{approval.observation}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function RequestTableManagement() {
  const [selectedRequest, setSelectedRequest] = useState<RequestDetails | null>(null);
  const { allRequests } = useGetAllRequest();

  const handleRowClick = (request: RequestDetails) => {
    setSelectedRequest(request);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Gestión de Solicitudes</h1>
      <RequestTable requests={allRequests || []} onRowClick={handleRowClick} />
      <RequestModal
        request={selectedRequest}
        isOpen={!!selectedRequest}
        onClose={handleCloseModal}
      />
    </div>
  );
}
