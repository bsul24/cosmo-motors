import { lusitana } from '@/app/ui/fonts';

 
export default async function Page() {

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <p>This webpage is based on the Next.js tutorial starter project available on <strong><a className="text-red-600" href="https://nextjs.org/learn/dashboard-app" color="blue">Project</a></strong>. All further work was made by the members of group 24.</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      </div>
    </main>
  );
}