// app/favorites.tsx

import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { colors, fontSize, spacing } from "../src/styles/theme";

export default function FavoritesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.content}>
        <Text style={styles.icon}>⭐</Text>
        <Text style={styles.title}>Favoritos</Text>
        <Text style={styles.subtitle}>Aquí verás tus recetas guardadas</Text>
        <Text style={styles.infoText}>
          Próximamente: Lista de recetas favoritas
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
  icon: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: "center",
  },
  infoText: {
    marginTop: spacing.xl,
    fontSize: fontSize.sm,
    color: colors.textLight,
    textAlign: "center",
  },
});
