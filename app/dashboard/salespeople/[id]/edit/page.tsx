import Form from '@/app/ui/salespeople/edit-form';
import Breadcrumbs from '@/app/ui/salespeople/breadcrumbs';
import { fetchAllDealerships, fetchSalespersonByID } from '@/app/lib/data';
 
export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;

  const [salesperson, dealerships] = await Promise.all([
    fetchSalespersonByID(id),
    fetchAllDealerships()
  ]);
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Salespeople', href: '/dashboard/Salespeople' },
          {
            label: 'Edit Salesperson',
            href: `/dashboard/salespeople/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form salesperson={salesperson} dealerships={dealerships} />
    </main>
  );
}