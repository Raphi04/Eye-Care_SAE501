import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import projectColors from "../../colors";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useThemeContext } from "../../context/themeContext";
import ArticleButton from "../articleButton";

export default function Index() {
    const { currentTheme, changeTheme } = useThemeContext();
    const router = useRouter();

    const [styles, setStyles] = useState<any>(basicStyle);

    const [backgroundImage, setBackgroundImage] = useState<any>(
    require("../../../assets/images/eye-care-text.png")
    );

    useEffect(() => {
    if (currentTheme == "light") {
        setStyles(darkModeStyle);
        setBackgroundImage(
        require("../../../assets/images/eye-care-text-black2.png")
        );
    } else {
        setStyles(basicStyle);
        setBackgroundImage(require("../../../assets/images/eye-care-text.png"));
    }
    }, [currentTheme]);

    return (
        <View style={styles.flex1}>
            <ScrollView style={styles.safeContainer}>
                <ImageBackground
                source={backgroundImage}
                style={styles.backgroundImage}
                resizeMode="cover"
                >
                <View style={styles.accueil}>
                    <View style={[styles.texteContainer, styles.blackContainer]}>
                    <Text style={[styles.titre, styles.whiteTitre]}>PRESBYTIE</Text>
                    <Text style={[styles.texte, styles.whiteTexte]}>
                        La presbytie est un trouble visuel lié au vieillissement naturel
                        de l'œil, qui se traduit par une difficulté croissante à voir
                        nettement les objets ou textes situés à proximité. Ce phénomène
                        est causé par une perte progressive de souplesse du cristallin, la
                        lentille naturelle de l'œil, qui permet normalement de faire la
                        mise au point sur différentes distances. Avec le temps, le
                        cristallin devient moins flexible et les muscles oculaires peinent
                        à ajuster sa courbure, rendant la vision de près floue. Ce trouble
                        commence généralement à se manifester après l’âge de 40 ans et
                        tend à s’accentuer jusqu’à environ 60 ans. Bien que la presbytie
                        soit une conséquence naturelle du vieillissement et non une
                        maladie en soi, elle peut considérablement impacter les activités
                        quotidiennes comme la lecture ou l’utilisation d’un écran.
                    </Text>
                    </View>

                    <View style={styles.texteSousContainer}>
                    <Text style={styles.titre}>INFORMATIONS CLÉS</Text>
                    <Text style={styles.soustitre}>100 % des + de 45 ans</Text>
                    <Text style={styles.texte}>
                        La presbytie touche environ 100 % des individus âgés de plus de 45
                        ans à des degrés variables.
                    </Text>
                    </View>
                    <View style={styles.texteSousContainer}>
                    <Text style={styles.soustitre}>≃ 2,1 milliards</Text>
                    <Text style={styles.texte}>
                        Environ 2,1 milliards de personnes dans le monde sont presbytes,
                        selon l'OMS, dont 1,1 milliard ne peuvent pas accéder à des soins
                        pour corriger cette condition.
                    </Text>
                    </View>
                    <View style={styles.texteSousContainer}>
                    <Text style={styles.soustitre}>- 50 % de productivité</Text>
                    <Text style={styles.texte}>
                        Sans correction, la presbytie affecte directement la productivité
                        de 50 % des adultes en âge de travailler dans certains pays en
                        développement.
                    </Text>
                    </View>
                    <View style={styles.texteSousContainer}>
                    <Text style={styles.soustitre}>Les symptomes ↗</Text>
                    <Text style={styles.texte}>
                        Les symptômes augmentent avec l'âge, nécessitant souvent des
                        corrections plus fortes au fil du temps. Cependant, il s'agit d'un
                        phénomène naturel, et il n'y a pas de raison de s'inquiéter.
                    </Text>
                    </View>

                    <View style={[styles.texteContainer, styles.blackContainer]}>
                    <Text style={[styles.titre, styles.whiteTitre]}>LES CAUSES</Text>
                    <Text style={[styles.texte, styles.whiteTexte]}>
                        La presbytie est causée par une combinaison de facteurs
                        physiologiques liés à l’âge. Avec le temps, le cristallin de l’œil
                        perd de son élasticité, ce qui empêche une adaptation efficace
                        pour la vision de près. Ce processus est inévitable et n’est pas
                        influencé par des facteurs extérieurs comme l’utilisation
                        prolongée d’écrans ou la fatigue oculaire, bien que ces derniers
                        puissent accentuer la perception des symptômes.
                    </Text>
                    <Text style={[styles.texte, styles.whiteTexte]}>
                        Par ailleurs, le vieillissement des muscles ciliaires, qui
                        contrôlent la courbure du cristallin, contribue également à ce
                        trouble. Contrairement à d’autres défauts visuels comme la myopie
                        ou l’hypermétropie, la presbytie est directement liée au processus
                        de vieillissement et touche toutes les personnes, indépendamment
                        de leur santé oculaire préalable.
                    </Text>
                    </View>

                    <View style={styles.texteContainer}>
                    <Text style={styles.titre}>LES TRAITEMENTS</Text>
                    <Text style={styles.texte}>
                        La presbytie peut être corrigée de différentes manières pour
                        améliorer la vision de près. Les lunettes sont la solution la plus
                        courante, avec des verres progressifs ou des verres de lecture
                        spécifiques, qui offrent une correction adaptée pour la mise au
                        point de près. Les lentilles de contact, notamment les lentilles
                        multifocales ou la monovision, représentent une autre alternative
                        pour les personnes qui préfèrent éviter le port de lunettes.
                    </Text>
                    <Text style={styles.texte}>
                        Pour ceux qui recherchent une solution permanente, des
                        interventions chirurgicales existent, comme le remplacement du
                        cristallin par une lentille artificielle multifocale ou
                        l’utilisation de techniques au laser pour remodeler la cornée et
                        compenser la perte de souplesse du cristallin. Enfin, de nouvelles
                        technologies, comme des implants accommodatifs ou des collyres
                        expérimentaux visant à restaurer une partie de l’élasticité du
                        cristallin, sont en cours de développement. Cependant, il est
                        essentiel de consulter un ophtalmologiste pour choisir la solution
                        la plus adaptée à ses besoins.
                    </Text>
                    </View>

                    <View style={styles.buttonContainer}>
                    <ArticleButton
                        title="Astigmatisme"
                        onPress={() =>
                        router.push("/components/pagesArticles/astigmatisme")
                        }
                        style={styles}
                    />
                    <ArticleButton
                        title="Daltonisme"
                        onPress={() =>
                        router.push("/components/pagesArticles/daltonisme")
                        }
                        style={styles}
                    />
                    <ArticleButton
                        title="DMLA"
                        onPress={() => router.push("/components/pagesArticles/dmla")}
                        style={styles}
                    />
                    <ArticleButton
                        title="Hypermétropie"
                        onPress={() =>
                        router.push("/components/pagesArticles/hypermetropie")
                        }
                        style={styles}
                    />
                    </View>
                </View>
                </ImageBackground>
            </ScrollView>
            <TouchableOpacity style={styles.changeTheme} onPress={changeTheme}>
                <Text style={[styles.texte, styles.whiteTexteUnchanged]}>{currentTheme}</Text>
            </TouchableOpacity>
        </View>
    );
}

const basicStyle = StyleSheet.create({
    safeContainer: {
    flex: 1,
    overflow: "scroll",
    },

    backgroundImage: {
    flex: 1,
    backgroundColor: projectColors.blueLight,
    },

    accueil: {
    flex: 1,
    flexDirection: "column",
    },

    header: {
    padding: 25,
    backgroundColor: projectColors.blueBlack,
    },
    row: {
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
    marginBottom: 15,
    },
    buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 15,
    marginBottom: 65,
    },
    texteContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 25,
    paddingVertical: 55,
    paddingHorizontal: 35,
    },
    texteSousContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 25,
    paddingVertical: 25,
    paddingHorizontal: 35,
    },

    blackContainer: {
    backgroundColor: projectColors.blueBlack,
    },

    whiteContainer: {
    backgroundColor: "white",
    },

    bienvenue: {
    textAlign: "center",
    fontSize: 50,
    fontFamily: "Korolev-Heavy",
    },

    titre: {
    textAlign: "center",
    fontSize: 28,
    fontFamily: "Korolev-Bold",
    },

    soustitre: {
    textAlign: "center",
    fontSize: 23,
    fontFamily: "Korolev-Bold",
    color: "blueBlack",
    },

    whiteTitre: {
    color: "white",
    },

    texte: {
    textAlign: "justify",
    fontSize: 18,
    fontFamily: "Korolev-Medium",
    },

    whiteTexte: {
    color: "white",
    },

    link: {
    padding: 20,
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

    flex1: {
        flex: 1,
    },
});

const darkModeStyle = StyleSheet.create({
    ...basicStyle,
    backgroundImage: {
    ...basicStyle.backgroundImage,
    backgroundColor: projectColors.blueBlack,
    },
    header: { ...basicStyle.header, backgroundColor: projectColors.blueLight },
    bienvenue: { ...basicStyle.bienvenue, color: "white" },
    titre: { ...basicStyle.titre, color: "white" },
    soustitre: { ...basicStyle.soustitre, color: "white" },
    texte: { ...basicStyle.texte, color: "white" },
    blackContainer: {
    ...basicStyle.blackContainer,
    backgroundColor: projectColors.blueLight,
    },
    changeTheme: { ...basicStyle.changeTheme, backgroundColor: projectColors.blueButton },
    whiteTexte: { color: "black" },
    whiteTitre: { color: "black" },
});
