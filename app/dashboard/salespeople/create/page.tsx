import Form from '@/app/ui/salespeople/create-form';
import Breadcrumbs from '@/app/ui/salespeople/breadcrumbs';
import { fetchDealerships } from '@/app/lib/data';
 
export default async function Page() {
  const dealerships = await fetchDealerships();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Salespeople', href: '/dashboard/salespeople' },
          {
            label: 'Create Salesperson',
            href: '/dashboard/salespeople/create',
            active: true,
          },
        ]}
      />
      <Form dealerships ={dealerships} />
    </main>
  );
}