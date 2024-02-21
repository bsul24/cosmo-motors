import Form from '@/app/ui/vehicles/create-form';
import Breadcrumbs from '@/app/ui/vehicles/breadcrumbs';
import { fetchAllDealerships, fetchDealerships } from '@/app/lib/data';
 
export default async function Page() {
  const dealerships = await fetchAllDealerships();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Vehicles', href: '/dashboard/vehicles' },
          {
            label: 'Create Vehicle',
            href: '/dashboard/vehicles/create',
            active: true,
          },
        ]}
      />
      <Form dealerships ={dealerships} />
    </main>
  );
}