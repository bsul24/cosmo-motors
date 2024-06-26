// Citation for the current file:
// Date: 2/29/2024
// Based on URL: https://nextjs.org/learn/dashboard-app/getting-started
import { TruckIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function TruckLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <TruckIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[1em]">CosmoMotors</p>
    </div>
  );
}
