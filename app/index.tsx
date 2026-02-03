// app/index.tsx

import { useRouter } from "expo-router";
import React from "react";
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { colors, fontSize, spacing } from "../src/styles/theme";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.content}>
        <Text style={styles.title}>🍳 ChefHub</Text>
        <Text style={styles.subtitle}>Descubre recetas increíbles</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/recipe/1")}
          >
            <Text style={styles.buttonText}>Ver Receta de Ejemplo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary]}
            onPress={() => router.push("/favorites")}
          >
            <Text style={styles.buttonTextSecondary}>Ver Favoritos</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.infoText}>
          Esta es la pantalla principal.{"\n"}
          Próximamente: Lista de recetas
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: fontSize.lg,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  buttonContainer: {
    width: "100%",
    marginTop: spacing.xl,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: spacing.md,
  },
  buttonText: {
    color: colors.textInverse,
    fontSize: fontSize.md,
    fontWeight: "600",
  },
  buttonSecondary: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  buttonTextSecondary: {
    color: colors.primary,
    fontSize: fontSize.md,
    fontWeight: "600",
  },
  infoText: {
    marginTop: spacing.xl,
    fontSize: fontSize.sm,
    color: colors.textLight,
    textAlign: "center",
  },
});
