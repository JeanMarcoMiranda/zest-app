/**
 * Sistema de Diseño: "Rústico Hogareño"
 * Configuración de animaciones y transiciones.
 *
 * Principio: Movimientos suaves y orgánicos que evocan calidez
 * y naturalidad, evitando transiciones abruptas.
 */

/**
 * Duraciones de animación estándar
 *
 * Guía de uso:
 * - instant: Feedback táctil inmediato
 * - fast: Micro-interacciones y tooltips
 * - normal: Transiciones de UI estándar (recomendado)
 * - slow: Navegación y cambios de contexto
 * - slower: Animaciones complejas con múltiples elementos
 */
export const duration = {
  /** 100ms - Feedback inmediato (hover, press) */
  instant: 100,
  /** 200ms - Transiciones rápidas (tooltips, micro-interacciones) */
  fast: 200,
  /** 300ms - Transiciones estándar (modales, sheets) */
  normal: 300,
  /** 400ms - Transiciones suaves (navegación entre pantallas) */
  slow: 400,
  /** 600ms - Animaciones complejas (shared elements) */
  slower: 600,
} as const;

/**
 * Curvas de animación (easing)
 *
 * Principio: Usar easeOut para elementos que aparecen (más natural),
 * easeIn para elementos que desaparecen, y easeInOut para transiciones.
 */
export const easing = {
  /** Entrada y salida suave - uso general */
  easeInOut: "ease-in-out",
  /** Entrada rápida, salida suave - para elementos que aparecen */
  easeOut: "ease-out",
  /** Entrada suave, salida rápida - para elementos que desaparecen */
  easeIn: "ease-in",
  /** Lineal - para progreso y loaders */
  linear: "linear",
} as const;

/**
 * Configuraciones de animación predefinidas para React Native Animated
 */
export const animations = {
  /** Animación de press en botones - reduce escala a 0.96 */
  buttonPress: {
    scale: 0.96,
    duration: duration.instant,
  },

  /** Fade in suave para elementos que aparecen */
  fadeIn: {
    from: 0,
    to: 1,
    duration: duration.normal,
  },

  /** Fade out suave para elementos que desaparecen */
  fadeOut: {
    from: 1,
    to: 0,
    duration: duration.fast,
  },

  /** Slide up para sheets y modales */
  slideUp: {
    from: 100, // porcentaje
    to: 0,
    duration: duration.normal,
  },

  /** Scale in para elementos destacados */
  scaleIn: {
    from: 0.8,
    to: 1,
    duration: duration.normal,
  },
} as const;

/**
 * Configuraciones para Gestures y respuesta táctil
 */
export const gestures = {
  /** Opacidad al presionar (activeOpacity) */
  pressOpacity: 0.7,

  /** Umbral mínimo de desplazamiento para reconocer un swipe (px) */
  swipeThreshold: 50,

  /** Velocidad mínima para reconocer un swipe (px/s) */
  swipeVelocity: 300,
} as const;

export type Animations = typeof animations;
