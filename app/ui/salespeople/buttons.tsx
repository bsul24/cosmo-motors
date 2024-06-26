// Citation for the current file:
// Date: 2/29/2024
// Based on URL: https://nextjs.org/learn/dashboard-app/getting-started
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteCustomer, deleteSalesperson } from '@/app/lib/actions';


export function CreateSalesperson() {
  return (
    <Link
      href="/dashboard/salespeople/create"
      className="flex h-10 items-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
    >
      <span className="hidden md:block">Create Salesperson</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateSalesperson({ salespersonID }: { salespersonID: number }) {
  return (
    <Link
      href={`/dashboard/salespeople/${salespersonID}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteSalesperson({ salespersonID }: { salespersonID: number}) {
  const deleteSalespersonWithId = deleteSalesperson.bind(null, salespersonID);
  return (
    <form action={deleteSalespersonWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
