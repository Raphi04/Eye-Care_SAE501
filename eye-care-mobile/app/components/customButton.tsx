import { useNavigation, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

type CustomButtonProps = {
  text: string;
  textColor: string;
  textColorHover: string;
  baseColor: string;
  baseColorHover: string;
  nextScreen: string;
};

export default function CustomButton({
  text,
  textColor,
  textColorHover,
  baseColor,
  baseColorHover,
  nextScreen,
}: CustomButtonProps) {
  const navigation = useRouter();

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? baseColorHover : baseColor },
        ]}
        onPress={() => {
          navigation.navigate(nextScreen as any);
        }}
      >
        {({ pressed }) => {
          return (
            <Text style={[styles.text, { color: textColor }, pressed && { color: textColorHover }]}>
              {text}
            </Text>
          );
        }}
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 50,
    paddingVertical: 7,
    alignSelf: "center",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  text: {
    fontSize: 18,
    fontWeight: 600,
  },
});
