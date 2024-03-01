// Citation for the current file:
// Date: 2/29/2024
// Based on URL: https://nextjs.org/learn/dashboard-app/getting-started
import Form from '@/app/ui/dealerships/edit-form';
import Breadcrumbs from '@/app/ui/customers/breadcrumbs';
import { fetchDealershipByID } from '@/app/lib/data';
 
export default async function Page({ params }: { params: { id: number} }) {
  const id = params.id;

  const [ dealership ] = await Promise.all([
    fetchDealershipByID(id)
  ]);
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dealerships', href: '/dashboard/dealerships' },
          {
            label: 'Edit Dealership',
            href: `/dashboard//${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form dealership={dealership} />
    </main>
  );
}