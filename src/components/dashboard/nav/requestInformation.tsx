import { currentToApprove } from '@/types';
import { format } from '@formkit/tempo';

export default function RequestInformation({
  request,
}: {
  request: currentToApprove;
}) {
  return (
    <>
      <div>
        {request.Request.RequestVacation ? (
          <div>
            <p>
              <span className="font-medium">Días solicitados:</span>{' '}
              {request.Request.RequestVacation.daysRequested}
            </p>
            <p>
              <span className="font-medium">Fecha salida:</span>{' '}
              {format({
                date: request.Request.RequestVacation.departureDate,
                format: 'YYYY-MM-DD',
                locale: 'en',
              })}
            </p>
            <p>
              <span className="font-medium">Fecha entrada:</span>{' '}
              {format({
                date: request.Request.RequestVacation.entryDate,
                format: 'YYYY-MM-DD',
                locale: 'en',
              })}
            </p>

            <p className="text-sm text-gray-500">
              Aprobación de Proceso {request.processNumber}
            </p>

            <p className="text-sm text-gray-500">Procesos involucrados: 3</p>
          </div>
        ) : request.Request.RequestSalaryCertificate ? (
          <div>
            <p>
              <span className="font-medium">Razón:</span>{' '}
              {request.Request.RequestSalaryCertificate.reason}
            </p>
            <p className="text-sm text-gray-500">
              Aprobación de Proceso {request.processNumber}
            </p>

            <p className="text-sm text-gray-500">Procesos involucrados: 1</p>
          </div>
        ) : request.Request.RequestPaymentConfirmation ? (
          <div>
            <p>
              <span className="font-medium">Razón:</span>{' '}
              {request.Request.RequestPaymentConfirmation.reason}
            </p>
            <p className="text-sm text-gray-500">
              Aprobación de Proceso {request.processNumber}
            </p>

            <p className="text-sm text-gray-500">Procesos involucrados: 1</p>
          </div>
        ) : null}
      </div>
    </>
  );
}
