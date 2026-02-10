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
          height: 56,
          borderRadius: theme.borderRadius.xl,
          backgroundColor: isDark
            ? "rgba(41,37,36,0.85)"
            : "rgba(255,255,255,0.85)",
          borderTopWidth: 0,
          borderWidth: 1,
          borderColor: isDark ? "rgba(68,64,60,0.5)" : "rgba(231,229,228,0.8)",
          paddingBottom: 0,
          elevation: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.15,
          shadowRadius: 16,
        },
        tabBarItemStyle: {
          paddingVertical: 6,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          marginTop: 2,
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
                borderRadius: theme.borderRadius.xl,
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
                borderRadius: theme.borderRadius.xl,
                backgroundColor: isDark
                  ? "rgba(41,37,36,0.92)"
                  : "rgba(255,255,255,0.92)",
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
