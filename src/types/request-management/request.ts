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
}

export interface currentToApprove {
  id: number;
  approverId: string;
  requesterId: string;
  processNumber: number;
  RequestId: number;
  observation?: string | null;
  approved?: boolean | null;
  current: boolean;
  ApprovedDate?: string | null;
}


export interface currentRequestApproval {
  approved: boolean;
  observation: string;
}
