// app/_layout.tsx

import { useTheme } from "@/src/hooks";
import { Stack } from "expo-router";

export default function RootLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.primary,
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 18,
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
        }}
      />
      <Stack.Screen
        name="cooking/[id]"
        options={{
          title: "Preparación",
          headerBackTitle: "Volver",
          presentation: "card",
        }}
      />
    </Stack>
  );
}
