// Citation for the current file:
// Date: 2/29/2024
// Based on URL: https://nextjs.org/learn/dashboard-app/getting-started
'use client';
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
import Multiselect from 'multiselect-react-dropdown';

export default function Form({
  dealerships,
}: {
  dealerships: DealershipField[];
}) {
  const [selected, setSelected] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });

  const options = dealerships.map((d) => {
    return { name: d.dealershipName, id: d.dealershipID };
  });

  function handleMultiselectChange(selectedList) {
    setSelected(selectedList);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    createSalesperson(formData, selected);
  }

  // function onSelect(selectedList, selectedItem) {
  //   selectedList.push(selectedItem);
  // }
  // function onRemove(selectedList, removedItem) {
  //   selectedList.splice(selectedList.indexOf(removedItem), 1);
  // }

  return (
    // action={createSalesperson}
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Salesperson's first name */}
        <div className="mb-4">
          <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
            Salesperson's first name
          </label>
          <div className="relative">
            <input
              onChange={handleChange}
              id="firstName"
              name="firstName"
              type="string"
              step="0.01"
              placeholder="Enter salesperson's first name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Salesperson's last name */}
        <div className="mb-4">
          <label htmlFor="lastName" className="mb-2 block text-sm font-medium">
            Salesperson's last name
          </label>
          <div className="relative">
            <input
              onChange={handleChange}
              id="lastName"
              name="lastName"
              type="string"
              step="0.01"
              placeholder="Enter salesperson's last name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Dealership*/}
        <div className="mb-4">
          <label
            htmlFor="dealerships"
            className="mb-2 block text-sm font-medium"
          >
            Choose Dealerships
          </label>
          <div className="relative">
            {/* <MultiSelectCosmo
              options={dealerships.map((dealership) => {
                const label = dealership.dealershipName;
                return { label: label, value: dealership.dealershipID };
              })}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Multiselect
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              options={options}
              onSelect={handleMultiselectChange}
              onRemove={handleMultiselectChange}
              displayValue="name"
            />
            <BuildingStorefrontIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Salesperson's email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Salesperson's email
          </label>
          <div className="relative">
            <input
              onChange={handleChange}
              id="email"
              name="email"
              type="string"
              step="0.01"
              placeholder="Enter salesperson's email"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Salesperson's phone */}
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="mb-2 block text-sm font-medium"
          >
            Salesperson's phone
          </label>
          <div className="relative">
            <input
              onChange={handleChange}
              id="phoneNumber"
              name="phoneNumber"
              type="string"
              step="0.01"
              placeholder="Enter saleperson's phone"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
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
        <Button type="submit">Create Salesperson</Button>
      </div>
    </form>
  );
}
