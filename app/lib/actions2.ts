// Citation for the current file:
// Date: 2/29/2024
// Based on URL: https://nextjs.org/learn/dashboard-app/getting-started
'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

 
const CreateInvoice = FormSchema.omit({ id: true, date: true });

const UpdateInvoice = FormSchema.omit({ id: true, date: true });
 
export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  const date = new Date().toISOString().split('T')[0];

  await sql`
  INSERT INTO invoices (customer_id, amount, status, date)
  VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
`;

revalidatePath('/dashboard/invoices');
redirect('/dashboard/invoices');

}


export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
 
  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}




const CreateCustomer = z.object({
  customerID: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phoneNumber: z.string()
}).omit({customerID: true})

// FIX/IMPLEMENT

export async function createCustomer(formData: FormData) {
  const {firstName, lastName, email, phoneNumber } = CreateCustomer.parse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phoneNumber: formData.get('phoneNumber')
  })
  return 
}


// FIX/IMPLEMENT
export async function updateCustomer(id: number, formData: FormData) {
  return
}

// FIX/IMPLEMENT
export async function deleteCustomer(id: number){
  return
}

const CreateSalesperson= z.object({
  salespersonID: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phoneNumber: z.string()
}).omit({salespersonID: true})


// FIX/IMPLEMENT
export async function createSalesperson(formData: FormData) {
  const {firstName, lastName, email, phoneNumber } = CreateCustomer.parse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phoneNumber: formData.get('phoneNumber')
  })
  return 
}

// FIX/IMPLEMENT
export async function updateSalesperson(id: number, formData: FormData) {
  return
}

// FIX/IMPLEMENT
export async function deleteSalesperson(id: number){
  return
}


const CreateVehicle= z.object({
  vehicleID: z.number(),
  make: z.string(),
  model: z.string(),
  year: z.string(),
  price: z.number(),
  color: z.string(),
  saleID: z.number()
}).omit({vehicleID: true})


// FIX/IMPLEMENT
export async function createVehicle(formData: FormData) {
  const {firstName, lastName, email, phoneNumber } = CreateCustomer.parse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phoneNumber: formData.get('phoneNumber')
  })
  return 
}

// FIX/IMPLEMENT
export async function updateVehicle(id: number, formData: FormData) {
  return
}

// FIX/IMPLEMENT
export async function deleteVehicle(id: number){
  return
}


export async function createDealership(formData: FormData){
  return
}

export async function updateDealership(id: number, formData: FormData){

}

export async function deleteDealership(id: number){

}


export async function createSale(formData: FormData){
  console.log(formData.getAll('vehiclesIDs'))
  console.log(formData.get('salespersonId'))
  
}

export async function updateSale(id: number, formData: FormData){

}

export async function deleteSale(id: number){

}