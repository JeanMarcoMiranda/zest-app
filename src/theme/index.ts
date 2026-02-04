import { darkColors, lightColors } from "./colors";
import { spacing } from "./spacing";
import { typography } from "./typography";

// Re-exportar spacing y typography tal cual
export { spacing, typography };

// Re-exportar paletas de colores
  export { darkColors, lightColors };

// Colores por defecto (modo claro) para compatibilidad con código existente
export const colors = {
  // Colores principales
  primary: lightColors.primary,
  primaryLight: lightColors.primaryLight,
  primaryDark: lightColors.primaryDark,

  secondary: lightColors.secondary,
  secondaryLight: lightColors.secondaryLight,
  secondaryDark: lightColors.secondaryDark,

  accent: lightColors.accent,
  accentLight: lightColors.accentLight,
  accentDark: lightColors.accentDark,

  // Colores de texto
  text: lightColors.text,
  textSecondary: lightColors.textSecondary,
  textLight: lightColors.textLight,
  textInverse: lightColors.textInverse,

  // Colores de superficie
  background: lightColors.background,
  backgroundDark: darkColors.background,
  surface: lightColors.surface,
  surfaceVariant: lightColors.surfaceVariant,
  divider: lightColors.divider,
  border: lightColors.border,

  // Colores semánticos
  success: lightColors.success,
  warning: lightColors.warning,
  error: lightColors.error,
  info: lightColors.info,

  // Escala de grises (para compatibilidad)
  gray50: lightColors.background,
  gray100: lightColors.surface,
  gray200: lightColors.surfaceVariant,
  gray300: lightColors.border,
  gray400: lightColors.textLight,
  gray500: lightColors.textSecondary,
  gray600: lightColors.textSecondary,
  gray700: lightColors.text,
  gray800: lightColors.text,
  gray900: lightColors.text,
};

export const theme = {
  colors,
  spacing,
  typography,
};

export type Theme = typeof theme;
