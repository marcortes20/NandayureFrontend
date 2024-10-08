import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { RequestDetails } from '@/types';
import { format } from '@formkit/tempo';
import {
  Calendar,
  FileText,
  DollarSign,
  Clock,
} from 'lucide-react';
import { getRequestState, getRequestType } from '../../request-helpers';

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

export default RequestCard;
