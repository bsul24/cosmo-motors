// Citation for the current file:
// Date: 2/29/2024
// Based on URL: https://nextjs.org/learn/dashboard-app/getting-started
import { UpdateSale, DeleteSale } from '@/app/ui/sales/buttons';
import {
  fetchSales,
  fetchSalespeople,
  fetchVehiclesBySaleID,
  fetchCustomerByID,
  fetchSalespersonByID,
} from '@/app/lib/data';

export default async function SalesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const testData = await fetchSalespeople(query, currentPage);
  const sales = await fetchSales(query, currentPage);
  const vehicles = [];
  for (const sale of sales) {
    const vehicleList = await fetchVehiclesBySaleID(sale.saleID);
    const customer = await fetchCustomerByID(sale.customerID);
    const salesperson = await fetchSalespersonByID(sale.salespersonID);
    sale.vehicles = vehicleList;
    sale.customer = customer ? `${customer?.firstName} ${customer?.lastName}` : '';
    sale.salesperson = salesperson ? `${salesperson.firstName} ${salesperson.lastName}` : '';
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {sales?.map((sale, i) => {
              return (
                <div
                  key={sale.saleID}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p className="text-xl font-medium">Price</p>
                      <p>
                        VEHICLE:{' '}
                        {sale.vehicles.length === 0
                          ? 'NONE'
                          : sale.vehicles
                              .map((vehicle) => {
                                return `${vehicle.color} ${vehicle.year} ${vehicle.make} ${vehicle.model}`;
                              })
                              .join(', ')}
                      </p>
                      <p>
                        SALEDATE:{' '}
                        {`${sale.saleDate.getFullYear()}-${String(
                          sale.saleDate.getMonth() + 1,
                        ).padStart(2, '0')}-${String(
                          sale.saleDate.getDate(),
                        ).padStart(2, '0')}`}
                      </p>
                      <p>CUSTOMER: {sale.customer ? sale.customer : 'NONE'}</p>
                      <p>
                        SALESPERSON:{' '}
                        {sale.salesperson ? sale.salesperson : 'NONE'}
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
                  Vehicles
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Sale Date
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
              {sales?.map((sale, i) => {
                return (
                  <tr
                    key={sale.saleID}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>
                          {sale.vehicles.length === 0
                            ? 'NONE'
                            : sale.vehicles
                                .map((vehicle) => {
                                  return `${vehicle.color} ${vehicle.year} ${vehicle.make} ${vehicle.model}`;
                                })
                                .join(', ')}
                        </p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {`${sale.saleDate.getFullYear()}-${String(
                        sale.saleDate.getMonth() + 1,
                      ).padStart(2, '0')}-${String(
                        sale.saleDate.getDate(),
                      ).padStart(2, '0')}`}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {sale.customer ? sale.customer : 'NONE'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {sale.salesperson ? sale.salesperson : 'NONE'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3"></td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        {/* <UpdateSale saleID={sale.saleID} /> */}
                        <DeleteSale saleID={sale.saleID} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
