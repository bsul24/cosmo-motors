// Citation for the current file:
// Date: 2/29/2024
// Based on URL: https://nextjs.org/learn/dashboard-app/getting-started
'use client';

import {  DealershipField, VehicleForm } from '@/app/lib/definitions';
import {
  TruckIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateVehicle } from '@/app/lib/actions';


export default function EditVehicleForm({
  vehicle, dealerships
}: {
  vehicle: VehicleForm;
  dealerships: DealershipField[]
}) {
  const updateVehicleWithId = updateVehicle.bind(null, vehicle.vehicleID);
  return (
    <form action={updateVehicleWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Vehicle's make */}
        <div className="mb-4">
          <label htmlFor="make" className="mb-2 block text-sm font-medium">
            Make
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="make"
                required
                name="make"
                type="string"
                defaultValue={ vehicle.make }
                placeholder="Enter vehicle's make"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Vehicle's model */}
        <div className="mb-4">
          <label htmlFor="model" className="mb-2 block text-sm font-medium">
            Model
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="model"
                required
                name="model"
                type="string"
                defaultValue={ vehicle.model }
                placeholder="Enter vehicle's model"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Vehicle's year */}
        <div className="mb-4">
          <label htmlFor="year" className="mb-2 block text-sm font-medium">
            Year
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="year"
                required
                name="year"
                type="string"
                defaultValue={ vehicle.year }
                placeholder="Enter vehicle's year"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Vehicle's price */}
        <div className="mb-4">
          <label htmlFor="price" className="mb-2 block text-sm font-medium">
            Price
          </label>
          <div className="relative">
          <input
                id="price"
                name="price"
                type="number"
                required
                step="0.01"
                defaultValue={ vehicle.price }
                placeholder="Enter the vehicle's price"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Vehicle's color */}
        <div className="mb-4">
          <label htmlFor="color" className="mb-2 block text-sm font-medium">
            Color
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="color"
                name="color"
                type="string"
                required
                defaultValue={ vehicle.color }
                placeholder="Enter vehicle's color"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Dealership */}
        <div className="mb-4">
        <label htmlFor="customer" className="mb-2 block text-sm font-medium">
          Change dealership
        </label>
        <div className="relative">
          <select
            id="dealershipID"
            name="dealershipID"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={vehicle.dealershipID}
          >
            <option value={""}>
            -- NO DEALERSHIP --
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
          href="/dashboard/vehicles"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Vehicle</Button>
      </div>
    </form>
  );
}
