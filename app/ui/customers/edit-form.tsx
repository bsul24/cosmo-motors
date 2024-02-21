'use client';

import { CustomerForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateCustomer } from '@/app/lib/actions';


export default function EditInvoiceForm({
  customer
}: {
  customer: CustomerForm;
}) {
  const updateCustomerWithId = updateCustomer.bind(null, customer.customerID);

  return (
    <form action={updateCustomerWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Customer's First Name */}
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
                defaultValue={ customer.firstName }
                placeholder="Enter customer's first name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Customer's Last Name */}
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
                defaultValue={ customer.lastName }
                placeholder="Enter customer's last name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>


        {/* Customer's Email */}
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
                defaultValue={ customer.email }
                placeholder="Enter customer's email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Customer's Phone Number */}
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
                defaultValue={ customer.phoneNumber }
                placeholder="Enter customer's phone number"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
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
        <Button type="submit">Edit Customer</Button>
      </div>
    </form>
  );
}
