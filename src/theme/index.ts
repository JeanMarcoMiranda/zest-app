/**
 * Sistema de Diseño: "Rústico Hogareño"
 * Punto de entrada principal del tema.
 *
 * Este archivo exporta todos los tokens de diseño de manera organizada
 * y proporciona el objeto de tema completo para usar en la aplicación.
 */

import {
  animations,
  customEasing,
  duration,
  easing,
  gestures,
  spring,
} from "./animations";
import { darkColors, gradients, lightColors, opacity } from "./colors";
import {
  borderRadius,
  breakpoints,
  elevation,
  iconSizes,
  iconStroke,
  screenMargins,
  spacing,
  zIndex,
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
 * Exportaciones individuales de todos los tokens
 * Permite importar solo lo necesario para mejor tree-shaking
 */
export {
  // Animaciones
  animations,
  borderRadius,
  breakpoints,
  customEasing,
  darkColors,
  duration,
  easing,
  elevation,
  // Tipografía
  fontFamily,
  fontSize,
  fontWeight,
  gestures,
  gradients,
  iconSizes,
  iconStroke,
  letterSpacing,
  // Colores
  lightColors,
  lineHeight,
  opacity,
  screenMargins,
  // Espaciado
  spacing,
  spring,
  typography,
  zIndex
};

/**
 * Exportar todos los tipos TypeScript
 */
  export type { ColorPalette, Gradients, Opacity, Palette } from "./colors";

export type {
  BorderRadius,
  BorderRadiusKey,
  BreakpointKey,
  Breakpoints,
  Elevation,
  ElevationKey,
  IconSizeKey,
  IconSizes,
  IconStroke,
  ScreenMargins,
  Spacing,
  SpacingKey,
  ZIndex,
  ZIndexKey
} from "./spacing";

export type {
  FontFamily,
  FontFamilyKey,
  FontSize,
  FontSizeKey,
  FontWeight,
  FontWeightKey,
  LetterSpacing,
  LetterSpacingKey,
  LineHeight,
  LineHeightKey,
  TextTransform,
  Typography,
  TypographyStyle
} from "./typography";

export type {
  AnimationKey,
  Animations,
  CustomEasing,
  Duration,
  DurationKey,
  Easing,
  EasingKey,
  Gestures,
  Spring,
  SpringKey
} from "./animations";

/**
 * Tema completo en Modo Claro (Light Mode)
 * Este es el tema por defecto de la aplicación.
 */
export const lightTheme = {
  colors: lightColors,
  gradients,
  opacity,
  spacing,
  screenMargins,
  borderRadius,
  elevation,
  zIndex,
  breakpoints,
  iconSizes,
  iconStroke,
  typography,
  animations,
  spring,
  duration,
  easing,
  customEasing,
  gestures,
  mode: "light" as const,
} as const;

/**
 * Tema completo en Modo Oscuro (Dark Mode)
 */
export const darkTheme = {
  colors: darkColors,
  gradients,
  opacity,
  spacing,
  screenMargins,
  borderRadius,
  elevation,
  zIndex,
  breakpoints,
  iconSizes,
  iconStroke,
  typography,
  animations,
  spring,
  duration,
  easing,
  customEasing,
  gestures,
  mode: "dark" as const,
} as const;

/**
 * Tipo para el objeto de tema completo
 */
export type Theme = {
  colors: {
    [K in keyof typeof lightColors]: K extends "shadow"
      ? {
          color: string;
          opacity: number;
          offset: { width: number; height: number };
          radius: number;
          elevation: number;
        }
      : string;
  };
  gradients: typeof gradients;
  opacity: typeof opacity;
  spacing: typeof spacing;
  screenMargins: typeof screenMargins;
  borderRadius: typeof borderRadius;
  elevation: typeof elevation;
  zIndex: typeof zIndex;
  breakpoints: typeof breakpoints;
  iconSizes: typeof iconSizes;
  iconStroke: typeof iconStroke;
  typography: typeof typography;
  animations: typeof animations;
  spring: typeof spring;
  duration: typeof duration;
  easing: typeof easing;
  customEasing: typeof customEasing;
  gestures: typeof gestures;
  mode: "light" | "dark";
};

/**
 * Helper para obtener el tema correcto según el esquema de color
 */
export const getTheme = (colorScheme: "light" | "dark"): Theme => {
  return colorScheme === "dark" ? darkTheme : lightTheme;
};

/**
 * Exportaciones legacy para compatibilidad con código existente
 * @deprecated Use lightTheme o darkTheme explícitamente, o usa el hook useTheme()
 */
export const theme = lightTheme;

/**
 * @deprecated Use lightColors o darkColors según el modo, o usa el hook useColors()
 */
export const colors = lightColors;
