// Citation for the current file:
// Date: 2/29/2024
// Based on URL: https://nextjs.org/learn/dashboard-app/getting-started
import Form from '@/app/ui/dealerships/create-form';
import Breadcrumbs from '@/app/ui/dealerships/breadcrumbs';
 
export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dealerships', href: '/dashboard/dealerships' },
          {
            label: 'Create Dealership',
            href: '/dashboard/dealerships/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}