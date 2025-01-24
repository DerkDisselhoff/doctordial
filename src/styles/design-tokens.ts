export const colors = {
  // Primary Colors
  primary: {
    DEFAULT: '#0077CC', // Primary Blue
    dark: '#005FA8',    // Darker Blue for hover
    light: '#E5F4FF',   // Light Blue for backgrounds
  },
  healthcare: {
    DEFAULT: '#28A745', // Healthcare Green
    dark: '#1E7D34',    // Darker Green for hover
    light: '#3BC85E',   // Light Green for accents
  },
  // Text Colors
  text: {
    primary: '#333333',   // Dark Gray for primary text
    secondary: '#666666', // Medium Gray for secondary text
    light: '#FFFFFF',     // White text
    muted: '#999999',     // Muted text
  },
  // Surface Colors
  surface: {
    DEFAULT: '#FFFFFF',   // White background
    secondary: '#F8F9FA', // Light Gray background
    tertiary: '#F1F3F5',  // Darker Gray background
  },
  // Border Colors
  border: {
    DEFAULT: '#E5E7EB',   // Default border color
    light: '#F3F4F6',     // Light border
    dark: '#D1D5DB',      // Dark border
  },
  // Status Colors
  status: {
    success: '#28A745',
    error: '#DC3545',
    warning: '#FFC107',
    info: '#17A2B8',
  },
} as const;

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
  6: '1.5rem',
  7: '1.75rem',
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

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
} as const;

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

export const transitions = {
  DEFAULT: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  fast: '100ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

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
      text: colors.text.light,
      hoverBg: colors.primary.dark,
      focusRing: colors.primary.light,
    },
    secondary: {
      bg: 'transparent',
      text: colors.primary.DEFAULT,
      border: colors.primary.DEFAULT,
      hoverBg: colors.primary.light,
    },
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
    shadow: shadows.DEFAULT,
  },
} as const;