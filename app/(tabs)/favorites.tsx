import { LoadingSpinner } from "@/src/components/common";
import { RecipeCardItem } from "@/src/components/recipe";
import { useFavorites, useTheme } from "@/src/hooks";
import { spacing, typography } from "@/src/theme";
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

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, loading, clearAllFavorites } = useFavorites();
  const { colors, isDark } = useTheme();

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
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={80} color={colors.textLight} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            No tienes favoritos
          </Text>
          <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
            Guarda tus recetas favoritas tocando el corazón
          </Text>
        </View>
      ) : (
        <>
          {/* Header con contador */}
          <View
            style={[
              styles.header,
              {
                backgroundColor: colors.surface,
                borderBottomColor: colors.divider,
              },
            ]}
          >
            <Text style={[styles.headerText, { color: colors.textSecondary }]}>
              {favorites.length} {favorites.length === 1 ? "receta" : "recetas"}
            </Text>
            <TouchableOpacity onPress={handleClearAll}>
              <Text style={[styles.clearButton, { color: colors.error }]}>
                Eliminar todos
              </Text>
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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.md,
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: typography.fontSize.base,
    fontWeight: "500",
  },
  clearButton: {
    fontSize: typography.fontSize.sm,
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
    fontSize: typography.fontSize.xl,
    fontWeight: "700",
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: typography.fontSize.base,
    textAlign: "center",
    lineHeight: 22,
  },
});
