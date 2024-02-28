import Pagination from '@/app/ui/vehicles/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/vehicles/table';
import { CreateVehicle } from '@/app/ui/vehicles/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton, VehiclesTableSkeleton } from '@/app/ui/skeletons';
import { fetchSalespeoplePages, fetchVehiclesPages } from '@/app/lib/data';
import { Suspense } from 'react';
 
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchVehiclesPages(query)

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Vehicles</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Vehicles..." />
        <CreateVehicle />
      </div>
      <Suspense key={query + currentPage} fallback={<VehiclesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}