// Citation for the current file:
// Date: 2/29/2024
// Based on URL: https://nextjs.org/learn/dashboard-app/getting-started
import { CustomerField, CustomersTable } from './definitions';
import { SalespersonForm, SalespeopleTable } from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';
import {
  customers,
  salespeople,
  vehicles,
  dealerships,
  dealershipsHasSalespeople,
  sales,
} from './placeholder-data';
import { callCosmo } from './db';
import { RowDataPacket } from 'mysql2';

// Calculates how many customers pages based on query
export async function fetchCustomerPages(query: string) {
  noStore();
  try {
    const count = (await callCosmo(`SELECT COUNT(*) as count
    FROM Customers
    WHERE
      Customers.firstName LIKE '${`%${query}%`}' OR
      Customers.lastName LIKE '${`%${query}%`}' OR
      Customers.email LIKE '${`%${query}%`}' OR
      Customers.phoneNumber LIKE '${`%${query}%`}'
  `)) as RowDataPacket;
    // console.log(JSON.stringify(count))
    const totalPages = Math.ceil(Number(count[0][0].count) / ITEMS_PER_PAGE);
    return totalPages;
    return 5;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of customers.');
  }
}

const ITEMS_PER_PAGE = 6;
// Brings most custormer information based on query
export async function fetchCustomersMotor(
  query: string,
  currentPage: number,
): Promise<CustomersTable[]> {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const customers = (await callCosmo(`
      SELECT
        Customers.customerID,
        Customers.firstName,
        Customers.lastName,
        Customers.email,
        Customers.phoneNumber
      FROM Customers
      WHERE
        Customers.firstName LIKE '${`%${query}%`}' OR
        Customers.lastName LIKE '${`%${query}%`}' OR
        Customers.email LIKE '${`%${query}%`}' OR
        Customers.phoneNumber LIKE '${`%${query}%`}'
      ORDER BY Customers.customerID DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `)) as RowDataPacket;
    //console.log(JSON.stringify(customers))

    return customers[0];
    //return customers;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customers.');
  }
}

// Brings most customer information based on id
export async function fetchCustomerByID(id: number): Promise<CustomersTable> {
  noStore();
  try {
    const data = (await callCosmo(`
      SELECT
        Customers.customerID,
        Customers.firstName,
        Customers.lastName,
        Customers.email,
        Customers.phoneNumber
      FROM Customers
      WHERE Customers.customerID = ${id};
    `)) as RowDataPacket;
    // console.log(JSON.stringify(data))
    return data[0][0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

// Calculates how many salespeople pages based on query
export async function fetchSalespeoplePages(query: string) {
  noStore();
  try {
    const count = (await callCosmo(`SELECT COUNT(*) as count
    FROM Salespeople
    WHERE
      Salespeople.firstName LIKE '${`%${query}%`}' OR
      Salespeople.lastName LIKE '${`%${query}%`}' OR
      Salespeople.email LIKE '${`%${query}%`}' OR
      Salespeople.phoneNumber LIKE '${`%${query}%`}'
  `)) as RowDataPacket;
    // console.log(JSON.stringify(count))
    const totalPages = Math.ceil(Number(count[0][0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of salespeople.');
  }
}

// Brings id and name from all salespeople
export async function fetchAllSalespeople(
  query: string,
  currentPage: number,
): Promise<SalespeopleTable[]> {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const salespeople = (await callCosmo(`
      SELECT
        Salespeople.salespersonID,
        Salespeople.firstName,
        Salespeople.lastName,
        Salespeople.email,
        Salespeople.phoneNumber
      FROM Salespeople
      WHERE
        Salespeople.firstName LIKE '${`%${query}%`}' OR
        Salespeople.lastName LIKE '${`%${query}%`}' OR
        Salespeople.email LIKE '${`%${query}%`}' OR
        Salespeople.phoneNumber LIKE '${`%${query}%`}'
      ORDER BY Salespeople.salespersonID DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `)) as RowDataPacket;
    //console.log(JSON.stringify(customers))

    return salespeople[0];
    //return salespeople;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch salespeople.');
  }
}

export async function fetchSalespersonDealerships(id: number) {
  noStore();

  try {
    const dealerships = (await callCosmo(`
      SELECT 
        d.dealershipName, d.dealershipID
      FROM Dealerships d 
      INNER JOIN DealershipsHasSalespeople ds on d.dealershipID = ds.dealershipID
      INNER JOIN Salespeople s on ds.salespersonID = s.salespersonID
      WHERE 
        s.salespersonID = ${id}
      ORDER BY d.dealershipName
    `)) as RowDataPacket;
    return dealerships[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch dealerships.');
  }
}
// export async function fetchAllSalespeople() {
//   return salespeople.map((salesperson) => {
//     return {
//       salespersonID: salesperson.salespersonID,
//       firstName: salesperson.firstName,
//       lastName: salesperson.lastName,
//     };
//   });
// }

// Brings id and name from all customers
export async function fetchAllCustomersMotor() {
  return customers.map((customer) => {
    return {
      customerID: customer.customerID,
      firstName: customer.firstName,
      lastName: customer.lastName,
    };
  });
}

// Brings id and name from all dealerships
export async function fetchAllDealerships() {
  noStore();

  try {
    const dealerships = (await callCosmo(`
      SELECT 
        d.dealershipName, d.dealershipID
      FROM Dealerships d 
      ORDER BY d.dealershipName
    `)) as RowDataPacket;
    return dealerships[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch dealerships.');
  }

  // return dealerships.map((dealership) => {
  //   return {
  //     dealershipID: dealership.dealershipID,
  //     dealershipName: dealership.dealershipName,
  //   };
  // });
}

// Brings vehicles on sale
export async function fetchAvailableVehicles() {
  return vehicles;
}

// Fetch most information from salespeople
export async function fetchSalespeople(query: string, currentPage: number) {
  return salespeople;
}

// Fetch most information from salespeople by ID
export async function fetchSalespersonByID(id: number) {
  noStore();
  try {
    const data = (await callCosmo(`
      SELECT
        Salespeople.salespersonID,
        Salespeople.firstName,
        Salespeople.lastName,
        Salespeople.email,
        Salespeople.phoneNumber
      FROM Salespeople
      WHERE Salespeople.salespersonID = ${id};
    `)) as RowDataPacket;
    return data[0][0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch salesperson.');
  }
}

// calculates how many dealerships based on query
export async function fetchDealershipsPages(query: string) {
  return 1;
}

// Fetch most information about dealerships based on query
export async function fetchDealerships(query: string, currentPage: number) {
  return dealerships;
}

// Fetch most information about dealerships based on query
export async function fetchDealershipByID(id: number) {
  return dealerships[0];
}

// Fetch most information about cars based on query

export async function fetchVehicles(query: string, currentPage: number) {
  return vehicles;
}

// Fetch most information about vehicles based on id
export async function fetchVehicleByID(id: number) {
  return vehicles[2];
}

// Calculates pages for vehicles based on query
export async function fetchVehiclesPages(query: string) {
  return 1;
}

// calculates how many sales  based on query
export async function fetchSalesPages(query: string) {
  return 1;
}

// Fetch most information related to sales
export async function fetchSales(query: string, currentPage: number) {
  return sales;
}

// Fetch most informmation based on ID
export async function fetchSaleByID(id: number) {
  return sales[0];
}

export async function fetchLastInsertId() {
  noStore();
  try {
    const result =
      (await callCosmo(`SELECT MAX(salespersonID) AS max FROM Salespeople
  `)) as RowDataPacket;
    const id = result[0][0].max;
    return id;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of salespeople.');
  }

  // noStore();

  // try {
  //   const id = await callCosmo(`
  //     SELECT MAX(salespersonID) AS maxId FROM Salespeople
  //   `);
  //   const maxId = id[0].maxId;
  //   return typeof maxId === 'number' ? maxId : parseInt(maxId);
  // } catch (error) {
  //   console.error('Database Error:', error);
  //   throw new Error('Failed to fetch dealerships.');
  // }
}
