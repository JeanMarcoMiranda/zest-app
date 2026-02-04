/**
 * Definición de la paleta de colores base.
 * Aquí definimos los colores primitivos con nombres descriptivos.
 */
const palette = {
  // Rojos / Primarios
  scarlet: "#A5243D",
  scarletLight: "#C73854",
  scarletDark: "#8A1F33",
  softRed: "#E57373", // Dark Mode Primary
  softRedLight: "#EF9A9A",
  softRedDark: "#D32F2F",

  // Beiges / Secundarios
  warmBeige: "#D9B08C",
  warmBeigeLight: "#E5C5A3",
  warmBeigeDark: "#C99B75",
  mutedBeige: "#BCAAA4", // Dark Mode Secondary
  mutedBeigeLight: "#D7CCC8",
  mutedBeigeDark: "#A1887F",

  // Marrones / Acentos
  brown: "#5C4033",
  brownLight: "#7A5645",
  brownDark: "#4A3329",

  // Neutros / Fondos
  offWhite: "#FFFBF2",
  cream: "#F2E8DF",
  lightGray: "#E8DED5",

  // Oscuros
  blackChocolate: "#1A1614",
  darkBrown: "#2C2522",
  mediumBrown: "#3E3632",

  // Textos
  charcoal: "#2D2926",
  gray: "#8A7A72",
  white: "#FFFFFF",
  grayLight: "#ECEFF1",

  // Semánticos
  green: "#4CAF50",
  orange: "#FF9800",
  red: "#D32F2F",
  blue: "#2196F3",

  greenLight: "#66BB6A",
  orangeLight: "#FFA726",
  redLight: "#EF5350",
  blueLight: "#42A5F5",
};

/**
 * Colores semánticos para el Modo Claro (Light Mode)
 */
export const lightColors = {
  // Brand
  primary: palette.scarlet,
  primaryLight: palette.scarletLight,
  primaryDark: palette.scarletDark,

  secondary: palette.warmBeige,
  secondaryLight: palette.warmBeigeLight,
  secondaryDark: palette.warmBeigeDark,

  accent: palette.brown,
  accentLight: palette.brownLight,
  accentDark: palette.brownDark,

  // Backgrounds
  background: palette.offWhite,
  surface: palette.cream,
  surfaceVariant: palette.lightGray,

  // Text
  text: palette.charcoal,
  textSecondary: palette.brown,
  textLight: palette.gray,
  textInverse: palette.white,

  // UI Elements
  border: palette.warmBeige,
  divider: palette.lightGray,

  // Feedback
  success: palette.green,
  warning: palette.orange,
  error: palette.red,
  info: palette.blue,
};

/**
 * Colores semánticos para el Modo Oscuro (Dark Mode)
 */
export const darkColors = {
  // Brand
  primary: palette.softRed,
  primaryLight: palette.softRedLight,
  primaryDark: palette.softRedDark,

  secondary: palette.mutedBeige,
  secondaryLight: palette.mutedBeigeLight,
  secondaryDark: palette.mutedBeigeDark,

  accent: palette.mutedBeige,
  accentLight: palette.grayLight,
  accentDark: palette.mutedBeigeDark,

  // Backgrounds
  background: palette.blackChocolate,
  surface: palette.darkBrown,
  surfaceVariant: palette.mediumBrown,

  // Text
  text: palette.grayLight,
  textSecondary: palette.mutedBeige,
  textLight: palette.mutedBeigeDark,
  textInverse: palette.charcoal,

  // UI Elements
  border: palette.mediumBrown,
  divider: palette.darkBrown,

  // Feedback
  success: palette.greenLight,
  warning: palette.orangeLight,
  error: palette.redLight,
  info: palette.blueLight,
};

export type ColorPalette = typeof lightColors;
