import { useTheme } from "@/src/hooks";
import { fontSize } from "@/src/theme";
import { createShadow } from "@/src/utils";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

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
  const theme = useTheme();
  const { colors } = theme;

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
    <View
      style={{
        flexDirection: "row",
        marginBottom: theme.spacing.md,
      }}
    >
      <View
        style={{
          alignItems: "center",
          marginRight: theme.spacing.md,
        }}
      >
        {/* Círculo del paso */}
        <View
          style={{
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons
            name={getIconName()}
            size={32}
            color={getCircleColor()}
          />
        </View>

        {/* Línea conectora */}
        {!isLast && (
          <View
            style={{
              width: 2,
              flex: 1,
              marginTop: theme.spacing.xs,
              backgroundColor: colors.divider,
            }}
          />
        )}
      </View>

      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={[
            {
              padding: theme.spacing.md,
              borderRadius: theme.borderRadius.lg,
              borderWidth: 2,
              backgroundColor: colors.surface,
              borderColor: colors.divider,
              ...createShadow(theme as any, theme.elevation.low),
            },
            isActive && {
              borderColor: colors.primary,
              ...createShadow(theme as any, theme.elevation.medium),
            },
            isCompleted && {
              borderColor: colors.success,
              backgroundColor: colors.surface,
            },
          ]}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: theme.spacing.sm,
            }}
          >
            <Text
              style={[
                theme.typography.button,
                {
                  color: colors.textSecondary,
                },
                isActive && {
                  color: colors.primary,
                  fontSize: fontSize.lg,
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
              style={{ padding: theme.spacing.xs }}
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
              theme.typography.bodyLg,
              {
                color: colors.text,
              },
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
            <Text
              style={[
                theme.typography.caption,
                {
                  color: colors.textLight,
                  fontStyle: "italic",
                  marginTop: theme.spacing.xs,
                },
              ]}
            >
              Toca para ver más
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
