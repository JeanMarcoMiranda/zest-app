import { Platform } from "react-native";

/**
 * Constantes de diseño para Layout y Efectos Glass
 */
export const layout = {
  // Alturas estándar para componentes de navegación
  headerHeight: 52, // Altura del contenido del header (sin status bar)
  tabBarHeight: 58, // Altura de la barra de pestañas (sin insets)

  // Constantes para efectos de desenfoque (Glassmorphism)
  blur: {
    // Intensidad estándar para headers y barras de navegación
    regular: Platform.OS === "ios" ? 80 : 50,
    // Intensidad para fondos modales o elementos secundarios
    strong: Platform.OS === "ios" ? 100 : 70,
    // Intensidad ligera para elementos flotantes pequeños
    light: Platform.OS === "ios" ? 40 : 30,
  },
} as const;
