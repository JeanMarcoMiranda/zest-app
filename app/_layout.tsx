// app/_layout.tsx

import { useTheme } from "@/src/hooks";
import { fontSize } from "@/src/theme";
import { Stack } from "expo-router";

export default function RootLayout() {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.primary,
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: fontSize.lg,
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      {/* Tabs como pantalla principal */}
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      {/* Pantallas modales/detalle */}
      <Stack.Screen
        name="recipe/[id]"
        options={{
          title: "Detalle de Receta",
          presentation: "card",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="cooking/[id]"
        options={{
          title: "Preparación",
          headerBackTitle: "Volver",
          presentation: "card",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
