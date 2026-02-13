import { useTheme } from "@/src/hooks";
import { BlurView, BlurViewProps } from "expo-blur";
import React from "react";
import { Platform, View, ViewProps } from "react-native";

interface GlassViewProps extends ViewProps {
  intensity?: number;
  tint?: BlurViewProps["tint"];
  borderRadius?: number;
}

export const GlassView: React.FC<GlassViewProps> = ({
  style,
  intensity = 50,
  tint,
  children,
  borderRadius = 0,
  ...props
}) => {
  const theme = useTheme();
  const { isDark } = theme;

  // Determinar el tint automáticamente si no se provee
  const effectiveTint = tint || (isDark ? "dark" : "light");

  if (Platform.OS === "ios") {
    return (
      <BlurView
        intensity={intensity}
        tint={effectiveTint}
        style={[style, { borderRadius, overflow: "hidden" }]}
        {...props}
      >
        {children}
      </BlurView>
    );
  }

  // Fallback para Android que no soporta BlurView nativo tan bien en todas las versiones
  // Usamos una capa semitransparente que simula el vidrio
  const backgroundColor = isDark
    ? `rgba(30, 30, 30, ${0.85 + intensity / 500})` // Ajuste sutil de opacidad basado en intensidad
    : `rgba(255, 255, 255, ${0.85 + intensity / 500})`;

  return (
    <View
      style={[
        style,
        {
          backgroundColor,
          borderRadius,
          overflow: "hidden",
          // Borde sutil para darle definición en Android
          borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
          borderWidth: 1,
        },
      ]}
      {...props}
    >
      {children}
    </View>
  );
};
