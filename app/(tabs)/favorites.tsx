import { LoadingSpinner } from "@/src/components/common";
import { RecipeCardItem } from "@/src/components/recipe";
import { useFavorites, useTheme } from "@/src/hooks";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, loading, clearAllFavorites } = useFavorites();
  const theme = useTheme();
  const { colors, isDark } = theme;

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
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />

      {favorites.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: theme.spacing.xl,
          }}
        >
          <Ionicons name="heart-outline" size={80} color={colors.textLight} />
          <Text
            style={[
              theme.typography.h2,
              {
                color: colors.text,
                marginTop: theme.spacing.lg,
                marginBottom: theme.spacing.sm,
                textAlign: "center",
              },
            ]}
          >
            No tienes favoritos
          </Text>
          <Text
            style={[
              theme.typography.bodyLg,
              {
                color: colors.textSecondary,
                textAlign: "center",
                lineHeight: 22,
              },
            ]}
          >
            Guarda tus recetas favoritas tocando el corazón
          </Text>
        </View>
      ) : (
        <>
          {/* Header con contador */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: theme.spacing.md,
              borderBottomWidth: 1,
              backgroundColor: colors.surface,
              borderBottomColor: colors.divider,
            }}
          >
            <Text
              style={[
                theme.typography.bodyLg,
                {
                  color: colors.textSecondary,
                  fontWeight: "500",
                },
              ]}
            >
              {favorites.length} {favorites.length === 1 ? "receta" : "recetas"}
            </Text>
            <TouchableOpacity onPress={handleClearAll}>
              <Text
                style={[
                  theme.typography.bodySm,
                  {
                    color: colors.error,
                    fontWeight: "600",
                  },
                ]}
              >
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
            contentContainerStyle={{ padding: theme.spacing.md }}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </SafeAreaView>
  );
}
