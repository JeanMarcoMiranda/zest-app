import { useTheme } from "@/src/hooks";
import { useStore } from "@/src/store";
import { ThemeMode } from "@/src/store/slices/themeSlice";
import { createShadow } from "@/src/utils";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingsScreen() {
  const theme = useTheme();
  const { colors, spacing, borderRadius } = theme;
  const themeMode = useStore((state) => state.themeMode);
  const setThemeMode = useStore((state) => state.setThemeMode);

  const renderThemeOption = (mode: ThemeMode, label: string, icon: string) => {
    const isSelected = themeMode === mode;

    return (
      <TouchableOpacity
        style={[
          styles.option,
          {
            backgroundColor: colors.surface,
            borderColor: isSelected ? colors.primary : colors.border,
          },
        ]}
        onPress={() => setThemeMode(mode)}
        activeOpacity={0.7}
      >
        <View style={styles.optionContent}>
          <Ionicons
            name={icon as any}
            size={24}
            color={isSelected ? colors.primary : colors.textLight}
          />
          <Text
            style={[
              styles.optionLabel,
              { color: isSelected ? colors.primary : colors.text },
            ]}
          >
            {label}
          </Text>
        </View>
        {isSelected && (
          <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ padding: spacing.md }}
    >
      <Stack.Screen
        options={{
          title: "Configuración",
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.primary,
          headerShadowVisible: false,
        }}
      />

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Apariencia
        </Text>
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.surface,
              borderRadius: borderRadius.lg,
              ...createShadow(theme as any, 1),
            },
          ]}
        >
          {renderThemeOption("light", "Claro", "sunny")}
          <View
            style={[styles.separator, { backgroundColor: colors.border }]}
          />
          {renderThemeOption("dark", "Oscuro", "moon")}
          <View
            style={[styles.separator, { backgroundColor: colors.border }]}
          />
          {renderThemeOption("system", "Sistema", "phone-portrait")}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    marginLeft: 4,
  },
  card: {
    overflow: "hidden",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "transparent",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  separator: {
    height: 1,
    marginLeft: 52,
  },
});
