// Citation for the current file:
// Date: 2/29/2024
// Based on URL: https://nextjs.org/learn/dashboard-app/getting-started
import { UpdateSale, DeleteSale } from '@/app/ui/sales/buttons';
import {
  fetchSales,
  fetchSalespeople,
  fetchVehiclesBySaleID,
} from '@/app/lib/data';

export default async function SalesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const sales = await fetchSales(query, currentPage);
  const vehicles = [];
  for (const sale of sales) {
    const list = await fetchVehiclesBySaleID(sale.saleID);
    vehicles.push(list);
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {sales?.map((sale, i) => {
              const vehicleList = vehicles[i];
              return (
                <div
                  key={sale.saleID}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p className="text-xl font-medium">{sale.price}</p>
                      <p>
                        VEHICLE:{' '}
                        {vehicles.make +
                          ' ' +
                          vehicles.model +
                          ' ' +
                          vehicles.year +
                          ' ' +
                          vehicles.color}
                      </p>
                      <p>DEALERSHIP: {sale.dealershipName}</p>
                      <p>
                        SALESPERSON:{' '}
                        {sale.salespersonFirstName +
                          ' ' +
                          sale.salesPersonLastName}
                      </p>
                      <p>
                        CUSTOMER:{' '}
                        {sale.customerFirstName + ' ' + sale.customerLastName}
                      </p>
                    </div>
                    <div className="flex justify-end gap-2">
                      {/* <UpdateSale saleID={sale.saleID} /> */}
                      <DeleteSale saleID={sale.saleID} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Vehicle
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Dealership
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Salesperson
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {sales?.map((sale) => (
                <tr
                  key={sale.saleID}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>
                        {sale.make +
                          ' ' +
                          sale.model +
                          ' ' +
                          sale.year +
                          ' ' +
                          sale.color +
                          ' - ' +
                          sale.price}
                      </p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {sale.dealershipName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {sale.salespersonFirstName + ' ' + sale.salesPersonLastName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {sale.customerFirstName + ' ' + sale.customerLastName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3"></td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      {/* <UpdateSale saleID={sale.saleID} /> */}
                      <DeleteSale saleID={sale.saleID} />
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
