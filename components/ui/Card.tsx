// components/ui/Card.tsx

import React from 'react';

type CardDirection = 'editorial' | 'dashboard' | 'spatial';

interface CardProps {
  direction?: CardDirection;
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ direction = 'editorial', children, className = '' }: CardProps) => {
  const directionStyles = {
    editorial:
      'bg-white border-2 border-[var(--color-editorial-border)] rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200',
    dashboard:
      'bg-[var(--color-dashboard-bg)] border border-[var(--color-dashboard-border)] rounded-md p-4 hover:bg-opacity-80 transition-colors duration-100',
    spatial:
      'bg-[var(--color-spatial-layer-1)] bg-opacity-60 border border-[var(--color-spatial-border)] rounded-md p-6 backdrop-blur-sm hover:bg-opacity-80 transition-colors duration-200',
  };

  return (
    <div className={`${directionStyles[direction]} ${className}`}>{children}</div>
  );
};
