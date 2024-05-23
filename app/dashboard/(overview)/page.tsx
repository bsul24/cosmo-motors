// Citation for the current file:
// Date: 2/29/2024
// Based on URL: https://nextjs.org/learn/dashboard-app/getting-started

import { lusitana } from '@/app/ui/fonts';

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
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
