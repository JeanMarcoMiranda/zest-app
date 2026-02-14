import { useTheme } from "@/src/hooks";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

interface InstructionsPreviewProps {
  instructions: string;
}

export const InstructionsPreview: React.FC<InstructionsPreviewProps> = ({
  instructions,
}) => {
  const theme = useTheme();
  const { colors, isDark } = theme;

  if (!instructions) return null;

  return (
    <View style={{ marginBottom: theme.spacing.lg }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: theme.spacing.xs,
          marginBottom: theme.spacing.sm,
        }}
      >
        <Ionicons
          name="document-text-outline"
          size={18}
          color={colors.primary}
        />
        <Text style={[theme.typography.h3, { color: colors.text }]}>
          Instrucciones
        </Text>
      </View>

      <View
        style={{
          padding: theme.spacing.md,
          borderRadius: theme.borderRadius.md,
          backgroundColor: isDark
            ? "rgba(255,255,255,0.04)"
            : "rgba(0,0,0,0.02)",
          borderWidth: 0.5,
          borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
        }}
      >
        <Text
          style={[
            theme.typography.bodySm,
            {
              color: colors.text,
              lineHeight: 20,
            },
          ]}
          numberOfLines={4}
        >
          {instructions}
        </Text>
        <Text
          style={[
            theme.typography.caption,
            {
              color: colors.textLight,
              textTransform: "none",
              marginTop: theme.spacing.sm,
            },
          ]}
        >
          Toca &quot;Comenzar a Cocinar&quot; para ver el paso a paso
        </Text>
      </View>
    </View>
  );
};
