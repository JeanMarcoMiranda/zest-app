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
  primary: palette.scarlet,
  primaryLight: palette.scarletLight,
  primaryDark: palette.scarletDark,
  onPrimary: palette.offWhite,

  secondary: palette.warmBeige,
  onSecondary: palette.charcoal,

  accent: palette.brown,
  onAccent: palette.offWhite,

  background: palette.offWhite,
  surface: palette.cream,
  surfaceVariant: palette.lightGray,
  card: palette.cream,

  text: palette.charcoal,
  textSecondary: palette.gray,
  textLight: palette.gray,
  textInverse: palette.offWhite,

  border: palette.lightGray,
  divider: palette.lightGray,

  placeholder: palette.gray,
  disabled: palette.warmBeigeDark,

  success: palette.green,
  warning: palette.orange,
  error: palette.red,
  info: palette.blue,
};
/**
 * Colores semánticos para el Modo Oscuro (Dark Mode)
 */
export const darkColors = {
  primary: palette.softRed,
  primaryLight: palette.softRedLight,
  primaryDark: palette.softRedDark,
  onPrimary: palette.blackChocolate,

  secondary: palette.mutedBeige,
  onSecondary: palette.blackChocolate,

  accent: palette.warmBeigeLight,
  onAccent: palette.blackChocolate,

  background: palette.blackChocolate,
  surface: palette.darkBrown,
  surfaceVariant: palette.mediumBrown,
  card: palette.darkBrown,

  text: palette.grayLight,
  textSecondary: palette.mutedBeigeLight,
  textLight: palette.mutedBeigeDark,
  textInverse: palette.charcoal,

  border: palette.mediumBrown,
  divider: palette.mediumBrown,

  placeholder: palette.mutedBeigeDark,
  disabled: palette.mediumBrown,

  success: palette.greenLight,
  warning: palette.orangeLight,
  error: palette.redLight,
  info: palette.blueLight,
};

export type ColorPalette = typeof lightColors;
