import Form from '@/app/ui/salespeople/create-form';
import Breadcrumbs from '@/app/ui/salespeople/breadcrumbs';
import { fetchAllDealerships} from '@/app/lib/data';
 
export default async function Page() {
  const dealerships = await fetchAllDealerships();
 
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