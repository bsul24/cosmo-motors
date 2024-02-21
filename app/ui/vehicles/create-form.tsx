import { DealershipField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  BuildingStorefrontIcon,
  TruckIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createVehicle } from '@/app/lib/actions';

export default function Form( {dealerships}: {dealerships: DealershipField[]}) {
  return (
    <form action={createVehicle}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Vehicle's model */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Model
          </label>
          <div className="relative">
          <input
                id="model"
                name="model"
                type="string"
                step="0.01"
                placeholder="Enter the vehicle's model"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Vehicle's make */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Make
          </label>
          <div className="relative">
          <input
                id="make"
                name="make"
                type="string"
                step="0.01"
                placeholder="Enter the vehicle's make"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Vehicle's price */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Price
          </label>
          <div className="relative">
          <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                placeholder="Enter the vehicle's price"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Vehicle's color */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Color
          </label>
          <div className="relative">
          <input
                id="color"
                name="color"
                type="string"
                step="0.01"
                placeholder="Enter the vehicle's color"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Dealership */}
        <div className="mb-4">
        <label htmlFor="customer" className="mb-2 block text-sm font-medium">
          Choose dealership
        </label>
        <div className="relative">
          <select
            id="dealershipID"
            name="dealershipID"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue=""
          >
            <option value="" disabled>
              Select a dealership
            </option>
            {dealerships.map((dealership) => (
              <option key={dealership.dealershipID} value={dealership.dealershipID}>
                {dealership.dealershipName}
              </option>
            ))}
          </select>
          <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
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
        <Button type="submit">Create Vehicle</Button>
      </div>
    </form>
  );
}
