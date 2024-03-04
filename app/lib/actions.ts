// Citation for the current file:
// Date: 2/29/2024
// Based on URL: https://nextjs.org/learn/dashboard-app/getting-started
'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { callCosmo } from './db';

const CustomerSchema = z.object({
  customerID: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().nullable(),
  phoneNumber: z.string(),
});

const CreateCustomer = CustomerSchema.omit({ customerID: true });

const UpdateCustomer = CustomerSchema.omit({ customerID: true });

// FIX/IMPLEMENT

export async function createCustomer(formData: FormData) {
  const { firstName, lastName, email, phoneNumber } = CreateCustomer.parse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email') || null,
    phoneNumber: formData.get('phoneNumber'),
  });
  const result = await callCosmo(
    `
  INSERT INTO Customers (firstName, lastName, email, phoneNumber)
  VALUES ( ?, ?, ?, ?)
`,
    [firstName, lastName, email, phoneNumber],
  );

  // console.log(JSON.stringify(result), 'hola')

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

// FIX/IMPLEMENT
export async function updateCustomer(id: number, formData: FormData) {
  const { firstName, lastName, email, phoneNumber } = UpdateCustomer.parse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phoneNumber: formData.get('phoneNumber'),
  });

  await callCosmo(`
  UPDATE Customers
  SET firstName = '${firstName}', lastName = '${lastName}', email = '${email}',  phoneNumber = '${phoneNumber}'
  WHERE customerID = ${id}
`);

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

// FIX/IMPLEMENT
export async function deleteCustomer(id: number) {
  await callCosmo(`DELETE FROM Customers WHERE customerID = ${id}`);
  revalidatePath('/dashboard/customers');
}

const SalespersonSchema = z.object({
  salespersonID: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
});

const CreateSalesperson = SalespersonSchema.omit({ salespersonID: true });

const UpdateSalesperson = SalespersonSchema.omit({ salespersonID: true });
// FIX/IMPLEMENT
export async function createSalesperson(formData: FormData) {
  console.log(formData);
  const { firstName, lastName, email, phoneNumber } = CreateSalesperson.parse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phoneNumber: formData.get('phoneNumber'),
  });
  const result = await callCosmo(
    `
  INSERT INTO Salespeople (firstName, lastName, email, phoneNumber)
  VALUES ( ?, ?, ?, ?)
`,
    [firstName, lastName, email, phoneNumber],
  );

  // console.log(JSON.stringify(result), 'hola')

  revalidatePath('/dashboard/salespeople');
  redirect('/dashboard/salespeople');
}

// FIX/IMPLEMENT
export async function updateSalesperson(id: number, formData: FormData) {
  return;
}

// FIX/IMPLEMENT
export async function deleteSalesperson(id: number) {
  return;
}

const CreateVehicle = z
  .object({
    vehicleID: z.number(),
    make: z.string(),
    model: z.string(),
    year: z.string(),
    price: z.number(),
    color: z.string(),
    saleID: z.number(),
  })
  .omit({ vehicleID: true });

// FIX/IMPLEMENT
export async function createVehicle(formData: FormData) {
  const { firstName, lastName, email, phoneNumber } = CreateCustomer.parse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phoneNumber: formData.get('phoneNumber'),
  });
  return;
}

// FIX/IMPLEMENT
export async function updateVehicle(id: number, formData: FormData) {
  return;
}

// FIX/IMPLEMENT
export async function deleteVehicle(id: number) {
  return;
}

export async function createDealership(formData: FormData) {
  return;
}

export async function updateDealership(id: number, formData: FormData) {}

export async function deleteDealership(id: number) {}

export async function createSale(formData: FormData) {
  console.log(formData.getAll('vehiclesIDs'));
  console.log(formData.get('salespersonId'));
}

export async function updateSale(id: number, formData: FormData) {}

export async function deleteSale(id: number) {}
