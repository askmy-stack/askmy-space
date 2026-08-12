"use client";

import { usePathname } from "next/navigation";

/**
 * Routes that use the three-mode chrome (Navigation + mode Footer).
 * /signals stays legacy until Phase 2 rebuilds it as Dashboard mode.
 */
const MODE_PREFIXES = ["/discover", "/explore"];

function isModeRoute(pathname: string): boolean {
  return MODE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function ModeOnly({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return isModeRoute(pathname) ? <>{children}</> : null;
}

export function LegacyOnly({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return isModeRoute(pathname) ? null : <>{children}</>;
}
