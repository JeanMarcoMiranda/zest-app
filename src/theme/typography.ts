/**
 * Definiciones de tipografía de la aplicación.
 */
export const typography = {
  /**
   * Familias de fuentes.
   * Actualmente usa la fuente del sistema, pero preparado para fuentes custom.
   */
  fontFamily: {
    main: "System",
    code: "System", // O 'Courier New' si se desea
  },

  /**
   * Tamaños de fuente escalados.
   */
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
  },

  /**
   * Alturas de línea para legibilidad.
   */
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;
