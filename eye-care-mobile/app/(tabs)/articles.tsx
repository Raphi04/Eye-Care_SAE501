import { Link } from "expo-router";
import { SafeAreaView } from "react-native";

export default function Articles() {
  return (
    <SafeAreaView>
      <Link href="/myopie">Myopie</Link>
      <Link href="/daltonisme">Daltonisme</Link>
      <Link href="/presbytie">Presbytie</Link>
      <Link href="/dmla">DMLA</Link>
    </SafeAreaView>
  );
}
