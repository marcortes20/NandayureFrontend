import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { RequestDetails } from '@/types';
import { format } from '@formkit/tempo';
import {
  Clock,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

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

export default RequestModal;
