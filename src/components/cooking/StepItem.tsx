import { useTheme } from "@/src/hooks";
import { createShadow } from "@/src/utils";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

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

  // Animation values
  const scale = useSharedValue(1);
  const checkboxScale = useSharedValue(1);

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

  // Animated styles for card press
  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Animated styles for checkbox press
  const animatedCheckboxStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkboxScale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, {
      damping: 15,
      stiffness: 300,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 300,
    });
  };

  const handleCheckboxPressIn = () => {
    checkboxScale.value = withSpring(0.9, {
      damping: 15,
      stiffness: 300,
    });
  };

  const handleCheckboxPressOut = () => {
    checkboxScale.value = withSpring(1, {
      damping: 15,
      stiffness: 300,
    });
  };

  return (
    <View
      style={{
        flexDirection: "row",
        marginBottom: theme.spacing.lg,
        paddingHorizontal: theme.screenMargins.horizontal,
      }}
    >
      {/* Timeline Indicator */}
      <View
        style={{
          alignItems: "center",
          marginRight: theme.spacing.md,
        }}
      >
        {/* Step Circle Icon */}
        <View
          style={{
            width: 44,
            height: 44,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons
            name={getIconName()}
            size={36}
            color={getCircleColor()}
          />
        </View>

        {/* Connector Line */}
        {!isLast && (
          <View
            style={{
              width: 2,
              flex: 1,
              minHeight: 24,
              marginTop: theme.spacing.xs,
              backgroundColor: isCompleted ? colors.success : colors.divider,
              opacity: isCompleted ? 0.4 : 1,
            }}
          />
        )}
      </View>

      {/* Step Card */}
      <Animated.View style={[{ flex: 1 }, animatedCardStyle]}>
        <Pressable
          style={[
            {
              padding: theme.spacing.lg,
              borderRadius: theme.borderRadius.xl,
              borderWidth: 2,
              backgroundColor: colors.surface,
              borderColor: colors.border,
              ...createShadow(theme as any, theme.elevation.low),
            },
            isActive && {
              borderColor: colors.primary,
              ...createShadow(theme as any, theme.elevation.medium),
            },
            isCompleted && {
              borderColor: colors.success,
              backgroundColor: colors.surface,
              opacity: 0.85,
            },
          ]}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          {/* Header: Step Number + Checkbox */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: theme.spacing.md,
            }}
          >
            <Text
              style={[
                isActive ? theme.typography.h3 : theme.typography.label,
                {
                  color: colors.textSecondary,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                },
                isActive && {
                  color: colors.primary,
                },
                isCompleted && {
                  color: colors.success,
                },
              ]}
            >
              Paso {step.number}
            </Text>

            {/* Checkbox with larger touch target */}
            <Animated.View style={animatedCheckboxStyle}>
              <Pressable
                onPress={onComplete}
                onPressIn={handleCheckboxPressIn}
                onPressOut={handleCheckboxPressOut}
                style={{
                  padding: theme.spacing.sm,
                  minWidth: 44,
                  minHeight: 44,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                hitSlop={8}
              >
                <MaterialIcons
                  name={isCompleted ? "check-box" : "check-box-outline-blank"}
                  size={28}
                  color={isCompleted ? colors.success : colors.textLight}
                />
              </Pressable>
            </Animated.View>
          </View>

          {/* Step Text - Cooking Mode Typography (20% larger) */}
          <Text
            style={[
              theme.typography.bodyLgCooking,
              {
                color: colors.textHigh,
                lineHeight: Math.round(19.2 * 1.7), // bodyLgCooking with relaxed line height
              },
              isCompleted && {
                color: colors.textMed,
                textDecorationLine: "line-through",
                opacity: 0.7,
              },
            ]}
            numberOfLines={isActive ? undefined : 3}
          >
            {step.text}
          </Text>

          {/* Expand Hint for Collapsed Steps */}
          {!isActive && (
            <View
              style={{
                marginTop: theme.spacing.md,
                flexDirection: "row",
                alignItems: "center",
                gap: theme.spacing.xs,
              }}
            >
              <MaterialIcons
                name="touch-app"
                size={14}
                color={colors.textLight}
              />
              <Text
                style={[
                  theme.typography.caption,
                  {
                    color: colors.textLight,
                  },
                ]}
              >
                Toca para expandir
              </Text>
            </View>
          )}
        </Pressable>
      </Animated.View>
    </View>
  );
};
