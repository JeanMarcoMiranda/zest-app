/**
 * Sistema de Diseño: "Rústico Hogareño"
 * Tipografía y jerarquía de contenido.
 *
 * Headlines: Fuentes serif (Playfair Display) para calidez y tradición
 * Body: Fuentes sans-serif (Lato, Open Sans, Inter) para legibilidad
 */

/**
 * Familias de fuentes.
 * NOTA: Las fuentes custom deben ser cargadas en el proyecto.
 * Fallback al sistema si no están disponibles.
 */
export const fontFamily = {
  /** Fuente serif para títulos y headlines */
  serif: "PlayfairDisplay-Bold", // Fallback: "Georgia" o "System"
  serifRegular: "PlayfairDisplay-Regular",
  serifSemiBold: "PlayfairDisplay-SemiBold",

  /** Fuente sans-serif para cuerpo de texto */
  sans: "Inter-Regular", // Alternativas: "Lato-Regular", "OpenSans-Regular"
  sansMedium: "Inter-Medium",
  sansSemiBold: "Inter-SemiBold",
  sansBold: "Inter-Bold",

  /** Fuente monoespaciada para código o datos técnicos */
  mono: "Courier New",
} as const;

/**
 * Pesos de fuente estándar
 */
export const fontWeight = {
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
} as const;

/**
 * Tamaños de fuente base
 */
export const fontSize = {
  /** 12px - Metadatos, captions */
  xs: 12,
  /** 14px - Descripciones largas, texto secundario */
  sm: 14,
  /** 16px - Cuerpo de texto base, listas */
  base: 16,
  /** 18px - Subsecciones (h3) */
  lg: 18,
  /** 20px - Uso ocasional */
  xl: 20,
  /** 24px - Secciones principales (h2) */
  "2xl": 24,
  /** 28px - Uso ocasional */
  "3xl": 28,
  /** 32px - Títulos de pantalla (h1) */
  "4xl": 32,
  /** 38px - Modo cocina (h1 aumentado 20%) */
  "5xl": 38,
} as const;

/**
 * Alturas de línea para diferentes contextos
 */
export const lineHeight = {
  /** 1.2 - Para títulos grandes (h1, h2) */
  tight: 1.2,
  /** 1.4 - Para títulos pequeños (h3) */
  snug: 1.4,
  /** 1.5 - Para cuerpo de texto estándar */
  normal: 1.5,
  /** 1.7 - Para descripciones largas y lectura prolongada */
  relaxed: 1.7,
} as const;

/**
 * Letter spacing (tracking) para diferentes casos
 */
export const letterSpacing = {
  /** Espaciado negativo para títulos grandes */
  tight: -0.5,
  /** Sin espaciado adicional */
  normal: 0,
  /** Espaciado para metadatos y captions en mayúsculas */
  wide: 0.1, // em
  /** Espaciado muy amplio */
  wider: 0.2, // em
} as const;

/**
 * Jerarquía de tipografía predefinida.
 * Estos son los estilos listos para usar en componentes.
 */
export const typography = {
  /**
   * H1 - Título de pantalla único
   * Uso: Título principal de cada pantalla
   */
  h1: {
    fontFamily: fontFamily.serif,
    fontSize: fontSize["4xl"], // 32px
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight, // 1.2
    letterSpacing: letterSpacing.tight,
  },

  /**
   * H1 Modo Cocina - 20% más grande para lectura a distancia
   */
  h1Cooking: {
    fontFamily: fontFamily.serif,
    fontSize: fontSize["5xl"], // 38px
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },

  /**
   * H2 - Nombres de ítems o secciones principales
   * Uso: Título de recetas, nombres de categorías
   */
  h2: {
    fontFamily: fontFamily.serif,
    fontSize: fontSize["2xl"], // 24px
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight, // 1.2
    letterSpacing: letterSpacing.normal,
  },

  /**
   * H3 - Subsecciones
   * Uso: Subtítulos dentro de recetas, pasos
   */
  h3: {
    fontFamily: fontFamily.serif,
    fontSize: fontSize.lg, // 18px
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug, // 1.4
    letterSpacing: letterSpacing.normal,
  },

  /**
   * Body Large - Ingredientes y listas
   * Uso: Listas de ingredientes, pasos de receta
   */
  bodyLg: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.base, // 16px
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal, // 1.5
    letterSpacing: letterSpacing.normal,
  },

  /**
   * Body Large Modo Cocina - 20% más grande
   * Nota: 16px * 1.2 = 19.2px (exacto para mantener proporciones)
   */
  bodyLgCooking: {
    fontFamily: fontFamily.sans,
    fontSize: 19.2, // 16px * 1.2 (20% más grande que base)
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
  },

  /**
   * Body Small - Descripciones largas
   * Uso: Texto de párrafos, descripciones
   */
  bodySm: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.sm, // 14px
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.relaxed, // 1.7
    letterSpacing: letterSpacing.normal,
  },

  /**
   * Caption - Metadatos
   * Uso: Tiempo de cocción, dificultad, categorías
   * Estilo: ALL-CAPS con tracking amplio
   */
  caption: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.xs, // 12px
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.normal, // 1.5
    letterSpacing: letterSpacing.wide, // 0.1em
    textTransform: "uppercase" as const,
  },

  /**
   * Label - Etiquetas de inputs y botones
   */
  label: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.sm, // 14px
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },

  /**
   * Button - Texto de botones
   */
  button: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.base, // 16px
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
} as const;

/**
 * Configuración de text transform para casos específicos
 */
export const textTransform = {
  uppercase: "uppercase" as const,
  lowercase: "lowercase" as const,
  capitalize: "capitalize" as const,
  none: "none" as const,
} as const;

export type Typography = typeof typography;
