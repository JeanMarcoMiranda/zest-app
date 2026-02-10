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

/**
 * Configuraciones de spring para animaciones con física.
 * Compatible con React Native Reanimated.
 *
 * Uso: withSpring(value, spring.bouncy)
 */
export const spring = {
  /** Spring suave y natural */
  gentle: {
    damping: 20,
    stiffness: 90,
    mass: 1,
  },
  /** Spring con rebote (para elementos interactivos) */
  bouncy: {
    damping: 10,
    stiffness: 100,
    mass: 1,
  },
  /** Spring rígido (para transiciones rápidas) */
  stiff: {
    damping: 15,
    stiffness: 200,
    mass: 1,
  },
} as const;

/**
 * Curvas de animación cubic-bezier personalizadas.
 * Valores como arrays [x1, y1, x2, y2] para CSS o bibliotecas de animación.
 *
 * Basadas en Material Design motion guidelines.
 */
export const customEasing = {
  /** Curva suave estándar - Uso general */
  smooth: [0.4, 0.0, 0.2, 1] as const,
  /** Curva enfatizada - Para elementos importantes */
  emphasized: [0.0, 0.0, 0.2, 1] as const,
  /** Curva desacelerada - Para elementos que aparecen */
  decelerated: [0.0, 0.0, 0.2, 1] as const,
  /** Curva acelerada - Para elementos que desaparecen */
  accelerated: [0.4, 0.0, 1, 1] as const,
} as const;

/**
 * Tipos TypeScript para animaciones
 */
export type Duration = typeof duration;
export type Easing = typeof easing;
export type Animations = typeof animations;
export type Gestures = typeof gestures;
export type Spring = typeof spring;
export type CustomEasing = typeof customEasing;

// Helper types para keys
export type DurationKey = keyof typeof duration;
export type EasingKey = keyof typeof easing;
export type AnimationKey = keyof typeof animations;
export type SpringKey = keyof typeof spring;
