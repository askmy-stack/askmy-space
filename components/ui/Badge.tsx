// components/ui/Badge.tsx

import React from 'react';

type BadgeVariant = 'status' | 'category' | 'score';
type BadgeDirection = 'editorial' | 'dashboard' | 'spatial';
type BadgeStatus = 'live' | 'warning' | 'critical';

interface BadgeProps {
  variant?: BadgeVariant;
  direction?: BadgeDirection;
  status?: BadgeStatus;
  children: React.ReactNode;
  className?: string;
}

export const Badge = ({
  variant = 'category',
  direction = 'editorial',
  status = 'live',
  children,
  className = '',
}: BadgeProps) => {
  const statusColors = {
    live: 'bg-[var(--color-status-live)] text-white',
    warning: 'bg-[var(--color-status-warning)] text-[var(--color-dashboard-bg)]',
    critical: 'bg-[var(--color-status-critical)] text-white',
  };

  const variantStyles = {
    status: statusColors[status],
    category: {
      editorial: 'bg-[var(--color-editorial-accent-1)] bg-opacity-20 text-[var(--color-editorial-text)] border border-[var(--color-editorial-accent-1)]',
      dashboard: 'bg-[var(--color-dashboard-accent-1)] bg-opacity-20 text-[var(--color-dashboard-text)] border border-[var(--color-dashboard-accent-1)]',
      spatial: 'bg-[var(--color-spatial-accent-1)] bg-opacity-20 text-[var(--color-spatial-text)] border border-[var(--color-spatial-accent-1)]',
    },
    score: {
      editorial: 'bg-[var(--color-editorial-accent-1)] text-[var(--color-editorial-bg)] font-bold',
      dashboard: 'bg-[var(--color-dashboard-accent-1)] text-[var(--color-dashboard-bg)] font-bold',
      spatial: 'bg-[var(--color-spatial-accent-1)] text-[var(--color-spatial-bg)] font-bold',
    },
  };

  const styles =
    variant === 'status'
      ? variantStyles.status
      : variant === 'score'
        ? (variantStyles.score as any)[direction]
        : (variantStyles.category as any)[direction];

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${styles} ${className}`}>
      {children}
    </span>
  );
};
