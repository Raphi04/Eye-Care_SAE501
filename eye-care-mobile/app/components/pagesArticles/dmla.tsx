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
            <Text style={[styles.titre, styles.whiteTitre]}>DMLA</Text>
            <Text style={[styles.texte, styles.whiteTexte]}>
              La Dégénérescence Maculaire Liée à l’Âge (DMLA) est une affection
              oculaire chronique qui affecte la macula, la partie centrale de la
              rétine, responsable de la vision fine et des détails. Elle
              entraîne une perte progressive de la vision centrale, rendant des
              tâches comme la lecture, l’écriture, ou la reconnaissance des
              visages de plus en plus difficiles. La vision périphérique reste
              généralement intacte, ce qui empêche une cécité totale, mais
              l’impact sur la qualité de vie peut être important. La DMLA est
              une des principales causes de malvoyance chez les personnes âgées,
              et son évolution varie en fonction de la forme de la maladie :
              sèche ou humide.
            </Text>
          </View>

          <View style={styles.texteSousContainer}>
            <Text style={styles.titre}>INFORMATIONS CLÉS</Text>
            <Text style={styles.soustitre}>≃ 196 million</Text>
            <Text style={styles.texte}>
              Environ 196 millions de personnes dans le monde sont atteintes de
              DMLA.En France, 1,5 million de personnes en sont atteintes, avec
              environ 200 000 nouveaux cas diagnostiqués chaque année.
            </Text>
          </View>
          <View style={styles.texteSousContainer}>
            <Text style={styles.soustitre}>Facteurs de risques</Text>
            <Text style={styles.texte}>
              Les personnes ayant des antécédents familiaux de DMLA ont 3 à 4
              fois plus de risques de développer la maladie. Les fumeurs ont
              également un risque 2 à 4 fois plus élevé de développer une DMLA
              que les non-fumeurs.
            </Text>
          </View>
          <View style={styles.texteSousContainer}>
            <Text style={styles.soustitre}>Importance de l'alimentation</Text>
            <Text style={styles.texte}>
              Une alimentation riche en antioxydants, en oméga-3, et en lutéine
              (fruits, légumes verts) peut réduire le risque de développer une
              DMLA.
            </Text>
          </View>
          <View style={styles.texteSousContainer}>
            <Text style={styles.soustitre}>Manque de protection</Text>
            <Text style={styles.texte}>
              Lors d'activité en extérieur, une exposition prolongée aux rayons
              UV ou une faible protection solaire augmente légèrement le risque
              de DMLA.
            </Text>
          </View>

          <View style={[styles.texteContainer, styles.blackContainer]}>
            <Text style={[styles.titre, styles.whiteTitre]}>LES CAUSES</Text>
            <Text style={[styles.texte, styles.whiteTexte]}>
              La DMLA est causée par un vieillissement progressif des cellules
              de la macula, pouvant être aggravé par des facteurs génétiques et
              environnementaux. Parmi les principales causes figurent l’âge, le
              facteur le plus déterminant, ainsi que la prédisposition génétique
              (antécédents familiaux). Les habitudes de vie, comme le tabagisme,
              sont également des facteurs aggravants. Une exposition prolongée
              aux rayons ultraviolets, une alimentation pauvre en antioxydants,
              et des problèmes cardiovasculaires (comme l’hypertension)
              augmentent aussi les risques de développer la DMLA.
            </Text>
          </View>

          <View style={styles.texteContainer}>
            <Text style={styles.titre}>LES TRAITEMENTS</Text>
            <Text style={styles.texte}>
              La prise en charge de la DMLA dépend de sa forme :
            </Text>
            <Text style={styles.texte}>
              <ul>
                <li>
                  Pour <b>la forme sèche</b>, il n’existe pas de traitement
                  curatif, mais des mesures préventives comme une alimentation
                  riche en antioxydants (vitamines C et E, zinc, lutéine) et des
                  compléments alimentaires peuvent ralentir la progression de la
                  maladie.
                </li>
                <br></br>
                <li>
                  Pour la <b>forme humide</b>, des traitements par injections
                  intraoculaires (anti-VEGF) permettent de stopper la croissance
                  des néovaisseaux responsables des dégâts à la rétine et
                  d’améliorer la vision dans certains cas.
                </li>
              </ul>
            </Text>
            <Text style={styles.texte}>
              La <b>rééducation visuelle</b> et l’utilisation d’aides optiques
              (loupe électronique, lunettes spécifiques) permettent d’aider les
              patients à mieux vivre avec la maladie. Un suivi régulier chez
              l’ophtalmologue est essentiel pour détecter la maladie tôt,
              surtout si des symptômes comme des lignes droites apparaissent
              déformées ou si une tâche floue se développe dans le champ de
              vision central. Plus le diagnostic est précoce, meilleures sont
              les chances de ralentir l’évolution de la DMLA.
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
              title="Hypermétropie"
              onPress={() =>
                router.push("/components/pagesArticles/hypermetropie")
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
