// Citation for the current file:
// Date: 2/29/2024
// Based on URL: https://nextjs.org/learn/dashboard-app/getting-started
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

export type CustomersTable = {
  customerID: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

export type CustomerForm = {
  customerID: number;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber: string;
};

export type SalespeopleTable = {
  salespersonID: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

export type SalespersonForm = {
  salespersonID: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dealerships: { dealershipID: number; dealershipName: string }[];
};

export type DealershipsTable = {
  dealershipID: number;
  dealershipName: string;
  state: string;
  city: string;
  address: string;
  phoneNumber: string;
};

export type DealershipField = {
  dealershipID: number;
  dealershipName: string;
};

export type CustomerField = {
  customerID: number;
  firstName: string;
  lastName: string;
};

export type SalespersonField = {
  salespersonID: number;
  firstName: string;
  lastName: string;
};

export type VehicleField = {
  vehicleID: number;
  make: string;
  year: string;
  color: string;
  price: number;
  model: string;
};

export type VehicleForm = {
  vehicleID: number;
  make: string;
  model: string;
  year: string;
  price: number;
  color: string;
  saleID: number | null;
  dealershipID: number;
  dealershipName: string;
};

export type DealershipForm = {
  dealershipID: number;
  dealershipName: string;
  state: string;
  city: string;
  address: string;
  phoneNumber: string;
};

export type SaleForm = {
  saleID: number;
  saleDate: string;
  customerID: number;
  customerFirstName: string;
  customerLastName: string;
  salespersonID: number;
  salespersonFirstName: string;
  salesPersonLastName: string;
  dealershipID: number;
  dealershipName: string;
  vehicleID: number;
  model: string;
  make: string;
  year: string;
  color: string;
  price: number;
};
