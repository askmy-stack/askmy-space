import { Fraunces } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

/**
 * Fraunces — variable serif, used as fallback for PP Editorial New.
 * When you acquire a PP Editorial New license, swap the src via `next/font/local`.
 */
export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

export const geistSans = GeistSans;
export const geistMono = GeistMono;

export const fontVariables = `${fraunces.variable} ${geistSans.variable} ${geistMono.variable}`;
