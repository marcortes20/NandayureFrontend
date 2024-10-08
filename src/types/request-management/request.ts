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

export interface RequestDetails {
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