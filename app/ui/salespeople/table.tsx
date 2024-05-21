// Citation for the current file:
// Date: 2/29/2024
// Based on URL: https://nextjs.org/learn/dashboard-app/getting-started
import {
  UpdateSalesperson,
  DeleteSalesperson,
} from '@/app/ui/salespeople/buttons';
import { fetchSalespeople } from '@/app/lib/data';
import { fetchSalespersonDealerships } from '@/app/lib/data';

export default async function SalespeopleTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const salespeople = await fetchSalespeople(query, currentPage);
  const dealerships = [];

  for (let i = 0; i < salespeople.length; i++) {
    const dealershipList = await fetchSalespersonDealerships(
      salespeople[i].salespersonID,
    );
    // @ts-ignore
    salespeople[i].dealerships = dealershipList;
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {salespeople?.map((salesperson) => (
              <div
                key={salesperson.salespersonID}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {salesperson.firstName + ' ' + salesperson.lastName}
                    </p>
                    <p>{salesperson.email}</p>
                    <p>{salesperson.phoneNumber}</p>
                    <p>
                      {
                        // @ts-ignore
                        salesperson.dealerships.reduce(
                          (accum, cur) => accum + ' ' + cur.dealershipName,
                          '',
                        )
                      }
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateSalesperson
                      salespersonID={salesperson.salespersonID}
                    />
                    <DeleteSalesperson
                      salespersonID={salesperson.salespersonID}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  First Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Second Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Phone Number
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Dealerships
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {salespeople?.map((salesperson) => (
                <tr
                  key={salesperson.salespersonID}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{salesperson.firstName}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {salesperson.lastName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {salesperson.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {salesperson.phoneNumber}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {
                      // @ts-ignore
                      salesperson.dealerships.reduce((accum, cur, i) => {
                        return i === 0
                          ? cur.dealershipName
                          : accum + ', ' + cur.dealershipName;
                      }, '')
                    }
                  </td>
                  <td className="whitespace-nowrap px-3 py-3"></td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateSalesperson
                        salespersonID={salesperson.salespersonID}
                      />
                      <DeleteSalesperson
                        salespersonID={salesperson.salespersonID}
                      />
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
