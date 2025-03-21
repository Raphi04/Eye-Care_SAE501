import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const ArticleButton = ({ title, onPress, style }: { title: string; onPress: () => void; style: any }) => {
  return (
    <TouchableOpacity style={[styles.button, style.button]} onPress={onPress}>
      <Text style={[styles.buttonText, style.buttonText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default ArticleButton;