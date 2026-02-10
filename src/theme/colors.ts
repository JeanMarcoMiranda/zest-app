/**
 * Sistema de Diseño: "Rústico Hogareño"
 * Paleta de colores base inspirada en libros de cocina clásicos y ambientes orgánicos.
 */

const palette = {
  // Primarios - Terracota/Ámbar (colores cálidos de cocina)
  terracotta: "#92400E",
  terracottaLight: "#B45309",
  terracottaDark: "#78350F",
  amber: "#D97706",
  amberLight: "#F59E0B",
  amberDark: "#B45309",

  // Secundarios - Bosque/Esmeralda (frescura natural)
  forest: "#064E3B",
  forestLight: "#065F46",
  forestDark: "#064E3B",
  emerald: "#059669",
  emeraldLight: "#10B981",
  emeraldDark: "#047857",

  // Neutros Modo Claro - Crema/Café
  cream: "#FDFCF0",
  white: "#FFFFFF",
  bone: "#F5F5F4",
  stone: "#E7E5E4",
  coffee: "#451A03",
  bronze: "#78350F",

  // Neutros Modo Oscuro - Piedra/Gris Cálido
  charcoal: "#1C1917",
  warmGray: "#292524",
  warmGrayLight: "#44403C",
  warmGrayMedium: "#57534E",
  clay: "#44403C",
  ash: "#A8A29E",

  // Semánticos
  successLight: "#10B981",
  successDark: "#34D399",
  warningLight: "#F59E0B",
  warningDark: "#FBBF24",
  errorLight: "#EF4444",
  errorDark: "#F87171",
  infoLight: "#3B82F6",
  infoDark: "#60A5FA",
} as const;

/**
 * Colores semánticos para el Modo Claro (Light Mode)
 *
 * Temática: Cálida, acogedora, legible como un libro de recetas antiguo
 *
 * Accesibilidad: Los pares text/background cumplen con WCAG AA (4.5:1)
 * para garantizar legibilidad óptima en todos los dispositivos.
 */
export const lightColors = {
  // Primario - Terracota para acciones y énfasis
  primary: palette.terracotta,
  primaryLight: palette.terracottaLight,
  primaryDark: palette.terracottaDark,
  onPrimary: palette.cream,

  // Secundario - Bosque para etiquetas "saludable" y aciertos
  secondary: palette.forest,
  secondaryLight: palette.forestLight,
  secondaryDark: palette.forestDark,
  onSecondary: palette.white,

  // Fondos
  background: palette.cream,
  surface: palette.white,
  surfaceVariant: palette.bone,
  card: palette.white,

  // Textos
  text: palette.coffee, // Alto contraste
  textHigh: palette.coffee,
  textMed: palette.bronze, // Descripciones
  textSecondary: palette.bronze,
  textLight: palette.stone,
  textInverse: palette.cream,

  // Bordes y divisores
  border: palette.stone,
  divider: palette.stone,

  // Estados
  placeholder: palette.bronze,
  disabled: palette.stone,
  overlay: "rgba(69, 26, 3, 0.1)", // coffee con transparencia

  // Semánticos
  success: palette.forest,
  successLight: palette.successLight,
  warning: palette.warningLight,
  error: palette.errorLight,
  info: palette.infoLight,

  // Sombras para tarjetas (modo claro)
  shadow: {
    color: palette.terracotta,
    opacity: 0.05,
    offset: { width: 0, height: 4 },
    radius: 10,
    elevation: 3,
  },
} as const;

/**
 * Colores semánticos para el Modo Oscuro (Dark Mode)
 *
 * Temática: Cálida pero contenida, como una cocina iluminada por velas
 *
 * Nota: En modo oscuro se prefieren bordes sutiles sobre sombras
 * para mantener la legibilidad y reducir la fatiga visual.
 */
export const darkColors = {
  // Primario - Ámbar más brillante para modo oscuro
  primary: palette.amber,
  primaryLight: palette.amberLight,
  primaryDark: palette.amberDark,
  onPrimary: palette.charcoal,

  // Secundario - Esmeralda
  secondary: palette.emerald,
  secondaryLight: palette.emeraldLight,
  secondaryDark: palette.emeraldDark,
  onSecondary: palette.charcoal,

  // Fondos
  background: palette.charcoal,
  surface: palette.warmGray,
  surfaceVariant: palette.warmGrayLight,
  card: palette.warmGray,

  // Textos
  text: palette.bone, // Alto contraste
  textHigh: palette.bone,
  textMed: palette.ash, // Descripciones
  textSecondary: palette.ash,
  textLight: palette.warmGrayMedium,
  textInverse: palette.coffee,

  // Bordes y divisores
  border: palette.clay,
  divider: palette.clay,

  // Estados
  placeholder: palette.ash,
  disabled: palette.warmGrayLight,
  overlay: "rgba(245, 245, 244, 0.1)", // bone con transparencia

  // Semánticos
  success: palette.emerald,
  successLight: palette.successDark,
  warning: palette.warningDark,
  error: palette.errorDark,
  info: palette.infoDark,

  // Sin sombras en modo oscuro, usamos bordes
  shadow: {
    color: "transparent",
    opacity: 0,
    offset: { width: 0, height: 0 },
    radius: 0,
    elevation: 0,
  },
} as const;

/**
 * Gradientes predefinidos para uso en componentes.
 * Cada gradiente es un array de colores [inicio, fin].
 *
 * Uso con LinearGradient:
 * <LinearGradient colors={gradients.primary} ... />
 */
export const gradients = {
  /** Gradiente primario - Terracota */
  primary: [palette.terracotta, palette.terracottaLight],
  /** Gradiente primario oscuro - Ámbar (dark mode) */
  primaryDark: [palette.amber, palette.amberLight],
  /** Gradiente secundario - Bosque */
  secondary: [palette.forest, palette.forestLight],
  /** Gradiente secundario oscuro - Esmeralda (dark mode) */
  secondaryDark: [palette.emerald, palette.emeraldLight],
  /** Gradiente cálido - Ámbar */
  warm: [palette.amberLight, palette.amber],
  /** Overlay oscuro - Para modales y overlays */
  overlay: ["rgba(0,0,0,0)", "rgba(0,0,0,0.6)"],
  /** Overlay claro - Para modales en dark mode */
  overlayLight: ["rgba(255,255,255,0)", "rgba(255,255,255,0.8)"],
} as const;

/**
 * Niveles de opacidad estándar.
 * Útil para aplicar transparencia consistente a colores.
 */
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
