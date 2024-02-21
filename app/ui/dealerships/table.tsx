import { UpdateDealership, DeleteDealership} from '@/app/ui/dealerships/buttons';
import { fetchDealerships } from '@/app/lib/data';

export default async function DealershipsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const dealerships = await fetchDealerships(query, currentPage)

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {dealerships?.map((dealership) => (
              <div
                key={dealership.dealershipID}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {dealership.dealershipName + ': ' + dealership.address + ' - ' + dealership.phoneNumber}
                    </p>
                    <p>STATE: ${dealership.state}</p>
                    <p>CITY : {dealership.city}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateDealership dealershipID={dealership.dealershipID} />
                    <DeleteDealership dealershipID={dealership.dealershipID} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  State
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  City
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Address
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Phone Number
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {dealerships?.map((dealership) => (
                <tr
                  key={dealership.dealershipID}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{dealership.dealershipName}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {dealership.state}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {dealership.city}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {dealership.address}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {dealership.phoneNumber}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                     <UpdateDealership dealershipID={dealership.dealershipID} />
                      <DeleteDealership dealershipID={dealership.dealershipID} />
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
