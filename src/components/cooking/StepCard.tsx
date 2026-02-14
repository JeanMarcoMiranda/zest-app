import { useTheme } from "@/src/hooks";
import { RecipeStep } from "@/src/types/recipe.types";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Platform, Pressable, ScrollView, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface StepCardProps {
  step: RecipeStep;
  index: number;
  totalSteps: number;
  isCompleted: boolean;
  onComplete: () => void;
  screenWidth: number;
  contentPaddingTop: number;
  contentPaddingBottom: number; // Add this
}

export const StepCard: React.FC<StepCardProps> = ({
  step,
  index,
  totalSteps,
  isCompleted,
  onComplete,
  screenWidth,
  contentPaddingTop,
  contentPaddingBottom,
}) => {
  const theme = useTheme();
  const { colors, isDark } = theme;

  // Checkbox animation
  const checkScale = useSharedValue(1);
  const animatedCheckStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }],
  }));

  const handleCheckPress = () => {
    checkScale.value = withSpring(0.85, { damping: 12, stiffness: 300 });
    setTimeout(() => {
      checkScale.value = withSpring(1, { damping: 12, stiffness: 300 });
    }, 100);
    onComplete();
  };

  const hasIngredients = step.ingredients && step.ingredients.length > 0;
  const hasEquipment = step.equipment && step.equipment.length > 0;
  const hasNote = !!step.note;

  return (
    <View
      style={{
        width: screenWidth,
        flex: 1,
      }}
    >
      <View style={{ flex: 1, position: "relative" }}>
        {/* ─── Hero Number (Watermark) ─── */}
        <Text
          style={{
            position: "absolute",
            top: contentPaddingTop, // Position relative to content start
            right: 0,
            fontSize: 160,
            fontWeight: "900",
            color: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", // Very subtle watermark
            fontFamily: Platform.OS === "ios" ? "Georgia" : "serif", // Serif for "Rústico" feel
            zIndex: -1,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: contentPaddingTop + theme.spacing.md,
            paddingHorizontal: theme.spacing.md,
            paddingBottom: contentPaddingBottom + theme.spacing.xl, // Use it here
            justifyContent: "space-between", // Push resources to bottom
          }}
        >
          {/* Top Section: Header & Instruction */}
          <View>
            {/* Header: Step Indicator & Checkbox */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: theme.spacing.lg,
              }}
            >
              <View>
                <Text
                  style={[
                    theme.typography.label,
                    {
                      color: colors.primary,
                      fontSize: 14,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                    },
                  ]}
                >
                  PASO {index + 1}
                </Text>
              </View>

              {/* Checkbox */}
              <Animated.View style={animatedCheckStyle}>
                <Pressable
                  onPress={handleCheckPress}
                  hitSlop={12}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: theme.spacing.xs,
                    paddingVertical: theme.spacing.xs,
                    paddingHorizontal: theme.spacing.md,
                    borderRadius: theme.borderRadius.full,
                    backgroundColor: isCompleted
                      ? colors.success
                      : isDark
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.05)",
                  }}
                >
                  <MaterialIcons
                    name={
                      isCompleted ? "check-circle" : "radio-button-unchecked"
                    }
                    size={20}
                    color={isCompleted ? "#FFF" : colors.textSecondary}
                  />
                  <Text
                    style={[
                      theme.typography.button,
                      {
                        color: isCompleted ? "#FFF" : colors.textSecondary,
                        fontSize: 12,
                      },
                    ]}
                  >
                    {isCompleted ? "COMPLETADO" : "MARCAR"}
                  </Text>
                </Pressable>
              </Animated.View>
            </View>

            {/* Instruction Text */}
            <Text
              style={[
                theme.typography.bodyLgCooking,
                {
                  color: isCompleted ? colors.textSecondary : colors.text,
                  lineHeight: 32,
                  fontSize: 24, // Even larger for "Hero" feel
                },
                isCompleted && {
                  textDecorationLine: "line-through",
                  opacity: 0.6,
                },
              ]}
            >
              {step.instruction}
            </Text>

            {/* Note Callout */}
            {hasNote && (
              <View
                style={{
                  marginTop: theme.spacing.xl,
                  padding: theme.spacing.lg,
                  borderRadius: theme.borderRadius.lg,
                  backgroundColor: isDark
                    ? "rgba(212, 157, 66, 0.1)"
                    : "rgba(212, 157, 66, 0.08)",
                  borderLeftWidth: 4,
                  borderLeftColor: colors.warning,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: theme.spacing.sm,
                    marginBottom: theme.spacing.xs,
                  }}
                >
                  <Ionicons name="bulb" size={20} color={colors.warning} />
                  <Text
                    style={[
                      theme.typography.label,
                      { color: colors.warning, fontSize: 13 },
                    ]}
                  >
                    CHEF TIP
                  </Text>
                </View>
                <Text
                  style={[
                    theme.typography.bodySm,
                    {
                      color: isDark
                        ? "rgba(255,255,255,0.9)"
                        : colors.textSecondary,
                      fontStyle: "italic",
                    },
                  ]}
                >
                  {step.note}
                </Text>
              </View>
            )}
          </View>

          {/* Bottom Section: Visual Resource Cards */}
          {(hasIngredients || hasEquipment) && (
            <View style={{ marginTop: theme.spacing.xxl }}>
              <Text
                style={[
                  theme.typography.label,
                  {
                    color: colors.textSecondary,
                    marginBottom: theme.spacing.md,
                    fontSize: 13,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                  },
                ]}
              >
                NECESITAS
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  gap: theme.spacing.md,
                  paddingRight: theme.spacing.lg,
                }}
              >
                {/* Ingredients Cards - Warm/Organic Feel */}
                {step.ingredients?.map((ing, i) => (
                  <View
                    key={`ing-${i}`}
                    style={{
                      width: 110,
                      height: 100,
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.08)"
                        : "#FFF",
                      borderRadius: theme.borderRadius.lg,
                      padding: theme.spacing.md,
                      justifyContent: "space-between",
                      // Subtle border for definition
                      borderWidth: 1,
                      borderColor: isDark
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.03)",
                      // Warm accent at bottom
                      borderBottomWidth: 3,
                      borderBottomColor: colors.primary,
                      // Soft shadow
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: isDark ? 0.2 : 0.04,
                      shadowRadius: 8,
                      elevation: 2,
                    }}
                  >
                    <Text
                      style={[
                        theme.typography.bodySm,
                        {
                          color: colors.text,
                          fontSize: 13,
                          fontWeight: "600",
                          lineHeight: 18,
                        },
                      ]}
                      numberOfLines={3}
                    >
                      {ing.name}
                    </Text>

                    <Text
                      style={[
                        theme.typography.caption,
                        {
                          color: colors.primary,
                          fontSize: 10,
                          opacity: 0.8,
                        },
                      ]}
                    >
                      INGREDIENTE
                    </Text>
                  </View>
                ))}

                {/* Equipment Cards - Neutral/Tool Feel */}
                {step.equipment?.map((eq, i) => (
                  <View
                    key={`eq-${i}`}
                    style={{
                      width: 110,
                      height: 100,
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.05)"
                        : "#FAFAFA", // Slightly different surface
                      borderRadius: theme.borderRadius.lg,
                      padding: theme.spacing.md,
                      justifyContent: "space-between",
                      borderWidth: 1,
                      borderColor: isDark
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.03)",
                      // Neutral accent
                      borderBottomWidth: 3,
                      borderBottomColor: colors.textSecondary,
                    }}
                  >
                    <Text
                      style={[
                        theme.typography.bodySm,
                        {
                          color: colors.text,
                          fontSize: 13,
                          fontWeight: "500", // Slightly lighter weight for tools
                          lineHeight: 18,
                        },
                      ]}
                      numberOfLines={3}
                    >
                      {eq.name}
                    </Text>

                    <Text
                      style={[
                        theme.typography.caption,
                        {
                          color: colors.textSecondary,
                          fontSize: 10,
                          opacity: 0.8,
                        },
                      ]}
                    >
                      EQUIPO
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};
