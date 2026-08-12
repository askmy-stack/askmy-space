'use client';

import { X_ACCOUNT } from '@/lib/constants';
import { useDirection } from '@/lib/hooks';

const directionStyles = {
  editorial:
    'bg-editorial-bg text-editorial-text border-t border-editorial-border',
  dashboard:
    'bg-dashboard-bg text-[var(--color-dashboard-text-bright)] border-t border-dashboard-border',
  spatial:
    'bg-spatial-bg text-spatial-text border-t border-spatial-border',
} as const;

export const Footer = () => {
  const direction = useDirection();

  return (
    <footer className={`py-8 px-6 ${directionStyles[direction]}`}>
      <div className="max-w-7xl mx-auto flex flex-wrap gap-4 justify-between items-center">
        <div className="text-sm opacity-60">
          © {new Date().getFullYear()} Abhinaysai Kamineni. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a href={X_ACCOUNT} target="_blank" rel="noopener noreferrer" className="text-sm hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md px-2 py-1">
            X
          </a>
          <a href="https://github.com/askmy-stack" target="_blank" rel="noopener noreferrer" className="text-sm hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md px-2 py-1">
            GitHub
          </a>
          <a href="mailto:kamineniabhinaysai@gmail.com" className="text-sm hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md px-2 py-1">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};
