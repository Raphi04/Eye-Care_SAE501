import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import projectColors from "../colors";
import { useEffect, useState } from "react";
import { useThemeContext } from "../context/themeContext";
import CustomButton from "../components/customButton";

export default function Index() {
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

  return (
    <ScrollView style={styles.safeContainer}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage} resizeMode="cover">
        <View style={styles.accueil}>
          <View style={styles.header}></View>
          <View style={styles.texteContainer}>
            <Text style={styles.bienvenue}>BIENVENUE</Text>
            <Text style={styles.titre}>Qu'est ce qu'Eye-Care ?</Text>
            <Text style={styles.texte}>
              Dans le cadre d’un projet universitaire, nous avions pour objectif de réaliser un site
              sur le thème des technologies numériques dans le domaine de la santé pour améliorer la
              qualité de vie des personnes.
            </Text>

            <Text style={styles.texte}>
              C’est pourquoi nous avons décidé de réaliser un site sur l’ophtalmologie du nom de
              Eye-Care ayant pour objectifs d’informer ses utilisateurs sur les différents problèmes
              existant, liés à la vision (daltonisme, presbytie, etc), de pouvoir réaliser des tests
              de vue et d'interagir avec des professionnels.
            </Text>
          </View>

          <View style={[styles.texteContainer, styles.blackContainer]}>
            <Text style={[styles.titre, styles.whiteTitre]}>Comment fonctionne un œil ?</Text>
            <Text style={[styles.texte, styles.whiteTexte]}>
              L'œil fonctionne comme un appareil photo en capturant la lumière pour créer des
              images. Tout commence lorsque la lumière entre dans l’œil par la cornée, une surface
              transparente qui aide à diriger et à concentrer les rayons lumineux. Ensuite, la
              lumière traverse la pupille, dont la taille est ajustée par l’iris en fonction de la
              luminosité.
            </Text>

            <Text style={[styles.texte, styles.whiteTexte]}>
              Derrière la pupille se trouve le cristallin, une lentille naturelle qui ajuste sa
              forme pour focaliser la lumière précisément sur la rétine, située au fond de l’œil. La
              rétine, composée de millions de cellules sensibles à la lumière, transforme ces rayons
              lumineux en signaux électriques qui sont envoyés au cerveau via le nerf optique.
              Enfin, le cerveau interprète ces signaux pour former l'image que nous voyons.
            </Text>
          </View>

          <View style={styles.texteContainer}>
            <Text style={styles.titre}>Testez votre vue</Text>
            <Text style={styles.texte}>
              Avez-vous déjà ressenti des vertiges en fixant un point, eu du mal à distinguer
              certaines couleurs ou éprouvé des difficultés à voir clairement de loin ou de près ?
              Ces symptômes pourraient indiquer un trouble visuel. Les problèmes de vision, s'ils ne
              sont pas détectés et corrigés à temps, peuvent impacter votre quotidien, que ce soit
              dans vos activités professionnelles, personnelles ou de loisirs.
            </Text>

            <Text style={styles.texte}>
              Notre site vous permet de tester votre vue facilement et rapidement grâce à des outils
              conçus pour évaluer différents aspects de votre vision. En quelques clics, vous
              pourrez mieux comprendre l’état de votre vision et savoir s'il est nécessaire de
              consulter un professionnel. N'attendez pas que vos problèmes s'aggravent, prenez soin
              de vos yeux dès aujourd'hui !
            </Text>

            <CustomButton
              text="Testez votre vue"
              textColor="white"
              textColorHover="white"
              baseColor={projectColors.blueButton}
              baseColorHover={projectColors.blueButtonHover}
              nextScreen="test"
            ></CustomButton>

            <TouchableOpacity onPress={changeTheme}>
              <Text style={styles.texte}>{currentTheme}</Text>
            </TouchableOpacity>
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

  texteContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 25,
    paddingVertical: 55,
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
    fontSize: 25,
    fontFamily: "Korolev-Bold",
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
  backgroundImage: { ...basicStyle.backgroundImage, backgroundColor: projectColors.blueBlack },
  header: { ...basicStyle.header, backgroundColor: projectColors.blueLight },
  bienvenue: { ...basicStyle.bienvenue, color: "white" },
  titre: { ...basicStyle.titre, color: "white" },
  texte: { ...basicStyle.texte, color: "white" },
  blackContainer: { ...basicStyle.blackContainer, backgroundColor: projectColors.blueLight },
});
