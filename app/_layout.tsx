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
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
        }}
      />
      <Stack.Screen
        name="recipe/[id]"
        options={{
          title: "Detalle de Receta",
        }}
      />
      <Stack.Screen
        name="cooking/[id]"
        options={{
          title: "Preparación",
          headerBackTitle: "Volver",
        }}
      />
      <Stack.Screen
        name="favorites"
        options={{
          title: "Mis Favoritos",
        }}
      />
    </Stack>
  );
}
