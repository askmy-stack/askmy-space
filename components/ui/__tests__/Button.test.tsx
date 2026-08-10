// components/ui/__tests__/Button.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with primary variant for editorial', () => {
    render(
      <Button variant="primary" direction="editorial">
        Click me
      </Button>
    );
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveClass('bg-[var(--color-editorial-accent-1)]');
  });

  it('renders with danger variant across all directions', () => {
    const { rerender } = render(
      <Button variant="danger" direction="editorial">
        Delete
      </Button>
    );
    expect(screen.getByRole('button')).toHaveClass('bg-[var(--color-status-critical)]');

    rerender(
      <Button variant="danger" direction="dashboard">
        Delete
      </Button>
    );
    expect(screen.getByRole('button')).toHaveClass('bg-[var(--color-status-critical)]');
  });

  it('applies custom className', () => {
    render(
      <Button className="custom-class" direction="editorial">
        Test
      </Button>
    );
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
