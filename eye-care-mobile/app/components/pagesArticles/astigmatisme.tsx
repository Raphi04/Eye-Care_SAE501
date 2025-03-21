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
            <Text style={[styles.titre, styles.whiteTitre]}>ASTIGMATISME</Text>
            <Text style={[styles.texte, styles.whiteTexte]}>
              L’astigmatisme est un trouble visuel qui se caractérise par une
              vision floue ou déformée, quelle que soit la distance des objets
              observés. Ce défaut de réfraction peut entraîner une perception
              altérée des formes et des contours, rendant les lignes droites ou
              les détails difficiles à discerner. Par exemple, les lettres sur
              une page ou les panneaux de signalisation peuvent sembler
              dédoublés ou brouillés. Bien que ce trouble ne soit pas une
              maladie grave, il peut causer de la fatigue oculaire, des maux de
              tête et une gêne dans la vie quotidienne, surtout lorsqu’il n’est
              pas corrigé.
            </Text>
          </View>

          <View style={styles.texteSousContainer}>
            <Text style={styles.titre}>INFORMATIONS CLÉS</Text>
            <Text style={styles.soustitre}>≃ 30 %</Text>
            <Text style={styles.texte}>
              Environ 30 % de la population mondiale présente une forme
              d'astigmatisme, qui peut varier en termes de sévérité, de léger à
              sévère.
            </Text>
          </View>
          <View style={styles.texteSousContainer}>
            <Text style={styles.soustitre}>80 %</Text>
            <Text style={styles.texte}>
              Dans 80 % des cas, l'astigmatisme est causé par une anomalie de la
              cornée, mais il peut également être dû à une irrégularité du
              cristallin.
            </Text>
          </View>
          <View style={styles.texteSousContainer}>
            <Text style={styles.soustitre}>≃ 30 - 40 %</Text>
            <Text style={styles.texte}>
              Environ 30 à 40 % des personnes souffrant d'astigmatisme ne sont
              pas conscientes de leur condition, car les symptômes peuvent être
              légers ou s'aggraver progressivement.
            </Text>
          </View>
          <View style={styles.texteSousContainer}>
            <Text style={styles.soustitre}>Impact sur la vision</Text>
            <Text style={styles.texte}>
              L'astigmatisme provoque une vision floue ou déformée à toutes les
              distances, rendant difficile la lecture, la conduite, ou même la
              reconnaissance des visages.
            </Text>
          </View>

          <View style={[styles.texteContainer, styles.blackContainer]}>
            <Text style={[styles.titre, styles.whiteTitre]}>LES CAUSES</Text>
            <Text style={[styles.texte, styles.whiteTexte]}>
              L’astigmatisme est principalement causé par une courbure
              irrégulière de la cornée, qui au lieu d’être parfaitement ronde,
              adopte une forme plus ovale, semblable à celle d’un ballon de
              rugby. Cela provoque une focalisation incorrecte des rayons
              lumineux sur la rétine.
            </Text>
            <Text style={[styles.texte, styles.whiteTexte]}>
              Cette anomalie est souvent héréditaire et présente dès la
              naissance. D’autres facteurs peuvent également être à l’origine de
              l’astigmatisme, comme des traumatismes oculaires, des infections,
              ou encore des maladies comme le kératocône, où la cornée s’amincit
              progressivement. Parfois, il peut aussi être une conséquence de
              chirurgies oculaires ou de cicatrices sur la cornée.
            </Text>
          </View>

          <View style={styles.texteContainer}>
            <Text style={styles.titre}>LES TRAITEMENTS</Text>
            <Text style={styles.texte}>
              Pour corriger l’astigmatisme, plusieurs solutions existent en
              fonction de son degré de gravité. Les lunettes avec des verres
              cylindriques sont une méthode simple et efficace pour compenser
              l’irrégularité de la cornée.
            </Text>
            <Text style={styles.texte}>
              Les lentilles de contact, en particulier les lentilles toriques,
              offrent une correction plus précise, notamment pour les cas
              modérés à sévères. Pour une solution permanente, la chirurgie
              réfractive comme le LASIK ou la PKR peut remodeler la cornée pour
              restaurer une vision nette.
            </Text>
            <Text style={styles.texte}>
              Enfin, dans les cas plus graves ou liés à des affections comme le
              kératocône, des traitements spécifiques comme les implants
              cornéens ou la greffe de cornée peuvent être envisagés. Un suivi
              régulier auprès d’un ophtalmologue est essentiel pour surveiller
              l’évolution du trouble et adapter les corrections si nécessaire.
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <ArticleButton title="Daltonisme" onPress={() => router.push("/components/pagesArticles/daltonisme")} style={styles} />
            <ArticleButton title="DMLA" onPress={() => router.push("/components/pagesArticles/dmla")} style={styles} />
            <ArticleButton title="Hypermétropie" onPress={() => router.push("/components/pagesArticles/hypermetropie")} style={styles} />
            <ArticleButton title="Myopie" onPress={() => router.push("/components/pagesArticles/myopie")} style={styles} />
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
