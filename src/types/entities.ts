import { User } from "lucide-react";

export interface Employee {
  EmployeeId: number;
  Name: string;
  Surname1: string;
  Surname2: string;
  Birthdate: string | Date;
  HiringDate: string | Date;
  Email: string;
  CellPhone: string;
  NumberChlidren: number;
  AvailableVacationDays: number;
  MaritalStatusId: number;
  GenderId: number;
}

export interface Gender {
  GenderId: number;
  Name: string;
}

export interface MaritalStatus {
  MaritalStatusId: number;
  Name: string;
  Description: string;
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