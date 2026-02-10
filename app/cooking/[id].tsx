// app/cooking/[id].tsx

import { ErrorView, LoadingSpinner } from "@/src/components/common";
import { StepItem } from "@/src/components/cooking";
import { useRecipes, useTheme } from "@/src/hooks";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CookingStepsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const { colors, isDark } = theme;
  const insets = useSafeAreaInsets();
  const { currentRecipe, isLoading, fetchRecipeById } = useRecipes();

  const recipe = currentRecipe?.id === id ? currentRecipe : null;
  const loading = isLoading && !recipe;

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Animation for progress bar
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    if (!recipe && id) {
      fetchRecipeById(id);
    }
  }, [id, recipe, fetchRecipeById]);

  const steps = recipe?.steps || [];
  const totalSteps = steps.length;
  const progress =
    totalSteps > 0 ? (completedSteps.length / totalSteps) * 100 : 0;
  const allCompleted = completedSteps.length === totalSteps && totalSteps > 0;

  // Animate progress bar
  useEffect(() => {
    progressWidth.value = withTiming(progress, {
      duration: 400,
    });
  }, [progress, progressWidth]);

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  const handleStepPress = (index: number) => {
    setCurrentStep(index);
  };

  const handleStepComplete = (index: number) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter((i) => i !== index));
    } else {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  const handleFinish = () => {
    router.back();
  };

  if (loading) {
    return <LoadingSpinner message="Preparando la cocina..." />;
  }

  if (!recipe) {
    return <ErrorView message="No pudimos cargar las instrucciones." />;
  }

  const gradientColors = [colors.primary, colors.primaryLight] as const;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Edge-to-edge StatusBar */}
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />

      {/* Header with gradient — extends behind status bar */}
      <LinearGradient colors={gradientColors}>
        {/* Safe area spacer */}
        <View style={{ height: insets.top }} />

        {/* Header content */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.md,
          }}
        >
          {/* Recipe Title & Progress Info */}
          <View
            style={{
              flex: 1,
              marginRight: theme.spacing.md,
            }}
          >
            <Text
              style={[
                theme.typography.h3,
                {
                  color: colors.textInverse,
                  marginBottom: 2,
                },
              ]}
              numberOfLines={2}
            >
              {recipe.title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: theme.spacing.xs,
              }}
            >
              <MaterialIcons
                name="check-circle"
                size={14}
                color="rgba(255,255,255,0.8)"
              />
              <Text
                style={[
                  theme.typography.caption,
                  {
                    color: "rgba(255,255,255,0.8)",
                    textTransform: "none",
                  },
                ]}
              >
                {completedSteps.length} de {totalSteps} completados
              </Text>
            </View>
          </View>

          {/* Close Button */}
          <Pressable
            style={{
              width: 36,
              height: 36,
              borderRadius: theme.borderRadius.full,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 0.5,
              borderColor: "rgba(255, 255, 255, 0.25)",
            }}
            onPress={() => router.back()}
          >
            <MaterialIcons name="close" size={18} color={colors.textInverse} />
          </Pressable>
        </View>

        {/* Progress Bar */}
        <View
          style={{
            height: 4,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            overflow: "hidden",
          }}
        >
          <Animated.View
            style={[
              animatedProgressStyle,
              {
                height: "100%",
                backgroundColor: colors.textInverse,
                borderRadius: 2,
              },
            ]}
          />
        </View>
      </LinearGradient>

      {/* Steps List */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: theme.spacing.md,
          paddingBottom: theme.spacing.xl + 80 + insets.bottom,
        }}
        showsVerticalScrollIndicator={false}
      >
        {steps.map((step, index) => (
          <StepItem
            key={step.number}
            step={step}
            index={index}
            isActive={step.number === currentStep}
            isCompleted={completedSteps.includes(step.number)}
            isLast={index === steps.length - 1}
            onPress={() => handleStepPress(step.number)}
            onComplete={() => handleStepComplete(step.number)}
          />
        ))}
      </ScrollView>

      {/* Finish Button — fixed bottom with safe area */}
      <View
        style={{
          paddingHorizontal: theme.spacing.md,
          paddingTop: theme.spacing.sm,
          paddingBottom: insets.bottom + theme.spacing.sm,
          backgroundColor: colors.background,
          borderTopWidth: 0.5,
          borderTopColor: isDark
            ? "rgba(255,255,255,0.06)"
            : "rgba(0,0,0,0.05)",
        }}
      >
        <Pressable
          style={{
            paddingVertical: theme.spacing.md,
            borderRadius: theme.borderRadius.md,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: theme.spacing.sm,
            backgroundColor: allCompleted ? colors.success : colors.primary,
          }}
          onPress={handleFinish}
        >
          <MaterialIcons
            name={allCompleted ? "celebration" : "check-circle"}
            size={20}
            color={colors.textInverse}
          />
          <Text
            style={[theme.typography.button, { color: colors.textInverse }]}
          >
            {allCompleted ? "¡Receta Completada!" : "Finalizar Receta"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
