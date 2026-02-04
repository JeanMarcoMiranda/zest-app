import {
  CategoryFilter,
  ErrorView,
  RecipeCardSkeleton,
  SearchBar,
} from "@/src/components/common";
import { RecipeCardItem } from "@/src/components/recipe";
import { useFavorites, useTheme } from "@/src/hooks";
import {
  getCategories,
  getRandomRecipes,
  getRecipesByCategory,
  searchRecipes,
} from "@/src/services";
import { spacing, typography } from "@/src/theme";
import { RecipeCard } from "@/src/types/recipe.types";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const fontSize = {
  xs: typography.fontSize.xs,
  sm: typography.fontSize.sm,
  md: typography.fontSize.base,
  lg: typography.fontSize.lg,
  xl: typography.fontSize.xl,
  xxl: typography.fontSize["2xl"],
  xxxl: typography.fontSize["3xl"],
};

const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  round: 9999,
};

const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
};

// Alturas del header (sin contar safe area)
const HEADER_CONTENT_EXPANDED = 110;
const HEADER_CONTENT_COLLAPSED = 56;
const SCROLL_THRESHOLD = 50;

export default function HomeScreen() {
  const router = useRouter();
  const { favorites } = useFavorites();
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const [recipes, setRecipes] = useState<RecipeCard[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
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

  const loadRecipes = async () => {
    try {
      setError(false);
      let data: RecipeCard[] = [];

      if (searchQuery.trim() !== "") {
        data = await searchRecipes(searchQuery);
      } else if (selectedCategory) {
        data = await getRecipesByCategory(selectedCategory);
      } else {
        data = await getRandomRecipes(6);
      }

      setRecipes(data);
    } catch (err) {
      console.error("Error loading recipes:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadRecipes();
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
      setLoading(true);
      loadRecipes();
    }, 500);

    return () => clearTimeout(delayDebounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedCategory]);

  const handleRecipePress = (recipeId: string) => {
    router.push(`/recipe/${recipeId}` as any);
  };

  if (error && recipes.length === 0) {
    return (
      <ErrorView
        message="No pudimos cargar las recetas. Verifica tu conexión."
        onRetry={loadRecipes}
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
    outputRange: [1, 0.92],
    extrapolate: "clamp",
  });

  const getHeaderMessage = () => {
    if (searchQuery) return `"${searchQuery}"`;
    if (selectedCategory) return selectedCategory;
    if (favorites.length > 0) {
      return `${favorites.length} ${favorites.length === 1 ? "favorito" : "favoritos"}`;
    }
    return "Explora nuevas recetas";
  };

  const getHeaderIcon = () => {
    if (searchQuery) return "search-outline";
    if (selectedCategory) return "restaurant";
    if (favorites.length > 0) return "heart";
    return "sparkles";
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* StatusBar con configuración apropiada */}
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.primary}
        translucent={false}
      />

      {/* Header Animado Colapsable con SafeArea */}
      <Animated.View
        style={[
          styles.headerContainer,
          {
            height: Animated.add(headerHeight, insets.top),
            opacity: headerOpacity,
          },
        ]}
      >
        <LinearGradient
          colors={[colors.primary, colors.primaryLight]}
          style={styles.headerGradient}
        >
          {/* Safe area top espaciado */}
          <View style={{ height: insets.top }} />

          <View style={styles.header}>
            {/* Parte superior del header */}
            <Animated.View
              style={[styles.headerTop, { transform: [{ scale: titleScale }] }]}
            >
              <View style={styles.titleContainer}>
                <View
                  style={[
                    styles.logoContainer,
                    { backgroundColor: "rgba(255, 255, 255, 0.25)" },
                  ]}
                >
                  <Ionicons name="restaurant" size={24} color="#FFFFFF" />
                </View>
                <View style={styles.titleContent}>
                  <Text style={styles.title}>ChefHub</Text>
                  <View style={styles.subtitleRow}>
                    <Ionicons
                      name={getHeaderIcon()}
                      size={14}
                      color="rgba(255, 255, 255, 0.9)"
                    />
                    <Text style={styles.subtitle}>{getHeaderMessage()}</Text>
                  </View>
                </View>
              </View>

              {/* Badge y botón de filtros */}
              <View style={styles.headerActions}>
                {!loading && recipes.length > 0 && (
                  <View style={styles.recipeBadge}>
                    <Text style={styles.recipeBadgeText}>{recipes.length}</Text>
                  </View>
                )}
                <TouchableOpacity
                  onPress={toggleFilters}
                  style={styles.filterToggle}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={showFilters ? "chevron-up" : "funnel"}
                    size={20}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Filtros Colapsables */}
      <Animated.View
        style={[
          styles.filtersContainer,
          {
            backgroundColor: colors.background,
            opacity: filterOpacity,
            maxHeight: filterHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 300],
            }),
            transform: [
              {
                translateY: filterHeight.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, 0],
                }),
              },
            ],
          },
        ]}
        pointerEvents={showFilters ? "auto" : "none"}
      >
        <SearchBar
          placeholder="Buscar recetas..."
          onSearch={handleSearch}
          onClear={handleClearSearch}
        />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
      </Animated.View>

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
            { paddingBottom: Math.max(insets.bottom, spacing.lg) },
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
                  { backgroundColor: colors.surface },
                ]}
              >
                <Ionicons
                  name={searchQuery ? "search-outline" : "restaurant-outline"}
                  size={56}
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
  headerContainer: {
    overflow: "hidden",
    zIndex: 1000,
  },
  headerGradient: {
    flex: 1,
    ...shadows.md,
  },
  header: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    justifyContent: "center",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    flex: 1,
  },
  logoContainer: {
    width: 52,
    height: 52,
    borderRadius: borderRadius.xl,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.4)",
    ...shadows.md,
  },
  titleContent: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.5,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    marginBottom: 2,
  },
  subtitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: "rgba(255, 255, 255, 0.95)",
    fontWeight: "600",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  recipeBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: borderRadius.round,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    minWidth: 48,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.5)",
    ...shadows.sm,
  },
  recipeBadgeText: {
    fontSize: fontSize.lg,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  filterToggle: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.round,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  filtersContainer: {
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    ...shadows.sm,
    zIndex: 999,
  },
  listContent: {
    padding: spacing.md,
    paddingTop: spacing.lg,
  },
  emptyContainer: {
    alignItems: "center",
    paddingTop: spacing.xxl * 3,
    paddingHorizontal: spacing.xl,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: borderRadius.xxl,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.xl,
    ...shadows.md,
  },
  emptyTitle: {
    fontSize: fontSize.xxl,
    fontWeight: "700",
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: fontSize.md,
    textAlign: "center",
    lineHeight: 24,
    maxWidth: 280,
  },
});
