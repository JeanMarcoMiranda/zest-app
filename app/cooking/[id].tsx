// app/cooking/[id].tsx

import { ErrorView, LoadingSpinner } from "@/src/components/common";
import { Step, StepItem } from "@/src/components/cooking";
import { useRecipes, useTheme } from "@/src/hooks";
import { createShadow } from "@/src/utils";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CookingStepsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const { colors } = theme;
  const { currentRecipe, isLoading, error, fetchRecipeById } = useRecipes();

  // Si tenemos la receta en el store y coincide con el ID, la usamos.
  // Si no, la buscamos.
  const recipe = currentRecipe?.id === id ? currentRecipe : null;
  const loading = isLoading && !recipe;

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (!recipe && id) {
      fetchRecipeById(id);
    }
  }, [id, recipe, fetchRecipeById]);

  if (loading) {
    return <LoadingSpinner message="Preparando la cocina..." />;
  }

  if (!recipe) {
    return <ErrorView message="No pudimos cargar las instrucciones." />;
  }

  // Dividir instrucciones en pasos
  const steps: Step[] = recipe.instructions
    .split("\n")
    .filter((step) => step.trim() !== "")
    .map((step, index) => ({
      number: index + 1,
      text: step.trim(),
    }));

  const totalSteps = steps.length;

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

  const progress = (completedSteps.length / totalSteps) * 100;
  const allCompleted = completedSteps.length === totalSteps;

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
            padding: theme.spacing.lg,
            paddingTop: theme.spacing.md,
          }}
        >
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
                  color: "#FFFFFF",
                  marginBottom: theme.spacing.xs,
                },
              ]}
              numberOfLines={1}
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
                size={16}
                color={colors.textInverse}
              />
              <Text
                style={[
                  theme.typography.bodySm,
                  {
                    color: "#FFFFFF",
                    opacity: 0.9,
                    fontWeight: "500",
                  },
                ]}
              >
                {completedSteps.length} de {totalSteps} completados
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: theme.borderRadius.full,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => router.back()}
          >
            <MaterialIcons name="close" size={24} color={colors.textInverse} />
          </TouchableOpacity>
        </View>

        {/* Barra de progreso */}
        <View
          style={{
            height: 4,
            backgroundColor: "rgba(255, 255, 255, 0.3)",
          }}
        >
          <View
            style={{
              height: "100%",
              width: `${progress}%`,
              backgroundColor: colors.textInverse,
            }}
          />
        </View>
      </LinearGradient>

      {/* Steps List */}
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
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

      {/* Botón de finalizar */}
      <View
        style={[
          {
            padding: theme.spacing.lg,
            borderTopWidth: 1,
            backgroundColor: colors.surface,
            borderTopColor: colors.divider,
          },
          createShadow(theme as any, theme.elevation.high),
        ]}
      >
        <TouchableOpacity
          style={[
            {
              padding: theme.spacing.md,
              borderRadius: theme.borderRadius.md,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: theme.spacing.sm,
              backgroundColor: allCompleted ? colors.success : colors.primary,
            },
            createShadow(theme as any, theme.elevation.medium),
          ]}
          onPress={handleFinish}
        >
          <MaterialIcons
            name="check-circle"
            size={24}
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
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
