/**
 * Sistema de Diseño: "Rústico Hogareño"
 * Punto de entrada principal del tema.
 *
 * Este archivo exporta todos los tokens de diseño de manera organizada
 * y proporciona el objeto de tema completo para usar en la aplicación.
 */

import { animations, duration, easing, gestures } from "./animations";
import { darkColors, lightColors, type ColorPalette } from "./colors";
import {
  borderRadius,
  iconSizes,
  iconStroke,
  screenMargins,
  spacing,
} from "./spacing";
import {
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  typography,
} from "./typography";

/**
 * Exportaciones individuales de tokens
 */
export {
  // Animaciones
  animations, borderRadius,
  // Colores
  darkColors, duration,
  easing, fontFamily,
  fontSize,
  fontWeight, gestures, iconSizes,
  iconStroke, letterSpacing, lightColors, lineHeight, screenMargins,
  // Espaciado
  spacing,
  // Tipografía
  typography, type ColorPalette
};

/**
 * Tema completo en Modo Claro (Light Mode)
 * Este es el tema por defecto de la aplicación.
 */
export const lightTheme = {
  colors: lightColors,
  spacing,
  screenMargins,
  borderRadius,
  iconSizes,
  iconStroke,
  typography,
  animations,
  duration,
  easing,
  gestures,
  mode: "light" as const,
} as const;

/**
 * Tema completo en Modo Oscuro (Dark Mode)
 */
export const darkTheme = {
  colors: darkColors,
  spacing,
  screenMargins,
  borderRadius,
  iconSizes,
  iconStroke,
  typography,
  animations,
  duration,
  easing,
  gestures,
  mode: "dark" as const,
} as const;

/**
 * Tipo para el objeto de tema completo
 */
export type Theme = typeof lightTheme;

/**
 * Tema por defecto (exportación para compatibilidad)
 */
export const theme = lightTheme;

/**
 * Exportación legacy para compatibilidad con código existente
 * NOTA: Preferir usar `lightTheme` o `darkTheme` explícitamente,
 * o usar el hook `useTheme()` para obtener el tema dinámico según el modo.
 */
export const colors = lightColors;

/**
 * Helper para obtener el tema correcto según el esquema de color
 */
export const getTheme = (colorScheme: "light" | "dark"): Theme => {
  return colorScheme === "dark" ? darkTheme : lightTheme;
};
