import { darkColors, lightColors } from "./colors";
import { spacing } from "./spacing";
import { typography } from "./typography";

/**
 * Exportamos los tokens individuales para uso directo si es necesario.
 */
export { darkColors, lightColors, spacing, typography };

/**
 * Tema por defecto de la aplicación (Modo Claro).
 * Se recomienda usar el hook `useTheme` para obtener los colores dinámicos.
 */
export const theme = {
  colors: lightColors,
  spacing,
  typography,
};

/**
 * Tipo para el objeto de tema completo.
 */
export type Theme = typeof theme;

/**
 * Exportación para compatibilidad con código que importa `colors` directamente.
 * NOTA: Preferir `useTheme()` para componentes de UI.
 */
export const colors = lightColors;
