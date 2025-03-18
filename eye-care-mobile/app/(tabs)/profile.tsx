import { useEffect, useState } from "react";
import { SafeAreaView, Text, Button } from "react-native";
import UserSession from "../services/UserSession";
import { useRouter } from "expo-router";

export default function profile() {
    const navigation = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(UserSession.isAuthenticated);

    useEffect(() => {
        UserSession.setAuthStateSetter(setIsAuthenticated);
        UserSession.getSession();
    }, []);

    useEffect(() => {
        if (!isAuthenticated) {
            navigation.navigate("login" as any)
        }
    }, [isAuthenticated]);

  return (
    <SafeAreaView>
          <Text>Je suis profile</Text>
          <Button title="Se deco" onPress={UserSession.clearSession} />
    </SafeAreaView>
  );
}
