import { useTheme } from "@/src/hooks";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

interface LoadingSpinnerProps {
  message?: string;
  size?: "small" | "large";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Cargando...",
  size = "large",
}) => {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing.lg,
      }}
    >
      <ActivityIndicator size={size} color={colors.primary} />
      {message && (
        <Text
          style={[
            theme.typography.bodyLg,
            { color: colors.textSecondary, marginTop: theme.spacing.md },
          ]}
        >
          {message}
        </Text>
      )}
    </View>
  );
};

export default LoadingSpinner;
