// app/recipe/[id].tsx

import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { colors, fontSize, spacing } from "../../src/styles/theme";
import { Recipe } from "../../src/types";

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const handleStartCooking = () => {
    // Mock recipe para testing
    const mockRecipe: Recipe = {
      id: parseInt(id),
      title: "Receta de Ejemplo",
      image: "",
      servings: 4,
      readyInMinutes: 30,
      preparationMinutes: 10,
      cookingMinutes: 20,
      summary: "Esta es una receta de ejemplo",
      cuisines: ["Mexicana"],
      dishTypes: ["Plato principal"],
      diets: [],
      occasions: [],
      extendedIngredients: [],
      analyzedInstructions: [
        {
          name: "",
          steps: [
            { number: 1, step: "Paso 1 de ejemplo" },
            { number: 2, step: "Paso 2 de ejemplo" },
            { number: 3, step: "Paso 3 de ejemplo" },
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

    // Navegar a cooking steps
    router.push({
      pathname: "/cooking/[id]",
      params: {
        id: id,
        recipeData: JSON.stringify(mockRecipe),
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Receta #{id}</Text>

          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Información</Text>
            <Text style={styles.infoText}>• Tiempo: 30 minutos</Text>
            <Text style={styles.infoText}>• Porciones: 4 personas</Text>
            <Text style={styles.infoText}>• Dificultad: Media</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Ingredientes</Text>
            <Text style={styles.infoText}>• 2 tazas de arroz</Text>
            <Text style={styles.infoText}>• 1 kg de pollo</Text>
            <Text style={styles.infoText}>• 3 tomates</Text>
            <Text style={styles.infoText}>• Sal al gusto</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Descripción</Text>
            <Text style={styles.bodyText}>
              Esta es una receta de ejemplo. Pronto aquí verás la información
              real de la receta obtenida desde la API.
            </Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleStartCooking}>
            <Text style={styles.buttonText}>🔥 Comenzar a Cocinar</Text>
          </TouchableOpacity>

          <Text style={styles.noteText}>
            Próximamente: Datos reales desde la API
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  infoCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  bodyText: {
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 22,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: "center",
    marginTop: spacing.lg,
  },
  buttonText: {
    color: colors.textInverse,
    fontSize: fontSize.md,
    fontWeight: "600",
  },
  noteText: {
    marginTop: spacing.lg,
    fontSize: fontSize.sm,
    color: colors.textLight,
    textAlign: "center",
    fontStyle: "italic",
  },
});
