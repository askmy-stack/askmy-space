// components/ui/Button.tsx

import React from 'react';
import { COLORS, MOTION } from '@/lib/constants';

type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonDirection = 'editorial' | 'dashboard' | 'spatial';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  direction?: ButtonDirection;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', direction = 'editorial', className = '', ...props }, ref) => {
    const baseStyles =
      'px-6 py-3 rounded-md font-semibold text-sm transition-all duration-200 ease-[var(--motion-easing-standard)] hover:duration-200 active:duration-120 focus:outline-none focus:ring-2 focus:ring-offset-2';

    const directionStyles = {
      editorial: {
        primary: 'bg-[var(--color-editorial-accent-1)] text-[var(--color-editorial-bg)] hover:bg-[var(--color-editorial-accent-2)] hover:-translate-y-1 active:scale-97',
        secondary: 'border-2 border-[var(--color-editorial-border)] text-[var(--color-editorial-text)] hover:bg-[var(--color-editorial-text)] hover:text-[var(--color-editorial-bg)]',
        danger: 'bg-[var(--color-status-critical)] text-white hover:opacity-90',
      },
      dashboard: {
        primary: 'bg-[var(--color-dashboard-accent-1)] text-[var(--color-dashboard-bg)] hover:bg-[var(--color-dashboard-accent-2)] active:scale-97',
        secondary: 'border-2 border-[var(--color-dashboard-border)] text-[var(--color-dashboard-text)] hover:bg-[var(--color-dashboard-text)] hover:text-[var(--color-dashboard-bg)]',
        danger: 'bg-[var(--color-status-critical)] text-white hover:opacity-90',
      },
      spatial: {
        primary: 'border-2 border-[var(--color-spatial-accent-1)] text-[var(--color-spatial-accent-1)] bg-transparent hover:bg-[var(--color-spatial-accent-1)] hover:text-[var(--color-spatial-bg)]',
        secondary: 'border-2 border-[var(--color-spatial-accent-2)] text-[var(--color-spatial-accent-2)] bg-transparent hover:bg-[var(--color-spatial-accent-2)] hover:text-[var(--color-spatial-bg)]',
        danger: 'bg-[var(--color-status-critical)] text-white hover:opacity-90',
      },
    };

    const variantStyles = directionStyles[direction][variant];

    return (
      <button ref={ref} className={`${baseStyles} ${variantStyles} ${className}`} {...props} />
    );
  }
);

Button.displayName = 'Button';
