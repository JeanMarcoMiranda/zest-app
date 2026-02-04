import { useColorScheme } from "react-native";
import { darkColors, lightColors, type ColorPalette } from "../theme/colors";

/**
 * Hook personalizado para acceder al tema actual basado en el esquema de color del dispositivo
 * @returns Objeto con los colores del tema actual y el esquema de color
 */
export function useTheme() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const colors: ColorPalette = isDark ? darkColors : lightColors;

  return {
    colors,
    isDark,
    colorScheme: colorScheme ?? "light",
  };
}
