// Citation for the current file:
// Date: 2/29/2024
// Based on URL: https://nextjs.org/learn/dashboard-app/getting-started
'use client';

import { CustomerForm, DealershipField, SalespersonForm } from '@/app/lib/definitions';
import {
  BuildingStorefrontIcon,
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateCustomer, updateSalesperson } from '@/app/lib/actions';
import MultiSelectCosmo from '../multiselect';
import { useState } from 'react';


export default function EditSalespersonForm({
  salesperson, dealerships
}: {
  salesperson: SalespersonForm;
  dealerships: DealershipField[]
}) {
  const updateSalespersonWithId = updateSalesperson.bind(null, salesperson.salespersonID);

  const [selected, setSelected] = useState(salesperson.dealerships.map(dealership => {return {value:dealership.dealershipID,label:dealership.dealershipName}}));

  return (
    <form action={updateSalespersonWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Salesperson's First Name */}
        <div className="mb-4">
          <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
            First Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="firstName"
                name="firstName"
                type="string"
                defaultValue={ salesperson.firstName }
                placeholder="Enter salesperson's first name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Salesperson's Last Name */}
        <div className="mb-4">
          <label htmlFor="lastName" className="mb-2 block text-sm font-medium">
            Last Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="lastName"
                name="lastName"
                type="string"
                defaultValue={ salesperson.lastName }
                placeholder="Enter salesperson's last name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>


        {/* Salesperson's Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="string"
                defaultValue={ salesperson.email }
                placeholder="Enter saleperson's email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Salesperson's Phone Number */}
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="mb-2 block text-sm font-medium">
            Phone Number
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="string"
                defaultValue={ salesperson.phoneNumber }
                placeholder="Enter saleperson's phone number"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Dealership*/}
        <div className="mb-4">
          <label htmlFor="dealerships" className="mb-2 block text-sm font-medium">
            Choose Dealerships
          </label>
          <div className="relative">
            <MultiSelectCosmo options={dealerships.map((dealership)=> {
              const label = dealership.dealershipName
              return {label:label, value:dealership.dealershipID}
              })} selected={selected} setSelected={setSelected}/>
            <BuildingStorefrontIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/salespeople"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Salesperson</Button>
      </div>
    </form>
  );
}
