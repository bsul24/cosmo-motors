// Citation for the current file:
// Date: 2/29/2024
// Based on URL: https://nextjs.org/learn/dashboard-app/getting-started
'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { callCosmo } from './db';
import { fetchLastInsertId } from './data';

const CustomerSchema = z.object({
  customerID: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().nullable(),
  phoneNumber: z.string(),
});

const SalespersonSchema = z.object({
  salespersonID: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
});

const DealershipSchema = z.object({
  dealershipID: z.number(),
  dealershipName: z.string(),
  state: z.string(),
  city: z.string(),
  address: z.string(),
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

const SalespersonHasDealershipSchema = z.object({
  salespersonID: z.number(),
  dealershipID: z.number(),
});

const CreateSalesperson = SalespersonSchema.omit({ salespersonID: true });

const UpdateSalesperson = SalespersonSchema.omit({ salespersonID: true });

const CreateSalespersonHasDealership = SalespersonHasDealershipSchema;
// FIX/IMPLEMENT
export async function createSalesperson(formData, dealerships) {
  const { firstName, lastName, email, phoneNumber } = CreateSalesperson.parse({
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phoneNumber: formData.phoneNumber,
    // firstName: formData.get('firstName'),
    // lastName: formData.get('lastName'),
    // email: formData.get('email'),
    // phoneNumber: formData.get('phoneNumber'),
  });
  const result = await callCosmo(
    `
  INSERT INTO Salespeople (firstName, lastName, email, phoneNumber)
  VALUES ( ?, ?, ?, ?)
`,
    [firstName, lastName, email, phoneNumber],
  );

  // const id = result.insertId;
  const id = await fetchLastInsertId();

  for (const d of dealerships) {
    const { salespersonID, dealershipID } =
      CreateSalespersonHasDealership.parse({
        dealershipID: d.id,
        salespersonID: id,
      });

    const result = await callCosmo(
      `
        INSERT INTO DealershipsHasSalespeople (dealershipID, salespersonID)
        VALUES (?, ?)
      `,
      [dealershipID, salespersonID],
    );
  }

  // console.log(JSON.stringify(result), 'hola')

  revalidatePath('/dashboard/salespeople');
  redirect('/dashboard/salespeople');
}

export async function deleteSalesperson(id: number) {
  await callCosmo(`DELETE FROM Salespeople WHERE salespersonID = ${id}`);
  revalidatePath('/dashboard/salespeople');
}

// FIX/IMPLEMENT
export async function updateSalesperson(id: number, formData, dealerships) {
  const { firstName, lastName, email, phoneNumber } = UpdateSalesperson.parse({
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phoneNumber: formData.phoneNumber,
  });
  const result = await callCosmo(
    `
    UPDATE Salespeople
    SET firstName = '${firstName}', lastName = '${lastName}', email = '${email}',  phoneNumber = '${phoneNumber}'
    WHERE salespersonID = ${id}
`,
    [firstName, lastName, email, phoneNumber],
  );

  await callCosmo(
    `
      DELETE FROM DealershipsHasSalespeople
      WHERE salespersonID = ${id}
    `,
  );

  for (const d of dealerships) {
    const { salespersonID, dealershipID } =
      CreateSalespersonHasDealership.parse({
        dealershipID: d.id,
        salespersonID: id,
      });

    const result = await callCosmo(
      `
        INSERT INTO DealershipsHasSalespeople (dealershipID, salespersonID)
        VALUES (?, ?)
      `,
      [dealershipID, salespersonID],
    );
  }

  // console.log(JSON.stringify(result), 'hola')

  revalidatePath('/dashboard/salespeople');
  redirect('/dashboard/salespeople');
}

// FIX/IMPLEMENT

const VehicleSchema = z.object({
  vehicleID: z.number(),
  make: z.string(),
  model: z.string(),
  year: z.string(),
  price: z.number(),
  color: z.string(),
  dealershipID: z.number().nullable(),
});

const CreateVehicle = VehicleSchema.omit({ vehicleID: true });

// FIX/IMPLEMENT
export async function createVehicle(formData: FormData) {



  const { make, model, year, price, color, dealershipID } = CreateVehicle.parse(
    {
      make: formData.get('make'),
      model: formData.get('model'),
      year: formData.get('year'),
      price: parseFloat(formData.get('price') as string),
      color: formData.get('color'),
      dealershipID: formData.get('dealershipID') ? parseInt(formData.get('dealershipID') as string) : null,
    },
  );

  const result = await callCosmo(
    `
  INSERT INTO Vehicles (make, model, year, price, color, dealershipID)
  VALUES ( ?, ?, ?, ?, ?, ?)
`,
    [make, model, year, price, color, dealershipID],
  );
  revalidatePath('/dashboard/vehicles');
  redirect('/dashboard/vehicles');
}

// FIX/IMPLEMENT
export async function updateVehicle(id: number, formData: FormData) {

  const { make, model, year, price, color, dealershipID } = CreateVehicle.parse(
    {
      make: formData.get('make'),
      model: formData.get('model'),
      year: formData.get('year'),
      price: parseFloat(formData.get('price') as string),
      color: formData.get('color'),
      dealershipID: formData.get('dealershipID') ? parseInt(formData.get('dealershipID') as string) : null,
    },
  );

  await callCosmo(
    `
  UPDATE Vehicles
  SET make = ?, model = ?, year = ?,  price = ?, color = ?, dealershipID = ?
  WHERE vehicleID = ${id}
`,
    [make, model, year, price, color, dealershipID],
  );

  revalidatePath('/dashboard/vehicles');
  redirect('/dashboard/vehicles');
}

// FIX/IMPLEMENT
export async function deleteVehicle(id: number) {
  await callCosmo(`DELETE FROM Vehicles WHERE VehicleID = ?`, [id]);
  revalidatePath('/dashboard/vehicles');
}

const CreateDealership = DealershipSchema.omit({ dealershipID: true });

const UpdateDealership = DealershipSchema.omit({ dealershipID: true });

export async function createDealership(formData: FormData) {
  const { dealershipName, state, city, address, phoneNumber } =
    CreateDealership.parse({
      dealershipName: formData.get('dealershipName'),
      state: formData.get('state'),
      city: formData.get('city'),
      address: formData.get('address'),
      phoneNumber: formData.get('phoneNumber'),
    });
  const result = await callCosmo(
    `
  INSERT INTO Dealerships (dealershipName, state, city, address, phoneNumber)
  VALUES ( ?, ?, ?, ?, ?)
`,
    [dealershipName, state, city, address, phoneNumber],
  );

  // console.log(JSON.stringify(result), 'hola')

  revalidatePath('/dashboard/dealerships');
  redirect('/dashboard/dealerships');
}

export async function updateDealership(id: number, formData: FormData) {
  const { dealershipName, state, city, address, phoneNumber } =
    UpdateDealership.parse({
      dealershipName: formData.get('dealershipName'),
      state: formData.get('state'),
      city: formData.get('city'),
      address: formData.get('address'),
      phoneNumber: formData.get('phoneNumber'),
    });

  await callCosmo(`
  UPDATE Dealerships
  SET dealershipName = '${dealershipName}', state = '${state}', city = '${city}',  address = '${address}', phoneNumber = '${phoneNumber}'
  WHERE dealershipID = ${id}
`);

  revalidatePath('/dashboard/dealerships');
  redirect('/dashboard/dealerships');
}

export async function deleteDealership(id: number) {
  await callCosmo(`DELETE FROM Dealerships WHERE dealershipID = ${id}`);
  revalidatePath('/dashboard/dealerships');
}

const SaleSchema = z.object({
  saleID: z.number(),
  customerID: z.number().nullable(),
  salespersonID: z.number(),
  vehicleIDs: z.array(z.string()),
});

const CreateSale = SaleSchema.omit({ saleID: true });

export async function createSale(formData: FormData) {
  const { customerID, salespersonID, vehicleIDs } = CreateSale.parse({
    customerID: isNaN(parseInt(formData.get('customerId') as string)) ? null : parseInt(formData.get('customerId') as string),
    salespersonID: parseInt(formData.get('salespersonId') as string),
    vehicleIDs: formData.getAll('vehicleIDs'),
  });

  const date = new Date();

  const result: any = await callCosmo(
    `
  INSERT INTO Sales (saleDate, customerID, salespersonID)
  VALUES ( ?, ?, ?)
`,
    [date, customerID, salespersonID],
  );

  const insertID = result[0]?.insertId;

  for (const vehicleID of vehicleIDs) {
    const update_result = await callCosmo(
      `UPDATE Vehicles
      SET saleID = ?
      WHERE vehicleID=?`,
      [insertID, vehicleID],
    );
  }

  revalidatePath('/dashboard/sales');
  redirect('/dashboard/sales');

  console.log(formData.getAll('vehiclesIDs'));
  console.log(formData.get('salespersonId'));
  console.log(formData.get('customerId'));
}

export async function updateSale(id: number, formData: FormData) {}

export async function deleteSale(id: number) {
  await callCosmo(`DELETE FROM Sales WHERE saleID = ?`, [id]);
  revalidatePath('/dashboard/sales');
}
