import Pagination from '@/app/ui/salespeople/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/salespeople/table';
import { CreateSalesperson } from '@/app/ui/salespeople/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton, SalespeopleTableSkeleton } from '@/app/ui/skeletons';
import { fetchSalespeoplePages } from '@/app/lib/data';
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
  const totalPages = await fetchSalespeoplePages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Salespeople</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search salesperson..." />
        <CreateSalesperson />
      </div>
      <Suspense key={query + currentPage} fallback={<SalespeopleTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}