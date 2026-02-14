// app/cooking/[id].tsx

import { ErrorView, LoadingSpinner } from "@/src/components/common";
import { StepCard } from "@/src/components/cooking";
import { useRecipes, useTheme } from "@/src/hooks";
import { layout } from "@/src/theme";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StatusBar,
  Text,
  View,
  ViewToken,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function CookingStepsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const { colors, isDark } = theme;
  const insets = useSafeAreaInsets();
  const { currentRecipe, isLoading, fetchRecipeById } = useRecipes();

  const recipe = currentRecipe?.id === id ? currentRecipe : null;
  const loading = isLoading && !recipe;

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const flatListRef = useRef<FlatList>(null);

  // Animation for progress bar
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    if (!recipe && id) {
      fetchRecipeById(id);
    }
  }, [id, recipe, fetchRecipeById]);

  const steps = recipe?.steps || [];
  const totalSteps = steps.length;
  const progress = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;
  const completedCount = completedSteps.length;
  const allCompleted = completedCount === totalSteps && totalSteps > 0;

  // Animate progress bar
  useEffect(() => {
    progressWidth.value = withTiming(progress, { duration: 350 });
  }, [progress, progressWidth]);

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  // FlatList viewability config
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setCurrentStep(viewableItems[0].index);
      }
    },
  ).current;

  const handleStepComplete = useCallback((stepNumber: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNumber)
        ? prev.filter((i) => i !== stepNumber)
        : [...prev, stepNumber],
    );
  }, []);

  const goToStep = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalSteps) {
        flatListRef.current?.scrollToIndex({ index, animated: true });
      }
    },
    [totalSteps],
  );

  const handlePrev = useCallback(() => {
    goToStep(currentStep - 1);
  }, [currentStep, goToStep]);

  const handleNext = useCallback(() => {
    goToStep(currentStep + 1);
  }, [currentStep, goToStep]);

  const handleFinish = () => {
    router.back();
  };

  if (loading) {
    return <LoadingSpinner message="Preparando la cocina..." />;
  }

  if (!recipe) {
    return <ErrorView message="No pudimos cargar las instrucciones." />;
  }

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Edge-to-edge StatusBar */}
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent={true}
      />

      {/* ─── Step Cards — Paginated FlatList ─── */}
      {/* 
         NOTE: We render the list FIRST so it goes BEHIND the header.
         The StepCard has internal padding to push content down.
      */}
      <FlatList
        ref={flatListRef}
        data={steps}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.number)}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
        renderItem={({ item, index }) => (
          <StepCard
            step={item}
            index={index}
            totalSteps={totalSteps}
            isCompleted={completedSteps.includes(item.number)}
            onComplete={() => handleStepComplete(item.number)}
            screenWidth={SCREEN_WIDTH}
            // Pass the header height + spacing as top padding
            contentPaddingTop={insets.top + 60}
            // Pass the bottom nav height + spacing as bottom padding
            contentPaddingBottom={insets.bottom + 100} // Approx height of floating nav
          />
        )}
      />

      {/* ─── Absolute Glass Header ─── */}
      <BlurView
        intensity={layout.blur.regular}
        tint={isDark ? "dark" : "light"}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          paddingTop: insets.top,
          borderBottomWidth: 1,
          borderBottomColor: isDark
            ? "rgba(255,255,255,0.05)"
            : "rgba(0,0,0,0.05)",
        }}
      >
        <View
          style={{
            height: 60, // Fixed height for header content
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: theme.spacing.md,
          }}
        >
          {/* Close Button */}
          <Pressable
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: isDark
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.05)",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => router.back()}
          >
            <MaterialIcons name="close" size={20} color={colors.text} />
          </Pressable>

          {/* Title and Progress */}
          <View style={{ flex: 1, marginHorizontal: theme.spacing.md }}>
            <Text
              style={[
                theme.typography.h3,
                { color: colors.text, fontSize: 16, textAlign: "left" },
              ]}
              numberOfLines={1}
            >
              {recipe.title}
            </Text>
            <Text
              style={[
                theme.typography.caption,
                { color: colors.textSecondary, fontSize: 11 },
              ]}
            >
              PASO {currentStep + 1} DE {totalSteps}
            </Text>
          </View>

          {/* Simple Progress Indicator Ring? Or just text? Kept text above. */}
          {/* Maybe a small visual indicator of completion? */}
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              borderWidth: 2,
              borderColor: allCompleted ? colors.success : colors.primary,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 10, fontWeight: "bold", color: colors.text }}
            >
              {Math.round(progress)}%
            </Text>
          </View>
        </View>

        {/* Slim Progress Bar at Bottom */}
        <View
          style={{
            height: 2,
            backgroundColor: isDark
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.05)",
            width: "100%",
          }}
        >
          <Animated.View
            style={[
              animatedProgressStyle,
              {
                height: "100%",
                backgroundColor: colors.primary,
              },
            ]}
          />
        </View>
      </BlurView>

      {/* ─── Dot Indicators (Floating above bottom content?) ─── */}
      {/* Actually, dots might be redundant with the new progress designs. 
           Let's keep them but maybe move them or style them subtly. 
           Or remove them if we want cleaner look. User asked for minimal. 
           Let's keep them for navigation context but ensure they don't conflict. 
       */}

      {/* ─── Bottom Navigation — Floating Glass Bar ─── */}
      <BlurView
        intensity={layout.blur.regular}
        tint={isDark ? "dark" : "light"}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: theme.spacing.md,
          paddingTop: theme.spacing.md,
          paddingBottom: insets.bottom + theme.spacing.md,
          borderTopWidth: 1,
          borderTopColor: isDark
            ? "rgba(255,255,255,0.1)"
            : "rgba(255,255,255,0.2)",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: theme.spacing.sm,
          }}
        >
          {/* Previous Button */}
          <Pressable
            style={{
              flex: 1,
              paddingVertical: theme.spacing.md,
              borderRadius: theme.borderRadius.full,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: theme.spacing.xs,
              backgroundColor: isDark
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.05)",
              opacity: isFirstStep ? 0.3 : 1,
            }}
            onPress={handlePrev}
            disabled={isFirstStep}
          >
            <Ionicons name="chevron-back" size={20} color={colors.text} />
          </Pressable>

          {/* Next / Finish Button */}
          {isLastStep ? (
            <Pressable
              style={{
                flex: 3,
                paddingVertical: theme.spacing.md,
                borderRadius: theme.borderRadius.full,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: theme.spacing.sm,
                backgroundColor: allCompleted ? colors.success : colors.primary,
                shadowColor: allCompleted ? colors.success : colors.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 4,
              }}
              onPress={handleFinish}
            >
              <MaterialIcons
                name={allCompleted ? "celebration" : "check-circle"}
                size={20}
                color={allCompleted ? "#FFF" : colors.textInverse}
              />
              <Text
                style={[
                  theme.typography.button,
                  { color: allCompleted ? "#FFF" : colors.textInverse },
                ]}
              >
                {allCompleted ? "¡Completada!" : "Finalizar receta"}
              </Text>
            </Pressable>
          ) : (
            <Pressable
              style={{
                flex: 3,
                paddingVertical: theme.spacing.md,
                borderRadius: theme.borderRadius.full,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: theme.spacing.xs,
                backgroundColor: colors.primary,
                shadowColor: colors.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 4,
              }}
              onPress={handleNext}
            >
              <Text
                style={[theme.typography.button, { color: colors.textInverse }]}
              >
                Siguiente paso
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textInverse}
              />
            </Pressable>
          )}
        </View>
      </BlurView>
    </View>
  );
}
