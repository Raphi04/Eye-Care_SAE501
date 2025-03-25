import {
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useRouter } from "expo-router";
import projectColors from "../colors";
import { useEffect, useState } from "react";
import { useThemeContext } from "../context/themeContext";
import ArticleButton from "../components/articleButton";


export default function Articles() {
    const { currentTheme, changeTheme } = useThemeContext();

    const [styles, setStyles] = useState<any>(basicStyle);

    const [backgroundImage, setBackgroundImage] = useState<any>(
        require("../../assets/images/eye-care-text.png")
    );

    useEffect(() => {
        if (currentTheme == "light") {
            setStyles(darkModeStyle);
            setBackgroundImage(require("../../assets/images/eye-care-text-black2.png"));
        } else {
            setStyles(basicStyle);
            setBackgroundImage(require("../../assets/images/eye-care-text.png"));
        }
    }, [currentTheme]);

    const router = useRouter();

    return (
        <View style={styles.flex1}>
            <SafeAreaView style={styles.flex1}>
                <ImageBackground source={backgroundImage} style={styles.backgroundImage} resizeMode="cover">
                    <View style={styles.articles}>
                        <View style={styles.texteContainer}>
                            <Text style={styles.bienvenue}>ARTICLES</Text>
                            <Text style={styles.texte}>
                            Dans cette partie, vous aurez accès à l'ensemble des articles
                            disponible sur notre application pour en apprendre plus sur les
                            différents troubles de la vue qui existent.
                            </Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <ArticleButton title="Astigmatisme" onPress={() => router.push("../components/pagesArticles/astigmatisme")} style={styles} />
                            <ArticleButton title="Daltonisme" onPress={() => router.push("../components/pagesArticles/daltonisme")} style={styles} />
                            <ArticleButton title="DMLA" onPress={() => router.push("../components/pagesArticles/dmla")} style={styles} />
                            <ArticleButton title="Hypermétropie" onPress={() => router.push("../components/pagesArticles/hypermetropie")} style={styles} />
                            <ArticleButton title="Myopie" onPress={() => router.push("../components/pagesArticles/myopie")} style={styles} />
                            <ArticleButton title="Presbytie" onPress={() => router.push("../components/pagesArticles/presbytie")} style={styles} />
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
    flex1: {
        flex: 1,
    },

    articles: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },

    backgroundImage: {
    flex: 1,
    backgroundColor: projectColors.blueLight,
    },
    texteContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 25,
    paddingVertical: 55,
    paddingHorizontal: 35,
    },
    buttonContainer: {
    flexDirection: "row", 
    flexWrap: "wrap", 
    justifyContent: "space-between", 
    paddingHorizontal: 10,
    marginTop: 40,
    marginBottom: 150,
    },

    bienvenue: {
    textAlign: "center",
    fontSize: 50,
    fontFamily: "Korolev-Heavy",
    },
    texte: {
    textAlign: "justify",
    fontSize: 20,
    fontFamily: "Korolev-Medium",
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
});

const darkModeStyle = StyleSheet.create({
    ...basicStyle,
    backgroundImage: {
    ...basicStyle.backgroundImage,
    backgroundColor: projectColors.blueBlack,
    },
    bienvenue: { ...basicStyle.bienvenue, color: "white" },
    texte: { ...basicStyle.texte, color: "white" },
    changeTheme: { ...basicStyle.changeTheme, backgroundColor: projectColors.blueButton },
});
