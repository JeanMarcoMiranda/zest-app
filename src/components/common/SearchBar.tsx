import { useTheme } from "@/src/hooks";
import { borderRadius, spacing } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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
  const { colors } = useTheme();

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
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View
        style={[styles.searchContainer, { backgroundColor: colors.background }]}
      >
        <Ionicons
          name="search"
          size={18}
          color={colors.textSecondary}
          style={styles.searchIcon}
        />
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder={placeholder}
          placeholderTextColor={colors.textLight}
          value={query}
          onChangeText={handleSearch}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
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

// Extraer valores del tema para usar en StyleSheet.create()
const bodyLgStyles = {
  fontFamily: "Inter-Regular",
  fontSize: 16,
  fontWeight: "500" as const,
  lineHeight: 1.5,
  letterSpacing: 0,
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    ...bodyLgStyles,
    paddingVertical: Platform.OS === "ios" ? spacing.sm + 2 : spacing.sm,
  },
  clearButton: {
    padding: spacing.xs,
  },
});

export default SearchBar;
