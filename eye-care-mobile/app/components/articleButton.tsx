import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import projectColors from "../colors";
import { useThemeContext } from "../context/themeContext";

const ArticleButton = ({ title, onPress, style }: { title: string; onPress: () => void; style: any }) => {
    // Styles et mode sombre
    const { currentTheme, changeTheme } = useThemeContext();

    const [styles, setStyles] = useState<any>(basicStyle);

    useEffect(() => {
        if (currentTheme == "light") {
            setStyles(darkModeStyle);
        } else {
            setStyles(basicStyle);
        }
    }, [currentTheme]);
  return (
    <TouchableOpacity style={[styles.button, style.button]} onPress={onPress}>
      <Text style={[styles.buttonText, style.buttonText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const basicStyle = StyleSheet.create({
  button: {
    width: "46%",
    backgroundColor: "#182026",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    margin: 5, 
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Korolev-Bold",
  },
});

const darkModeStyle = StyleSheet.create({
    ...basicStyle,
    button: { ...basicStyle.button, backgroundColor: "white" },
    buttonText: { ...basicStyle.buttonText, color: "black" },
});


export default ArticleButton;