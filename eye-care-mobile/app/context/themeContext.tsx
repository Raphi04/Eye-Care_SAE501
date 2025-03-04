import { Children, createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import * as SecureStore from "expo-secure-store";

const ThemeContext = createContext({ currentTheme: "light", changeTheme: async () => {} });

export const useThemeContext = () => useContext(ThemeContext);

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const systemTheme = useColorScheme();
  const [currentTheme, setCurrentTheme] = useState(systemTheme || "light");

  async function loadTheme() {
    const localTheme = await SecureStore.getItemAsync("theme");
    if (localTheme == "light" || localTheme == "dark") {
      setCurrentTheme(localTheme);
    }
  }
  useEffect(() => {
    loadTheme();
  }, []);

  async function changeTheme() {
    if (currentTheme == "light") {
      setCurrentTheme("dark");
      await SecureStore.setItemAsync("theme", "dark");
    } else {
      setCurrentTheme("light");
      await SecureStore.setItemAsync("theme", "light");
    }
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme }}>{children}</ThemeContext.Provider>
  );
}
