import { Link } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Test() {
  return (
    <SafeAreaView style={styles.test}>
      <Link href="/">
        <Text>Aller à l'Accueil</Text>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  test: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF00FF",
  },
});
