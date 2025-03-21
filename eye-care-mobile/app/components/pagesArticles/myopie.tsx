import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
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
    <ScrollView style={styles.safeContainer}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.accueil}>
          <View style={[styles.texteContainer, styles.blackContainer]}>
            <Text style={[styles.titre, styles.whiteTitre]}>MYOPIE</Text>
            <Text style={[styles.texte, styles.whiteTexte]}>
              La myopie est un trouble visuel courant qui se traduit par une
              vision claire pour les objets proches mais une difficulté à voir
              nettement les objets éloignés. Cela s'explique par un œil trop
              long ou une courbure excessive de la cornée, ce qui provoque une
              focalisation de l'image en avant de la rétine au lieu de
              directement sur celle-ci. Cette anomalie peut entraîner une gêne
              quotidienne, comme de la difficulté à lire des panneaux de
              signalisation ou à reconnaître des visages à distance. Sans
              correction, la myopie peut causer des maux de tête, une fatigue
              oculaire et augmenter le risque de complications graves, telles
              que le décollement de la rétine.
            </Text>
          </View>

          <View style={styles.texteSousContainer}>
            <Text style={styles.titre}>INFORMATIONS CLÉS</Text>
            <Text style={styles.soustitre}>2,6 milliards</Text>
            <Text style={styles.texte}>
              Actuellement, 2,6 milliards de personnes sont myopes dans le
              monde.
            </Text>
          </View>
          <View style={styles.texteSousContainer}>
            <Text style={styles.soustitre}>50 %</Text>
            <Text style={styles.texte}>
              Selon l'OMS, d'ici 2050, 50 % de la population mondiale pourrait
              être myope.
            </Text>
          </View>
          <View style={styles.texteSousContainer}>
            <Text style={styles.soustitre}>10x plus de risque</Text>
            <Text style={styles.texte}>
              Les personnes myopes présentent un risque 10x plus élevé de
              développer une dégénérescence maculaire myopique.
            </Text>
          </View>
          <View style={styles.texteSousContainer}>
            <Text style={styles.soustitre}>⅓ des français</Text>
            <Text style={styles.texte}>
              ⅓ des français souffre de myopie, soit près de 27 millions en
              France, et ce chiffre est en augmentation constante.
            </Text>
          </View>

          <View style={[styles.texteContainer, styles.blackContainer]}>
            <Text style={[styles.titre, styles.whiteTitre]}>LES CAUSES</Text>
            <Text style={[styles.texte, styles.whiteTexte]}>
              La myopie peut être attribuée à divers facteurs, aussi bien
              génétiques, qu'environnementaux. Si l’un des deux parents est
              myopes, il y a une forte probabilité que l’enfant développe
              également ce trouble visuel. Les habitudes modernes jouent
              également un rôle important : les longues périodes passées à lire,
              à regarder un écran ou à effectuer des tâches nécessitant une
              vision de près sollicitent intensément les yeux et peuvent
              favoriser l’apparition de la myopie. De plus, une faible
              exposition à la lumière naturelle entraîne une augmentation du
              risque, en particulier chez les enfants qui passent peu de temps à
              l’extérieur.
            </Text>
          </View>

          <View style={styles.texteContainer}>
            <Text style={styles.titre}>LES TRAITEMENTS</Text>
            <Text style={styles.texte}>
              La myopie peut être corrigée ou gérée de différentes façons. Les
              lunettes et les lentilles de contact sont les méthodes les plus
              courantes et les plus accessibles pour améliorer la vision. Ces
              dispositifs corrigent la focalisation de la lumière sur la rétine,
              permettant ainsi une vision claire. Pour les patients recherchant
              une solution permanente, les interventions chirurgicales comme le
              LASIK ou la PKR peuvent remodeler la cornée afin de corriger le
              trouble.
            </Text>
            <Text style={styles.texte}>
              Pour ralentir la progression de la myopie, notamment chez les
              enfants, des collyres à base d’atropine faiblement dosée ou des
              lentilles spécialisées peuvent être prescrits. Des méthodes comme
              l’orthokératologie, qui consiste à porter des lentilles rigides la
              nuit pour remodeler temporairement la cornée, offrent également
              une alternative efficace. Enfin, adopter de bonnes pratiques
              visuelles, comme faire des pauses régulières lors de l’utilisation
              des écrans et passer plus de temps à l’extérieur, est essentiel
              pour limiter les effets de ce trouble visuel.
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
              title="Presbytie"
              onPress={() => router.push("/components/pagesArticles/presbytie")}
              style={styles}
            />
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
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
});
