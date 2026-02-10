import { useTheme } from "@/src/hooks";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ErrorViewProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorView: React.FC<ErrorViewProps> = ({
  message = "Algo salió mal. Por favor intenta de nuevo.",
  onRetry,
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
      <Text style={{ fontSize: 64, marginBottom: theme.spacing.md }}>😕</Text>
      <Text
        style={[
          theme.typography.bodyLg,
          {
            color: colors.textSecondary,
            textAlign: "center",
            marginBottom: theme.spacing.lg,
          },
        ]}
      >
        {message}
      </Text>
      {onRetry && (
        <TouchableOpacity
          style={{
            paddingHorizontal: theme.spacing.lg,
            paddingVertical: theme.spacing.md,
            borderRadius: theme.borderRadius.md,
            backgroundColor: colors.primary,
          }}
          onPress={onRetry}
        >
          <Text
            style={[theme.typography.button, { color: colors.textInverse }]}
          >
            Reintentar
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ErrorView;
