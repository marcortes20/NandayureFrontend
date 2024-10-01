export interface SalaryCertificatTemplateProps {
  name: string;
  idCard: string;
  position: string;
  startDate: string;
  grossSalary: number;
  netSalary: number;
  deductions: {
    ccss: number;
    bancoPopular: number;
    tax: number;
    coopeAnde: number;
    asemuna: number;
    lifeFuneralInsurance: number;
    servicoop: number;
  };
  issueDate: string;
}
