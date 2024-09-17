import { User } from 'lucide-react';

export interface UpdateEmployee {
  Name?: string;
  Surname1?: string;
  Surname2?: string;
  Birthdate?: string | Date;
  Email?: string;
  CellPhone?: string;
}

export interface Employee {
  id: string;
  Name: string;
  Surname1: string;
  Surname2: string;
  Birthdate: string | Date;
  HiringDate: string | Date;
  Email: string;
  CellPhone: string;
  NumberChlidren: number;
  AvailableVacationDays: number;
  JobPositionId: number;
  DepartmentId: number;
  EmbargoId: number | boolean;
  MaritalStatusId: number;
  GenderId: number;
}

export interface Gender {
  id: number;
  Name: string;
}

export interface MaritalStatus {
  id: number;
  Name: string;
}

export interface User {
  EmployeeId: number;
  Password: string;
}

export interface ForgotPassword {
  Email: string;
}

export interface ResetPassword {
  Password: string;
}

export interface ChangePassword {
  OldPassword: string;
  Password: string;
  ConfirmPassword: string;
}

export interface RequestSalaryCertificate {
  employeeId: number;
  requestDate: Date;
  reason: string;
}

export interface LoginSchema {
  EmployeeId: string;
  Password: string;
}

export interface RequestPaySlip {
  date: Date;
  reason: string;
  employeeId: number;
}

export interface RequestVacation {
  daysRequested: number;
  departureDate: Date;
  entryDate: Date;
  departmentApproval: boolean;
  RRHHApproval: boolean;
  mayorApproval: boolean;
  RequestId: number;
}
