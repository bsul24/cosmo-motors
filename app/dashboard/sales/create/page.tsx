// Citation for the current file:
// Date: 2/29/2024
// Based on URL: https://nextjs.org/learn/dashboard-app/getting-started
import Form from '@/app/ui/sales/create-form';
import Breadcrumbs from '@/app/ui/sales/breadcrumbs';
import { fetchAllDealerships, fetchAllCustomersMotor, fetchAllSalespeople, fetchAvailableVehicles } from '@/app/lib/data';
 
export default async function Page() {
  const dealerships = await fetchAllDealerships();
  const customers = await fetchAllCustomersMotor();
  const salespeople = await fetchAllSalespeople();
  const vehicles = await fetchAvailableVehicles();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Sales', href: '/dashboard/sales' },
          {
            label: 'Create Sale',
            href: '/dashboard/sales/create',
            active: true,
          },
        ]}
      />
      <Form dealerships ={dealerships} customers={customers} salespeople={salespeople} vehicles={vehicles}/>
    </main>
  );
}