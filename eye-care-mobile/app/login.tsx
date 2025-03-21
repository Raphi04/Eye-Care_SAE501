import { useEffect, useState } from "react";
import { Alert, Button, ImageBackground, SafeAreaView, Text, TextInput, StyleSheet, TouchableOpacity, View } from "react-native";
import { useRouter, useNavigation, Link } from "expo-router";
import UserSession from "./services/userSession";
import projectColors from "./colors";
import { useThemeContext } from "./context/themeContext";

export default function login() {
    // Styles et mode sombre
    const { currentTheme, changeTheme } = useThemeContext();

    const [styles, setStyles] = useState<any>(basicStyle);

    const [backgroundImage, setBackgroundImage] = useState<any>(
        require("../assets/images/eye-care-text.png")
    );

    useEffect(() => {
        if (currentTheme == "light") {
            setStyles(darkModeStyle);
            setBackgroundImage(require("../assets/images/eye-care-text-black2.png"));
        } else {
            setStyles(basicStyle);
            setBackgroundImage(require("../assets/images/eye-care-text.png"));
        }
    }, [currentTheme]);

    // Navigation
    const navigator = useRouter();
    const navigation = useNavigation();

    // Login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const login = async () => {
        const url = "http://10.0.2.2:8000/login";

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
            }

            const result = await response.json();
            UserSession.setSession(result.username, result.api_token);
            navigator.navigate("profile" as any)
        } catch (error) {
            Alert.alert("Erreur", `${error}`);
        }
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ImageBackground source={backgroundImage} style={styles.backgroundImage} resizeMode="cover">
                <View style={styles.formContainer}>
                    <Text style={styles.connexion}>CONNEXION</Text>
                    <TextInput
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Email"
                        keyboardType="email-address"
                    />
                    <TextInput
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Mot de passe"
                        secureTextEntry={true}
                    />
                    <Button title="Se connecter" onPress={login} />
                    <Link href="/">
                        <Text> Retourner à l'Accueil </Text>
                    </Link>

                    <TouchableOpacity onPress={changeTheme}>
                        <Text style={styles.texte}>{currentTheme}</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const basicStyle = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        backgroundColor: projectColors.blueLight,
    },

    safeContainer: {
        flex: 1,
    },

    formContainer: {
        padding: 25,
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },

    connexion: {
        textAlign: "center",
        fontSize: 50,
        fontFamily: "Korolev-Heavy",
    },

    //texte: {
    //    textAlign: "justify",
    //    fontSize: 18,
    //    fontFamily: "Korolev-Medium",
    //},

    whiteTexte: {
        color: "white",
    },

    input: {
        //    fontSize: 18,
        //    fontFamily: "Korolev-Medium",
    }
});

const darkModeStyle = StyleSheet.create({
    ...basicStyle,
    backgroundImage: { ...basicStyle.backgroundImage, backgroundColor: projectColors.blueBlack },
    //texte: { ...basicStyle.texte, color: "white" },
});
