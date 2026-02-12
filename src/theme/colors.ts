const palette = {
  // Brand Colors - Warm Savory
  terracotta: "#BC5230",
  terracottaLight: "#D47A5D",
  terracottaDark: "#8E3E24",

  sage: "#6B7D5F",
  sageLight: "#8D9D81",
  sageDark: "#4C5A43",

  // Neutrals - Light Mode (Warm)
  white: "#FFFFFF",
  parchment: "#FCF8F2",
  bone: "#F2ECE4",
  warmGray: "#D1C7BD",
  mocha: "#6D6158",
  darkRoast: "#2A241F",

  // Neutrals - Dark Mode (Deep Coffee)
  espresso: "#1E1B18",
  deepMocha: "#2A2622",
  toasted: "#3D362F",

  // Semantic
  success: "#4C7D48",
  warning: "#D49D42",
  error: "#A63D31",
  info: "#5B7C8C",
} as const;

export const lightColors = {
  primary: palette.terracotta,
  primaryLight: palette.terracottaLight,
  primaryDark: palette.terracottaDark,
  onPrimary: palette.white,

  secondary: palette.sage,
  secondaryLight: palette.sageLight,
  secondaryDark: palette.sageDark,
  onSecondary: palette.white,

  background: palette.parchment,
  surface: palette.white,
  surfaceVariant: palette.bone,
  card: palette.white,

  text: palette.darkRoast,
  textHigh: palette.darkRoast,
  textMed: palette.mocha,
  textSecondary: palette.mocha,
  textLight: palette.warmGray,
  textInverse: palette.white,

  border: "rgba(42, 36, 31, 0.08)",
  divider: "rgba(42, 36, 31, 0.05)",

  placeholder: palette.warmGray,
  disabled: palette.bone,
  overlay: "rgba(42, 36, 31, 0.4)",

  success: palette.success,
  successLight: palette.success + "20",
  warning: palette.warning,
  error: palette.error,
  info: palette.info,

  shadow: {
    color: palette.darkRoast,
    opacity: 0.06,
    offset: { width: 0, height: 4 },
    radius: 12,
    elevation: 4,
  },
} as const;

export const darkColors = {
  primary: palette.terracottaLight,
  primaryLight: palette.terracotta,
  primaryDark: palette.terracottaDark,
  onPrimary: palette.darkRoast,

  secondary: palette.sageLight,
  secondaryLight: palette.sage,
  secondaryDark: palette.sageDark,
  onSecondary: palette.darkRoast,

  background: palette.espresso,
  surface: palette.deepMocha,
  surfaceVariant: palette.toasted,
  card: palette.deepMocha,

  text: palette.parchment,
  textHigh: palette.parchment,
  textMed: palette.warmGray,
  textSecondary: palette.warmGray,
  textLight: palette.mocha,
  textInverse: palette.darkRoast,

  border: "rgba(252, 248, 242, 0.12)",
  divider: "rgba(252, 248, 242, 0.08)",

  placeholder: palette.mocha,
  disabled: palette.espresso,
  overlay: "rgba(0, 0, 0, 0.7)",

  success: palette.success,
  successLight: palette.success + "30",
  warning: palette.warning,
  error: palette.error,
  info: palette.info,

  shadow: {
    color: "transparent",
    opacity: 0,
    offset: { width: 0, height: 0 },
    radius: 0,
    elevation: 0,
  },
} as const;

export const gradients = {
  primary: [palette.terracotta, palette.terracottaLight],
  primaryDark: [palette.terracottaDark, palette.terracotta],
  secondary: [palette.sage, palette.sageLight],
  secondaryDark: [palette.sageDark, palette.sage],
  warm: [palette.terracotta, "#D49D42"],
  overlay: ["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"],
  overlayLight: ["rgba(255,255,255,0)", "rgba(255,255,255,0.8)"],
} as const;

export const opacity = {
  transparent: 0,
  low: 0.1,
  medium: 0.5,
  high: 0.7,
  opaque: 1,
} as const;

export type Palette = typeof palette;
export type ColorPalette = typeof lightColors;
export type Gradients = typeof gradients;
export type Opacity = typeof opacity;
