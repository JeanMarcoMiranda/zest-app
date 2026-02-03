import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, fontSize, spacing } from "../../styles/theme";

interface ErrorViewProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorView: React.FC<ErrorViewProps> = ({
  message = "Algo salió mal. Por favor intenta de nuevo.",
  onRetry,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>😕</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.button} onPress={onRetry}>
          <Text style={styles.buttonText}>Reintentar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  emoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  message: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.textInverse,
    fontSize: fontSize.md,
    fontWeight: "600",
  },
});

export default ErrorView;
