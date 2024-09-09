import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useGetEmployeeId from '@/hooks/common/useGetEmployeeId';
import useUpdateEmployee from '@/hooks/profile/useUpdateEmployee';
import { useState } from 'react';

interface Field {
  id: string;
  label: string;
  defaultValue: string;
  type?: string;
}

interface DialogProfileProps {
  fields: Field[];
  title: string;
  description: string;
}

export function DialogProfile({
  fields,
  title,
  description,
}: DialogProfileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { employeeId } = useGetEmployeeId();
  const { onSubmit, register } = useUpdateEmployee({
    employeeId: employeeId,
    setIsOpen,
  });
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Editar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            {fields.map((field) => (
              <div
                key={field.id}
                className="grid grid-cols-4 items-center gap-4"
              >
                <Label htmlFor={field.id} className="text-right">
                  {field.label}
                </Label>
                <Input
                  id={field.id}
                  defaultValue={field.defaultValue}
                  type={field.type || 'text'}
                  className="col-span-3"
                  {...register(field.id)}
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className=" mt-4 py-2 px-4 bg-dodger-blue-600 hover:bg-dodger-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Guardar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
