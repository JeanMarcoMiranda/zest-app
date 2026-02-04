import { useTheme } from "@/src/hooks";
import { spacing, typography } from "@/src/theme";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const borderRadius = {
  lg: 12,
};

export interface Step {
  number: number;
  text: string;
}

interface StepItemProps {
  step: Step;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  isLast: boolean;
  onPress: () => void;
  onComplete: () => void;
}

export const StepItem: React.FC<StepItemProps> = ({
  step,
  index,
  isActive,
  isCompleted,
  isLast,
  onPress,
  onComplete,
}) => {
  const { colors } = useTheme();

  const getCircleColor = () => {
    if (isCompleted) return colors.success;
    if (isActive) return colors.primary;
    return colors.textLight;
  };

  const getIconName = (): any => {
    if (isCompleted) return "check-circle";
    if (isActive) return "radio-button-checked";
    return "radio-button-unchecked";
  };

  const shadows = {
    sm: {
      shadowColor: colors.primaryDark,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: colors.primaryDark,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        {/* Círculo del paso */}
        <View style={styles.circleContainer}>
          <MaterialIcons
            name={getIconName()}
            size={32}
            color={getCircleColor()}
          />
        </View>

        {/* Línea conectora */}
        {!isLast && (
          <View style={[styles.line, { backgroundColor: colors.divider }]} />
        )}
      </View>

      <View style={styles.rightColumn}>
        <TouchableOpacity
          style={[
            styles.stepCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.divider,
            },
            shadows.sm,
            isActive && {
              borderColor: colors.primary,
              ...shadows.md,
            },
            isCompleted && {
              borderColor: colors.success,
              backgroundColor: colors.surface,
            },
          ]}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <View style={styles.stepHeader}>
            <Text
              style={[
                styles.stepNumber,
                { color: colors.textSecondary },
                isActive && {
                  color: colors.primary,
                  fontSize: typography.fontSize.lg,
                },
                isCompleted && {
                  color: colors.success,
                },
              ]}
            >
              Paso {step.number}
            </Text>

            {/* Checkbox para marcar como completado */}
            <TouchableOpacity
              onPress={onComplete}
              style={styles.checkbox}
              activeOpacity={0.7}
            >
              <MaterialIcons
                name={isCompleted ? "check-box" : "check-box-outline-blank"}
                size={24}
                color={isCompleted ? colors.success : colors.textLight}
              />
            </TouchableOpacity>
          </View>

          <Text
            style={[
              styles.stepText,
              { color: colors.text },
              isCompleted && {
                color: colors.textSecondary,
                textDecorationLine: "line-through",
              },
            ]}
            numberOfLines={isActive ? undefined : 2}
          >
            {step.text}
          </Text>

          {!isActive && (
            <Text style={[styles.tapToExpand, { color: colors.textLight }]}>
              Toca para ver más
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: spacing.md,
  },
  leftColumn: {
    alignItems: "center",
    marginRight: spacing.md,
  },
  circleContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    width: 2,
    flex: 1,
    marginTop: spacing.xs,
  },
  rightColumn: {
    flex: 1,
  },
  stepCard: {
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
  },
  stepHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  stepNumber: {
    fontSize: typography.fontSize.base,
    fontWeight: "700",
  },
  checkbox: {
    padding: spacing.xs,
  },
  stepText: {
    fontSize: typography.fontSize.base,
    lineHeight: typography.fontSize.base * 1.5,
  },
  tapToExpand: {
    fontSize: typography.fontSize.xs,
    fontStyle: "italic",
    marginTop: spacing.xs,
  },
});
