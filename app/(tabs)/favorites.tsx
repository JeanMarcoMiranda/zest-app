import { LoadingSpinner } from "@/src/components/common";
import { RecipeCardItem } from "@/src/components/recipe";
import { useFavorites } from "@/src/hooks";
import { colors, spacing, typography } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
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
  xl: typography.fontSize.xl,
};

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, loading, clearAllFavorites } = useFavorites();

  const handleRecipePress = (recipeId: string) => {
    router.push(`/recipe/${recipeId}` as any);
  };

  const handleClearAll = () => {
    Alert.alert(
      "Eliminar todos los favoritos",
      "¿Estás seguro de que quieres eliminar todas tus recetas favoritas?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: clearAllFavorites,
        },
      ],
    );
  };

  if (loading) {
    return <LoadingSpinner message="Cargando favoritos..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={80} color={colors.textLight} />
          <Text style={styles.emptyTitle}>No tienes favoritos</Text>
          <Text style={styles.emptySubtitle}>
            Guarda tus recetas favoritas tocando el corazón
          </Text>
        </View>
      ) : (
        <>
          {/* Header con contador */}
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {favorites.length} {favorites.length === 1 ? "receta" : "recetas"}
            </Text>
            <TouchableOpacity onPress={handleClearAll}>
              <Text style={styles.clearButton}>Eliminar todos</Text>
            </TouchableOpacity>
          </View>

          {/* Lista de favoritos */}
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <RecipeCardItem
                recipe={item}
                onPress={() => handleRecipePress(item.id)}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  headerText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  clearButton: {
    fontSize: fontSize.sm,
    color: colors.error,
    fontWeight: "600",
  },
  listContent: {
    padding: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  emptyTitle: {
    fontSize: fontSize.xl,
    fontWeight: "700",
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
});
