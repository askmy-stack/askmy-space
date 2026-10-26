"use client";

import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline";

interface BaseProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}

type AnchorProps = BaseProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

type ButtonProps = BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
};

type Props = AnchorProps | ButtonProps;

const base =
  "inline-flex items-center justify-center gap-2 t-caption font-medium px-6 py-3.5 rounded-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90",
  ghost:
    "bg-transparent text-white hover:bg-[var(--bg-elevated)]",
  outline:
    "border border-[rgba(255,255,255,0.35)] text-white hover:border-[var(--accent)] hover:text-white",
};

export const Button = forwardRef<HTMLElement, Props>(function Button(
  { children, variant = "primary", className, external, ...rest },
  ref,
) {
  const classes = cn(base, variants[variant], className);

  if ("href" in rest && rest.href) {
    const { href, ...anchorProps } = rest as AnchorProps;
    const isExternal = external ?? /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...anchorProps}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...anchorProps}
      >
        {children}
      </Link>
    );
  }

  const buttonProps = rest as ButtonProps;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      {...buttonProps}
    >
      {children}
    </button>
  );
});
