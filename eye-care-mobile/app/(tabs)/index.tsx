import { Link, useNavigation } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.accueil}>
      <Link href="/test" style={styles.link}>
        Aller au test
      </Link>

      <Link href="/articles" style={styles.link}>
        Aller aux articles
      </Link>

      <Link href="/profile" style={styles.link}>
        Aller au profile
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  accueil: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFF00",
  },
  link: {
    padding: 20,
  },
});
