import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { spacing } from "../../styles/theme";
import { Step, StepItem } from "./StepItem";

interface VerticalStepperProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
  onStepPress: (index: number) => void;
  onStepComplete: (index: number) => void;
}

export const VerticalStepper: React.FC<VerticalStepperProps> = ({
  steps,
  currentStep,
  completedSteps,
  onStepPress,
  onStepComplete,
}) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {steps.map((step, index) => (
        <StepItem
          key={index}
          step={step}
          index={index}
          isActive={currentStep === index}
          isCompleted={completedSteps.includes(index)}
          isLast={index === steps.length - 1}
          onPress={() => onStepPress(index)}
          onComplete={() => onStepComplete(index)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
});
