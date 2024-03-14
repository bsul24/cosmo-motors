// Citation for the current file:
// Date: 2/29/2024
// Based on URL: https://nextjs.org/learn/dashboard-app/getting-started
'use client'
import { CustomerField, DealershipField, SalespersonField, VehicleField, VehicleForm } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  BuildingStorefrontIcon,
  TruckIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createSale } from '@/app/lib/actions';
import MultiSelectCosmo from '../multiselect';
import React, { useState } from "react";


export default function Form( {vehicles, customers, salespeople}: {vehicles: VehicleField[], customers: CustomerField[], salespeople: SalespersonField[]}) {
  const [selected, setSelected] = useState([]);
  const multiName = 'vehicleIDs'
  return (
    <form action={createSale}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose Customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              required
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.customerID} value={customer.customerID}>
                  {customer.firstName +  ' ' + customer.lastName}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Salesperson Name */}
        <div className="mb-4">
          <label htmlFor="salesperson" className="mb-2 block text-sm font-medium">
            Choose Salesperson
          </label>
          <div className="relative">
            <select
              id="salesperson"
              name="salespersonId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select a salesperson
              </option>
              {salespeople.map((salesperson) => (
                <option key={salesperson.salespersonID} value={salesperson.salespersonID}>
                  {salesperson.firstName + ' ' + salesperson.lastName}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        

        {/* Vehicles */}
        <div className="mb-4">
          <label htmlFor={multiName} className="mb-2 block text-sm font-medium">
            Choose Vehicles
          </label>
          <div className="relative">
            <MultiSelectCosmo options={vehicles.map((vehicle)=> {
              const label = vehicle.make+' '+vehicle.model+' '+vehicle.year+' '+vehicle.color + ' - Price: $' + vehicle.price  + ' - Dealership: ' + vehicle.dealershipName
              return {label:label, value:vehicle.vehicleID}
              })} selected={selected} setSelected={setSelected} name={multiName} required={true}/>
            <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/sales"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Sale</Button>
      </div>
    </form>
  );
}
