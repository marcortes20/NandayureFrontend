import { User } from "lucide-react";

export interface Employee {
  EmployeeId: number;
  Name: string;
  Surname1: string;
  Surname2: string;
  Birthdate: Date;
  HiringDate: Date;
  Email: string;
  CellPhone: string;
  NumberChlidren: number;
  AvailableVacationDays: number;
  GrossSalary: number;
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
