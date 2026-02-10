import { useTheme } from "@/src/hooks";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const theme = useTheme();
  const { colors, isDark } = theme;
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: isDark
          ? "rgba(245,245,244,0.5)"
          : "rgba(69,26,3,0.4)",
        tabBarStyle: {
          position: "absolute",
          bottom: Math.max(insets.bottom, theme.spacing.sm),
          left: theme.spacing.lg,
          right: theme.spacing.lg,
          height: 52,
          borderRadius: theme.borderRadius.full,
          backgroundColor: isDark
            ? "rgba(41,37,36,0.80)"
            : "rgba(255,255,255,0.75)",
          borderTopWidth: 0,
          borderWidth: 0.5,
          borderColor: isDark ? "rgba(68,64,60,0.5)" : "rgba(231,229,228,0.8)",
          paddingBottom: 0,
          elevation: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.08,
          shadowRadius: 24,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        tabBarLabelStyle: {
          fontSize: 9,
          fontWeight: "600",
          marginTop: 1,
        },
        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <BlurView
              intensity={80}
              tint={isDark ? "dark" : "light"}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: theme.borderRadius.full,
                overflow: "hidden",
              }}
            />
          ) : (
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: theme.borderRadius.full,
                backgroundColor: isDark
                  ? "rgba(41,37,36,0.88)"
                  : "rgba(255,255,255,0.82)",
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
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Configuración",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
