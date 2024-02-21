import { UpdateVehicle, DeleteVehicle} from '@/app/ui/vehicles/buttons';
import { fetchVehicles } from '@/app/lib/data';

export default async function VehiclesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const vehicles = await fetchVehicles(query, currentPage)

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {vehicles?.map((vehicle) => (
              <div
                key={vehicle.vehicleID}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {vehicle.make + ' ' + vehicle.model + ' ' + vehicle.year}
                    </p>
                    <p>PRICE: ${vehicle.price}</p>
                    <p>COLOR : {vehicle.color}</p>
                    <p>DEALERSHIP : {vehicle.dealershipName}</p>
                    <p>{vehicle.saleID ? 'SOLD': 'On SALE'}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                   <UpdateVehicle vehicleID={vehicle.vehicleID} />
                   <DeleteVehicle vehicleID={vehicle.vehicleID} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Make
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Model
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Year
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Price
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Color
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Dealership
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {vehicles?.map((vehicle) => (
                <tr
                  key={vehicle.vehicleID}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{vehicle.make}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {vehicle.model}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {vehicle.year}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {vehicle.price}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {vehicle.color}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {vehicle.saleID ? 'SOLD' : 'ON SALE'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {vehicle.dealershipID ? vehicle.dealershipName : ''}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                     <UpdateVehicle vehicleID={vehicle.vehicleID} />
                      <DeleteVehicle vehicleID={vehicle.vehicleID} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
