import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import ThemeProvider from "./context/themeContext";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Korolev-Thin": require("../assets/fonts/Korolev-Thin.otf"),
    "Korolev-Light": require("../assets/fonts/Korolev-Light.otf"),
    "Korolev-Light-Italic": require("../assets/fonts/Korolev-Light-Italic.otf"),
    "Korolev-Medium": require("../assets/fonts/Korolev-Medium.otf"),
    "Korolev-Medium-Italic": require("../assets/fonts/Korolev-Medium-Italic.otf"),
    "Korolev-Bold": require("../assets/fonts/Korolev-Bold.otf"),
    "Korolev-Bold-Italic": require("../assets/fonts/Korolev-Bold-Italic.otf"),
    "Korolev-Heavy": require("../assets/fonts/Korolev-Heavy.otf"),
    "Korolev-Heavy-Italic": require("../assets/fonts/Korolev-Heavy-Italic.otf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider>
      <SafeAreaView style={styles.mainContainer}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
