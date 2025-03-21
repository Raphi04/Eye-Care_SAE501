import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
	SafeAreaView,
	Text,
	Button,
	ImageBackground,
	StyleSheet,
	View,
} from "react-native";
import UserSession from "../services/userSession";
import { useRouter } from "expo-router";
import { useThemeContext } from "../context/themeContext";
import projectColors from "../colors";

export default function profile() {
	// Navigation et redirection
	const navigator = useRouter();
	const [isAuthenticated, setIsAuthenticated] = useState(
		UserSession.isAuthenticated
	);

	useEffect(() => {
		UserSession.setAuthStateSetter(setIsAuthenticated);
		UserSession.getSession().then((session) => {
			setToken(session.token);
		});
	}, []);

	useEffect(() => {
		if (!isAuthenticated) {
			navigator.navigate("login" as any);
		}
	}, [isAuthenticated]);

	// Appel API

	const [userData, setUserData] = useState<{
		email: string;
		username: string;
		vision_disorder: { vision_disorder: string }[];
		vision_disorder_result: { result: number; vision_disorder: string }[];
	} | null>(null);
	const [globalErrors, setGlobalErrors] = useState<string[]>([]);
	const [token, setToken] = useState<string | null>(null);
	const API_URL = "http://10.0.2.2:8000";

	const fetchUser = useCallback(async () => {
		if (token) {
			try {
				const response = await axios.get(`${API_URL}/user/profile`, {
					headers: { "auth-token": token },
				});
				setUserData(response.data);
			} catch (error: unknown) {
				setGlobalErrors(["Une erreur inattendue s'est produite : " + error]);
			}
		}
	}, [token, API_URL]);

	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	// Fonction pour obtenir les initiales de l'utilisateur
	const getInitials = () => {
		if (userData?.username) {
			return userData.username
				.split(" ")
				.map((word) => word[0].toUpperCase())
				.join("");
		}
		return "?";
	};

	// Style and dark mode
	const { currentTheme } = useThemeContext();

	const [styles, setStyles] = useState<any>(basicStyle);

	const [backgroundImage, setBackgroundImage] = useState<any>(
		require("../../assets/images/eye-care-text.png")
	);

	useEffect(() => {
		if (currentTheme == "light") {
			setStyles(darkModeStyle);
			setBackgroundImage(
				require("../../assets/images/eye-care-text-black2.png")
			);
		} else {
			setStyles(basicStyle);
			setBackgroundImage(require("../../assets/images/eye-care-text.png"));
		}
	}, [currentTheme]);

	return (
		<SafeAreaView style={styles.safeContainer}>
			<ImageBackground
				source={backgroundImage}
				style={styles.backgroundImage}
				resizeMode="cover"
			>
				<View style={styles.nameAndInitials}>
					<View style={styles.initiales}>
						<Text style={[styles.whiteTitre, styles.textInitiales]}>
							{getInitials()}
						</Text>
					</View>
					<View style={styles.containerName}>
						<Text style={styles.name}>{userData?.username}</Text>
					</View>
				</View>
				{/* <View style={styles.texteContainer}>
					<View>
						<Text style={styles.titre}>Vos informations</Text>
						<Text style={styles.texte}>Nom : {userData?.username}</Text>
						<Text style={styles.texte}>Email : {userData?.email}</Text>
						<Text style={styles.texte}>Mot de passe : ********</Text>
					</View>
					<View>
						<Text style={styles.titre}>Faire/refaire les tests</Text>
						<Text style={styles.texte}>Nom : {userData?.username}</Text>
						<Text style={styles.texte}>Email : {userData?.email}</Text>
						<Text style={styles.texte}>Mot de passe : ********</Text>
					</View>
				</View> */}
				<View style={styles.texteContainer}></View>
				<Button title="Se deco" onPress={UserSession.clearSession} />
			</ImageBackground>
		</SafeAreaView>
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

	nameAndInitials: {
		marginTop: 50,
		marginLeft: "auto",
		marginRight: "auto",
		display: "flex",
		flexDirection: "row",
	},

	initiales: {
		backgroundColor: "white",
		width: 100,
		height: 100,
		borderRadius: 10,
		justifyContent: "center",
	},

	textInitiales: {
		textAlign: "center",
		fontSize: 50,
		fontFamily: "Korolev-Heavy",
	},

	containerName: {
		textAlign: "center",
		justifyContent: "center",
		marginLeft: 25,
	},

	name: {
		fontSize: 35,
		fontFamily: "Korolev-Heavy",
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

	blackTitre: {
		color: projectColors.blueLight,
	},

	texte: {
		textAlign: "justify",
		fontSize: 18,
		fontFamily: "Korolev-Medium",
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
	texte: { ...basicStyle.texte, color: "white" },
	blackContainer: {
		...basicStyle.blackContainer,
		backgroundColor: projectColors.blueLight,
	},
});
