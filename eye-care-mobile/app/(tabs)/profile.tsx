import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
	SafeAreaView,
	Text,
	Button,
	ImageBackground,
	StyleSheet,
	View,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import UserSession from "../services/userSession";
import { useRouter } from "expo-router";
import { useThemeContext } from "../context/themeContext";
import projectColors from "../colors";
import {
	AntDesign,
	Entypo,
	FontAwesome,
	MaterialIcons,
} from "@expo/vector-icons";

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
	const { currentTheme, changeTheme } = useThemeContext();

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

	const iconColor = currentTheme === "light" ? "white" : "black";

	const hasResults = (userData?.vision_disorder_result ?? []).length > 0;

	return (
		<View style={styles.flex1}>
			<ImageBackground
				source={backgroundImage}
				style={styles.backgroundImage}
				resizeMode="cover"
			>
				<ScrollView contentContainerStyle={styles.scrollViewContent}>
					<View style={styles.nameAndInitials}>
						<View style={styles.initiales}>
							<Text style={styles.textInitiales}>{getInitials()}</Text>
						</View>
						<View style={styles.containerName}>
							<Text style={styles.name}>{userData?.username}</Text>
						</View>
					</View>
					<View style={styles.dataContainer}>
						<View style={styles.textContainer}>
							<Text style={[styles.titre, { marginBottom: 10 }]}>
								VOS INFORMATIONS
							</Text>
							<Text style={[styles.texte, styles.data]}>
								Nom : {userData?.username}
							</Text>
							<Text style={[styles.texte, styles.data]}>
								Email : {userData?.email}
							</Text>
							<Text style={[styles.texte, styles.data]}>
								Mot de passe : ********
							</Text>
						</View>

						<View style={styles.textContainer}>
							<Text style={[styles.titre, { marginBottom: 10 }]}>
								FAIRE/REFAIRE LES TESTS
							</Text>
							<View style={styles.checkAcuity}>
								{userData?.vision_disorder_result.some(
									(disorder) => disorder.vision_disorder === "myopie"
								) ? (
									<AntDesign
										name="checkcircle"
										size={18}
										color={iconColor}
										style={{ marginRight: 10 }}
									/>
								) : (
									<Entypo
										style={{ marginRight: 10 }}
										name="circle"
										size={18}
										color={iconColor}
									/>
								)}
								<Text style={styles.texte}>
									Faire le test d'acuité visuelle
								</Text>
							</View>

							<View style={styles.checkAcuity}>
								{userData?.vision_disorder_result.some(
									(disorder) => disorder.vision_disorder === "DMLA"
								) ? (
									<AntDesign
										name="checkcircle"
										size={18}
										color={iconColor}
										style={{ marginRight: 10 }}
									/>
								) : (
									<Entypo
										style={{ marginRight: 10 }}
										name="circle"
										size={18}
										color={iconColor}
									/>
								)}
								<Text style={styles.texte}>Faire le test de DMLA</Text>
							</View>

							<View style={styles.checkAcuity}>
								{userData?.vision_disorder_result.some(
									(disorder) => disorder.vision_disorder === "daltonisme"
								) ? (
									<AntDesign
										name="checkcircle"
										size={18}
										color={iconColor}
										style={{ marginRight: 10 }}
									/>
								) : (
									<Entypo
										style={{ marginRight: 10 }}
										name="circle"
										size={18}
										color={iconColor}
									/>
								)}
								<Text style={styles.texte}>Faire le test de d'Ishihara</Text>
							</View>
						</View>
						<View style={styles.textContainer}>
							<Text style={[styles.titre, { marginBottom: 10 }]}>
								VOTRE PROFIL OCULAIRE
							</Text>
							<View>
								{userData?.vision_disorder_result && hasResults ? (
									userData.vision_disorder_result.map((disorder, index) => (
										<View key={index} style={styles.ocularIssues}>
											{disorder.vision_disorder === "myopie" ? (
												<View style={styles.ocularIssue}>
													<View style={styles.ocularIssueMain}>
														{disorder.result >= 0 && disorder.result <= 12 ? (
															<FontAwesome
																name="circle"
																size={18}
																color="red"
															/>
														) : disorder.result > 12 &&
														  disorder.result <= 25 ? (
															<FontAwesome
																name="circle"
																size={18}
																color="orange"
															/>
														) : disorder.result > 25 &&
														  disorder.result <= 37 ? (
															<FontAwesome
																name="circle"
																size={18}
																color="yellow"
															/>
														) : disorder.result > 37 ? (
															<FontAwesome
																name="circle"
																size={18}
																color="green"
															/>
														) : null}
														<Text key={index} style={styles.ocularIssueTitle}>
															{disorder.vision_disorder
																.charAt(0)
																.toUpperCase() +
																disorder.vision_disorder.slice(1)}
														</Text>
													</View>
													<View style={styles.ocularIssueDetails}>
														<Text style={styles.ocularIssueText}>
															Résultat : {disorder.result}/50
														</Text>
														{disorder.vision_disorder === "myopie" ? (
															disorder.result >= 0 && disorder.result <= 12 ? (
																<Text style={styles.ocularIssueText}>
																	Nous avons repéré un problème, ne tardez pas à
																	prendre rendez-vous chez un ophtalmologue
																</Text>
															) : disorder.result > 12 &&
															  disorder.result <= 25 ? (
																<Text style={styles.ocularIssueText}>
																	Nous avons repéré un problème, ne tardez pas à
																	prendre rendez-vous chez un ophtalmologue
																</Text>
															) : disorder.result > 25 &&
															  disorder.result <= 37 ? (
																<Text style={styles.ocularIssueText}>
																	Vous avez peut être un problème de vue, prenez
																	rendez-vous chez un ophtalmologue
																</Text>
															) : disorder.result > 37 ? (
																<Text style={styles.ocularIssueText}>
																	Vous avez une très bonne vue, continuez à
																	prendre soin de vos yeux
																</Text>
															) : null
														) : null}
													</View>
												</View>
											) : null}

											{disorder.vision_disorder === "daltonisme" ? (
												<View style={styles.ocularIssue}>
													<View style={styles.ocularIssueMain}>
														{disorder.result >= 0 && disorder.result <= 2 ? (
															<FontAwesome
																name="circle"
																size={18}
																color="red"
															/>
														) : disorder.result > 2 && disorder.result <= 4 ? (
															<FontAwesome
																name="circle"
																size={18}
																color="orange"
															/>
														) : disorder.result > 4 && disorder.result <= 7 ? (
															<FontAwesome
																name="circle"
																size={18}
																color="yellow"
															/>
														) : disorder.result > 7 ? (
															<FontAwesome
																name="circle"
																size={18}
																color="green"
															/>
														) : null}
														<Text key={index} style={styles.ocularIssueTitle}>
															{disorder.vision_disorder
																.charAt(0)
																.toUpperCase() +
																disorder.vision_disorder.slice(1)}
														</Text>
													</View>
													<View style={styles.ocularIssueDetails}>
														<Text style={styles.ocularIssueText}>
															Résultat : {disorder.result}/10
														</Text>
														{disorder.vision_disorder === "daltonisme" ? (
															disorder.result >= 0 && disorder.result <= 2 ? (
																<Text style={styles.ocularIssueText}>
																	Nous avons repéré un problème, ne tardez pas à
																	prendre rendez-vous chez un ophtalmologue
																</Text>
															) : disorder.result > 2 &&
															  disorder.result <= 4 ? (
																<Text style={styles.ocularIssueText}>
																	Nous avons repéré un problème, ne tardez pas à
																	prendre rendez-vous chez un ophtalmologue
																</Text>
															) : disorder.result > 4 &&
															  disorder.result <= 7 ? (
																<Text style={styles.ocularIssueText}>
																	Vous avez peut être un problème de vue, prenez
																	rendez-vous chez un ophtalmologue
																</Text>
															) : disorder.result > 7 ? (
																<Text style={styles.ocularIssueText}>
																	Vous avez une très bonne vue, continuez à
																	prendre soin de vos yeux
																</Text>
															) : null
														) : null}
													</View>
												</View>
											) : null}
										</View>
									))
								) : (
									<Text style={styles.ocularIssueTextNoResults}>
										Vous n'avez pas encore effectué de tests
									</Text>
								)}
							</View>
						</View>

						<TouchableOpacity
							onPress={UserSession.clearSession}
							style={styles.buttonLogOut}
						>
							<MaterialIcons name="logout" size={24} color="white" />
							<Text style={styles.buttonText}>SE DÉCONNECTER</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</ImageBackground>
			<TouchableOpacity style={styles.changeTheme} onPress={changeTheme}>
				<Text style={[styles.texte, styles.whiteTexteUnchanged]}>
					{currentTheme}
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const basicStyle = StyleSheet.create({
	// Theme

	changeTheme: {
		position: "absolute",
		bottom: 16,
		right: 16,
		backgroundColor: projectColors.blueButtonHover,
		borderRadius: 12,
		paddingVertical: 8,
		paddingHorizontal: 16,
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},

	whiteTexteUnchanged: {
		color: "white",
	},

	flex1: {
		flex: 1,
	},

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

	dataContainer: {
		flexDirection: "column",
		gap: 25,
		paddingVertical: 55,
		paddingHorizontal: 35,
	},

	textContainer: {
		textAlign: "center",
		justifyContent: "flex-start",
	},

	checkAcuity: {
		flexDirection: "row",
		display: "flex",
		alignItems: "center",
	},

	blackContainer: {
		backgroundColor: "red",
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

	// Profil oculaire

	ocularIssue: {
		justifyContent: "space-between",
		backgroundColor: projectColors.blueBlack,
		borderRadius: 15,
		paddingVertical: 15,
		marginBottom: 15,
	},

	ocularIssues: {
		display: "flex",
		flexDirection: "column",
	},

	ocularIssueMain: {
		display: "flex",
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
		paddingLeft: 10,
	},

	ocularIssueTitle: {
		fontSize: 16,
		fontFamily: "Korolev-Bold",
		color: "white",
	},

	ocularIssueDetails: {
		marginTop: 5,
		paddingHorizontal: 20,
	},

	ocularIssueText: {
		color: "white",
		fontSize: 14,
	},

	ocularIssueTextNoResults: {
		color: projectColors.blueBlack,
		fontSize: 16,
		fontFamily: "Korolev-Bold",
	},

	// Button logout

	buttonLogOut: {
		display: "flex",
		flexDirection: "row",
		backgroundColor: "red",
		alignItems: "center",
		justifyContent: "center",
		alignSelf: "center",
		width: "55%",
		paddingVertical: 10,
		borderRadius: 10,
		cursor: "pointer",
	},

	buttonText: {
		color: "white",
		fontSize: 16,
		marginLeft: 10,
		fontFamily: "Korolev-Bold",
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
	changeTheme: {
		...basicStyle.changeTheme,
		backgroundColor: projectColors.blueButton,
	},
	name: {
		...basicStyle.name,
		color: "white",
	},
	ocularIssue: {
		...basicStyle.ocularIssue,
		backgroundColor: projectColors.blueLight,
	},
	ocularIssueText: {
		...basicStyle.ocularIssueText,
		color: projectColors.blueBlack,
		fontSize: 14,
	},
	ocularIssueTitle: {
		...basicStyle.ocularIssueTitle,
		color: projectColors.blueBlack,
		fontFamily: "Korolev-Bold",
		fontSize: 16,
	},
	ocularIssueTextNoResults: {
		...basicStyle.ocularIssueTextNoResults,
		color: "white",
		fontSize: 16,
		fontFamily: "Korolev-Bold",
	},
});
