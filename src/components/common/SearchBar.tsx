import { useTheme } from "@/src/hooks";
import { createShadow } from "@/src/utils";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Platform, TextInput, TouchableOpacity, View } from "react-native";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onClear?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Buscar recetas...",
  onSearch,
  onClear,
}) => {
  const [query, setQuery] = useState("");
  const theme = useTheme();
  const { colors } = theme;

  const handleSearch = (text: string) => {
    setQuery(text);
    onSearch(text);
  };

  const handleClear = () => {
    setQuery("");
    if (onClear) {
      onClear();
    } else {
      onSearch("");
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        backgroundColor: colors.surface,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderRadius: theme.borderRadius.md,
          paddingHorizontal: theme.spacing.md,
          backgroundColor: colors.background,
          ...createShadow(theme as any, theme.elevation.low),
        }}
      >
        <Ionicons
          name="search"
          size={18}
          color={colors.textSecondary}
          style={{ marginRight: theme.spacing.sm }}
        />
        <TextInput
          style={[
            theme.typography.bodyLg,
            {
              flex: 1,
              color: colors.text,
              paddingVertical:
                Platform.OS === "ios" ? theme.spacing.sm + 2 : theme.spacing.sm,
            },
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.textLight}
          value={query}
          onChangeText={handleSearch}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity
            onPress={handleClear}
            style={{ padding: theme.spacing.xs }}
          >
            <Ionicons
              name="close-circle"
              size={18}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchBar;
