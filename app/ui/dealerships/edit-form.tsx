'use client';

import { DealershipForm } from '@/app/lib/definitions';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateDealership } from '@/app/lib/actions';

export default function EditDealershipForm({
  dealership,
}: {
  dealership: DealershipForm;
}) {
  const updateDealershipWithId = updateDealership.bind(
    null,
    dealership.dealershipID,
  );

  return (
    <form action={updateDealershipWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Dealership's Name */}
        <div className="mb-4">
          <label
            htmlFor="dealershipName"
            className="mb-2 block text-sm font-medium"
          >
            Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="dealershipName"
                name="dealershipName"
                type="text"
                required
                defaultValue={dealership.dealershipName}
                placeholder="Enter dealership's name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <BuildingStorefrontIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Dealership's State */}
        <div className="mb-4">
          <label htmlFor="state" className="mb-2 block text-sm font-medium">
            State
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="state"
                name="state"
                required
                type="text"
                defaultValue={dealership.state}
                placeholder="Enter dealership's state"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <BuildingStorefrontIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Dealership's City */}
        <div className="mb-4">
          <label htmlFor="city" className="mb-2 block text-sm font-medium">
            City
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="city"
                name="city"
                type="text"
                required
                defaultValue={dealership.city}
                placeholder="Enter dealership's city"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <BuildingStorefrontIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Dealership's Address */}
        <div className="mb-4">
          <label htmlFor="address" className="mb-2 block text-sm font-medium">
            Address
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="address"
                name="address"
                required
                type="text"
                defaultValue={dealership.address}
                placeholder="Enter dealership's address"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <BuildingStorefrontIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Dealership's Phone Number */}
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="mb-2 block text-sm font-medium"
          >
            Phone Number
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                defaultValue={dealership.phoneNumber}
                placeholder="Enter dealership's phone number"
                pattern="^\d{3}-\d{3}-\d{4}$"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <BuildingStorefrontIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Please enter the phone number in the format: 123-456-7890.
            </p>
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
        <Button type="submit">Edit Dealership</Button>
      </div>
    </form>
  );
}
