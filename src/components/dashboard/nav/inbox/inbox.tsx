'use client';

import { useState } from 'react';
import { Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

type Request = {
  id: string;
  type: string;
  description: string;
  employeeId: string;
  name: string;
  surname1: string;
  surname2: string;
  jobPosition: string;
};

export default function InboxComponent() {
  const [requests, setRequests] = useState<Request[]>([
    {
      id: '1',
      type: 'Vacaciones',
      description: 'Solicito vacaciones para el mes de diciembre',
      employeeId: '1',
      name: 'Juan',
      surname1: 'Pérez',
      surname2: 'González',
      jobPosition: 'Desarrollador',
    },
    {
      id: '2',
      type: 'Permiso',
      description: 'Solicito permiso para el día de mañana',
      employeeId: '2',
      name: 'María',
      surname1: 'Gutiérrez',
      surname2: 'Hernández',
      jobPosition: 'Diseñador',
    },
    {
      id: '3',
      type: 'Licencia',
      description: 'Solicito licencia por 1 mes',
      employeeId: '3',
      name: 'José',
      surname1: 'Martínez',
      surname2: 'Gómez',
      jobPosition: 'Gerente',
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [reason, setReason] = useState('');

  const handleRequestClick = (request: Request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleAction = (action: 'approve' | 'reject') => {
    console.log(`Request ${action}d:`, selectedRequest, 'Reason:', reason);
    setRequests(requests.filter((r) => r.id !== selectedRequest?.id));
    setIsModalOpen(false);
    setSelectedRequest(null);
    setReason('');
  };

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="relative bg-transparent text-black hover:bg-gray-100 focus:outline-none">
            <Inbox className="h-5 w-5" />
            {requests.length > 0 && (
              <Badge
                variant='destructive'
                className="absolute -top-2 -right-2 px-2 py-1"
              >
                {requests.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 mr-4">
          <div className="space-y-2">
            <h3 className="font-medium">
              Solicitudes pendientes ({requests.length})
            </h3>
            {requests.map((request) => (
              <div
                key={request.id}
                className="flex flex-col p-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => handleRequestClick(request)}
              >
                <div className="mb-2">
                  <p className="font-medium">{request.type}</p>
                  <p className="text-sm text-gray-500">{request.description}</p>
                </div>
                <div className="text-sm text-gray-700">
                  <p>
                    <span className="font-medium">Empleado:</span>{' '}
                    {request.name} {request.surname1} {request.surname2}
                  </p>
                  <p>
                    <span className="font-medium">Puesto:</span>{' '}
                    {request.jobPosition}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedRequest?.type}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{selectedRequest?.description}</p>
            <Textarea
              placeholder="Razón(opcional)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            {/* EmployeeInfo */}
            <div className="text-sm text-gray-700">
              <p>
                <span className="font-medium">Cedula:</span>{' '}
                {selectedRequest?.employeeId}
              </p>
              <p>
                <span className="font-medium">Empleado:</span>{' '}
                {selectedRequest?.name} {selectedRequest?.surname1}{' '}
                {selectedRequest?.surname2}
              </p>
              <p>
                <span className="font-medium">Puesto:</span>{' '}
                {selectedRequest?.jobPosition}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleAction('reject')}>
              Rechazar
            </Button>
            <Button onClick={() => handleAction('approve')}>Aprobar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
