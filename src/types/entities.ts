import { User } from 'lucide-react';

export interface UpdateEmployee {
  id?: number;
  Name?: string;
  Surname1?: string;
  Surname2?: string;
  Birthdate?: string | Date;
  HiringDate?: string | Date;
  Email?: string;
  CellPhone?: string;
  NumberChlidren?: number;
  AvailableVacationDays?: number;
  MaritalStatusId?: number;
  GenderId?: number;
}

export interface Employee {
  id: number;
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
  ConfirmPassword: string;
  token: string;
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
