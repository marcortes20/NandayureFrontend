'use client';

import { useState, useEffect } from 'react';
import { format } from '@formkit/tempo';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  FileText,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { RequestDetails } from '@/types';
import { useGetAllRequestById } from '@/hooks';

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

const getRequestIcon = (typeId: number) => {
  switch (typeId) {
    case 1:
      return <Calendar className="h-6 w-6" />;
    case 2:
      return <FileText className="h-6 w-6" />;
    case 3:
      return <DollarSign className="h-6 w-6" />;
    default:
      return <Clock className="h-6 w-6" />;
  }
};

const getStatusColor = (stateId: number) => {
  switch (stateId) {
    case 1:
      return 'bg-golden-dream-500 text-white';
    case 2:
      return 'bg-apple-500 text-white';
    case 3:
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const RequestCard = ({
  request,
  onClick,
}: {
  request: RequestDetails;
  onClick: () => void;
}) => (
  <Card
    className="cursor-pointer hover:shadow-md transition-shadow"
    onClick={onClick}
  >
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
        Solicitud #{request.id}
      </CardTitle>
      <Badge className={getStatusColor(request.RequestStateId)}>
        {getRequestState(request.RequestStateId)}
      </Badge>
    </CardHeader>
    <CardContent>
      <div className="flex items-center space-x-4 text-sm text-gray-500">
        {getRequestIcon(request.RequestTypeId)}
        <span>{getRequestType(request.RequestTypeId)}</span>
      </div>
    </CardContent>
    <CardFooter>
      <p className="text-xs text-gray-500">Fecha: {formatDate(request.date)}</p>
    </CardFooter>
  </Card>
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
          <DialogTitle>Detalles de la Solicitud #{request.id}</DialogTitle>
          <DialogDescription>
            Tipo: {getRequestType(request.RequestTypeId)} | Estado:{' '}
            {getRequestState(request.RequestStateId)}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Fecha de Solicitud:</span>
            <span>{formatDate(request.date)}</span>
            <span className="font-semibold">ID de Empleado:</span>
            <span>{request.EmployeeId}</span>
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
            {request.RequestApprovals.sort(
              (a, b) => a.processNumber - b.processNumber,
            ).map((approval) => (
              <Card key={approval.id} className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">
                    Proceso {approval.processNumber}
                  </span>
                  {approval.approved === true && (
                    <CheckCircle2 className="text-green-500 h-5 w-5" />
                  )}
                  {approval.approved === false && (
                    <XCircle className="text-red-500 h-5 w-5" />
                  )}
                  {approval.approved === null && (
                    <Clock className="text-yellow-500 h-5 w-5" />
                  )}
                </div>
                <div className="mt-2 text-sm">
                  <p>
                    <span className="font-semibold">Aprobador:</span>{' '}
                    {approval.approverId || 'N/A'}
                  </p>
                  {approval.ApprovedDate && (
                    <p>
                      <span className="font-semibold">
                        Fecha de Aprobación:
                      </span>{' '}
                      {formatDate(approval.ApprovedDate)}
                    </p>
                  )}
                  {approval.observation && (
                    <p>
                      <span className="font-semibold">Observación:</span>{' '}
                      {approval.observation}
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function RequestCardManagement() {
  const [selectedRequest, setSelectedRequest] = useState<RequestDetails | null>(null);
  const { AllRequestsById } = useGetAllRequestById();

  const handleRequestClick = (request: RequestDetails) => {
    setSelectedRequest(request);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Mis Solicitudes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AllRequestsById?.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            onClick={() => handleRequestClick(request)}
          />
        ))}
      </div>
      <RequestModal
        request={selectedRequest}
        isOpen={!!selectedRequest}
        onClose={handleCloseModal}
      />
    </div>
  );
}
