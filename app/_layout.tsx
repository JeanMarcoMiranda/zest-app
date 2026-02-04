// app/_layout.tsx

import { colors } from "@/src/theme";
import { Stack } from "expo-router";

export default function RootLayout() {
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
