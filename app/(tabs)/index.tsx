import { ErrorView, RecipeCardSkeleton } from "@/src/components/common";
import { FilterSection, HomeHeader } from "@/src/components/home";
import { RecipeCardItem } from "@/src/components/recipe";
import { useFavorites, useRecipes, useTheme } from "@/src/hooks";
import { getCategories } from "@/src/services";
import { borderRadius, iconSizes, spacing, typography } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Alturas del header (sin contar safe area)
const HEADER_CONTENT_EXPANDED = 120;
const HEADER_CONTENT_COLLAPSED = 60;
const SCROLL_THRESHOLD = 60;

export default function HomeScreen() {
  const router = useRouter();
  const { favorites } = useFavorites();
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const {
    recipes,
    isLoading: loading,
    error: storeError,
    fetchRecipes,
    fetchRecipesByCategory,
    fetchRandomRecipes,
  } = useRecipes();

  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  // Animaciones
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = useRef(
    new Animated.Value(HEADER_CONTENT_EXPANDED),
  ).current;
  const filterOpacity = useRef(new Animated.Value(1)).current;
  const filterHeight = useRef(new Animated.Value(1)).current;

  const loadCategories = async () => {
    const cats = await getCategories();
    setCategories(cats);
  };

  const loadRecipesData = useCallback(async () => {
    if (searchQuery.trim() !== "") {
      await fetchRecipes(searchQuery);
    } else if (selectedCategory) {
      await fetchRecipesByCategory(selectedCategory);
    } else {
      await fetchRandomRecipes(6);
    }
  }, [
    searchQuery,
    selectedCategory,
    fetchRecipes,
    fetchRecipesByCategory,
    fetchRandomRecipes,
  ]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadRecipesData();
    setRefreshing(false);
  };

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  const handleSelectCategory = useCallback((category: string | null) => {
    setSelectedCategory(category);
    setSearchQuery("");
  }, []);

  // Toggle para mostrar/ocultar filtros
  const toggleFilters = useCallback(() => {
    const toValue = showFilters ? 0 : 1;
    setShowFilters(!showFilters);

    Animated.parallel([
      Animated.spring(filterOpacity, {
        toValue,
        useNativeDriver: false,
        tension: 50,
        friction: 7,
      }),
      Animated.spring(filterHeight, {
        toValue,
        useNativeDriver: false,
        tension: 50,
        friction: 7,
      }),
    ]).start();
  }, [showFilters, filterOpacity, filterHeight]);

  // Manejo del scroll para colapsar header
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;

        if (offsetY > SCROLL_THRESHOLD && showFilters) {
          // Colapsar
          Animated.parallel([
            Animated.timing(headerHeight, {
              toValue: HEADER_CONTENT_COLLAPSED,
              duration: 250,
              useNativeDriver: false,
            }),
            Animated.timing(filterOpacity, {
              toValue: 0,
              duration: 200,
              useNativeDriver: false,
            }),
            Animated.timing(filterHeight, {
              toValue: 0,
              duration: 250,
              useNativeDriver: false,
            }),
          ]).start(() => setShowFilters(false));
        } else if (offsetY < SCROLL_THRESHOLD / 2 && !showFilters) {
          // Expandir
          setShowFilters(true);
          Animated.parallel([
            Animated.timing(headerHeight, {
              toValue: HEADER_CONTENT_EXPANDED,
              duration: 250,
              useNativeDriver: false,
            }),
            Animated.timing(filterOpacity, {
              toValue: 1,
              duration: 200,
              useNativeDriver: false,
            }),
            Animated.timing(filterHeight, {
              toValue: 1,
              duration: 250,
              useNativeDriver: false,
            }),
          ]).start();
        }
      },
    },
  );

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      loadRecipesData();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, selectedCategory, loadRecipesData]);

  const handleRecipePress = (recipeId: string) => {
    router.push(`/recipe/${recipeId}` as any);
  };

  if (storeError && recipes.length === 0) {
    return (
      <ErrorView
        message="No pudimos cargar las recetas. Verifica tu conexión."
        onRetry={loadRecipesData}
      />
    );
  }

  // Interpolaciones para animaciones suaves
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, SCROLL_THRESHOLD],
    outputRange: [1, 0.95],
    extrapolate: "clamp",
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, SCROLL_THRESHOLD],
    outputRange: [1, 0.9],
    extrapolate: "clamp",
  });

  // Sombras según especificación del tema
  const shadows = isDark
    ? {
        md: {
          shadowColor: "transparent",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0,
          shadowRadius: 0,
          elevation: 0,
        },
      }
    : {
        md: {
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 3,
        },
      };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* StatusBar con configuración apropiada */}
      <StatusBar
        barStyle={isDark ? "light-content" : "light-content"}
        backgroundColor={colors.primary}
        translucent={false}
      />

      <HomeHeader
        headerHeight={Animated.add(headerHeight, insets.top)}
        headerOpacity={headerOpacity}
        titleScale={titleScale}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        favoritesCount={favorites.length}
        recipesCount={recipes.length}
        loading={loading}
        showFilters={showFilters}
        onToggleFilters={toggleFilters}
      />

      <FilterSection
        showFilters={showFilters}
        filterOpacity={filterOpacity}
        filterHeight={filterHeight}
        categories={categories}
        selectedCategory={selectedCategory}
        onSearch={handleSearch}
        onClear={handleClearSearch}
        onSelectCategory={handleSelectCategory}
      />

      {/* Lista de recetas con safe area bottom */}
      {loading && recipes.length === 0 ? (
        <View style={[styles.listContent, { paddingBottom: insets.bottom }]}>
          <RecipeCardSkeleton />
          <RecipeCardSkeleton />
          <RecipeCardSkeleton />
        </View>
      ) : (
        <Animated.FlatList
          data={recipes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RecipeCardItem
              recipe={item}
              onPress={() => handleRecipePress(item.id)}
            />
          )}
          contentContainerStyle={[
            styles.listContent,
            {
              paddingBottom: Math.max(insets.bottom + spacing.xl, spacing.xxl),
            },
          ]}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View
                style={[
                  styles.emptyIconContainer,
                  shadows.md,
                  {
                    backgroundColor: colors.surface,
                    borderWidth: isDark ? 1 : 0,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Ionicons
                  name={searchQuery ? "search-outline" : "restaurant-outline"}
                  size={iconSizes.xl}
                  color={colors.textLight}
                />
              </View>
              <Text style={[styles.emptyTitle, { color: colors.text }]}>
                {searchQuery ? "Sin resultados" : "No hay recetas"}
              </Text>
              <Text
                style={[styles.emptySubtitle, { color: colors.textSecondary }]}
              >
                {searchQuery
                  ? `No encontramos recetas para "${searchQuery}"`
                  : "Desliza hacia abajo para recargar"}
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: spacing.md,
    paddingTop: spacing.xl,
    gap: spacing.md,
  },
  emptyContainer: {
    alignItems: "center",
    paddingTop: spacing.xxl * 2,
    paddingHorizontal: spacing.xl,
  },
  emptyIconContainer: {
    width: 140,
    height: 140,
    borderRadius: borderRadius.full,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  emptyTitle: {
    ...typography.h2,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  emptySubtitle: {
    ...typography.bodySm,
    textAlign: "center",
    maxWidth: 260,
  },
});
