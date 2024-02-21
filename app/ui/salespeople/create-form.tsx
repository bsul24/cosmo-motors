'use client'
import { DealershipField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  BuildingStorefrontIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createSalesperson } from '@/app/lib/actions';
import MultiSelectCosmo from '../multiselect';
import { useState } from 'react';

export default function Form( {dealerships}: {dealerships: DealershipField[]}) {
  const [selected, setSelected] = useState([]);
  return (
    <form action={createSalesperson}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Salesperson's first name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Salesperson's first name
          </label>
          <div className="relative">
          <input
                id="firstName"
                name="firstName"
                type="string"
                step="0.01"
                placeholder="Enter salesperson's first name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Salesperson's last name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Salesperson's last name
          </label>
          <div className="relative">
          <input
                id="lastName"
                name="lastName"
                type="string"
                step="0.01"
                placeholder="Enter salesperson's last name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
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

        {/* Salesperson's email */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Salesperson's email
          </label>
          <div className="relative">
          <input
                id="email"
                name="email"
                type="string"
                step="0.01"
                placeholder="Enter salesperson's email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Salesperson's phone */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Salesperson's phone
          </label>
          <div className="relative">
          <input
                id="phoneNumber"
                name="phoneNumber"
                type="string"
                step="0.01"
                placeholder="Enter saleperson's phone"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Salesperson</Button>
      </div>
    </form>
  );
}
