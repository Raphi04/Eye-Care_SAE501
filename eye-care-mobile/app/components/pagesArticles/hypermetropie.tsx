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
            <Text style={[styles.titre, styles.whiteTitre]}>HYPERMÉTROPIE</Text>
            <Text style={[styles.texte, styles.whiteTexte]}>
              L’hypermétropie est un trouble de la vision qui se traduit par une
              difficulté à voir nettement les objets proches, tandis que la
              vision des objets éloignés reste généralement claire. Cela est dû
              à un problème de focalisation : les rayons lumineux entrant dans
              l'œil convergent derrière la rétine au lieu de converger
              directement sur celle-ci. Cette anomalie peut résulter d’un œil
              trop court ou d’une courbure insuffisante de la cornée ou du
              cristallin. Les personnes atteintes d’hypermétropie peuvent
              ressentir des symptômes tels que des maux de tête, une fatigue
              oculaire, ou une gêne après une lecture prolongée ou l’utilisation
              d’écrans. Ce trouble peut survenir à tout âge, mais il est souvent
              détecté chez les enfants ou devient plus prononcé avec l’âge,
              lorsque la capacité naturelle de l’œil à compenser le défaut
              diminue.
            </Text>
          </View>

          <View style={styles.texteSousContainer}>
            <Text style={styles.titre}>INFORMATIONS CLÉS</Text>
            <Text style={styles.soustitre}>≃ 15 %</Text>
            <Text style={styles.texte}>
              L’hypermétropie touche environ 15 % de la population mondiale.
            </Text>
          </View>
          <View style={styles.texteSousContainer}>
            <Text style={styles.soustitre}>≃ 8 %</Text>
            <Text style={styles.texte}>
              Chez les enfants, près de 8 % des moins de 6 ans sont
              hypermétropes, avec des cas modérés à sévères.
            </Text>
          </View>
          <View style={styles.texteSousContainer}>
            <Text style={styles.soustitre}>Facteurs génétiques</Text>
            <Text style={styles.texte}>
              Si l’un des parents est hypermétrope, l’enfant a environ 2 à 3
              fois plus de chances de l’être également.
            </Text>
          </View>
          <View style={styles.texteSousContainer}>
            <Text style={styles.soustitre}>Risque</Text>
            <Text style={styles.texte}>
              Les personnes hypermétropes ont un risque accru de développer un
              strabisme accommodatif, notamment chez les enfants, car
              l'accommodation excessive de l'œil pour voir de près peut
              entraîner un désalignement des yeux.
            </Text>
          </View>

          <View style={[styles.texteContainer, styles.blackContainer]}>
            <Text style={[styles.titre, styles.whiteTitre]}>LES CAUSES</Text>
            <Text style={[styles.texte, styles.whiteTexte]}>
              L’hypermétropie est principalement causée par une anomalie dans la
              structure de l’œil. Un œil trop court ou une courbure insuffisante
              de la cornée ou du cristallin empêche la lumière de se focaliser
              correctement sur la rétine. Ce défaut peut être d’origine
              génétique, ce qui explique pourquoi il est parfois observé dès
              l’enfance.
            </Text>
            <Text style={[styles.texte, styles.whiteTexte]}>
              Dans de nombreux cas, les enfants hypermétropes parviennent à
              compenser ce trouble grâce à une forte capacité d’accommodation du
              cristallin. Cependant, cette capacité diminue avec l’âge, rendant
              l’hypermétropie plus perceptible. Dans de rares cas, des
              conditions comme des maladies oculaires ou des interventions
              chirurgicales peuvent également provoquer une hypermétropie
              acquise.
            </Text>
          </View>

          <View style={styles.texteContainer}>
            <Text style={styles.titre}>LES TRAITEMENTS</Text>
            <Text style={styles.texte}>
              L’hypermétropie peut être corrigée efficacement grâce à plusieurs
              solutions. Les lunettes sont l’option la plus courante, avec des
              verres convexes (ou "positifs") qui permettent de focaliser la
              lumière directement sur la rétine. Les lentilles de contact
              représentent une alternative pratique pour ceux qui préfèrent
              éviter les lunettes.
            </Text>
            <Text style={styles.texte}>
              Pour une correction permanente, des interventions chirurgicales,
              comme la chirurgie au laser (LASIK ou PKR), peuvent être
              envisagées. Ces techniques consistent à remodeler la cornée pour
              améliorer la focalisation. Dans certains cas plus sévères, le
              remplacement du cristallin par une lentille intraoculaire peut
              être une option.
            </Text>
            <Text style={styles.texte}>
              Enfin, une consultation régulière avec un ophtalmologiste est
              essentielle pour détecter l’hypermétropie, particulièrement chez
              les enfants, car un diagnostic précoce peut prévenir des
              complications comme le strabisme ou l’amblyopie (œil paresseux).
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
              title="Myopie"
              onPress={() => router.push("/components/pagesArticles/myopie")}
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
