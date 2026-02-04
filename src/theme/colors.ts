// Paleta de colores para modo claro y oscuro
export const lightColors = {
  // Primary - Scarlet
  primary: "#A5243D",
  primaryLight: "#C73854",
  primaryDark: "#8A1F33",

  // Secondary - Warm Beige
  secondary: "#D9B08C",
  secondaryLight: "#E5C5A3",
  secondaryDark: "#C99B75",

  // Accent - Brown
  accent: "#5C4033",
  accentLight: "#7A5645",
  accentDark: "#4A3329",

  // Background & Surface
  background: "#FFFBF2",
  surface: "#F2E8DF",
  surfaceVariant: "#E8DED5",

  // Text
  text: "#2D2926",
  textSecondary: "#5C4033",
  textLight: "#8A7A72",
  textInverse: "#FFFFFF",

  // Borders & Dividers
  border: "#D9B08C",
  divider: "#E8DED5",

  // Semantic colors
  success: "#4CAF50",
  warning: "#FF9800",
  error: "#D32F2F",
  info: "#2196F3",
};

export const darkColors = {
  // Primary - Soft Red
  primary: "#E57373",
  primaryLight: "#EF9A9A",
  primaryDark: "#D32F2F",

  // Secondary - Muted Beige
  secondary: "#BCAAA4",
  secondaryLight: "#D7CCC8",
  secondaryDark: "#A1887F",

  // Accent - Light Contrast
  accent: "#D7CCC8",
  accentLight: "#EFEBE9",
  accentDark: "#BCAAA4",

  // Background & Surface
  background: "#1A1614",
  surface: "#2C2522",
  surfaceVariant: "#3E3632",

  // Text
  text: "#ECEFF1",
  textSecondary: "#D7CCC8",
  textLight: "#BCAAA4",
  textInverse: "#2D2926",

  // Borders & Dividers
  border: "#3E3632",
  divider: "#2C2522",

  // Semantic colors
  success: "#66BB6A",
  warning: "#FFA726",
  error: "#EF5350",
  info: "#42A5F5",
};

export type ColorPalette = typeof lightColors;

// Export para compatibilidad con código existente
export const colors = {
  primary: lightColors,
  secondary: lightColors,
  neutral: {
    50: lightColors.background,
    100: lightColors.surface,
    200: lightColors.surfaceVariant,
    300: lightColors.border,
    400: lightColors.textLight,
    500: lightColors.textSecondary,
    600: lightColors.textSecondary,
    700: lightColors.text,
    800: lightColors.text,
    900: lightColors.text,
  },
  success: lightColors.success,
  warning: lightColors.warning,
  error: lightColors.error,
  info: lightColors.info,
  background: {
    light: lightColors.background,
    dark: darkColors.background,
  },
};
