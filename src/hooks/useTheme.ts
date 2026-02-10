/**
 * Custom React hooks para trabajar con el sistema de diseño.
 * Hook principal para acceder al theme completo y hooks especializados.
 */

import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../theme";

/**
 * Hook para obtener el tema completo según el color scheme del dispositivo.
 * Automáticamente retorna lightTheme o darkTheme según la preferencia del sistema.
 *
 * NOTA: Mantiene compatibilidad con la API anterior agregando propiedades legacy.
 *
 * @returns El tema completo con propiedades adicionales para compatibilidad
 *
 * @example
 * // Uso moderno (acceso al tema completo)
 * const theme = useTheme();
 * <View style={{ padding: theme.spacing.md }}>
 *   <Text style={theme.typography.h1}>Título</Text>
 * </View>
 *
 * @example
 * // Uso legacy (compatibilidad hacia atrás)
 * const { colors, isDark } = useTheme();
 * <View style={{ backgroundColor: colors.background }}>
 *   <Text style={{ color: colors.text }}>Texto</Text>
 * </View>
 */
export function useTheme() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  // Retornar tema completo + propiedades legacy para compatibilidad
  return {
    ...theme,
    // Legacy properties (mantienen compatibilidad con código existente)
    isDark: colorScheme === "dark",
    colorScheme: colorScheme ?? "light",
  };
}

/**
 * Hook para obtener solo los colores según el color scheme del dispositivo.
 * Más ligero que useTheme() si solo necesitas acceso a colores.
 *
 * @returns Los colores del tema actual
 *
 * @example
 * const colors = useColors();
 * <View style={{ backgroundColor: colors.background }}>
 *   <Text style={{ color: colors.text }}>Texto</Text>
 * </View>
 */
export function useColors() {
  const theme = useTheme();
  return theme.colors;
}

/**
 * Hook para detectar si el dispositivo está en modo oscuro.
 *
 * @returns true si está en dark mode, false si está en light mode
 *
 * @example
 * const isDark = useIsDarkMode();
 * <View>
 *   <Text>Modo actual: {isDark ? 'Oscuro' : 'Claro'}</Text>
 * </View>
 */
export function useIsDarkMode(): boolean {
  const colorScheme = useColorScheme();
  return colorScheme === "dark";
}

/**
 * Hook para obtener los estilos de tipografía del tema actual.
 *
 * @returns Los estilos de tipografía
 *
 * @example
 * const typography = useTypography();
 * <Text style={typography.h1}>Título</Text>
 * <Text style={typography.bodyLg}>Cuerpo</Text>
 */
export function useTypography() {
  const theme = useTheme();
  return theme.typography;
}

/**
 * Hook para obtener el sistema de espaciado del tema actual.
 *
 * @returns Los valores de spacing
 *
 * @example
 * const spacing = useSpacing();
 * <View style={{ padding: spacing.md, gap: spacing.sm }}>
 *   <Text>Contenido</Text>
 * </View>
 */
export function useSpacing() {
  const theme = useTheme();
  return theme.spacing;
}

/**
 * Hook para obtener los gradientes del tema.
 *
 * @returns Los gradientes predefinidos
 *
 * @example
 * const gradients = useGradients();
 * <LinearGradient colors={gradients.primary}>
 *   <Text>Contenido con gradiente</Text>
 * </LinearGradient>
 */
export function useGradients() {
  const theme = useTheme();
  return theme.gradients;
}

/**
 * Hook para obtener las configuraciones de animación.
 *
 * @returns Las configuraciones de animación
 *
 * @example
 * const { duration, animations } = useAnimations();
 *
 * // Usar en animaciones
 * Animated.timing(fadeAnim, {
 *   toValue: 1,
 *   duration: duration.normal,
 *   useNativeDriver: true,
 * }).start();
 */
export function useAnimations() {
  const theme = useTheme();
  return {
    animations: theme.animations,
    duration: theme.duration,
    easing: theme.easing,
    spring: theme.spring,
    customEasing: theme.customEasing,
    gestures: theme.gestures,
  };
}
