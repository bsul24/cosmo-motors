import Form from '@/app/ui/vehicles/edit-form';
import Breadcrumbs from '@/app/ui/vehicles/breadcrumbs';
import { fetchAllDealerships, fetchVehicleByID } from '@/app/lib/data';
 
export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;

  const [vehicle, dealerships] = await Promise.all([
    fetchVehicleByID(id),
    fetchAllDealerships()
  ]);
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Vehicles', href: '/dashboard/Vehicles' },
          {
            label: 'Edit Vehicle',
            href: `/dashboard/vehicle/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form vehicle={vehicle} dealerships={dealerships} />
    </main>
  );
}