// Citation for the current file:
// Date: 2/29/2024
// Based on URL: https://nextjs.org/learn/dashboard-app/getting-started
export const vehicles = [
  {
    vehicleID: 1,
    make: 'Ford',
    model: 'Mustang',
    year: '2023',
    price: 87000.00,
    color: 'Black',
    saleID: 3,
    dealershipID: 2,
    dealershipName: 'Kepler'
  },
  {
    vehicleID: 2,
    make: 'Ford',
    model: 'Mustang',
    year: '2023',
    price: 87000.00,
    color: 'Black',
    saleID: 3,
    dealershipID: 3,
    dealershipName: 'Kepler'
  },
  {
    vehicleID: 3,
    make: 'Ford',
    model: 'Mustang',
    year: '2023',
    price: 87000.00,
    color: 'Black',
    saleID: null,
    dealershipID: 3,
    dealershipName: 'Kepler'
  },
  {
    vehicleID: 4,
    make: 'Ford',
    model: 'Mustang',
    year: '2023',
    price: 87000.00,
    color: 'Black',
    saleID: null,
    dealershipID: 4,
    dealershipName: 'Kepler'
  }
];

export const customers = [
  {
    customerID: 1,
    firstName: 'Phoebe',
    lastName: 'Smith',
    email: 'phoebe.smith@cosmomotors.com',
    phoneNumber: '3458219087'
  },
  {
    customerID: 2,
    firstName: 'Phoebe',
    lastName: 'Smith',
    email: 'phoebe.smith@cosmomotors.com',
    phoneNumber: '3458219087'
  },
  {
    customerID: 3,
    firstName: 'Phoebe',
    lastName: 'Smith',
    email: 'phoebe.smith@cosmomotors.com',
    phoneNumber: '3458219087'
  }
];

export const salespeople = [
  {
    salespersonID: 1,
    firstName: 'Hasan',
    lastName: 'Twelpert',
    email: 'hasstwp@nodomain.com',
    phoneNumber: '3237886436',
    dealerships: [
      {dealershipID: 2, dealershipName: 'Kepler'}
    ]
  },
  {
    salespersonID: 2,
    firstName: 'Hasan',
    lastName: 'Twelpert',
    email: 'hasstwp@nodomain.com',
    phoneNumber: '3237886436',
    dealerships: [
      {dealershipID: 2, dealershipName: 'Kepler'}
    ]
  },
  {
    salespersonID: 3,
    firstName: 'Hasan',
    lastName: 'Twelpert',
    email: 'hasstwp@nodomain.com',
    phoneNumber: '3237886436',
    dealerships: [
      {dealershipID: 2, dealershipName: 'Kepler'}
    ]
  },
];

export const dealerships = [
  {
    dealershipID: 2,
    dealershipName: 'Kepler',
    state: 'FL',
    city: 'Miami',
    address: '1545 Skips Lane',
    phoneNumber: '5203434821'
  },
  {
    dealershipID: 3,
    dealershipName: 'Kepler2',
    state: 'FL',
    city: 'Miami',
    address: '1545 Skips Lane',
    phoneNumber: '5203434821'
  },
  {
    dealershipID: 4,
    dealershipName: 'Kepler3',
    state: 'FL',
    city: 'Miami',
    address: '1545 Skips Lane',
    phoneNumber: '5203434821'
  }
];

export const dealershipsHasSalespeople = [
  {
    dealershipID: 1,
    salespersonID: 2,
    comission: 0.2
  },
  {
    dealershipID: 3,
    salespersonID: 1,
    comission: 0.2
  },
  {
    dealershipID: 3,
    salespersonID: 3,
    comission: 0.2
  },
  {
    dealershipID: 4,
    salespersonID: 1,
    comission: 0.2
  },
]

export const sales = [
  {
    saleID: 1,
    saleDate: '2023-04-13',
    customerID: 3,
    customerFirstName: 'Ellen',
    customerLastName: 'Jimenez',
    salespersonID: 1,
    salespersonFirstName: 'Dario',
    salesPersonLastName: 'Carrillo',
    dealershipID: 2,
    dealershipName: 'Kepler',
    vehicleID: 3,
    make: 'Ford',
    model: 'Festa',
    year: '1993',
    color: 'White',
    price: 20000

  },
  {
    saleID: 2,
    saleDate: '2020-09-03',
    customerID: 1,
    customerFirstName: 'Monica',
    customerLastName: 'Geller',
    salespersonID: 3,
    salespersonFirstName: 'Hunter',
    salesPersonLastName: 'Carrillo',
    dealershipID: 2,
    dealershipName: 'Kepler2',
    vehicleID: 3,
    make: 'Ford',
    model: 'Festa',
    year: '1993',
    color: 'White',
    price: 20000
  },
  {
    saleID: 3,
    saleDate: '2022-12-24',
    customerID: 3,
    salespersonID: 1,
    customerFirstName: 'Joey',
    customerLastName: 'Geller',
    salespersonFirstName: 'Shas',
    salesPersonLastName: 'Neira',
    dealershipID: 2,
    dealershipName: 'Kepler1',
    vehicleID: 3,
    make: 'Ford',
    model: 'Festa',
    year: '1993',
    color: 'White',
    price: 20000
    
  },
]