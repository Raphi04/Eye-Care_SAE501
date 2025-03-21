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
            <Text style={[styles.titre, styles.whiteTitre]}>DALTONISME</Text>
            <Text style={[styles.texte, styles.whiteTexte]}>
              Le daltonisme, ou dyschromatopsie, est un trouble de la vision des
              couleurs qui empêche certaines personnes de distinguer
              correctement certaines teintes. Il existe un spectre du daltonisme
              assez large mais dans la majorité des cas, les personnes touchées
              ont des difficultés à différencier le rouge et le vert (Protanopie
              / Deutéranopie), tandis que d’autres formes, concernent les
              teintes bleu et jaune (Tritanopie). Dans des cas plus rares, les
              personnes ayant une absence de cônes ou une altération sévère de
              leur fonctionnement distinguent leur environnement seulement grâce
              aux différentes intensités lumineuses et niveaux de gris
              (Achromatopsie). Bien que le daltonisme ne soit pas une condition
              invalidante dans la vie quotidienne pour beaucoup, il peut poser
              des défis dans certains métiers ou situations nécessitant une
              discrimination fine des couleurs.
            </Text>
          </View>

          <View style={styles.texteSousContainer}>
            <Text style={styles.titre}>INFORMATIONS CLÉS</Text>
            <Text style={styles.soustitre}>≃ 8,5 %</Text>
            <Text style={styles.texte}>
              Environ 8,5 % de la population mondiale est daltonienne, dont 8 %
              des hommes et 0,5 % des femmes.
            </Text>
          </View>
          <View style={styles.texteSousContainer}>
            <Text style={styles.soustitre}>1 homme sur 12 protanope</Text>
            <Text style={styles.texte}>
              La forme la plus courante de daltonisme, la protanopie (difficulté
              à percevoir le rouge), touche 1 homme sur 12.
            </Text>
          </View>
          <View style={styles.texteSousContainer}>
            <Text style={styles.soustitre}>≃ 300 millions</Text>
            <Text style={styles.texte}>
              Environ 300 millions de personnes à travers le monde vivent avec
              une forme de daltonisme.
            </Text>
          </View>
          <View style={styles.texteSousContainer}>
            <Text style={styles.soustitre}>Chromosome X</Text>
            <Text style={styles.texte}>
              Le daltonisme est transmis par le chromosome X, ce qui explique
              pourquoi les hommes, n'ayant pas de second chromosome X pour
              compenser, sont plus fréquemment touchés que les femmes.
            </Text>
          </View>

          <View style={[styles.texteContainer, styles.blackContainer]}>
            <Text style={[styles.titre, styles.whiteTitre]}>LES CAUSES</Text>
            <Text style={[styles.texte, styles.whiteTexte]}>
              Le daltonisme est un trouble de la vision des couleurs
              généralement d’origine génétique, qui affecte les cellules
              photoréceptrices de la rétine, appelées cônes, responsables de la
              perception des couleurs. Ce trouble est transmis par les parents à
              travers une mutation des gènes qui codent les pigments des cônes
              rétiniens. Ces pigments permettent de distinguer les différentes
              longueurs d’onde de lumière associées aux couleurs. Lorsque ces
              pigments sont altérés ou absents, la perception des couleurs
              devient perturbée.
            </Text>
            <Text style={[styles.texte, styles.whiteTexte]}>
              Dans certains cas rares, le daltonisme peut être acquis. Cela peut
              résulter de dommages à la rétine ou au nerf optique, causés par
              des maladies telles que le glaucome ou la dégénérescence maculaire
              liée à l’âge (DMLA). Une exposition à certains produits chimiques
              ou médicaments peut également altérer la perception des couleurs,
              entraînant un daltonisme acquis.
            </Text>
          </View>

          <View style={styles.texteContainer}>
            <Text style={styles.titre}>LES TRAITEMENTS</Text>
            <Text style={styles.texte}>
              Il n’existe actuellement aucun remède définitif pour corriger le
              daltonisme, mais des solutions permettent de compenser les effets
              de ce trouble. Les lunettes ou lentilles spécialement conçues pour
              les daltoniens intègrent des filtres optiques qui amplifient la
              distinction entre certaines teintes, aidant ainsi à améliorer la
              perception des couleurs. Des applications mobiles et logiciels
              peuvent également être utilisés pour ajuster les couleurs sur les
              écrans, rendant ainsi le numérique plus accessible aux personnes
              atteintes.
            </Text>
            <Text style={styles.texte}>
              Pour les formes de daltonisme acquises, il est parfois possible de
              traiter la cause sous-jacente, comme une maladie oculaire ou un
              trouble neurologique. Par ailleurs, les avancées en génétique
              laissent espérer, à long terme, des thérapies capables de réparer
              ou remplacer les pigments déficients. Bien que vivre avec le
              daltonisme implique parfois des ajustements, des outils et des
              stratégies adaptés permettent aux personnes concernées de mener
              une vie normale.
            </Text>
          </View>

          <View style={styles.buttonContainer}>
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
