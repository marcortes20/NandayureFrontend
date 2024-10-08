import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { RequestDetails } from '@/types';
import { Badge } from '../../../ui/badge';
import { formatDate } from '@/lib/utils';
import { getRequestState, getRequestType } from '../../request-helpers';

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

export default RequestTable;
