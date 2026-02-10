import { StateCreator } from "zustand";

export type ThemeMode = "light" | "dark" | "system";

export interface ThemeSlice {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

export const createThemeSlice: StateCreator<ThemeSlice> = (set) => ({
  themeMode: "system",
  setThemeMode: (mode) => set({ themeMode: mode }),
});
