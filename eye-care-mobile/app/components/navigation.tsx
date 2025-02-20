import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function navigation() {
  return (
    <View style={styles.navigationBar}>
      <Link href="/" style={styles.textColor}>
        <Text>Accueil</Text>
      </Link>
      <Link href="/(tabs)/articles" style={styles.textColor}>
        <Text>Articles</Text>
      </Link>
      <Link href="/(tabs)/test" style={styles.textColor}>
        <Text>Tests</Text>
      </Link>{" "}
      <Link href="/(tabs)/profile" style={styles.textColor}>
        <Text>Profile</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  navigationBar: {
    width: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    left: 0,
    bottom: 0,
    backgroundColor: "#182026",
  },
  textColor: {
    color: "#fff",
  },
});
