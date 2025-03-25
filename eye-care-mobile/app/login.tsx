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
        <View style={styles.flex1}>
            <SafeAreaView style={styles.flex1}>
                <ImageBackground source={backgroundImage} style={styles.backgroundImage} resizeMode="cover">
                    <View style={styles.formContainer}>
                        <Text style={styles.connexion}>CONNEXION</Text>
                        <TextInput
                            onChangeText={setEmail}
                            value={email}
                            placeholder="Email"
                            keyboardType="email-address"
                            style={styles.input}
                        />
                        <TextInput
                            onChangeText={setPassword}
                            value={password}
                            placeholder="Mot de passe"
                            secureTextEntry={true}
                                                    style={styles.input}
                        />
                        <View style={styles.row}>
                            <TouchableOpacity style={styles.button} onPress={login}>
                                <Text style={styles.buttonText}>SE CONNECTER </Text>
                            </TouchableOpacity>
                            <Link href="/" style={styles.button}>
                                <Text style={styles.buttonText}> Retourner à l'Accueil </Text>
                            </Link>
                        </View>
                    </View>
                </ImageBackground>
            </SafeAreaView>
            <TouchableOpacity style={styles.changeTheme} onPress={changeTheme}>
                <Text style={[styles.texte, styles.whiteTexteUnchanged]}>{currentTheme}</Text>
            </TouchableOpacity>
        </View>
        
    );
}

const basicStyle = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        backgroundColor: projectColors.blueLight,
    },

    flex1: {
        flex: 1,
    },

    formContainer: {
        padding: 25,
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },

    connexion: {
        textAlign: "center",
        fontSize: 50,
        fontFamily: "Korolev-Heavy",
        marginBottom: 24,
    },

    texte: {
        textAlign: "justify",
        fontSize: 18,
        fontFamily: "Korolev-Medium",
    },

    whiteTexte: {
        color: "white",
    },

    input: {
        fontSize: 18,
        backgroundColor: "white",
        borderRadius: 10,
        width: 300,
        paddingLeft: 12,
        marginBottom: 24,
    },

    button: {
        backgroundColor: projectColors.blueButtonHover,
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 14,
        marginBottom: 10,
        marginHorizontal: 8,
    },

    buttonText: {
        textAlign: "center",
        color: "white",
        fontSize: 15,
        fontFamily: "Korolev-Heavy",
    },

    changeTheme: {
        position: "absolute",
        bottom: 16,
        right: 16,
        backgroundColor: projectColors.blueButtonHover,
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },

    whiteTexteUnchanged: {
        color: "white",
    },

    row: {
        flexDirection: "row",
        marginBottom: 8,
    }
});

const darkModeStyle = StyleSheet.create({
    ...basicStyle,
    backgroundImage: { ...basicStyle.backgroundImage, backgroundColor: projectColors.blueBlack },
    connexion: { ...basicStyle.connexion, color: "white" },
    texte: { ...basicStyle.texte, color: "white" },
    changeTheme: { ...basicStyle.changeTheme, backgroundColor: projectColors.blueButton },
});
