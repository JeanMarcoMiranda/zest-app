import { useTheme } from "@/src/hooks";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Altura del contenido de la tab bar (sin contar el bottom inset)
const TAB_BAR_HEIGHT = 58;

export default function TabLayout() {
  const theme = useTheme();
  const { colors, isDark } = theme;
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: TAB_BAR_HEIGHT + insets.bottom,
          paddingBottom: insets.bottom,
          borderTopLeftRadius: theme.borderRadius.lg,
          borderTopRightRadius: theme.borderRadius.lg,
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarItemStyle: {
          paddingVertical: theme.spacing.xs,
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderTopLeftRadius: theme.borderRadius.lg,
                borderTopRightRadius: theme.borderRadius.lg,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: isDark
                  ? "rgba(252, 248, 242, 0.1)"
                  : "rgba(42, 36, 31, 0.08)",
                shadowColor: colors.text,
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: isDark ? 0.4 : 0.08,
                shadowRadius: 24,
              }}
            >
              <BlurView
                intensity={80}
                tint={isDark ? "dark" : "light"}
                style={{
                  flex: 1,
                }}
              />
            </View>
          ) : (
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderTopLeftRadius: theme.borderRadius.lg,
                borderTopRightRadius: theme.borderRadius.lg,
                backgroundColor: isDark
                  ? "rgba(42, 38, 34, 0.92)"
                  : "rgba(255, 255, 255, 0.88)",
                borderWidth: 1,
                borderColor: isDark
                  ? "rgba(252, 248, 242, 0.1)"
                  : "rgba(42, 36, 31, 0.08)",
                elevation: 8,
              }}
            />
          ),
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Explorar",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center", gap: 3 }}>
              <Ionicons
                name={focused ? "compass" : "compass-outline"}
                size={24}
                color={color}
              />
              {focused && (
                <View
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: colors.primary,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center", gap: 3 }}>
              <Ionicons
                name={focused ? "heart" : "heart-outline"}
                size={24}
                color={color}
              />
              {focused && (
                <View
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: colors.primary,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Configuración",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center", gap: 3 }}>
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={24}
                color={color}
              />
              {focused && (
                <View
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: colors.primary,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
