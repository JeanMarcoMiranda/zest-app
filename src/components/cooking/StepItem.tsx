import { useTheme } from "@/src/hooks";
import { RecipeStep } from "@/src/types/recipe.types";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface StepItemProps {
  step: RecipeStep;
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
  const { colors, isDark } = theme;

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

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedCheckboxStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkboxScale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const handleCheckboxPressIn = () => {
    checkboxScale.value = withSpring(0.9, { damping: 15, stiffness: 300 });
  };

  const handleCheckboxPressOut = () => {
    checkboxScale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  return (
    <View
      style={{
        flexDirection: "row",
        marginBottom: theme.spacing.md,
        paddingHorizontal: theme.spacing.md,
      }}
    >
      {/* Timeline Indicator */}
      <View
        style={{
          alignItems: "center",
          marginRight: theme.spacing.sm + 4,
        }}
      >
        {/* Step Circle Icon */}
        <View
          style={{
            width: 32,
            height: 32,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons
            name={getIconName()}
            size={24}
            color={getCircleColor()}
          />
        </View>

        {/* Connector Line */}
        {!isLast && (
          <View
            style={{
              width: 1.5,
              flex: 1,
              minHeight: 16,
              marginTop: theme.spacing.xs,
              backgroundColor: isCompleted
                ? colors.success
                : isDark
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(0,0,0,0.06)",
              opacity: isCompleted ? 0.4 : 1,
              borderRadius: 1,
            }}
          />
        )}
      </View>

      {/* Step Card */}
      <Animated.View style={[{ flex: 1 }, animatedCardStyle]}>
        <Pressable
          style={[
            {
              padding: theme.spacing.md,
              borderRadius: theme.borderRadius.md,
              borderWidth: 0.5,
              backgroundColor: isDark
                ? "rgba(255,255,255,0.03)"
                : "rgba(0,0,0,0.01)",
              borderColor: isDark
                ? "rgba(255,255,255,0.06)"
                : "rgba(0,0,0,0.05)",
            },
            isActive && {
              borderColor: isDark
                ? `${colors.primary}40`
                : `${colors.primary}25`,
              backgroundColor: isDark
                ? `${colors.primary}08`
                : `${colors.primary}04`,
            },
            isCompleted && {
              borderColor: isDark
                ? `${colors.success}30`
                : `${colors.success}20`,
              opacity: 0.8,
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
              marginBottom: theme.spacing.sm,
            }}
          >
            <Text
              style={[
                theme.typography.caption,
                {
                  color: colors.textSecondary,
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                  fontSize: 10,
                },
                isActive && { color: colors.primary },
                isCompleted && { color: colors.success },
              ]}
            >
              Paso {step.number}
            </Text>

            {/* Checkbox */}
            <Animated.View style={animatedCheckboxStyle}>
              <Pressable
                onPress={onComplete}
                onPressIn={handleCheckboxPressIn}
                onPressOut={handleCheckboxPressOut}
                style={{
                  padding: theme.spacing.xs,
                  minWidth: 36,
                  minHeight: 36,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                hitSlop={8}
              >
                <MaterialIcons
                  name={isCompleted ? "check-box" : "check-box-outline-blank"}
                  size={20}
                  color={isCompleted ? colors.success : colors.textLight}
                />
              </Pressable>
            </Animated.View>
          </View>

          {/* Step Text */}
          <Text
            style={[
              theme.typography.bodyLgCooking,
              {
                color: colors.text,
                lineHeight: Math.round(19.2 * 1.6),
              },
              isCompleted && {
                color: colors.textSecondary,
                textDecorationLine: "line-through",
                opacity: 0.6,
              },
            ]}
            numberOfLines={isActive ? undefined : 3}
          >
            {step.instruction}
          </Text>

          {/* Note Section — theme-aware */}
          {step.note && (
            <View
              style={{
                marginTop: theme.spacing.sm,
                padding: theme.spacing.sm,
                backgroundColor: isDark
                  ? "rgba(251,192,45,0.08)"
                  : "rgba(251,192,45,0.1)",
                borderRadius: theme.borderRadius.sm,
                borderLeftWidth: 2,
                borderLeftColor: isDark
                  ? "rgba(251,192,45,0.4)"
                  : "rgba(251,192,45,0.6)",
              }}
            >
              <Text
                style={[
                  theme.typography.bodySm,
                  {
                    color: isDark
                      ? "rgba(255,255,255,0.7)"
                      : "rgba(93,64,55,0.85)",
                    fontStyle: "italic",
                  },
                  isCompleted && {
                    color: colors.textLight,
                  },
                ]}
              >
                <Text style={{ fontWeight: "600" }}>Nota: </Text>
                {step.note}
              </Text>
            </View>
          )}

          {/* Ingredients & Equipment Chips */}
          {isActive && !isCompleted && (
            <View
              style={{ marginTop: theme.spacing.md, gap: theme.spacing.sm }}
            >
              {step.ingredients && step.ingredients.length > 0 && (
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: theme.spacing.xs,
                  }}
                >
                  {step.ingredients.map((ing, i) => (
                    <View
                      key={`ing-${i}`}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: isDark
                          ? "rgba(255,255,255,0.06)"
                          : "rgba(0,0,0,0.04)",
                        paddingHorizontal: 8,
                        paddingVertical: 3,
                        borderRadius: theme.borderRadius.full,
                      }}
                    >
                      <Text
                        style={[
                          theme.typography.caption,
                          {
                            color: colors.textSecondary,
                            textTransform: "none",
                            fontSize: 11,
                          },
                        ]}
                      >
                        {ing.name}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}

          {/* Expand Hint */}
          {!isActive && (
            <View
              style={{
                marginTop: theme.spacing.sm,
                flexDirection: "row",
                alignItems: "center",
                gap: 3,
              }}
            >
              <MaterialIcons
                name="touch-app"
                size={11}
                color={colors.textLight}
              />
              <Text
                style={[
                  theme.typography.caption,
                  {
                    color: colors.textLight,
                    textTransform: "none",
                    fontSize: 10,
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
