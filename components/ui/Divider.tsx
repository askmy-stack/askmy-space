// components/ui/Divider.tsx

import React from 'react';
import { COLORS, MOTION } from '@/lib/constants';

type DividerDirection = 'editorial' | 'dashboard' | 'spatial';

interface DividerProps {
  direction?: DividerDirection;
  className?: string;
}

export const Divider = ({ direction = 'editorial', className = '' }: DividerProps) => {
  const directionStyles = {
    editorial: 'text-center text-[var(--color-editorial-accent-2)] text-opacity-30 py-6',
    dashboard: 'border-b border-[var(--color-dashboard-border)] my-4 opacity-20',
    spatial: 'h-px bg-gradient-to-r from-transparent via-[var(--color-spatial-accent-1)] to-transparent opacity-30 my-6',
  };

  if (direction === 'editorial') {
    return <div className={`${directionStyles[direction]} ${className}`}>✦ ✦ ✦</div>;
  }

  return <div className={`${directionStyles[direction]} ${className}`} />;
};
