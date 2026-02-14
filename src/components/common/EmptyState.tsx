import { useTheme } from "@/src/hooks";
import { createShadow } from "@/src/utils";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";

interface EmptyStateProps {
  /** Nombre del icono de Ionicons (opcional si se usa customIcon) */
  icon?: keyof typeof Ionicons.glyphMap;
  /** Componente de icono personalizado (ej: animado) tiene prioridad sobre icon */
  customIcon?: React.ReactNode;
  title: string;
  message: string;
  /** Botón o acción opcional debajo del menesaje */
  action?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Si debe centrarse verticalmente en el contenedor padre (flex: 1) */
  centerInContainer?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  customIcon,
  title,
  message,
  action,
  style,
  centerInContainer = false,
}) => {
  const theme = useTheme();
  const { colors, isDark } = theme;

  return (
    <View
      style={[
        {
          alignItems: "center",
          paddingHorizontal: theme.spacing.xl,
          justifyContent: centerInContainer ? "center" : "flex-start",
          flex: centerInContainer ? 1 : undefined,
          // Un poco de margen superior por defecto si no está centrado
          paddingTop: centerInContainer ? 0 : theme.spacing.xxl * 2,
        },
        style,
      ]}
    >
      {/* Icon Container */}
      {customIcon ? (
        <View style={{ marginBottom: theme.spacing.lg }}>{customIcon}</View>
      ) : icon ? (
        <View
          style={[
            {
              width: 120,
              height: 120,
              borderRadius: theme.borderRadius.full,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: theme.spacing.xl,
              backgroundColor: isDark
                ? colors.surfaceVariant
                : "rgba(255,255,255,0.8)",
              borderWidth: isDark ? 1 : 0,
              borderColor: colors.border,
            },
            !isDark && createShadow(theme as any, theme.elevation.medium),
          ]}
        >
          <Ionicons
            name={icon}
            size={theme.iconSizes.xl}
            color={colors.textLight}
          />
        </View>
      ) : null}

      {/* Text Content */}
      <Text
        style={[
          theme.typography.h2,
          {
            color: colors.text,
            marginBottom: theme.spacing.sm,
            textAlign: "center",
          },
        ]}
      >
        {title}
      </Text>

      <Text
        style={[
          theme.typography.bodySm,
          {
            color: colors.textSecondary,
            textAlign: "center",
            maxWidth: 280,
            lineHeight: 22,
          },
        ]}
      >
        {message}
      </Text>

      {/* Action Button */}
      {action && <View style={{ marginTop: theme.spacing.xl }}>{action}</View>}
    </View>
  );
};
