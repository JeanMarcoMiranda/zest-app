/**
 * Sistema de Diseño: "Rústico Hogareño"
 * Sistema de espaciado basado en múltiplos de 8px.
 *
 * Proporciona consistencia y ritmo visual en toda la aplicación.
 * Todos los valores son múltiplos de 4px para mantener alineación perfecta
 * en grillas y layouts responsivos.
 */
export const spacing = {
  /** 4px - Espaciado mínimo (gap interno de elementos) */
  xs: 4,
  /** 8px - Espaciado pequeño (padding de chips, gap entre iconos) */
  sm: 8,
  /** 16px - Espaciado base estándar (padding de botones, gap entre elementos) */
  md: 16,
  /** 24px - Espaciado grande (márgenes laterales de pantalla, padding de cards) */
  lg: 24,
  /** 32px - Espaciado extra grande (separación entre secciones) */
  xl: 32,
  /** 48px - Para secciones principales */
  xxl: 48,
  /** 64px - Para separaciones masivas (headers de pantalla) */
  xxxl: 64,
} as const;

/**
 * Márgenes específicos de pantalla
 */
export const screenMargins = {
  /** Margen horizontal estándar de todas las pantallas */
  horizontal: spacing.lg, // 24px
  /** Margen vertical superior de pantallas */
  top: spacing.xl, // 32px
  /** Margen vertical inferior de pantallas */
  bottom: spacing.lg, // 24px
} as const;

/**
 * Radios de curvatura (Border Radius)
 *
 * Valores generosos para mantener la estética cálida y orgánica.
 * Los bordes redondeados evocan la calidez artesanal del diseño.
 */
export const borderRadius = {
  /** 8px - Elementos muy pequeños */
  xs: 8,
  /** 12px - Chips, tags pequeños */
  sm: 12,
  /** 16px - Botones, inputs */
  md: 16,
  /** 24px - Tarjetas estándar */
  lg: 24,
  /** 32px - Tarjetas grandes, contenedores destacados */
  xl: 32,
  /** 999px - Elementos completamente redondeados (pills, botones circulares) */
  full: 999,
} as const;

/**
 * Tamaños de íconos estándar
 */
export const iconSizes = {
  /** 16px - Íconos muy pequeños (inline con texto) */
  xs: 16,
  /** 20px - Íconos pequeños (botones secundarios) */
  sm: 20,
  /** 24px - Íconos base (botones principales, tabs) */
  md: 24,
  /** 32px - Íconos grandes (headers, acciones destacadas) */
  lg: 32,
  /** 48px - Íconos extra grandes (estados vacíos, onboarding) */
  xl: 48,
} as const;

/**
 * Configuración de grosor de trazo para iconografía
 * Mantiene el estilo artesanal del diseño
 */
export const iconStroke = {
  /** Grosor estándar para iconos (recomendado) */
  default: 2,
  /** Grosor fino para detalles delicados */
  thin: 1.5,
  /** Grosor grueso para énfasis */
  bold: 2.5,
} as const;
