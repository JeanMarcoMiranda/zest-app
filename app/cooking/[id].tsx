// app/cooking/[id].tsx

import { ErrorView, LoadingSpinner } from "@/src/components/common";
import { StepItem } from "@/src/components/cooking";
import { useRecipes, useTheme } from "@/src/hooks";
import { createShadow } from "@/src/utils";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function CookingStepsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const { colors } = theme;
  const { currentRecipe, isLoading, fetchRecipeById } = useRecipes();

  // Si tenemos la receta en el store y coincide con el ID, la usamos.
  // Si no, la buscamos.
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

  // Usar los pasos ya procesados en el adaptador
  // recipe.steps ya es RecipeStep[], que es lo que espera StepItem (si la interfaz coincide)
  // StepItem espera `step: RecipeStep`.
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
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      {/* Header con gradiente */}
      <LinearGradient
        colors={gradientColors}
        style={createShadow(theme as any, theme.elevation.high)}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: theme.screenMargins.horizontal,
            paddingVertical: theme.spacing.lg,
            paddingTop: theme.spacing.md,
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
                theme.typography.h2,
                {
                  color: colors.textInverse,
                  marginBottom: theme.spacing.xs,
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
                size={theme.iconSizes.sm}
                color={colors.textInverse}
              />
              <Text
                style={[
                  theme.typography.bodySm,
                  {
                    color: colors.textInverse,
                    opacity: 0.95,
                  },
                ]}
              >
                {completedSteps.length} de {totalSteps} completados
              </Text>
            </View>
          </View>

          {/* Close Button - Glassmorphism */}
          <Pressable
            style={{
              width: 44,
              height: 44,
              borderRadius: theme.borderRadius.full,
              backgroundColor: "rgba(255, 255, 255, 0.25)",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.3)",
            }}
            onPress={() => router.back()}
          >
            <MaterialIcons
              name="close"
              size={theme.iconSizes.md}
              color={colors.textInverse}
            />
          </Pressable>
        </View>

        {/* Progress Bar - Enhanced */}
        <View
          style={{
            height: 6,
            backgroundColor: "rgba(255, 255, 255, 0.25)",
            overflow: "hidden",
          }}
        >
          <Animated.View
            style={[
              animatedProgressStyle,
              {
                height: "100%",
                backgroundColor: colors.textInverse,
              },
            ]}
          />
        </View>
      </LinearGradient>

      {/* Steps List */}
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{
          paddingTop: theme.spacing.lg,
          paddingBottom: theme.spacing.xl,
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

      {/* Finish Button - Fixed Bottom */}
      <View
        style={[
          {
            paddingHorizontal: theme.screenMargins.horizontal,
            paddingVertical: theme.spacing.lg,
            borderTopWidth: 1,
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
          },
          createShadow(theme as any, theme.elevation.high),
        ]}
      >
        <Pressable
          style={[
            {
              paddingVertical: theme.spacing.md,
              paddingHorizontal: theme.spacing.lg,
              borderRadius: theme.borderRadius.md,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: theme.spacing.sm,
              backgroundColor: allCompleted ? colors.success : colors.primary,
              minHeight: 56,
            },
            createShadow(theme as any, theme.elevation.medium),
          ]}
          onPress={handleFinish}
        >
          <MaterialIcons
            name={allCompleted ? "celebration" : "check-circle"}
            size={theme.iconSizes.md}
            color={colors.textInverse}
          />
          <Text
            style={[
              theme.typography.button,
              {
                color: colors.textInverse,
              },
            ]}
          >
            {allCompleted ? "¡Receta Completada!" : "Finalizar Receta"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
