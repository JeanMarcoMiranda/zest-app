export const colors = {
  // Colores principales
  primary: "#FF6B35",
  primaryDark: "#E85A2A",
  primaryLight: "#FF8C5F",

  // Colores secundarios
  secondary: "#4CAF50",
  secondaryDark: "#388E3C",
  secondaryLight: "#66BB6A",

  // Colores de acento
  accent: "#FFC107",
  accentDark: "#FFA000",

  // Colores neutros
  background: "#F8F9FA",
  surface: "#FFFFFF",
  card: "#FFFFFF",

  // Textos
  text: "#212121",
  textSecondary: "#757575",
  textLight: "#9E9E9E",
  textInverse: "#FFFFFF",

  // Estados
  success: "#4CAF50",
  warning: "#FF9800",
  error: "#F44336",
  info: "#2196F3",

  // Bordes y divisores
  border: "#E0E0E0",
  divider: "#EEEEEE",

  // Sombras
  shadow: "#000000",

  // Overlay
  overlay: "rgba(0, 0, 0, 0.5)",
  overlayLight: "rgba(0, 0, 0, 0.3)",
  overlayDark: "rgba(0, 0, 0, 0.7)",

  // Glassmorphism
  glass: "rgba(255, 255, 255, 0.9)",
  glassDark: "rgba(255, 255, 255, 0.7)",

  // Favoritos
  favorite: "#FF4081",
  favoriteLight: "#FF80AB",
};

// Gradientes predefinidos
export const gradients = {
  primary: ["#FF6B35", "#FF8C5F"] as const,
  secondary: ["#4CAF50", "#66BB6A"] as const,
  overlay: ["transparent", "rgba(0, 0, 0, 0.7)"] as const,
  overlayTop: ["rgba(0, 0, 0, 0.5)", "transparent"] as const,
  card: ["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.85)"] as const,
  header: ["#FF6B35", "#FF8C5F", "#FFA07A"] as const,
};

export type Colors = typeof colors;
export type Gradients = typeof gradients;
