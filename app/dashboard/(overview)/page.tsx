// Citation for the current file:
// Date: 2/29/2024
// Based on URL: https://nextjs.org/learn/dashboard-app/getting-started

import { lusitana } from '@/app/ui/fonts';

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-3xl md:text-3xl`}>
        Dashboard
      </h1>
      <p className="mb-6 text-lg">
        This application is a demo to showcase a full-stack CRUD web
        application. Cosmo Motors is designed to simulate managing and tracking
        essential data for a car dealership.
      </p>
      <h2 className="mb-3 text-2xl">Project Features</h2>
      <ul className="mb-6 list-inside list-disc">
        <li>
          <strong>Manage Customers:</strong> Add, update, and view customer
          information.
        </li>
        <li>
          <strong>Inventory Management:</strong> Maintain a detailed record of
          vehicle inventory, including adding new vehicles and updating existing
          entries.
        </li>
        <li>
          <strong>Sales Tracking:</strong> Record and monitor sales
          transactions.
        </li>
        <li>
          <strong>Dealership Info:</strong> Manage dealership details, including
          employees and their locations.
        </li>
      </ul>

      <p>
        This project utilizes some of the starter code from the Next.js website,
        available{' '}
        <strong>
          <a
            className="text-red-600"
            href="https://nextjs.org/learn/dashboard-app"
            target="_blank"
            rel="noopener noreferrer"
            color="blue"
          >
            here
          </a>
        </strong>
        .
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"></div>
    </main>
  );
}
