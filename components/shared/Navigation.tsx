'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { useDirection } from '@/lib/hooks';

export const Navigation = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const direction = useDirection();

  const isActive = (path: string) => pathname.startsWith(path);

  const navLinks = [
    { href: '/discover', label: 'Discover' },
    { href: '/signals', label: 'Signals' },
    { href: '/explore', label: 'Explore' },
  ];

  const directionStyles = {
    editorial: 'border-b border-editorial-border bg-editorial-bg text-editorial-text',
    dashboard: 'border-b border-dashboard-border bg-dashboard-bg text-dashboard-text',
    spatial: 'border-b border-spatial-border bg-spatial-bg text-spatial-text',
  };

  return (
    <nav className={`sticky top-0 z-50 ${directionStyles[direction]}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          ASK.
        </Link>

        {/* Center nav links */}
        <div className="flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(link.href)
                  ? direction === 'editorial'
                    ? 'text-editorial-accent1 border-b-2 border-editorial-accent1'
                    : direction === 'dashboard'
                      ? 'text-dashboard-accent1 border-b-2 border-dashboard-accent1'
                      : 'text-spatial-accent1 border-b-2 border-spatial-accent1'
                  : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md transition-colors duration-200"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
};
