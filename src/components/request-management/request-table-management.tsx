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

interface RequestApproval {
  id: number;
  approverId: string | null;
  requesterId: string;
  processNumber: number;
  RequestId: number;
  observation: string | null;
  approved: boolean | null;
  current: boolean;
  ApprovedDate: string | null;
}

interface RequestVacation {
  id: number;
  daysRequested: number;
  departureDate: string;
  entryDate: string;
  RequestId: number;
}

export interface Request {
  id: number;
  date: string;
  RequestStateId: number;
  RequestTypeId: number;
  EmployeeId: string;
  RequestApprovals: RequestApproval[];
  RequestVacation: RequestVacation | null;
  RequestSalaryCertificate: null;
  RequestPaymentConfirmation: null;
};


// Mock data
const mockData: Request[] = [
  {
    id: 1,
    date: '2024-10-07T01:45:26.000Z',
    RequestStateId: 1,
    RequestTypeId: 1,
    EmployeeId: '504510677',
    RequestApprovals: [
      {
        id: 1,
        approverId: null,
        requesterId: '504510677',
        processNumber: 1,
        RequestId: 1,
        observation:
          'La solicitud fue aprobada automáticamente en el proceso 1 ya que el solicitante es el jefe del departamento o no tiene un jefe de departamento.',
        approved: true,
        current: false,
        ApprovedDate: '2024-10-07T01:45:26.000Z',
      },
      {
        id: 2,
        approverId: '504950876',
        requesterId: '504510677',
        processNumber: 2,
        RequestId: 1,
        observation: null,
        approved: null,
        current: true,
        ApprovedDate: null,
      },
      {
        id: 3,
        approverId: '504420108',
        requesterId: '504510677',
        processNumber: 3,
        RequestId: 1,
        observation: null,
        approved: null,
        current: false,
        ApprovedDate: null,
      },
    ],
    RequestVacation: {
      id: 1,
      daysRequested: 7,
      departureDate: '2024-10-06T06:00:00.000Z',
      entryDate: '2024-10-13T06:00:00.000Z',
      RequestId: 1,
    },
    RequestSalaryCertificate: null,
    RequestPaymentConfirmation: null,
  },
  // 10 more vacation requests
  {
    id: 2,
    date: '2024-10-08T09:30:00.000Z',
    RequestStateId: 1,
    RequestTypeId: 1,
    EmployeeId: '504510678',
    RequestApprovals: [
      {
        id: 4,
        approverId: null,
        requesterId: '504510678',
        processNumber: 1,
        RequestId: 2,
        observation:
          'La solicitud fue aprobada automáticamente en el proceso 1.',
        approved: true,
        current: false,
        ApprovedDate: '2024-10-08T09:31:00.000Z',
      },
      {
        id: 5,
        approverId: '504950877',
        requesterId: '504510678',
        processNumber: 2,
        RequestId: 2,
        observation: null,
        approved: null,
        current: true,
        ApprovedDate: null,
      },
    ],
    RequestVacation: {
      id: 2,
      daysRequested: 5,
      departureDate: '2024-11-01T06:00:00.000Z',
      entryDate: '2024-11-06T06:00:00.000Z',
      RequestId: 2,
    },
    RequestSalaryCertificate: null,
    RequestPaymentConfirmation: null,
  },
  {
    id: 3,
    date: '2024-10-09T11:15:00.000Z',
    RequestStateId: 2,
    RequestTypeId: 1,
    EmployeeId: '504510679',
    RequestApprovals: [
      {
        id: 6,
        approverId: null,
        requesterId: '504510679',
        processNumber: 1,
        RequestId: 3,
        observation:
          'La solicitud fue aprobada automáticamente en el proceso 1.',
        approved: true,
        current: false,
        ApprovedDate: '2024-10-09T11:16:00.000Z',
      },
      {
        id: 7,
        approverId: '504950878',
        requesterId: '504510679',
        processNumber: 2,
        RequestId: 3,
        observation: null,
        approved: true,
        current: false,
        ApprovedDate: '2024-10-10T10:00:00.000Z',
      },
      {
        id: 8,
        approverId: '504420109',
        requesterId: '504510679',
        processNumber: 3,
        RequestId: 3,
        observation: null,
        approved: null,
        current: true,
        ApprovedDate: null,
      },
    ],
    RequestVacation: {
      id: 3,
      daysRequested: 10,
      departureDate: '2024-11-15T06:00:00.000Z',
      entryDate: '2024-11-25T06:00:00.000Z',
      RequestId: 3,
    },
    RequestSalaryCertificate: null,
    RequestPaymentConfirmation: null,
  },
  {
    id: 4,
    date: '2024-10-10T14:45:00.000Z',
    RequestStateId: 3,
    RequestTypeId: 1,
    EmployeeId: '504510680',
    RequestApprovals: [
      {
        id: 9,
        approverId: null,
        requesterId: '504510680',
        processNumber: 1,
        RequestId: 4,
        observation:
          'La solicitud fue rechazada debido a falta de días disponibles.',
        approved: false,
        current: false,
        ApprovedDate: '2024-10-10T14:46:00.000Z',
      },
    ],
    RequestVacation: {
      id: 4,
      daysRequested: 15,
      departureDate: '2024-12-01T06:00:00.000Z',
      entryDate: '2024-12-16T06:00:00.000Z',
      RequestId: 4,
    },
    RequestSalaryCertificate: null,
    RequestPaymentConfirmation: null,
  },
  {
    id: 5,
    date: '2024-10-11T16:00:00.000Z',
    RequestStateId: 1,
    RequestTypeId: 1,
    EmployeeId: '504510681',
    RequestApprovals: [
      {
        id: 10,
        approverId: null,
        requesterId: '504510681',
        processNumber: 1,
        RequestId: 5,
        observation:
          'La solicitud fue aprobada automáticamente en el proceso 1.',
        approved: true,
        current: false,
        ApprovedDate: '2024-10-11T16:01:00.000Z',
      },
      {
        id: 11,
        approverId: '504950879',
        requesterId: '504510681',
        processNumber: 2,
        RequestId: 5,
        observation: null,
        approved: null,
        current: true,
        ApprovedDate: null,
      },
    ],
    RequestVacation: {
      id: 5,
      daysRequested: 7,
      departureDate: '2024-11-20T06:00:00.000Z',
      entryDate: '2024-11-27T06:00:00.000Z',
      RequestId: 5,
    },
    RequestSalaryCertificate: null,
    RequestPaymentConfirmation: null,
  },
  {
    id: 6,
    date: '2024-10-12T08:25:00.000Z',
    RequestStateId: 2,
    RequestTypeId: 1,
    EmployeeId: '504510682',
    RequestApprovals: [
      {
        id: 12,
        approverId: null,
        requesterId: '504510682',
        processNumber: 1,
        RequestId: 6,
        observation:
          'La solicitud fue aprobada automáticamente en el proceso 1.',
        approved: true,
        current: false,
        ApprovedDate: '2024-10-12T08:26:00.000Z',
      },
      {
        id: 13,
        approverId: '504950880',
        requesterId: '504510682',
        processNumber: 2,
        RequestId: 6,
        observation: null,
        approved: true,
        current: false,
        ApprovedDate: '2024-10-13T09:00:00.000Z',
      },
      {
        id: 14,
        approverId: '504420110',
        requesterId: '504510682',
        processNumber: 3,
        RequestId: 6,
        observation: null,
        approved: null,
        current: true,
        ApprovedDate: null,
      },
    ],
    RequestVacation: {
      id: 6,
      daysRequested: 12,
      departureDate: '2024-12-05T06:00:00.000Z',
      entryDate: '2024-12-17T06:00:00.000Z',
      RequestId: 6,
    },
    RequestSalaryCertificate: null,
    RequestPaymentConfirmation: null,
  },
  {
    id: 7,
    date: '2024-10-13T10:50:00.000Z',
    RequestStateId: 1,
    RequestTypeId: 1,
    EmployeeId: '504510683',
    RequestApprovals: [
      {
        id: 15,
        approverId: null,
        requesterId: '504510683',
        processNumber: 1,
        RequestId: 7,
        observation:
          'La solicitud fue aprobada automáticamente en el proceso 1.',
        approved: true,
        current: false,
        ApprovedDate: '2024-10-13T10:51:00.000Z',
      },
      {
        id: 16,
        approverId: '504950881',
        requesterId: '504510683',
        processNumber: 2,
        RequestId: 7,
        observation: null,
        approved: null,
        current: true,
        ApprovedDate: null,
      },
    ],
    RequestVacation: {
      id: 7,
      daysRequested: 3,
      departureDate: '2024-12-28T06:00:00.000Z',
      entryDate: '2024-12-31T06:00:00.000Z',
      RequestId: 7,
    },
    RequestSalaryCertificate: null,
    RequestPaymentConfirmation: null,
  },
  {
    id: 8,
    date: '2024-10-14T13:15:00.000Z',
    RequestStateId: 1,
    RequestTypeId: 1,
    EmployeeId: '504510684',
    RequestApprovals: [
      {
        id: 17,
        approverId: null,
        requesterId: '504510684',
        processNumber: 1,
        RequestId: 8,
        observation:
          'La solicitud fue aprobada automáticamente en el proceso 1.',
        approved: true,
        current: false,
        ApprovedDate: '2024-10-14T13:16:00.000Z',
      },
      {
        id: 18,
        approverId: '504950882',
        requesterId: '504510684',
        processNumber: 2,
        RequestId: 8,
        observation: null,
        approved: null,
        current: true,
        ApprovedDate: null,
      },
    ],
    RequestVacation: {
      id: 8,
      daysRequested: 14,
      departureDate: '2025-01-05T06:00:00.000Z',
      entryDate: '2025-01-19T06:00:00.000Z',
      RequestId: 8,
    },
    RequestSalaryCertificate: null,
    RequestPaymentConfirmation: null,
  },
  {
    id: 9,
    date: '2024-10-15T15:40:00.000Z',
    RequestStateId: 2,
    RequestTypeId: 1,
    EmployeeId: '504510685',
    RequestApprovals: [
      {
        id: 19,
        approverId: null,
        requesterId: '504510685',
        processNumber: 1,
        RequestId: 9,
        observation:
          'La solicitud fue aprobada automáticamente en el proceso 1.',
        approved: true,
        current: false,
        ApprovedDate: '2024-10-15T15:41:00.000Z',
      },
      {
        id: 20,
        approverId: '504950883',
        requesterId: '504510685',
        processNumber: 2,
        RequestId: 9,
        observation: null,
        approved: true,
        current: false,
        ApprovedDate: '2024-10-16T09:00:00.000Z',
      },
      {
        id: 21,
        approverId: '504420111',
        requesterId: '504510685',
        processNumber: 3,
        RequestId: 9,
        observation: null,
        approved: null,
        current: true,
        ApprovedDate: null,
      },
    ],
    RequestVacation: {
      id: 9,
      daysRequested: 8,
      departureDate: '2025-01-20T06:00:00.000Z',
      entryDate: '2025-01-28T06:00:00.000Z',
      RequestId: 9,
    },
    RequestSalaryCertificate: null,
    RequestPaymentConfirmation: null,
  },
  {
    id: 10,
    date: '2024-10-16T17:05:00.000Z',
    RequestStateId: 3,
    RequestTypeId: 1,
    EmployeeId: '504510686',
    RequestApprovals: [
      {
        id: 22,
        approverId: null,
        requesterId: '504510686',
        processNumber: 1,
        RequestId: 10,
        observation:
          'La solicitud fue rechazada debido a conflicto con proyectos en curso.',
        approved: false,
        current: false,
        ApprovedDate: '2024-10-16T17:06:00.000Z',
      },
    ],
    RequestVacation: {
      id: 10,
      daysRequested: 6,
      departureDate: '2024-12-15T06:00:00.000Z',
      entryDate: '2024-12-21T06:00:00.000Z',
      RequestId: 10,
    },
    RequestSalaryCertificate: null,
    RequestPaymentConfirmation: null,
  },
  {
    id: 11,
    date: '2024-10-17T19:30:00.000Z',
    RequestStateId: 1,
    RequestTypeId: 1,
    EmployeeId: '504510687',
    RequestApprovals: [
      {
        id: 23,
        approverId: null,
        requesterId: '504510687',
        processNumber: 1,
        RequestId: 11,
        observation:
          'La solicitud fue aprobada automáticamente en el proceso 1.',
        approved: true,
        current: false,
        ApprovedDate: '2024-10-17T19:31:00.000Z',
      },
      {
        id: 24,
        approverId: '504950884',
        requesterId: '504510687',
        processNumber: 2,
        RequestId: 11,
        observation: null,
        approved: null,
        current: true,
        ApprovedDate: null,
      },
    ],
    RequestVacation: {
      id: 11,
      daysRequested: 4,
      departureDate: '2024-11-25T06:00:00.000Z',
      entryDate: '2024-11-29T06:00:00.000Z',
      RequestId: 11,
    },
    RequestSalaryCertificate: null,
    RequestPaymentConfirmation: null,
  },
];



const RequestTable = ({
  requests,
  onRowClick,
}: {
  requests: Request[];
  onRowClick: (request: Request) => void;
}) => (
  <div className='border rounded shadow'>
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
  request: Request | null;
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
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  const handleRowClick = (request: Request) => {
    setSelectedRequest(request);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Gestión de Solicitudes</h1>
      <RequestTable requests={mockData} onRowClick={handleRowClick} />
      <RequestModal
        request={selectedRequest}
        isOpen={!!selectedRequest}
        onClose={handleCloseModal}
      />
    </div>
  );
}
