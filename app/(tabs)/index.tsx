import { EmptyState, ErrorView, ListSkeleton } from "@/src/components/common";
import { FilterSection, HomeHeader } from "@/src/components/home";
import { RecipeCard } from "@/src/components/recipe";
import { useFavorites, useRecipes, useTheme } from "@/src/hooks";
import { getCategories } from "@/src/services";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, RefreshControl, StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Altura del header flotante (sin contar status bar)
const HEADER_CONTENT_HEIGHT = 52;
// Altura de la tab bar (sin contar bottom inset)
const TAB_BAR_HEIGHT = 58;
const SCROLL_THRESHOLD = 60;

export default function HomeScreen() {
  const router = useRouter();
  const { favorites } = useFavorites();
  const theme = useTheme();
  const { colors, isDark } = theme;
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

  // Manejo del scroll para colapsar filtros
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;

        if (offsetY > SCROLL_THRESHOLD && showFilters) {
          Animated.parallel([
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
          setShowFilters(true);
          Animated.parallel([
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

  // ─── Empty State ──────────────────────────────────────────────
  const renderEmptyState = () => (
    <EmptyState
      icon={searchQuery ? "search-outline" : "restaurant-outline"}
      title={searchQuery ? "Sin resultados" : "No hay recetas"}
      message={
        searchQuery
          ? `No encontramos recetas para "${searchQuery}"`
          : "Desliza hacia abajo para recargar"
      }
      style={{
        paddingTop: theme.spacing.xxl * 2,
        paddingHorizontal: theme.spacing.xl,
      }}
    />
  );

  // Alturas totales para padding
  const headerTotalHeight = insets.top + HEADER_CONTENT_HEIGHT;
  const tabBarTotalHeight = TAB_BAR_HEIGHT + insets.bottom;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* StatusBar translúcido para edge-to-edge */}
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent={true}
      />

      {/* Header flotante (se superpone al contenido) */}
      <HomeHeader
        scrollY={scrollY}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        favoritesCount={favorites.length}
        recipesCount={recipes.length}
        loading={loading}
      />

      {/* Scroll del contenido principal */}
      {loading && recipes.length === 0 ? (
        <View
          style={{
            flex: 1,
            paddingHorizontal: theme.spacing.md,
            paddingTop: headerTotalHeight + theme.spacing.md,
          }}
        >
          <ListSkeleton />
        </View>
      ) : (
        <Animated.ScrollView
          showsVerticalScrollIndicator={true}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentInsetAdjustmentBehavior="never"
          automaticallyAdjustContentInsets={false}
          contentContainerStyle={{
            paddingTop: headerTotalHeight + theme.spacing.xs,
            paddingHorizontal: theme.spacing.md,
            paddingBottom: tabBarTotalHeight + theme.spacing.lg,
          }}
          scrollIndicatorInsets={{
            top: headerTotalHeight,
            bottom: tabBarTotalHeight,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
              progressViewOffset={headerTotalHeight}
            />
          }
        >
          {/* Filter section (colapsable) */}
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

          {/* Recipe List or Empty State */}
          {recipes.length === 0 ? (
            renderEmptyState()
          ) : (
            <View style={{ marginTop: theme.spacing.sm }}>
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  variant="list"
                  onPress={() => handleRecipePress(recipe.id)}
                />
              ))}
            </View>
          )}
        </Animated.ScrollView>
      )}
    </View>
  );
}
