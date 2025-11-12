import type { Theme, ThemeName } from '../types';

type ThemeCollection = {
  [key in ThemeName]: {
    light: Theme;
    dark: Theme;
  };
};

export const themes: ThemeCollection = {
  trustCare: {
    light: {
      background: '#6acae8',
      foreground: '#0F172A', // slate-900
      card: '#FFFFFF', // white
      cardForeground: '#0F172A', // slate-900
      primary: '#2563EB', // blue-600
      primaryForeground: '#FFFFFF', // white
      secondary: '#F1F5F9', // slate-100
      secondaryForeground: '#0F172A', // slate-900
      accent: '#F59E0B', // amber-500
      accentForeground: '#FFFFFF', // white
      border: '#E2E8F0', // slate-200
      muted: '#F1F5F9', // slate-100
      mutedForeground: '#64748B', // slate-500
    },
    dark: {
      background: '#020617', // slate-950
      foreground: '#F8FAFC', // slate-50
      card: '#0F172A', // slate-900
      cardForeground: '#F8FAFC', // slate-50
      primary: '#3B82F6', // blue-500
      primaryForeground: '#FFFFFF', // white
      secondary: '#1E293B', // slate-800
      secondaryForeground: '#F8FAFC', // slate-50
      accent: '#FCD34D', // amber-300
      accentForeground: '#1E293B', // slate-800
      border: '#1E293B', // slate-800
      muted: '#1E293B', // slate-800
      mutedForeground: '#94A3B8', // slate-400
    },
  },
  playfulSocial: {
    light: {
      background: '#6ae885',
      foreground: '#1A202C', // gray-800
      card: '#FFFFFF', // white
      cardForeground: '#1A202C', // gray-800
      primary: '#F97316', // orange-500
      primaryForeground: '#FFFFFF', // white
      secondary: '#ECFDF5', // green-50
      secondaryForeground: '#047857', // green-700
      accent: '#22D3EE', // cyan-400
      accentForeground: '#164E63', // cyan-900
      border: '#E2E8F0', // slate-200
      muted: '#F0F9FF', // sky-50
      mutedForeground: '#475569', // slate-600
    },
    dark: {
      background: '#111827', // gray-900
      foreground: '#F9FAFB', // gray-50
      card: '#1F2937', // gray-800
      cardForeground: '#F9FAFB', // gray-50
      primary: '#FB923C', // orange-400
      primaryForeground: '#111827', // gray-900
      secondary: '#064E3B', // green-900
      secondaryForeground: '#A7F3D0', // green-200
      accent: '#67E8F9', // cyan-300
      accentForeground: '#1F2937', // gray-800
      border: '#374151', // gray-700
      muted: '#374151', // gray-700
      mutedForeground: '#9CA3AF', // gray-400
    },
  },
  naturalCalm: {
    light: {
      background: '#f7e774',
      foreground: '#3D405B', // Dark desaturated blue
      card: '#FFFFFF', // white
      cardForeground: '#3D405B', // Dark desaturated blue
      primary: '#34D399', // emerald-400
      primaryForeground: '#064E3B', // emerald-900
      secondary: '#F0FDF4', // green-50
      secondaryForeground: '#166534', // green-800
      accent: '#F4A261', // A peachy orange
      accentForeground: '#FFFFFF',
      border: '#F3F4F6', // gray-100
      muted: '#F3F4F6', // gray-100
      mutedForeground: '#8D99AE', // A muted blue-gray
    },
    dark: {
      background: '#2B2D42', // Darker desaturated blue
      foreground: '#EDF2F4', // Off-white
      card: '#3D405B', // The light foreground color
      cardForeground: '#EDF2F4', // Off-white
      primary: '#6EE7B7', // emerald-300
      primaryForeground: '#022C22', // Very dark green
      secondary: '#064E3B', // dark green
      secondaryForeground: '#A7F3D0', // light green
      accent: '#E76F51', // A darker coral
      accentForeground: '#FFFFFF', // white
      border: '#4A4E69',
      muted: '#4A4E69',
      mutedForeground: '#8D99AE', // Muted blue-gray
    },
  },
};
