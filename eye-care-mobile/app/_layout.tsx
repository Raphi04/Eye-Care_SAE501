import { Stack } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";

import Navigation from "./components/navigation";

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Stack screenOptions={{ headerShown: false }} />
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "FF0000",
  },
});
