// app/cooking/[id].tsx

import { ErrorView, LoadingSpinner } from "@/src/components/common";
import { Step, StepItem } from "@/src/components/cooking";
import { getRecipeById } from "@/src/services";
import { colors, spacing, typography } from "@/src/theme";
import { Recipe } from "@/src/types/recipe.types";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const fontSize = {
  xs: typography.fontSize.xs,
  sm: typography.fontSize.sm,
  md: typography.fontSize.base,
  lg: typography.fontSize.lg,
};

const borderRadius = {
  lg: 12,
  round: 9999,
};

const shadows = {
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
};

const gradients = {
  header: [colors.primary, "#FF8E53"] as const,
};

export default function CookingStepsScreen() {
  const { id, recipeData } = useLocalSearchParams<{
    id: string;
    recipeData?: string;
  }>();
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    const loadRecipe = async () => {
      // Primero intentar usar los datos pasados como parámetro
      if (recipeData) {
        try {
          const parsedRecipe = JSON.parse(recipeData);
          setRecipe(parsedRecipe);
          setLoading(false);
          return;
        } catch (error) {
          console.error("Error parsing recipe data:", error);
        }
      }

      // Si no hay datos o falló el parsing, obtener de la API
      try {
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch (err) {
        console.error("Error loading recipe:", err);
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id, recipeData]);

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      {/* Header con gradiente */}
      <LinearGradient colors={gradients.header} style={styles.headerGradient}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.recipeTitle} numberOfLines={1}>
              {recipe.title}
            </Text>
            <View style={styles.progressInfo}>
              <MaterialIcons
                name="check-circle"
                size={16}
                color={colors.textInverse}
              />
              <Text style={styles.progressText}>
                {completedSteps.length} de {totalSteps} completados
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <MaterialIcons name="close" size={24} color={colors.textInverse} />
          </TouchableOpacity>
        </View>

        {/* Barra de progreso */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
      </LinearGradient>

      {/* Steps List */}
      <ScrollView style={styles.stepsContainer}>
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
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.finishButton,
            allCompleted && styles.finishButtonActive,
          ]}
          onPress={handleFinish}
        >
          <MaterialIcons
            name="check-circle"
            size={24}
            color={colors.textInverse}
          />
          <Text style={styles.finishButtonText}>
            {allCompleted ? "¡Receta Completada!" : "Finalizar Receta"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerGradient: {
    ...shadows.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  headerContent: {
    flex: 1,
    marginRight: spacing.md,
  },
  recipeTitle: {
    fontSize: fontSize.lg,
    fontWeight: "700",
    color: colors.textInverse,
    marginBottom: spacing.xs,
  },
  progressInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  progressText: {
    fontSize: fontSize.sm,
    color: colors.textInverse,
    opacity: 0.9,
    fontWeight: "500",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  progressBar: {
    height: "100%",
    backgroundColor: colors.textInverse,
  },
  stepsContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    ...shadows.lg,
  },
  finishButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    ...shadows.md,
  },
  finishButtonActive: {
    backgroundColor: colors.success,
  },
  finishButtonText: {
    color: colors.textInverse,
    fontSize: fontSize.md,
    fontWeight: "700",
  },
});
