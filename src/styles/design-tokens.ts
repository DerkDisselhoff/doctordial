// Color System
export const colors = {
  // Primary Colors
  primary: {
    DEFAULT: '#4A90E2', // Professional blue
    dark: '#357ABD',    // Darker blue for hover
    light: '#EBF3FC',   // Light blue for backgrounds
  },
  // Text Colors
  text: {
    primary: '#2D3748',   // Dark gray for main text
    secondary: '#4A5568', // Medium gray for secondary text
    muted: '#718096',     // Light gray for muted text
  },
  // Surface Colors
  surface: {
    DEFAULT: '#FFFFFF',   // Pure white
    secondary: '#F7FAFC', // Very light gray
    tertiary: '#EDF2F7',  // Light gray background
    input: '#E2E8F0',     // Input borders
  },
  // Accent Colors
  accent: {
    mint: {
      DEFAULT: '#4FD1C5', // Mint green
      light: '#E6FFFA',   // Light mint
      dark: '#38B2AC',    // Dark mint
    }
  },
  // Status Colors
  status: {
    success: '#48BB78',
    error: '#F56565',
    warning: '#ED8936',
    info: '#4299E1',
  },
  // Healthcare-specific Colors
  healthcare: {
    mint: {
      DEFAULT: '#4FD1C5',
      light: '#E6FFFA',
      dark: '#38B2AC',
    },
    forest: {
      DEFAULT: '#2C5282',
      light: '#2B6CB0',
      dark: '#2A4365',
    },
  },
  // Divider and Border Colors
  border: {
    DEFAULT: '#E2E8F0',
    light: '#EDF2F7',
    dark: '#CBD5E0',
  },
} as const;

// Typography System
export const typography = {
  fonts: {
    sans: 'Inter, system-ui, -apple-system, sans-serif',
    display: 'Inter, system-ui, -apple-system, sans-serif',
  },
  sizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
  },
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeights: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
} as const;

// Spacing System
export const spacing = {
  0: '0',
  px: '1px',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
} as const;

// Border Radius System
export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
} as const;

// Shadow System
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
} as const;

// Z-Index System
export const zIndex = {
  0: '0',
  10: '10',
  20: '20',
  30: '30',
  40: '40',
  50: '50',
  auto: 'auto',
  dropdown: '1000',
  sticky: '1020',
  fixed: '1030',
  modal: '1040',
  popover: '1050',
  tooltip: '1060',
} as const;

// Component-specific tokens
export const components = {
  button: {
    primary: {
      bg: colors.primary.DEFAULT,
      text: colors.surface.DEFAULT,
      hoverBg: colors.primary.dark,
      focusRing: colors.primary.light,
    },
    secondary: {
      bg: 'transparent',
      text: colors.primary.DEFAULT,
      border: colors.primary.DEFAULT,
      hoverBg: colors.primary.light,
    },
    healthcare: {
      bg: colors.healthcare.mint.DEFAULT,
      text: colors.healthcare.forest.DEFAULT,
      hoverBg: colors.healthcare.mint.light,
      focusRing: colors.healthcare.mint.dark,
    }
  },
  input: {
    bg: colors.surface.DEFAULT,
    border: colors.border.DEFAULT,
    text: colors.text.primary,
    placeholder: colors.text.muted,
    focusBorder: colors.primary.DEFAULT,
    errorBorder: colors.status.error,
  },
  card: {
    bg: colors.surface.DEFAULT,
    border: colors.border.DEFAULT,
    shadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
  },
  nav: {
    bg: colors.surface.DEFAULT,
    border: colors.border.DEFAULT,
    text: colors.text.primary,
    hover: colors.primary.light,
  },
  dashboard: {
    sidebar: {
      bg: colors.surface.secondary,
      text: colors.text.primary,
      hover: colors.primary.light,
      active: colors.primary.DEFAULT,
    },
    content: {
      bg: colors.surface.DEFAULT,
      text: colors.text.primary,
    },
  },
} as const;