// app/cooking/[id].tsx

import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { colors, fontSize, spacing } from "../../src/styles/theme";
import { Recipe } from "../../src/types";

export default function CookingStepsScreen() {
  const { id, recipeData } = useLocalSearchParams<{
    id: string;
    recipeData?: string;
  }>();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  // Parsear la receta si viene como parámetro
  let recipe: Recipe | null = null;
  if (recipeData) {
    try {
      recipe = JSON.parse(recipeData);
    } catch (error) {
      console.error("Error parsing recipe data:", error);
    }
  }

  // Si no hay receta, crear una de ejemplo
  if (!recipe) {
    recipe = {
      id: parseInt(id),
      title: "Receta de Ejemplo",
      image: "",
      servings: 4,
      readyInMinutes: 30,
      summary: "Receta de ejemplo",
      cuisines: [],
      dishTypes: [],
      diets: [],
      occasions: [],
      extendedIngredients: [],
      analyzedInstructions: [
        {
          name: "",
          steps: [
            { number: 1, step: "Precalienta el horno a 180°C" },
            { number: 2, step: "Mezcla los ingredientes secos en un bowl" },
            {
              number: 3,
              step: "Agrega los ingredientes húmedos y mezcla bien",
            },
            { number: 4, step: "Vierte la mezcla en el molde preparado" },
            { number: 5, step: "Hornea por 30-35 minutos hasta dorar" },
          ],
        },
      ],
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      veryHealthy: false,
      cheap: false,
      veryPopular: false,
      sustainable: false,
    };
  }

  const steps = recipe.analyzedInstructions[0]?.steps || [];
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
      <View style={styles.content}>
        <View style={styles.stepCircle}>
          <Text style={styles.stepNumber}>{currentStep + 1}</Text>
        </View>

        <Text style={styles.stepText}>
          {steps[currentStep]?.step || "No hay instrucciones disponibles"}
        </Text>
      </View>

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
  content: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: "center",
    alignItems: "center",
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
