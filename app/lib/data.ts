// Citation for the current file:
// Date: 2/29/2024
// Based on URL: https://nextjs.org/learn/dashboard-app/getting-started
import { CustomerField, CustomersTable, SalespersonField, VehicleField, VehiclesTable } from './definitions';
import { SalespersonForm, SalespeopleTable } from './definitions';
import {
  DealershipField,
  DealershipForm,
  DealershipsTable,
} from './definitions';
import { SalesTable } from './definitions';
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
    const totalPages = Math.ceil(Number(count[0][0].count) / ITEMS_PER_PAGE);
    return totalPages;
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
    return customers[0];
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
export async function fetchAllSalespeople(): Promise<SalespersonField[]> {
  noStore();

  try {
    const salespeople = (await callCosmo(`
      SELECT
        Salespeople.salespersonID,
        Salespeople.firstName,
        Salespeople.lastName
      FROM Salespeople
    `)) as RowDataPacket;
    return salespeople[0];
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

// Brings id and name from all customers
export async function fetchAllCustomersMotor(): Promise<CustomerField[]> {
  noStore();
  try {
    const customers = (await callCosmo(`
      SELECT
        Customers.customerID,
        Customers.firstName,
        Customers.lastName
      FROM Customers
    `)) as RowDataPacket;
    return customers[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customers.');
  }

}

// Brings id and name from all dealerships
export async function fetchAllDealerships(): Promise<DealershipField[]> {
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
}

// Brings vehicles on sale
export async function fetchAvailableVehicles(): Promise<VehicleField[]> {
  noStore();
  try {
    const vehicles = (await callCosmo(`
      SELECT
        v.vehicleID,
        v.make,
        v.model,
        v.year,
        v.price,
        v.color,
        v.saleID,
        d.dealershipID,
        d.dealershipName
      FROM Vehicles as v
      INNER JOIN Dealerships as d
        ON v.dealershipID=d.dealershipID
      WHERE
        v.saleID IS NULL
    `)) as RowDataPacket;
    return vehicles[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch vehicles.');
  }
}

// Fetch most information from salespeople
export async function fetchSalespeople(query: string, currentPage: number): Promise<SalespeopleTable[]> {
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
    return salespeople[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch salespeople.');
  }
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
  noStore();
  try {
    const count = (await callCosmo(`SELECT COUNT(*) as count
    FROM Dealerships
    WHERE
      Dealerships.dealershipName LIKE '${`%${query}%`}' OR
      Dealerships.state LIKE '${`%${query}%`}' OR
      Dealerships.city LIKE '${`%${query}%`}' OR
      Dealerships.address LIKE '${`%${query}%`}' OR
      Dealerships.phoneNumber LIKE '${`%${query}%`}'
  `)) as RowDataPacket;
    const totalPages = Math.ceil(Number(count[0][0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of dealerships.');
  }
}

// Fetch most information about dealerships based on query
export async function fetchDealerships(
  query: string,
  currentPage: number,
): Promise<DealershipsTable[]> {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const dealerships = (await callCosmo(`
      SELECT
        Dealerships.dealershipID,
        Dealerships.dealershipName,
        Dealerships.state,
        Dealerships.city,
        Dealerships.address,
        Dealerships.phoneNumber
      FROM Dealerships
      WHERE
        Dealerships.dealershipID LIKE '${`%${query}%`}' OR
        Dealerships.dealershipName LIKE '${`%${query}%`}' OR
        Dealerships.state LIKE '${`%${query}%`}' OR
        Dealerships.city LIKE '${`%${query}%`}' OR
        Dealerships.address LIKE '${`%${query}%`}' OR
        Dealerships.phoneNumber LIKE '${`%${query}%`}'
      ORDER BY Dealerships.dealershipID DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `)) as RowDataPacket;

    return dealerships[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch dealerships.');
  }
}

// Fetch most information about dealerships based on query
export async function fetchDealershipByID(id: number) {
  return dealerships[0];
}

// Fetch most information about cars based on query

export async function fetchVehicles(query: string, currentPage: number) : Promise<VehiclesTable[]> {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const vehicles = (await callCosmo(`
      SELECT
        v.vehicleID,
        v.make,
        v.model,
        v.year,
        v.price,
        v.color,
        v.saleID,
        d.dealershipID,
        d.dealershipName
      FROM Vehicles as v
      INNER JOIN Dealerships as d
        ON v.dealershipID=d.dealershipID
      WHERE
        v.make LIKE '${`%${query}%`}' OR
        v.model LIKE '${`%${query}%`}' OR
        v.year LIKE '${`%${query}%`}' OR
        v.color LIKE '${`%${query}%`}'
      ORDER BY v.vehicleID DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `)) as RowDataPacket;
    return vehicles[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch vehicles.');
  }
}

export async function fetchVehiclesBySaleID(id: number) {
  noStore();
  try {
    const data = (await callCosmo(`
      SELECT
        Vehicles.make,
        Vehicles.model,
        Vehicles.year,
        Vehicles.color
      FROM Vehicles
      WHERE Vehicles.saleID = ${id};
    `)) as RowDataPacket;
    // console.log(JSON.stringify(data))
    return data[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch vehicles.');
  }
}

// Fetch most information about vehicles based on id
export async function fetchVehicleByID(id: number) {
  noStore();

  try {
    const vehicles = (await callCosmo(`
      SELECT
        v.vehicleID,
        v.make,
        v.model,
        v.year,
        v.price,
        v.color,
        v.saleID,
        d.dealershipID,
        d.dealershipName
      FROM Vehicles as v
      INNER JOIN Dealerships as d
        ON v.dealershipID=d.dealershipID
      WHERE v.vehicleID=?
    `,[id])) as RowDataPacket;
    return vehicles[0][0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch vehicles.');
  }
}

// Calculates pages for vehicles based on query
export async function fetchVehiclesPages(query: string) {
  noStore();
  try {
    const count = (await callCosmo(`SELECT COUNT(*) as count
    FROM Vehicles
    WHERE
      Vehicles.make LIKE '${`%${query}%`}' OR
      Vehicles.model LIKE '${`%${query}%`}' OR
      Vehicles.year LIKE '${`%${query}%`}' OR
      Vehicles.color LIKE '${`%${query}%`}'

  `)) as RowDataPacket;
    const totalPages = Math.ceil(Number(count[0][0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of customers.');
  }
}

// calculates how many sales  based on query
export async function fetchSalesPages(query: string) {
  noStore();
  try {
    const count = (await callCosmo(`SELECT COUNT(*) as count
    FROM Sales
    WHERE
      Sales.saleDate LIKE '${`%${query}%`}' OR
      Sales.customerID LIKE '${`%${query}%`}' OR
      Sales.salespersonID LIKE '${`%${query}%`}'
  `)) as RowDataPacket;
    // console.log(JSON.stringify(count))
    const totalPages = Math.ceil(Number(count[0][0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of sales.');
  }
}

// Fetch most information related to sales
export async function fetchSales(
  query: string,
  currentPage: number,
): Promise<SalesTable[]> {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const sales = (await callCosmo(`
      SELECT
        Sales.saleID,
        Sales.saleDate,
        Sales.customerID,
        Sales.salespersonID
      FROM Sales
      WHERE
        Sales.saleID LIKE '${`%${query}%`}' OR
        Sales.saleDate LIKE '${`%${query}%`}' OR
        Sales.customerID LIKE '${`%${query}%`}' OR
        Sales.salespersonID LIKE '${`%${query}%`}' 
      ORDER BY Sales.saleID DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `)) as RowDataPacket;
    //console.log(JSON.stringify(customers))

    return sales[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch sales.');
  }
}

// Fetch most informmation based on ID
// export async function fetchSaleByID(id: number) {
//   return sales[0];
// }

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
