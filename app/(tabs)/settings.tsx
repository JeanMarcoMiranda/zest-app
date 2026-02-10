import { useTheme } from "@/src/hooks";
import { useStore } from "@/src/store";
import { ThemeMode } from "@/src/store/slices/themeSlice";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Sync with tab bar
const TAB_BAR_HEIGHT = 48;

export default function SettingsScreen() {
  const theme = useTheme();
  const { colors, isDark } = theme;
  const insets = useSafeAreaInsets();
  const themeMode = useStore((state) => state.themeMode);
  const setThemeMode = useStore((state) => state.setThemeMode);

  const tabBarTotalHeight =
    TAB_BAR_HEIGHT +
    Math.max(insets.bottom, theme.spacing.sm) +
    theme.spacing.sm;

  const renderThemeOption = (mode: ThemeMode, label: string, icon: string) => {
    const isSelected = themeMode === mode;

    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.md,
        }}
        onPress={() => setThemeMode(mode)}
        activeOpacity={0.7}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: theme.spacing.sm + 4,
          }}
        >
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: theme.borderRadius.full,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isSelected
                ? isDark
                  ? `${colors.primary}15`
                  : `${colors.primary}10`
                : isDark
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(0,0,0,0.03)",
            }}
          >
            <Ionicons
              name={icon as any}
              size={18}
              color={isSelected ? colors.primary : colors.textLight}
            />
          </View>
          <Text
            style={[
              theme.typography.bodySm,
              {
                color: isSelected ? colors.text : colors.textSecondary,
                fontWeight: isSelected ? "600" : "400",
              },
            ]}
          >
            {label}
          </Text>
        </View>
        {isSelected && (
          <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Edge-to-edge StatusBar */}
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent={true}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + theme.spacing.lg,
          paddingHorizontal: theme.spacing.sm + 4,
          paddingBottom: tabBarTotalHeight + theme.spacing.md,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Title */}
        <Text
          style={[
            theme.typography.h2,
            {
              color: colors.text,
              marginBottom: theme.spacing.lg,
              paddingHorizontal: theme.spacing.xs,
            },
          ]}
        >
          Configuración
        </Text>

        {/* Appearance Section */}
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Text
            style={[
              theme.typography.label,
              {
                color: colors.textSecondary,
                marginBottom: theme.spacing.sm,
                paddingHorizontal: theme.spacing.xs,
              },
            ]}
          >
            APARIENCIA
          </Text>

          <View
            style={{
              borderRadius: theme.borderRadius.md,
              backgroundColor: isDark
                ? "rgba(255,255,255,0.03)"
                : "rgba(0,0,0,0.02)",
              borderWidth: 0.5,
              borderColor: isDark
                ? "rgba(255,255,255,0.06)"
                : "rgba(0,0,0,0.05)",
              overflow: "hidden",
            }}
          >
            {renderThemeOption("light", "Claro", "sunny")}
            <View
              style={{
                height: 0.5,
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(0,0,0,0.04)",
                marginLeft: theme.spacing.md + 36 + theme.spacing.sm + 4,
              }}
            />
            {renderThemeOption("dark", "Oscuro", "moon")}
            <View
              style={{
                height: 0.5,
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(0,0,0,0.04)",
                marginLeft: theme.spacing.md + 36 + theme.spacing.sm + 4,
              }}
            />
            {renderThemeOption("system", "Sistema", "phone-portrait")}
          </View>
        </View>

        {/* App Info */}
        <View
          style={{
            alignItems: "center",
            paddingTop: theme.spacing.xl,
          }}
        >
          <Text
            style={[
              theme.typography.caption,
              {
                color: colors.textLight,
                textTransform: "none",
              },
            ]}
          >
            Zest v1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
