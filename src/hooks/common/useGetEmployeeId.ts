'use client';
import { useSession } from 'next-auth/react';

const useGetEmployeeId = (): { employeeId: number | undefined } => {
  const { data: session } = useSession();
  if (!session) {
    return { employeeId: undefined };
  }
  const employeeId = session?.user?.employeeId;
  return { employeeId };
};

export default useGetEmployeeId;
