const palette = {
  // Brand Colors
  zestOrange: "#FF6B00",
  zestOrangeLight: "#FF8E3C",
  zestOrangeDark: "#CC5600",

  forestGreen: "#2D5A27",
  forestGreenLight: "#4A8A3F",
  forestGreenDark: "#1E3D1A",

  // Neutrals - Light Mode
  white: "#FFFFFF",
  softWhite: "#FAFAFA",
  cream: "#FDFCF8",
  lightGray: "#F2F2F2",
  gray: "#8E8E93",
  darkGray: "#3A3A3C",
  black: "#1C1C1E",

  // Neutrals - Dark Mode
  darkSurface: "#1C1C1E",
  darkCard: "#2C2C2E",
  darkBorder: "#3A3A3C",

  // Semantic
  success: "#34C759",
  warning: "#FFCC00",
  error: "#FF3B30",
  info: "#007AFF",
} as const;

export const lightColors = {
  primary: palette.zestOrange,
  primaryLight: palette.zestOrangeLight,
  primaryDark: palette.zestOrangeDark,
  onPrimary: palette.white,

  secondary: palette.forestGreen,
  secondaryLight: palette.forestGreenLight,
  secondaryDark: palette.forestGreenDark,
  onSecondary: palette.white,

  background: palette.softWhite,
  surface: palette.white,
  surfaceVariant: palette.cream,
  card: palette.white,

  text: palette.black,
  textHigh: palette.black,
  textMed: palette.darkGray,
  textSecondary: palette.darkGray,
  textLight: palette.gray,
  textInverse: palette.white,

  border: "rgba(0, 0, 0, 0.08)",
  divider: "rgba(0, 0, 0, 0.05)",

  placeholder: palette.gray,
  disabled: palette.lightGray,
  overlay: "rgba(0, 0, 0, 0.4)",

  success: palette.success,
  successLight: palette.success + "20",
  warning: palette.warning,
  error: palette.error,
  info: palette.info,

  shadow: {
    color: palette.black,
    opacity: 0.08,
    offset: { width: 0, height: 4 },
    radius: 12,
    elevation: 4,
  },
} as const;

export const darkColors = {
  primary: palette.zestOrange,
  primaryLight: palette.zestOrangeLight,
  primaryDark: palette.zestOrangeDark,
  onPrimary: palette.white,

  secondary: palette.forestGreenLight,
  secondaryLight: palette.forestGreen,
  secondaryDark: palette.forestGreenDark,
  onSecondary: palette.white,

  background: palette.darkSurface,
  surface: palette.darkCard,
  surfaceVariant: palette.darkBorder,
  card: palette.darkCard,

  text: palette.softWhite,
  textHigh: palette.softWhite,
  textMed: palette.gray,
  textSecondary: palette.gray,
  textLight: palette.darkGray,
  textInverse: palette.black,

  border: "rgba(255, 255, 255, 0.12)",
  divider: "rgba(255, 255, 255, 0.08)",

  placeholder: palette.gray,
  disabled: palette.black,
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
  primary: [palette.zestOrange, palette.zestOrangeLight],
  primaryDark: [palette.zestOrangeDark, palette.zestOrange],
  secondary: [palette.forestGreen, palette.forestGreenLight],
  secondaryDark: [palette.forestGreenDark, palette.forestGreen],
  warm: [palette.zestOrange, "#FFB800"],
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
