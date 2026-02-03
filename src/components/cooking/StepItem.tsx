import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
    borderRadius,
    colors,
    fontSize,
    shadows,
    spacing,
} from "../../styles/theme";

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
        {!isLast && <View style={styles.line} />}
      </View>

      <View style={styles.rightColumn}>
        <TouchableOpacity
          style={[
            styles.stepCard,
            isActive && styles.stepCardActive,
            isCompleted && styles.stepCardCompleted,
          ]}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <View style={styles.stepHeader}>
            <Text
              style={[
                styles.stepNumber,
                isActive && styles.stepNumberActive,
                isCompleted && styles.stepNumberCompleted,
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
            style={[styles.stepText, isCompleted && styles.stepTextCompleted]}
            numberOfLines={isActive ? undefined : 2}
          >
            {step.text}
          </Text>

          {!isActive && (
            <Text style={styles.tapToExpand}>Toca para ver más</Text>
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
    backgroundColor: colors.divider,
    marginTop: spacing.xs,
  },
  rightColumn: {
    flex: 1,
  },
  stepCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.divider,
    ...shadows.sm,
  },
  stepCardActive: {
    borderColor: colors.primary,
    ...shadows.md,
  },
  stepCardCompleted: {
    borderColor: colors.success,
    backgroundColor: colors.surface,
  },
  stepHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  stepNumber: {
    fontSize: fontSize.md,
    fontWeight: "700",
    color: colors.textSecondary,
  },
  stepNumberActive: {
    color: colors.primary,
    fontSize: fontSize.lg,
  },
  stepNumberCompleted: {
    color: colors.success,
  },
  checkbox: {
    padding: spacing.xs,
  },
  stepText: {
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: fontSize.md * 1.5,
  },
  stepTextCompleted: {
    color: colors.textSecondary,
    textDecorationLine: "line-through",
  },
  tapToExpand: {
    fontSize: fontSize.xs,
    color: colors.textLight,
    fontStyle: "italic",
    marginTop: spacing.xs,
  },
});
