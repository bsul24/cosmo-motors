import Form from '@/app/ui/customers/edit-form';
import Breadcrumbs from '@/app/ui/customers/breadcrumbs';
import { fetchCustomerByID, fetchCustomers } from '@/app/lib/data';
 
export default async function Page({ params }: { params: { id: number} }) {
  const id = params.id;

  const [ customer ] = await Promise.all([
    fetchCustomerByID(id),
  ]);
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customer', href: '/dashboard/customers' },
          {
            label: 'Edit Customer',
            href: `/dashboard/customers/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form customer={customer} />
    </main>
  );
}