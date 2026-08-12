// lib/constants.ts

export const COLORS = {
  editorial: {
    bg: '#F5E6D3',
    accent1: '#C9A877',
    accent2: '#D4A574',
    text: '#1A1410',
    textSecondary: '#8B7355',
    border: '#D4A574',
  },
  dashboard: {
    bg: '#1A1410',
    accent1: '#E8A76F',
    accent2: '#B85A3B',
    text: '#E8A76F',
    textSecondary: '#3D3530',
    border: '#3D3530',
  },
  spatial: {
    bg: '#0F0D0A',
    layer1: '#1F1B16',
    accent1: '#F4D9A8',
    accent2: '#C9A877',
    text: '#C9A877',
    textSecondary: '#8B7355',
    border: '#F4D9A8',
  },
  semantic: {
    live: '#6FA86F',
    warning: '#E8A76F',
    critical: '#DC5D4F',
  },
};

export const TYPOGRAPHY = {
  displayXL: { size: '3rem', weight: 300, lineHeight: 1.1 },
  displayLG: { size: '1.8rem', weight: 500, lineHeight: 1.2 },
  displayMD: { size: '1.3rem', weight: 600, lineHeight: 1.3 },
  body: { size: '1rem', weight: 400, lineHeight: 1.7 },
  caption: { size: '0.85rem', weight: 400, lineHeight: 1.5 },
  mono: { size: '0.9rem', weight: 500, lineHeight: 1.4 },
};

export const MOTION = {
  easing: {
    standard: 'cubic-bezier(0.16, 1, 0.3, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.58, 1)',
    easeIn: 'cubic-bezier(0.42, 0, 1, 1)',
  },
  timing: {
    editorial: {
      pageTransition: 550,
      hover: 200,
      press: 120,
      reveal: 350,
      /** Delay between successive elements in a staggered reveal. */
      stagger: 45,
    },
    dashboard: {
      pageTransition: 120,
      hover: 100,
      press: 120,
      snap: 120,
    },
    spatial: {
      pageTransition: 400,
      hover: 200,
      press: 200,
      expand: 400,
      ambient: 3000,
    },
  },
};

export const X_ACCOUNT = 'https://x.com/ask_my_stack';

export const SHIPPED_SYSTEMS = [
  {
    name: 'eeg-seizure-detection',
    category: 'ML / Healthcare',
    description: 'Benchmark of 15+ neural architectures on 916 hours of pediatric EEG data.',
    github: 'https://github.com/askmy-stack/eeg-seizure-detection',
    status: 'live',
  },
  {
    name: 'startupintel',
    category: 'Intelligence',
    description: 'Open-source startup intelligence platform powered by specialized ML bots.',
    github: 'https://github.com/askmy-stack/startupintel',
    status: 'live',
  },
  {
    name: 'cortex',
    category: 'Knowledge Graph',
    description: 'Organizational memory for AI agents. Captures decisions into a knowledge graph for long-term context.',
    github: 'https://github.com/askmy-stack/cortex',
    status: 'live',
  },
  {
    name: 'meridian',
    category: 'Risk Intelligence',
    description: 'Real-time supply chain risk intelligence powered by geopolitical signals.',
    github: 'https://github.com/askmy-stack/meridian',
    status: 'live',
  },
  {
    name: 'parallax',
    category: 'Agent Reliability',
    description: 'Runtime reliability, diagnosis, and recovery framework for autonomous AI agents.',
    github: 'https://github.com/askmy-stack/parallax',
    status: 'live',
  },
];

export const CAREER = {
  current: {
    title: 'System Operations Analyst',
    duration: 'May 2025 – May 2026',
    timezone: 'ET',
    description:
      'Architecting and optimizing intelligence infrastructure. Responsible for data pipeline reliability, signal ingestion optimization, system health monitoring, and emerging research integration.',
  },
};
