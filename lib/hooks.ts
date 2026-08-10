// lib/hooks.ts

import { usePathname } from 'next/navigation';

export type Direction = 'editorial' | 'dashboard' | 'spatial';

export const useDirection = (): Direction => {
  const pathname = usePathname();

  if (pathname.startsWith('/signals')) return 'dashboard';
  if (pathname.startsWith('/explore')) return 'spatial';
  return 'editorial'; // default
};
