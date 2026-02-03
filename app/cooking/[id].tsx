// app/cooking/[id].tsx

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
import { ErrorView, LoadingSpinner } from "../../src/components/common";
import { getRecipeById } from "../../src/services/api";
import { colors, fontSize, spacing } from "../../src/styles/theme";
import { Recipe } from "../../src/types/recipe.types";

export default function CookingStepsScreen() {
  const { id, recipeData } = useLocalSearchParams<{
    id: string;
    recipeData?: string;
  }>();
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

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
  const steps = recipe.instructions
    .split("\n")
    .filter((step) => step.trim() !== "")
    .map((step, index) => ({
      number: index + 1,
      text: step.trim(),
    }));

  const totalSteps = steps.length;

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    router.back();
  };

  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />

      <View style={styles.header}>
        <Text style={styles.recipeTitle}>{recipe.title}</Text>
        <Text style={styles.stepCounter}>
          Paso {currentStep + 1} de {totalSteps}
        </Text>
      </View>

      {/* Barra de progreso */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>

      {/* Contenido del paso actual */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <View style={styles.stepCircle}>
          <Text style={styles.stepNumber}>{currentStep + 1}</Text>
        </View>

        <Text style={styles.stepText}>
          {steps[currentStep]?.text || "No hay instrucciones disponibles"}
        </Text>
      </ScrollView>

      {/* Botones de navegación */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.buttonSecondary,
            currentStep === 0 && styles.buttonDisabled,
          ]}
          onPress={handlePrevStep}
          disabled={currentStep === 0}
        >
          <Text
            style={[
              styles.buttonTextSecondary,
              currentStep === 0 && styles.buttonTextDisabled,
            ]}
          >
            ← Anterior
          </Text>
        </TouchableOpacity>

        {currentStep < totalSteps - 1 ? (
          <TouchableOpacity style={styles.button} onPress={handleNextStep}>
            <Text style={styles.buttonText}>Siguiente →</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.buttonSuccess]}
            onPress={handleFinish}
          >
            <Text style={styles.buttonText}>✓ Finalizar</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  recipeTitle: {
    fontSize: fontSize.lg,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  stepCounter: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: colors.divider,
  },
  progressBar: {
    height: "100%",
    backgroundColor: colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    alignItems: "center",
    minHeight: "100%",
    justifyContent: "center",
  },
  stepCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  stepNumber: {
    fontSize: fontSize.xxxl,
    fontWeight: "700",
    color: colors.textInverse,
  },
  stepText: {
    fontSize: fontSize.lg,
    color: colors.text,
    textAlign: "center",
    lineHeight: 28,
    paddingHorizontal: spacing.md,
  },
  buttonContainer: {
    flexDirection: "row",
    padding: spacing.lg,
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  button: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: colors.textInverse,
    fontSize: fontSize.md,
    fontWeight: "600",
  },
  buttonSecondary: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  buttonTextSecondary: {
    color: colors.primary,
  },
  buttonSuccess: {
    backgroundColor: colors.success,
  },
  buttonDisabled: {
    borderColor: colors.border,
    opacity: 0.5,
  },
  buttonTextDisabled: {
    color: colors.textLight,
  },
});
