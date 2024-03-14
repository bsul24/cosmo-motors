// Citation for the current file:
// Date: 2/29/2024
// Based on URL: https://nextjs.org/learn/dashboard-app/getting-started
import { DealershipField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  BuildingStorefrontIcon,
  TruckIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createDealership } from '@/app/lib/actions';

export default function Form() {
  return (
    <form action={createDealership}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Dealership's Name */}
        <div className="mb-4">
          <label
            htmlFor="dealershipName"
            className="mb-2 block text-sm font-medium"
          >
            Name
          </label>
          <div className="relative">
            <input
              id="dealershipName"
              name="dealershipName"
              type="string"
              required
              placeholder="Enter the dealership's name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <BuildingStorefrontIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Dealership's state */}
        <div className="mb-4">
          <label htmlFor="state" className="mb-2 block text-sm font-medium">
            State
          </label>
          <div className="relative">
            <input
              id="state"
              name="state"
              type="string"
              required
              placeholder="Enter the dealership's state"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <BuildingStorefrontIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Dealership's city */}
        <div className="mb-4">
          <label htmlFor="city" className="mb-2 block text-sm font-medium">
            City
          </label>
          <div className="relative">
            <input
              id="city"
              name="city"
              type="string"
              required
              placeholder="Enter the dealership's city"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <BuildingStorefrontIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Dealership's address */}
        <div className="mb-4">
          <label htmlFor="address" className="mb-2 block text-sm font-medium">
            Address
          </label>
          <div className="relative">
            <input
              id="address"
              name="address"
              type="string"
              required
              placeholder="Enter the dealership's address"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <BuildingStorefrontIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Dealership's phone number */}
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="mb-2 block text-sm font-medium"
          >
            Phone Number
          </label>
          <div className="relative">
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="string"
              required
              placeholder="Enter the dealership's phone number"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <BuildingStorefrontIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/dealerships"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Dealership</Button>
      </div>
    </form>
  );
}
