// Citation for the current file:
// Date: 2/29/2024
// Based on URL: https://nextjs.org/learn/dashboard-app/getting-started
import Form from '@/app/ui/salespeople/edit-form';
import Breadcrumbs from '@/app/ui/salespeople/breadcrumbs';
import {
  fetchAllDealerships,
  fetchSalespersonByID,
  fetchSalespersonDealerships,
} from '@/app/lib/data';

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;

  const [salesperson, dealerships, selectedDealerships] = await Promise.all([
    fetchSalespersonByID(id),
    fetchAllDealerships(),
    fetchSalespersonDealerships(id),
  ]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Salespeople', href: '/dashboard/salespeople' },
          {
            label: 'Edit Salesperson',
            href: `/dashboard/salespeople/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form
        salesperson={salesperson}
        dealerships={dealerships}
        selectedDealerships={selectedDealerships}
      />
    </main>
  );
}
