/**
 * Utilidades helper para el sistema de diseño.
 * Funciones auxiliares para trabajar con el theme de manera más sencilla.
 */

import type { Theme } from "../theme";
import { opacity } from "../theme/colors";
import type { TypographyStyle } from "../theme/typography";

/**
 * Crea un objeto de sombra basado en la elevación.
 *
 * @param theme - El tema actual (lightTheme o darkTheme)
 * @param elevationLevel - Nivel de elevación (0-4)
 * @returns Objeto con propiedades de sombra para React Native
 *
 * @example
 * const shadow = createShadow(theme, 2);
 * <View style={[styles.card, shadow]} />
 */
export const createShadow = (theme: Theme, elevationLevel: number) => {
  const { shadow } = theme.colors;

  return {
    shadowColor: shadow.color,
    shadowOffset: shadow.offset,
    shadowOpacity: shadow.opacity * elevationLevel,
    shadowRadius: shadow.radius * elevationLevel,
    elevation: elevationLevel,
  };
};

/**
 * Aplica un estilo de tipografía predefinido.
 *
 * @param style - Nombre del estilo de tipografía (h1, h2, bodyLg, etc.)
 * @param theme - El tema actual
 * @returns Objeto con estilos de tipografía
 *
 * @example
 * const titleStyle = applyTypography('h1', theme);
 * <Text style={titleStyle}>Título</Text>
 */
export const applyTypography = (style: TypographyStyle, theme: Theme) => {
  return theme.typography[style];
};

/**
 * Convierte un color hexadecimal a RGBA con opacidad.
 *
 * @param color - Color en formato hexadecimal (#RRGGBB)
 * @param opacityLevel - Nivel de opacidad (transparent, low, medium, high, opaque)
 * @returns Color en formato rgba(r, g, b, a)
 *
 * @example
 * const semiTransparent = withOpacity('#92400E', 'medium');
 * // Retorna: 'rgba(146, 64, 14, 0.5)'
 */
export const withOpacity = (
  color: string,
  opacityLevel: keyof typeof opacity,
): string => {
  // Remover el # si existe
  const hex = color.replace("#", "");

  // Convertir hex a RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity[opacityLevel]})`;
};

/**
 * Crea una configuración de gradiente lineal para React Native.
 *
 * @param colors - Array de colores para el gradiente
 * @param angle - Ángulo del gradiente en grados (0 = horizontal, 90 = vertical)
 * @returns Objeto con configuración de gradiente para LinearGradient
 *
 * @example
 * const gradient = createGradient(['#92400E', '#B45309'], 90);
 * <LinearGradient {...gradient}>
 *   <Text>Contenido</Text>
 * </LinearGradient>
 */
export const createGradient = (colors: string[], angle = 0) => {
  // Convertir ángulo a coordenadas start/end
  const angleRad = (angle * Math.PI) / 180;

  return {
    colors,
    start: { x: 0, y: 0 },
    end: {
      x: Math.cos(angleRad),
      y: Math.sin(angleRad),
    },
  };
};

/**
 * Obtiene un valor de spacing de manera type-safe.
 *
 * @param theme - El tema actual
 * @param size - Tamaño del spacing (xs, sm, md, lg, xl, xxl, xxxl)
 * @returns Valor numérico del spacing
 *
 * @example
 * const padding = getSpacing(theme, 'md'); // 16
 */
export const getSpacing = (
  theme: Theme,
  size: keyof typeof theme.spacing,
): number => {
  return theme.spacing[size];
};

/**
 * Obtiene un valor de borderRadius de manera type-safe.
 *
 * @param theme - El tema actual
 * @param size - Tamaño del borderRadius (xs, sm, md, lg, xl, full)
 * @returns Valor numérico del borderRadius
 *
 * @example
 * const radius = getBorderRadius(theme, 'lg'); // 24
 */
export const getBorderRadius = (
  theme: Theme,
  size: keyof typeof theme.borderRadius,
): number => {
  return theme.borderRadius[size];
};

/**
 * Combina múltiples estilos de manera type-safe.
 * Útil para combinar estilos del theme con estilos personalizados.
 *
 * @param styles - Array de objetos de estilo
 * @returns Objeto de estilo combinado
 *
 * @example
 * const combinedStyle = combineStyles([
 *   theme.typography.h1,
 *   { color: theme.colors.primary }
 * ]);
 */
export const combineStyles = <T extends Record<string, any>>(
  ...styles: (T | undefined | false)[]
): T => {
  return Object.assign({}, ...styles.filter(Boolean)) as T;
};
