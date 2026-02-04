import { colors as baseColors } from "./colors";
import { spacing } from "./spacing";
import { typography } from "./typography";

// Re-exportar spacing y typography tal cual
export { spacing, typography };

// Extender colors con propiedades simplificadas para acceso directo
export const colors = {
  // Mantener acceso a paletas completas
  primaryPalette: baseColors.primary,
  secondaryPalette: baseColors.secondary,
  neutralPalette: baseColors.neutral,

  // Colores principales como strings directos (valores por defecto)
  primary: baseColors.primary[500],
  primaryLight: baseColors.primary[100],
  primaryDark: baseColors.primary[700],

  secondary: baseColors.secondary[500],
  secondaryLight: baseColors.secondary[50],
  secondaryDark: baseColors.secondary[700],

  // Colores de texto simplificados
  text: baseColors.neutral[900],
  textSecondary: baseColors.neutral[600],
  textLight: baseColors.neutral[400],
  textInverse: "#FFFFFF",

  // Colores de superficie
  background: baseColors.background.light,
  backgroundDark: baseColors.background.dark,
  surface: "#FFFFFF",
  divider: baseColors.neutral[200],
  border: baseColors.neutral[300],

  // Colores semánticos
  success: baseColors.success,
  warning: baseColors.warning,
  error: baseColors.error,
  info: baseColors.info,

  // Mantener acceso a escala de grises
  gray50: baseColors.neutral[50],
  gray100: baseColors.neutral[100],
  gray200: baseColors.neutral[200],
  gray300: baseColors.neutral[300],
  gray400: baseColors.neutral[400],
  gray500: baseColors.neutral[500],
  gray600: baseColors.neutral[600],
  gray700: baseColors.neutral[700],
  gray800: baseColors.neutral[800],
  gray900: baseColors.neutral[900],
};

export const theme = {
  colors,
  spacing,
  typography,
};

export type Theme = typeof theme;
